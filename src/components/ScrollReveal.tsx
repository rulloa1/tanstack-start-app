import { useEffect, useRef, useState, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  animation?: "fade-in" | "slide-up" | "slide-left" | "slide-right" | "zoom-in";
  delay?: number;
  duration?: number;
  threshold?: number;
}

export function ScrollReveal({
  children,
  className,
  animation = "slide-up",
  delay = 0,
  duration = 1000,
  threshold = 0.15,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once it becomes visible, stop observing to keep it visible
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -50px 0px", // Trigger slightly before it hits the bottom
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [threshold]);

  const getAnimationClasses = () => {
    if (!isVisible) return "opacity-0 translate-y-8"; // Default pre-animation state
    
    switch (animation) {
      case "fade-in":
        return "animate-in fade-in fill-mode-both";
      case "slide-up":
        return "animate-in fade-in slide-in-from-bottom-8 fill-mode-both";
      case "slide-left":
        return "animate-in fade-in slide-in-from-right-8 fill-mode-both";
      case "slide-right":
        return "animate-in fade-in slide-in-from-left-8 fill-mode-both";
      case "zoom-in":
        return "animate-in fade-in zoom-in-95 fill-mode-both";
      default:
        return "animate-in fade-in slide-in-from-bottom-8 fill-mode-both";
    }
  };

  return (
    <div
      ref={ref}
      className={cn(getAnimationClasses(), className)}
      style={{
        animationDuration: `${duration}ms`,
        animationDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

