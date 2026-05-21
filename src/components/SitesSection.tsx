import { SectionTitle } from "@/components/SectionTitle";
import { GlowingCard } from "@/components/FeatureCards";

import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Plug, Droplet, Zap, Waves, Wifi, Trees, Star } from "lucide-react";
import sitePT from "@/assets/site-pull-through.jpg";
import siteBI from "@/assets/site-back-in.jpg";
import { ScrollReveal } from "./ScrollReveal";

const sites = Array.from({ length: 12 }).map((_, i) => {
  const num = [101, 203, 301, 312, 404, 410, 505, 518, 602, 608, 704, 711][i];
  const pullThrough = i % 2 === 0;
  return {
    num,
    type: pullThrough ? "Pull-Through" : "Back-In",
    amp: pullThrough ? "50A" : "30A",
    price: pullThrough ? 52 : 44,
    img: pullThrough ? sitePT : siteBI,
    featured: num === 301,
  };
});

export function SitesSection({ id }: { id?: string }) {
  return (
    <div id={id}>
      <section className="mx-auto max-w-[1400px] px-6 py-16 md:px-10">
        <ScrollReveal animation="slide-up">
          <SectionTitle>AVAILABLE SITES</SectionTitle>
          <p className="mt-3 text-center text-muted-foreground">29 sites available</p>
        </ScrollReveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sites.map((s, i) => (
            <ScrollReveal key={s.num} animation="zoom-in" delay={i * 100} className="overflow-hidden rounded-[24px] bg-black/40 backdrop-blur-md shadow-xl border border-white/10 transition-all duration-300 hover:-translate-y-2 hover:bg-black/60">
              <div className="relative group/carousel">
                <Carousel opts={{ loop: true }}>
                  <CarouselContent>
                    {[s.img, s.type === "Pull-Through" ? siteBI : sitePT, s.img].map((imgSrc, idx) => (
                      <CarouselItem key={idx}>
                        <img src={imgSrc} alt={`Site ${s.num} image ${idx + 1}`} className="h-48 w-full object-cover" loading="lazy" />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2 bg-background/80 hover:bg-background opacity-0 transition-opacity group-hover/carousel:opacity-100" />
                  <CarouselNext className="right-2 bg-background/80 hover:bg-background opacity-0 transition-opacity group-hover/carousel:opacity-100" />
                </Carousel>
                <span className="absolute left-3 top-3 rounded-md bg-primary px-2 py-1 text-sm font-bold text-primary-foreground z-10 pointer-events-none">Site {s.num}</span>
                {s.featured && (
                  <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-md bg-gold px-2 py-1 text-xs font-bold text-primary-deep z-10 pointer-events-none">
                    <Star className="h-3 w-3" /> Featured
                  </span>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-display text-lg text-foreground">Site {s.num}</div>
                    <div className="text-sm text-muted-foreground">{s.type} • {s.amp}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">${s.price}</div>
                    <div className="text-xs text-muted-foreground">/ night</div>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                  <Badge icon={<Plug className="h-3 w-3" />}>Full Hookup</Badge>
                  <Badge icon={<Droplet className="h-3 w-3" />}>Water</Badge>
                  <Badge icon={<Zap className="h-3 w-3" />}>{s.amp}</Badge>
                  <Badge icon={<Wifi className="h-3 w-3" />}>WiFi</Badge>
                </div>
                <a href="#book" className="mt-4 block rounded-md bg-primary py-2.5 text-center font-display text-primary-foreground hover:bg-primary-deep">Select Site</a>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Rates table */}
      <section className="bg-black/40 backdrop-blur-md border-y border-white/10">
        <div className="mx-auto max-w-[1400px] px-6 py-14 md:px-10">
          <ScrollReveal animation="slide-up">
            <SectionTitle>RATES</SectionTitle>
          </ScrollReveal>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { label: "Nightly", price: "$52", note: "Pull-Through 50A", icon: Trees, color: "linear-gradient(137deg, #d4af37 0%, #ffdf73 45%, #aa7c11 100%)" },
              { label: "Weekly", price: "$294", note: "7 nights — save 20%", icon: Waves, color: "linear-gradient(137deg, #2d6a4f 0%, #52b788 45%, #1b4332 100%)" },
              { label: "Monthly", price: "$650", note: "Plus metered electric", icon: Plug, color: "linear-gradient(137deg, #cd7f32 0%, #ffb366 45%, #8b4513 100%)" },
            ].map((r, i) => (
              <GlowingCard key={r.label} gradient={r.color} delay={i * 0.2}>
                <div className="flex h-full flex-col items-center justify-center p-8 text-center">
                  <r.icon className="h-12 w-12 text-cream/90" />
                  <div className="mt-4 font-display text-2xl tracking-wider text-cream">{r.label}</div>
                  <div className="mt-3 text-5xl font-bold text-cream">{r.price}</div>
                  <div className="mt-2 text-sm text-cream/70">{r.note}</div>
                </div>
              </GlowingCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function Badge({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded bg-muted px-2 py-0.5">
      {icon}{children}
    </span>
  );
}

