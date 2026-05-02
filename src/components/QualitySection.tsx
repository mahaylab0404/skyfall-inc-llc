import { motion } from 'motion/react';
import { useLang } from '../LanguageContext';

export default function QualitySection() {
  const { tr } = useLang();
  const q = tr.quality;

  return (
    <section className="py-12 md:py-20 bg-black px-6 overflow-hidden relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="order-2 lg:order-1"
        >
          <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] text-brand-sage font-bold text-glow-green">{q.eyebrow}</span>
          <h2 className="text-2xl md:text-5xl font-medium tracking-tight text-white mt-3 md:mt-4 mb-4 md:mb-6 leading-tight italic">{q.heading}</h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-zinc-400 text-[13px] md:text-[14px] font-light italic leading-relaxed max-w-lg">
              {q.quote}
            </p>

            <div className="pt-4 md:pt-6 border-t border-white/5">
              <div className="text-zinc-500 text-[9px] md:text-[10px] uppercase tracking-widest font-bold mb-2 md:mb-3 flex items-center gap-3">
                <div className="w-6 md:w-8 h-[1px] bg-brand-sage"></div> {q.featureLabel}
              </div>
              <p className="text-zinc-400 text-[12px] md:text-sm font-light leading-relaxed">
                {q.featureText}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="order-1 lg:order-2 relative"
        >
          <div className="rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden silver-border aspect-[4/3] group relative">
            <img
              src="/custom-grow-room-irrigation-system-missouri.png.png"
              alt="Custom grow room irrigation system and clean room plumbing layout by Skyfall Inc. LLC, Missouri"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

            <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6">
              <div className="glass-card silver-border px-4 py-3 md:px-6 md:py-4 rounded-xl md:rounded-2xl backdrop-blur-md">
                <p className="text-[9px] md:text-[10px] text-white uppercase tracking-widest font-bold mb-0.5 md:mb-1">{q.obsLabel}</p>
                <p className="text-[11px] md:text-[13px] text-zinc-300 font-light italic">{q.obsText}</p>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-6 -left-6 w-32 md:w-40 h-32 md:h-40 bg-brand-sage/5 blur-3xl rounded-full -z-10"></div>
        </motion.div>
      </div>
    </section>
  );
}
