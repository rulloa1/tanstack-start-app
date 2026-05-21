import { MapPin } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import welcomeSign from "@/assets/welcome-sign.jpg";

export function RulesSection({ id }: { id?: string }) {
  return (
    <div id={id} className="bg-black/40 backdrop-blur-md border-y border-white/10">
      <section className="mx-auto grid max-w-[1400px] gap-8 px-6 py-14 md:grid-cols-3 md:px-10">
        
        <ScrollReveal animation="slide-up" className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-8 shadow-lg">
          <div className="font-display tracking-[0.3em] text-sm mb-4 text-cream">PARK RULES</div>
          <ul className="space-y-1.5 text-sm text-cream opacity-90 font-medium">
            <li>• No trespassing — Tenants & invited guests only</li>
            <li>• All guests must register in office w/ ID</li>
            <li>• Ask about $200 move in — We have RV rentals</li>
            <li className="pt-2 border-t border-white/10 mt-2"></li>
            <li>• No loud music • No loud vehicles</li>
            <li>• No storage under or around RV's</li>
            <li>• No outside trash cans at RV's</li>
            <li>• No more than 2 adults / 2 vehicles / 2 dogs per RV</li>
            <li>• No refunds on early departures • No sub leases</li>
            <li>• No fireworks in park • No gun fire in park</li>
            <li>• No dogs unattended outside</li>
            <li>• Quiet time 8AM TO 8AM</li>
            <li>• Laundry room available 24 hrs</li>
            <li>• Speed limit 10</li>
          </ul>
        </ScrollReveal>
        
        <ScrollReveal animation="zoom-in" delay={150} className="text-center flex flex-col justify-center">
          <div className="font-display text-3xl tracking-wide text-cream drop-shadow-md">PINEWOOD TRAILS</div>
          <div className="border-y border-white/30 my-3 text-center text-sm tracking-[0.4em] text-cream py-1 mx-auto max-w-[180px]">RV PARK</div>
          <div className="font-script text-2xl text-cream drop-shadow-md">Where folks love to live!</div>
        </ScrollReveal>
        
        <ScrollReveal animation="slide-up" delay={300} className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-8 shadow-lg">
          <div className="flex items-center gap-2 font-display text-xl text-cream">
            <MapPin className="h-5 w-5" /> Magnolia, Texas
          </div>
          <p className="mt-2 text-sm text-cream opacity-90">
            Peaceful pine setting just minutes from shopping, dining & local attractions.
          </p>
          <img src={welcomeSign} alt="Welcome sign" className="mt-5 h-40 w-full rounded-lg object-cover shadow-lg border border-white/10" loading="lazy" />
        </ScrollReveal>

      </section>
    </div>
  );
}

