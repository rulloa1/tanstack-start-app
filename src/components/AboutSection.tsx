import { SectionTitle } from "@/components/SectionTitle";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Trees, Plug, User, ShowerHead, PawPrint, Leaf, Star } from "lucide-react";
import pineRoad from "@/assets/pine-road.jpg";
import teamEloise from "@/assets/team-eloise.jpg";
import teamVictor from "@/assets/team-victor.jpg";
import teamCuder from "@/assets/team-cuder.jpg";
import teamJan from "@/assets/team-jan.jpg";

const special = [
  { icon: Trees, title: "Beautiful Eastern White Pine\nForest Setting" },
  { icon: Plug, title: "Full Hookups\nat Every Site" },
  { icon: User, title: "Friendly,\nAttentive Staff" },
  { icon: ShowerHead, title: "Clean Facilities\nand Amenities" },
  { icon: PawPrint, title: "Pet-Friendly\nEnvironment" },
  { icon: Leaf, title: "Quiet, Peaceful\nAtmosphere" },
];

const team = [
  { name: "Eloise", role: "Co-Owner", img: teamEloise },
  { name: "Victor", role: "Co-Owner", img: teamVictor },
  { name: "Cuder", role: "Park Staff", img: teamCuder },
  { name: "Jan", role: "Park Staff", img: teamJan },
];

export function AboutSection({ id }: { id?: string }) {
  return (
    <div id={id}>
      <section className="mx-auto max-w-[1400px] grid gap-10 px-6 py-14 md:px-10 lg:grid-cols-3">
        <ScrollReveal animation="slide-up">
          <SectionTitle className="!justify-start">OUR STORY</SectionTitle>
          <div className="mt-2 font-script text-3xl text-primary">Where folks love to live!</div>
          <div className="mt-5 space-y-4 text-muted-foreground">
            <p>Pinewood Trails RV Park has been a beloved destination for travelers and long-term guests alike. Nestled among towering Eastern White Pine trees, we offer a peaceful escape with the comforts of home.</p>
            <p>Our family-owned park is built on the values of hospitality, community, and care. We're committed to providing a clean, safe, and welcoming environment where guests can relax, recharge, and feel right at home.</p>
            <p>Whether you're here for a weekend or a season, we're glad you're part of the Pinewood Trails family.</p>
          </div>
          <a href="#book" className="mt-6 inline-flex rounded-md bg-primary px-6 py-3 font-display text-primary-foreground hover:bg-primary-deep">Book Your Stay</a>
        </ScrollReveal>

        <ScrollReveal animation="zoom-in" delay={150} className="lg:col-span-1">
          <div className="relative h-full w-full rounded-xl shadow-md overflow-hidden group">
            <img src={pineRoad} alt="Pine road" className="h-full max-h-[420px] w-full object-cover" loading="lazy" />
            
            {/* Animated Sun Element */}
            <div className="absolute top-[10%] left-[45%] md:left-[35%] w-32 h-32 rounded-full bg-[#ffdf73] mix-blend-overlay animate-sun-shine pointer-events-none" />
            {/* Core bright spot */}
            <div className="absolute top-[12%] left-[48%] md:left-[38%] w-16 h-16 rounded-full bg-white mix-blend-overlay animate-sun-shine pointer-events-none" style={{ animationDelay: '1s' }} />
          </div>
        </ScrollReveal>

        <div>
          <ScrollReveal animation="slide-up" delay={200}>
            <SectionTitle className="!justify-start">WHAT MAKES US SPECIAL</SectionTitle>
          </ScrollReveal>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {special.map((s, i) => (
              <ScrollReveal key={s.title} animation="zoom-in" delay={300 + (i * 100)} className="rounded-lg border border-border bg-card p-4 text-center shadow-sm hover:shadow-md hover:scale-[1.02] transition-all cursor-default">
                <s.icon className="mx-auto h-7 w-7 text-primary" />
                <div className="mt-2 whitespace-pre-line text-sm font-medium text-foreground">{s.title}</div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-card border-y border-border">
        <div className="mx-auto max-w-[1400px] grid gap-10 px-6 py-14 md:px-10 lg:grid-cols-2">
          <div>
            <ScrollReveal animation="slide-up">
              <SectionTitle>OUR PEOPLE</SectionTitle>
              <h2 className="mt-4 text-center font-display text-4xl md:text-5xl font-bold text-foreground">Meet the Team</h2>
              <p className="mt-3 text-center text-muted-foreground">The folks who make Pinewood Trails feel like home.</p>
            </ScrollReveal>
            <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {team.map((t, i) => (
                <ScrollReveal key={t.name} animation="slide-up" delay={i * 150} className="text-center">
                  <div className="mx-auto h-32 w-32 sm:h-36 sm:w-36 overflow-hidden rounded-full ring-4 ring-primary">
                    <img src={t.img} alt={t.name} className="h-full w-full object-cover" loading="lazy" width={512} height={512} />
                  </div>
                  <div className="mt-4 font-display text-lg font-bold text-foreground">{t.name}</div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-primary">{t.role}</div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          <div>
            <ScrollReveal animation="slide-up" delay={200}>
              <SectionTitle>GUEST TESTIMONIALS</SectionTitle>
            </ScrollReveal>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { quote: "Beautiful park with tall pines, clean facilities, and friendly staff. We loved our stay and will definitely be back!", by: "The Johnson Family", from: "Houston, TX" },
                { quote: "Quiet, peaceful, and perfect for a long stay. Full hookups, great WiFi, and close to everything we needed.", by: "Richard & Martha P.", from: "Spring, TX" },
              ].map((q, i) => (
                <ScrollReveal key={q.by} animation="slide-left" delay={300 + (i * 150)} className="rounded-lg border border-border bg-background p-5 shadow-sm">
                  <p className="italic text-foreground">â€œ{q.quote}â€</p>
                  <div className="mt-3 flex gap-0.5 text-gold">
                    {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">â€” {q.by}, {q.from}</div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


