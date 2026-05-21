import { motion } from 'motion/react';
import { Zap, ShowerHead, Trees } from 'lucide-react';
import { ReactNode } from 'react';

export function GlowingCard({ 
  children, 
  gradient, 
  delay = 0, 
  className = "" 
}: { 
  children: ReactNode, 
  gradient: string, 
  delay?: number, 
  className?: string 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
      className={`relative flex flex-col w-full group h-full ${className}`}
    >
      {/* Soft Ambient Glow */}
      <div 
        className="absolute inset-0 w-full h-full opacity-30 rounded-[24px] pointer-events-none transition-opacity duration-700 group-hover:opacity-50"
        style={{ background: gradient, filter: "blur(50px)" }}
      />
      
      {/* Elegant Frosted Glass Card */}
      <div 
        className="relative w-full h-full rounded-[24px] z-10 overflow-hidden flex flex-col border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:bg-black/50"
      >
        {/* Subtle top border highlight matching the gradient */}
        <div className="absolute top-0 left-0 w-full h-[2px] opacity-80" style={{ background: gradient }} />
        
        {children}
      </div>
    </motion.div>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  gradient: string;
  delay: number;
}

function FeatureCard({ title, description, icon, gradient, delay }: FeatureCardProps) {
  return (
    <GlowingCard gradient={gradient} delay={delay} className="max-w-[260px] md:max-w-[300px] mx-auto min-h-[260px] md:min-h-[280px]">
      <div className="w-full h-full p-8 flex flex-col justify-between">
        <div className="text-cream/90 mb-6">
          {icon}
        </div>
        <div>
          <h3 className="text-cream font-display text-2xl mb-3 tracking-wide">{title}</h3>
          <p className="text-cream/70 text-[15px] leading-[1.6] font-normal">
            {description}
          </p>
        </div>
      </div>
    </GlowingCard>
  );
}

export function FeatureCards() {
  const cards = [
    {
      title: "Full Hookups",
      icon: <Zap size={36} strokeWidth={1.5} />,
      delay: 0.1,
      description: "Every site includes reliable 30/50 amp service, water, and sewer. Built for your comfort and convenience.",
      gradient: "linear-gradient(137deg, #d4af37 0%, #ffdf73 45%, #aa7c11 100%)" // Warm Gold
    },
    {
      title: "Clean Facilities",
      icon: <ShowerHead size={36} strokeWidth={1.5} />,
      delay: 0.2,
      description: "Enjoy our meticulously maintained bathhouses and 24/7 laundry room. A hot shower is always waiting.",
      gradient: "linear-gradient(137deg, #2d6a4f 0%, #52b788 45%, #1b4332 100%)" // Deep Forest Green
    },
    {
      title: "Peaceful Setting",
      icon: <Trees size={36} strokeWidth={1.5} />,
      delay: 0.3,
      description: "Nestled in the Eastern White Pines, our park offers a quiet, serene atmosphere to relax and recharge.",
      gradient: "linear-gradient(137deg, #cd7f32 0%, #ffb366 45%, #8b4513 100%)" // Rich Bronze
    }
  ];

  return (
    <section className="border-y border-white/5 flex flex-col items-center justify-center p-12 md:py-24 md:px-12 font-sans overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 lg:gap-8 w-full max-w-[1000px]">
        {cards.map((card, index) => (
          <FeatureCard key={index} {...card} />
        ))}
      </div>
    </section>
  );
}
