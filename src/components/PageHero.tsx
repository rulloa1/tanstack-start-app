import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Home, ChevronDown } from "lucide-react";

const FRAME_COUNT = 195;

export function PageHero({
  title,
  subtitle,
  crumb,
}: {
  title: string;
  subtitle?: string;
  crumb: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      const paddedIndex = i.toString().padStart(3, "0");
      img.src = `/frames/ezgif-frame-${paddedIndex}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          setImages(loadedImages);
          setIsLoaded(true);
        }
      };
      loadedImages.push(img);
    }
  }, []);

  const drawFrame = (frameIndex: number, imgs: HTMLImageElement[]) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const img = imgs[frameIndex - 1];
    if (!img) return;

    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);
    const centerShift_x = (canvas.width - img.width * ratio) / 2;
    const centerShift_y = (canvas.height - img.height * ratio) / 2;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  };

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        if (images.length === FRAME_COUNT) {
          drawFrame(1, images);
        }
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize(); 
    return () => window.removeEventListener("resize", handleResize);
  }, [images]);

  useEffect(() => {
    if (!isLoaded || images.length !== FRAME_COUNT) return;
    
    drawFrame(1, images);

    let requestRef: number;
    const handleScroll = () => {
      requestRef = requestAnimationFrame(() => {
        if (!containerRef.current) return;
        
        const scrollPosition = window.scrollY;
        const containerTop = containerRef.current.offsetTop;
        const containerHeight = containerRef.current.scrollHeight - window.innerHeight;
        
        const rawProgress = (scrollPosition - containerTop) / containerHeight;
        const progress = Math.min(Math.max(rawProgress, 0), 1);
        
        const frameIndex = Math.floor(progress * (FRAME_COUNT - 1)) + 1;
        drawFrame(frameIndex, images);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (requestRef) cancelAnimationFrame(requestRef);
    };
  }, [isLoaded, images]);

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-primary-deep">
      <div className="sticky top-0 h-[60vh] md:h-[75vh] w-full overflow-hidden bg-primary-deep">
        <canvas ref={canvasRef} className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} />
        
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative mx-auto flex h-full max-w-[1400px] flex-col justify-center px-6 md:px-10 pb-16">
          <nav className="mb-4 flex items-center gap-2 text-sm text-cream/80">
            <Link to="/" className="inline-flex items-center gap-1.5 hover:text-cream">
              <Home className="h-3.5 w-3.5" /> Home
            </Link>
            <span className="opacity-50">/</span>
            <span className="text-cream">{crumb}</span>
          </nav>
          
          <h1 className="font-display text-4xl md:text-5xl font-bold text-cream tracking-tight animate-in fade-in slide-in-from-bottom-8 duration-[1500ms] fill-mode-both">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-3 text-base md:text-lg text-cream/80 max-w-xl animate-in fade-in slide-in-from-bottom-8 duration-[1500ms] delay-300 fill-mode-both">
              {subtitle}
            </p>
          )}
          
          <div className="absolute bottom-6 left-6 md:left-10 animate-bounce flex items-center gap-2 text-cream/80 text-sm font-medium">
            <ChevronDown className="h-4 w-4" />
            Scroll to explore
          </div>
        </div>
      </div>
    </section>
  );
}

