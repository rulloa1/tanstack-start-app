import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { HeroSection } from "@/components/HeroSection";
import { AmenitiesSection } from "@/components/AmenitiesSection";
import { RulesSection } from "@/components/RulesSection";
import { AboutSection } from "@/components/AboutSection";
import { SitesSection } from "@/components/SitesSection";
import { ContactSection } from "@/components/ContactSection";
import { BookSection } from "@/components/BookSection";
import PinewoodTrailsMap from "@/components/PinewoodTrailsMap";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Calendar, Clock, Phone } from "lucide-react";
import sunsetImg from "@/assets/park-sunset.png";
import heroVideo from "@/assets/hero-stars.mp4";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pinewood Trails RV Park â€” Magnolia, TX" },
      { name: "description", content: "Spacious RV sites, modern amenities, and the peace of the Eastern White Pines in Magnolia, Texas. Book your stay at Pinewood Trails RV Park." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.4; // Make the stars move much slower and more peacefully
    }
  }, []);

  return (
    <div className="min-h-screen relative">
      {/* Global Starry Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 h-full w-full object-cover z-[-2]"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>
      <div className="fixed inset-0 bg-[#0A0A0B]/80 z-[-1]" />
      
      <SiteHeader />

      <div id="home">
        <HeroSection />
      </div>
      
      <div id="amenities">
        <AmenitiesSection />
      </div>

      <div id="sites">
        <SitesSection />
      </div>

      <div id="map">
        <ScrollReveal animation="slide-up">
          <PinewoodTrailsMap />
        </ScrollReveal>
      </div>

      <div id="about">
        <AboutSection />
      </div>

      {/* Sunset cinematic band */}
      <section className="relative h-72 md:h-96 overflow-hidden">
        <img src={sunsetImg} alt="Sunset over Pinewood Trails RV Park" className="absolute inset-0 h-full w-full object-cover object-center animate-[slow-zoom_12s_ease-in-out_infinite_alternate]" />
        <div className="absolute inset-0 bg-black/40" />
        <ScrollReveal animation="slide-up" delay={200} className="relative flex h-full flex-col items-center justify-center text-center px-6">
          <p className="font-script text-4xl md:text-6xl text-cream drop-shadow-lg">The peace of the Eastern White Pines.</p>
          <p className="mt-3 text-cream/90 text-base md:text-lg drop-shadow">Magnolia, Texas</p>
        </ScrollReveal>
      </section>

      {/* Info strip */}
      <section className="border-y border-border bg-background/40 backdrop-blur-md relative z-10">
        <div className="mx-auto grid max-w-[1400px] items-center gap-6 px-6 py-6 md:grid-cols-2 md:px-10">
          <InfoItem icon={<Phone />} title="Call Us Today!" text="832-521-3345 | 832-671-5999" />
          <InfoItem icon={<Clock />} title="Office Hours" text="8AM – 5PM, 7 Days a Week" />
        </div>
      </section>

      <div id="rules">
        <RulesSection />
      </div>

      <div id="contact">
        <ContactSection />
      </div>

      <div id="book">
        <BookSection />
      </div>

      <SiteFooter />
    </div>
  );
}

function InfoItem({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="flex items-center gap-3 hover:-translate-y-0.5 transition-transform">
      <span className="rounded-full bg-primary p-3 text-primary-foreground [&>svg]:h-5 [&>svg]:w-5 shadow-sm">{icon}</span>
      <div>
        <div className="font-display text-foreground">{title}</div>
        <div className="text-sm text-muted-foreground">{text}</div>
      </div>
    </div>
  );
}

