import { Calendar, Users, Truck } from "lucide-react";
import { useState } from "react";

export function BookingWidget({ variant = "hero" }: { variant?: "hero" | "compact" }) {
  const [form, setForm] = useState({
    checkin: "2025-05-26",
    checkout: "2025-05-30",
    guests: "2 Adults",
    length: "Up to 40 ft",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.hash = "#book";
  };

  if (variant === "compact") {
    return (
      <form onSubmit={submit} className="grid gap-3 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 p-5 md:grid-cols-5 md:items-end shadow-xl">
        <Field icon={<Calendar />} label="Check-in" type="date" value={form.checkin}
          onChange={(v) => setForm({ ...form, checkin: v })} />
        <Field icon={<Calendar />} label="Check-out" type="date" value={form.checkout}
          onChange={(v) => setForm({ ...form, checkout: v })} />
        <Field icon={<Users />} label="Guests" value={form.guests}
          onChange={(v) => setForm({ ...form, guests: v })} />
        <Field icon={<Truck />} label="RV Length" value={form.length}
          onChange={(v) => setForm({ ...form, length: v })} />
        <button className="rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa7c11] px-5 py-3 font-display font-bold text-black shadow-lg hover:from-[#ffdf73] hover:to-[#d4af37] transition-all hover:scale-[1.02] active:scale-95 border border-[#ffdf73]/50" aria-label="Update Search">
          Update Search
        </button>
      </form>
    );
  }

  return (
    <div className="w-full max-w-md rounded-3xl bg-black/40 p-8 text-cream shadow-2xl border border-white/10 backdrop-blur-xl group relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#d4af37] to-[#aa7c11] opacity-80" />
      <div className="flex items-center justify-center gap-3">
        <span className="text-xl">🌲</span>
        <h3 className="font-display text-2xl font-bold tracking-[0.15em] text-cream drop-shadow">BOOK YOUR STAY</h3>
        <span className="text-xl">🌲</span>
      </div>
      <p className="text-center font-script text-xl text-[#d4af37] mt-1 mb-6 drop-shadow-sm">Find your perfect spot in the pines</p>
      
      <form onSubmit={submit} className="grid gap-5">
        <div className="grid grid-cols-2 gap-4">
          <Field icon={<Calendar />} label="Check-in" type="date" value={form.checkin}
            onChange={(v) => setForm({ ...form, checkin: v })} />
          <Field icon={<Calendar />} label="Check-out" type="date" value={form.checkout}
            onChange={(v) => setForm({ ...form, checkout: v })} />
        </div>
        <Field icon={<Users />} label="Guests" value={form.guests}
          onChange={(v) => setForm({ ...form, guests: v })} />
        <Field icon={<Truck />} label="RV Length" value={form.length}
          onChange={(v) => setForm({ ...form, length: v })} />
        
        <button className="mt-4 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa7c11] px-6 py-4 font-display text-lg font-bold text-black shadow-lg hover:from-[#ffdf73] hover:to-[#d4af37] transition-all hover:scale-[1.02] active:scale-95 border border-[#ffdf73]/50" aria-label="Search Availability">
          Search Availability
        </button>
      </form>
    </div>
  );
}

function Field({
  icon, label, value, onChange, type = "text",
}: {
  icon: React.ReactNode; label: string; value: string; onChange: (v: string) => void; type?: string;
}) {
  return (
    <label className="block">
      <span className="text-[11px] font-bold uppercase tracking-widest text-cream/70 mb-1.5 block ml-1">{label}</span>
      <div className="flex items-center gap-3 rounded-xl bg-black/30 px-4 py-3.5 border border-white/10 focus-within:border-white/30 focus-within:bg-black/50 transition-colors shadow-inner">
        <span className="text-[#d4af37] [&>svg]:h-5 [&>svg]:w-5">{icon}</span>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent text-cream placeholder:text-cream/40 focus:outline-none font-medium"
          aria-label={label}
        />
      </div>
    </label>
  );
}

