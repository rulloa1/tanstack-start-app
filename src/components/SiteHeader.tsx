import { useLocation } from "@tanstack/react-router";
import { Calendar, Menu, X, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "@/hooks/useTheme";

const nav = [
  { to: "#home", label: "Home" },
  { to: "#amenities", label: "Amenities" },
  { to: "#sites", label: "Sites & Rates" },
  { to: "#map", label: "Park Map" },
  { to: "#about", label: "About" },
  { to: "#rules", label: "Rules" },
  { to: "#contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [activeHash, setActiveHash] = useState("#home");

  useEffect(() => {
    const onHashChange = () => {
      setActiveHash(window.location.hash || "#home");
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return (
    <header className="relative z-30 bg-black/40 backdrop-blur-md border-b border-white/10">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-4 md:px-8 md:py-5">
        <a href="#home" className="flex items-center gap-3 group">
          <div className="flex items-end gap-1 text-[#d4af37] transition-transform group-hover:scale-105">
            <svg viewBox="0 0 24 32" className="h-10 w-7 md:h-12 md:w-9" fill="currentColor">
              <path d="M12 0 L4 12 L8 12 L2 22 L8 22 L0 32 L24 32 L16 22 L22 22 L16 12 L20 12 Z" />
            </svg>
            <svg viewBox="0 0 24 32" className="h-8 w-6 md:h-10 md:w-7 opacity-80" fill="currentColor">
              <path d="M12 0 L4 12 L8 12 L2 22 L8 22 L0 32 L24 32 L16 22 L22 22 L16 12 L20 12 Z" />
            </svg>
          </div>
          <div className="leading-none">
            <div className="font-display text-2xl md:text-3xl font-bold tracking-[0.1em] text-cream drop-shadow-md">
              PINEWOOD TRAILS
            </div>
            <div className="border-y border-white/20 my-1 text-center text-[10px] md:text-xs tracking-[0.4em] text-cream py-0.5">
              RV PARK
            </div>
            <div className="font-script text-base md:text-lg text-[#d4af37] text-center drop-shadow">
              Where folks love to live!
            </div>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {nav.map((n) => {
            const active = activeHash === n.to;
            return (
              <a
                key={n.to}
                href={n.to}
                onClick={() => setActiveHash(n.to)}
                className={`font-display text-lg transition-all ${
                  active
                    ? "text-cream font-bold underline underline-offset-8 decoration-[#d4af37] decoration-2"
                    : "text-cream/70 hover:text-cream hover:scale-105"
                }`}
              >
                {n.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="rounded-full p-2 text-cream/80 hover:text-cream hover:bg-white/10 transition-colors hidden"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <a
            href="#book"
            onClick={() => setActiveHash("#book")}
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#d4af37] to-[#aa7c11] px-6 py-2.5 font-display text-base font-bold text-black shadow-lg hover:from-[#ffdf73] hover:to-[#d4af37] transition-all hover:scale-105 active:scale-95 border border-[#ffdf73]/50"
          >
            <Calendar className="h-5 w-5" /> Book Now
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden rounded-md p-2 text-cream/80 hover:text-cream"
            aria-label="Menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-white/10 bg-black/90 backdrop-blur-xl px-4 pb-6 absolute w-full z-40 shadow-2xl">
          <div className="flex flex-col gap-2 pt-4">
            {nav.map((n) => (
              <a
                key={n.to}
                href={n.to}
                onClick={() => {
                  setOpen(false);
                  setActiveHash(n.to);
                }}
                className="rounded-lg px-4 py-3 font-display text-xl text-cream hover:bg-white/10"
              >
                {n.label}
              </a>
            ))}
            <a
              href="#book"
              onClick={() => {
                setOpen(false);
                setActiveHash("#book");
              }}
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#d4af37] to-[#aa7c11] px-6 py-4 font-display font-bold text-black text-lg"
            >
              <Calendar className="h-5 w-5" /> Book Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

