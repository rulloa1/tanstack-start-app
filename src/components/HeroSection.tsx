import { BookingWidget } from "@/components/BookingWidget";
import { ChevronDown } from "lucide-react";
import heroVideo from "@/assets/hero-stars.mp4";

export function HeroSection() {
  return (
    <section className="relative h-[95vh] min-h-[600px] w-full overflow-hidden animate-in fade-in duration-[2000ms]">
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      
      <div className="relative mx-auto grid h-full max-w-[1400px] grid-cols-1 items-center gap-8 px-6 md:grid-cols-2 md:px-10 pb-16">
        <div className="order-2 md:order-1 animate-in slide-in-from-left-8 duration-[1500ms] delay-300 fill-mode-both">
          <BookingWidget />
        </div>
        <div className="order-1 md:order-2 text-cream animate-in slide-in-from-right-8 duration-[1500ms] delay-300 fill-mode-both">
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.05] drop-shadow-xl text-white">
            Relax. Explore.<br />
            <span className="font-script text-6xl md:text-8xl font-medium text-[#d4af37] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">Stay Awhile.</span>
          </h1>
          <p className="mt-6 max-w-md text-xl text-cream/90 drop-shadow-md leading-relaxed font-medium">
            Experience the tranquility of the Eastern White Pines in Magnolia, Texas.
          </p>
        </div>
        
        <div className="absolute bottom-6 left-6 md:left-10 animate-bounce flex items-center gap-2 text-cream/80 text-sm font-medium drop-shadow-md">
          <ChevronDown className="h-4 w-4" />
          Scroll to explore
        </div>
      </div>
    </section>
  );
}

