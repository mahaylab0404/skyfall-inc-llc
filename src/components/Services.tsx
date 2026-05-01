import { motion } from 'motion/react';
import { LayoutGrid, Wind, Droplets, Thermometer, Cpu, Lightbulb } from 'lucide-react';
import { useLang } from '../LanguageContext';

const icons = [LayoutGrid, Lightbulb, Droplets, Thermometer, Cpu, Wind];

export default function Services() {
  const { tr } = useLang();
  const s = tr.services;

  return (
    <section id="services" className="py-12 md:py-20 bg-black px-6 border-y border-white/5 relative overflow-hidden">
      <div className="absolute -bottom-40 -left-20 w-[600px] h-[600px] bg-brand-sage/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-8 mb-10 md:mb-16">
          <div className="max-w-2xl">
            <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] text-brand-sage font-bold text-glow-green">{s.eyebrow}</span>
            <h2 className="text-2xl md:text-5xl font-medium tracking-tight text-white mt-3 md:mt-4 leading-tight">{s.heading}</h2>
          </div>
          <p className="text-zinc-500 max-w-sm text-[13px] md:text-[14px] font-light italic leading-relaxed">
            {s.tagline}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {s.items.map((service, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="p-5 md:p-6 glass-card rounded-[1.25rem] md:rounded-[1.5rem] silver-border hover:border-brand-sage/40 transition-all duration-700 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-sage/5 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center mb-4 md:mb-5 group-hover:bg-brand-sage group-hover:shadow-[0_0_20px_rgba(130,166,140,0.3)] transition-all duration-700">
                  <Icon className="text-brand-sage group-hover:text-black transition-colors" size={20} />
                </div>
                <h3 className="text-base md:text-lg font-medium text-white mb-2 md:mb-3 tracking-tight group-hover:text-brand-sage transition-colors duration-700">{service.title}</h3>
                <p className="text-zinc-400 text-[12px] md:text-[13px] leading-relaxed font-light">{service.description}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 md:mt-12 text-center">
          <p className="text-zinc-500 text-[11px] md:text-[13px] font-light max-w-2xl mx-auto italic px-4">
            {s.quote}
          </p>
        </div>
      </div>
    </section>
  );
}
