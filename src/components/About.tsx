import { motion } from 'motion/react';
import { Heart, Lightbulb, Sprout } from 'lucide-react';
import { useLang } from '../LanguageContext';

const valueIcons = [Heart, Lightbulb, Sprout];

export default function BrandMission() {
  const { tr } = useLang();
  const a = tr.about;

  return (
    <section id="about" className="py-12 md:py-20 bg-black relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-brand-sage/5 via-transparent to-black"></div>
        <div className="absolute bottom-0 right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-brand-blue/5 blur-[100px] md:blur-[120px] rounded-full"></div>
        <div className="absolute inset-0 haze-overlay opacity-40"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-7xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-400 to-zinc-900 mb-6 select-none"
          >
            {a.heading}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="w-12 md:w-16 h-[1px] bg-brand-sage/50 mx-auto mb-6 md:mb-8 shadow-[0_0_20px_rgba(130,166,140,0.8)]"></div>

            <p className="text-base md:text-xl text-zinc-100 font-light leading-snug italic tracking-tight mb-6 md:mb-8 px-2 md:px-0">
              {a.quote}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-8 md:mt-10 text-zinc-500 text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] font-bold">
              <span>{a.pillars[0]}</span>
              <div className="hidden sm:block w-1 h-1 bg-brand-sage rounded-full shadow-[0_0_10px_rgba(130,166,140,0.5)]"></div>
              <span>{a.pillars[1]}</span>
              <div className="hidden sm:block w-1 h-1 bg-brand-sage rounded-full shadow-[0_0_10px_rgba(130,166,140,0.5)]"></div>
              <span>{a.pillars[2]}</span>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-12 md:mt-16">
          {a.values.map((value, index) => {
            const Icon = valueIcons[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-5 md:p-6 glass-card silver-border rounded-[1.25rem] md:rounded-[1.5rem] hover:border-brand-sage/20 transition-all duration-700 text-center group relative overflow-hidden"
              >
                <div className="absolute -bottom-10 -right-10 w-24 md:w-32 h-24 md:h-32 bg-white/5 rounded-full blur-2xl group-hover:bg-brand-sage/5 transition-colors duration-700"></div>
                <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-[1rem] bg-white/5 border border-white/5 text-zinc-500 mb-4 md:mb-5 group-hover:text-brand-sage group-hover:border-brand-sage/20 group-hover:bg-brand-sage/5 transition-all duration-500">
                  <Icon size={20} />
                </div>
                <h3 className="text-base md:text-lg font-medium text-white mb-2 md:mb-3 uppercase tracking-[0.2em]">{value.title}</h3>
                <p className="text-[12px] md:text-[13px] text-zinc-500 leading-relaxed font-light">{value.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
