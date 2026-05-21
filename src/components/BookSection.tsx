import { Check, ArrowRight } from "lucide-react";
import sitePT from "@/assets/site-pull-through.jpg";
import { ScrollReveal } from "./ScrollReveal";

export function BookSection({ id }: { id?: string }) {
  return (
    <div id={id} className="bg-black/40 backdrop-blur-md border-t border-white/10">
      <section className="mx-auto grid max-w-[1000px] gap-10 px-6 py-20 md:px-10 lg:grid-cols-2 items-center">
        
        <ScrollReveal animation="slide-right">
          <h2 className="font-display text-4xl md:text-5xl text-cream drop-shadow-md mb-6">Ready to secure your spot?</h2>
          <p className="text-cream/80 text-lg mb-8 leading-relaxed">
            Guest information and special requests are handled securely during the reservation process. We offer free cancellation up to 48 hours before check-in.
          </p>
          <a href="#book" className="inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-primary px-8 py-4 font-display text-lg text-primary-foreground shadow-lg hover:bg-primary-deep transition-all hover:scale-105 active:scale-95">
            Proceed to Reservation <ArrowRight className="h-5 w-5" />
          </a>
          <div className="mt-4 flex items-center gap-2 text-sm text-cream/60">
            <Check className="h-4 w-4 text-primary" /> Free Cancellation up to 48 hours before check-in
          </div>
        </ScrollReveal>

        <ScrollReveal animation="slide-left" delay={200}>
          <aside className="rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl p-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#d4af37] to-[#aa7c11] opacity-80" />
            
            <h3 className="font-display text-2xl text-cream">Example Booking</h3>
            <img src={sitePT} alt="Site 35" className="mt-5 h-48 w-full rounded-xl object-cover shadow-inner group-hover:scale-[1.02] transition-transform duration-500" loading="lazy" />
            <dl className="mt-6 divide-y divide-white/10 text-sm">
              <Row label="Site Type" value="Pull-Through • 50A" />
              <Row label="Base Rate" value="$52.00 / night" />
              <Row label="Taxes" value="Included" />
            </dl>
          </aside>
        </ScrollReveal>
        
      </section>
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={`flex justify-between py-3 ${bold ? "text-lg font-bold text-cream" : "text-cream/90"}`}>
      <span className="text-cream/60">{label}</span>
      <span>{value}</span>
    </div>
  );
}

