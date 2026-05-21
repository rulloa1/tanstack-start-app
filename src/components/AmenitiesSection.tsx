import { Link } from "@tanstack/react-router";
import { SectionTitle } from "./SectionTitle";
import { GlowingCard } from "./FeatureCards";
import { Plug, Zap, WashingMachine, Wifi, ShowerHead, Gamepad2 } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

const amenities = [
  { icon: Plug, label: "Full\nHookups", color: "linear-gradient(137deg, #d4af37 0%, #ffdf73 45%, #aa7c11 100%)" },
  { icon: Zap, label: "50A/30A\nService", color: "linear-gradient(137deg, #2d6a4f 0%, #52b788 45%, #1b4332 100%)" },
  { icon: WashingMachine, label: "Laundry\nRoom", color: "linear-gradient(137deg, #cd7f32 0%, #ffb366 45%, #8b4513 100%)" },
  { icon: Wifi, label: "WiFi\nAvailable", color: "linear-gradient(137deg, #2d6a4f 0%, #52b788 45%, #1b4332 100%)" },
  { icon: ShowerHead, label: "Clean\nShowers", color: "linear-gradient(137deg, #cd7f32 0%, #ffb366 45%, #8b4513 100%)" },
  { icon: Gamepad2, label: "Playground\nArea", color: "linear-gradient(137deg, #d4af37 0%, #ffdf73 45%, #aa7c11 100%)" },
];



export function AmenitiesSection() {
  return (
    <section className="mx-auto max-w-[1000px] px-6 py-20 md:px-10 flex flex-col items-center">
      <ScrollReveal animation="slide-up">
        <SectionTitle>PREMIUM AMENITIES</SectionTitle>
      </ScrollReveal>
      
      <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 w-full">
        {amenities.map((a, i) => (
          <GlowingCard key={a.label} gradient={a.color} delay={i * 0.1}>
            <div className="flex h-full flex-col items-center justify-center p-6 text-center">
              <a.icon className="mb-3 h-10 w-10 text-cream/90" />
              <span className="whitespace-pre-line text-sm font-display tracking-wide text-cream">{a.label}</span>
            </div>
          </GlowingCard>
        ))}
      </div>
      
      <ScrollReveal animation="slide-up" delay={200}>
        <div className="mt-12 inline-flex items-center gap-3 rounded-[24px] border border-white/10 bg-black/40 backdrop-blur-md px-8 py-4 shadow-lg hover:shadow-xl transition-all">
          <span className="text-xl">🌲</span>
          <span className="font-script text-3xl text-cream drop-shadow-md">Where folks love to live!</span>
          <span className="text-xl">🌲</span>
        </div>
      </ScrollReveal>
    </section>
  );
}

