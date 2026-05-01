import { motion } from 'motion/react';
import { Phone, Layout, Settings } from 'lucide-react';
import { useLang } from '../LanguageContext';

const stepIcons = [Phone, Layout, Settings];

export default function HowItWorks() {
  const { tr } = useLang();
  const h = tr.howItWorks;

  return (
    <section id="how-it-works" className="py-12 md:py-20 bg-black px-6 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 md:mb-12">
          <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] text-brand-sage font-bold text-glow-green">{h.eyebrow}</span>
          <h2 className="text-2xl md:text-5xl font-medium tracking-tight text-white mt-3 md:mt-4 italic">{h.heading}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 relative">
          {h.steps.map((step, index) => {
            const Icon = stepIcons[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative group p-6 glass-card rounded-[1.25rem] md:rounded-2xl silver-border hover:border-brand-sage/20 transition-all duration-500"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 glass-card rounded-xl flex items-center justify-center mb-4 md:mb-5 text-brand-sage group-hover:bg-brand-sage group-hover:text-black transition-all duration-500 shadow-[0_0_20px_rgba(130,166,140,0.1)]">
                  <Icon size={18} />
                </div>
                <h3 className="text-base md:text-xl font-medium text-white mb-2 md:mb-3 tracking-tight">
                  <span className="text-zinc-700 mr-2 italic font-light font-mono">0{index + 1}</span> {step.title}
                </h3>
                <p className="text-zinc-400 text-[12px] md:text-[13px] leading-relaxed font-light">
                  {step.description}
                </p>
              </motion.div>
            );
          })}

          <div className="hidden lg:block absolute top-8 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent -z-10"></div>
        </div>
      </div>
    </section>
  );
}
