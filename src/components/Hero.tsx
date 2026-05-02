import { motion } from 'motion/react';
import { useLang } from '../LanguageContext';

export default function Hero() {
  const { tr } = useLang();
  const h = tr.hero;

  return (
    <section id="home" className="relative min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-72px)] pt-20 pb-12 md:pt-24 md:pb-16 flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -left-20 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-brand-sage/5 rounded-full blur-[100px] md:blur-[140px]"></div>
        <div className="absolute bottom-1/4 -right-20 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-brand-blue/5 rounded-full blur-[100px] md:blur-[140px]"></div>
        <div className="absolute inset-0 haze-overlay opacity-30"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-center lg:text-left"
        >
          <span className="inline-block px-4 py-1.5 border border-white/5 glass-card rounded-full text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] text-brand-sage mb-6 font-bold text-glow-green">
            {h.badge}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-[4rem] font-medium tracking-tight text-white mb-6 leading-[1.15] md:leading-[1.1] drop-shadow-2xl">
            {h.heading}
          </h1>
          <p className="text-[15px] md:text-base text-zinc-400 max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed font-light italic">
            {h.sub}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <a
              href="#contact"
              className="w-full sm:w-auto px-8 py-3.5 bg-white text-black font-bold uppercase tracking-widest text-[11px] hover:bg-brand-sage hover:text-white transition-all duration-700 shadow-xl text-center active:scale-95"
            >
              {h.cta1}
            </a>
            <a
              href="#gallery"
              className="w-full sm:w-auto px-8 py-3.5 border border-white/5 glass-card text-white font-bold uppercase tracking-widest text-[11px] hover:bg-white/5 transition-all duration-700 text-center active:scale-95"
            >
              {h.cta2}
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mt-6">
            {h.chips.map((chip) => (
              <span key={chip} className="flex items-center gap-1.5 px-3 py-1 border border-brand-sage/20 rounded-full text-[10px] uppercase tracking-widest text-brand-sage font-bold bg-brand-sage/5">
                ✓ {chip}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden lg:block"
        >
          <div className="relative z-10 rounded-[2rem] overflow-hidden silver-border aspect-[4/3] shadow-[0_0_50px_rgba(0,0,0,0.5)] group">
            <img
              src="/skyfall-inc-custom-grow-room-st-louis-mo.png.png"
              alt="Custom indoor grow room built by Skyfall Inc. LLC in St. Louis, Missouri"
              className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </div>
          <div className="absolute -top-6 -right-6 w-full h-full border border-brand-sage/20 rounded-[2rem] -z-10 bg-brand-sage/5"></div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-10 text-zinc-500 hidden md:flex items-center gap-3"
      >
        <div className="text-[10px] uppercase tracking-widest flex items-center gap-3">
          {h.scroll} <div className="w-12 h-[1px] bg-zinc-800"></div>
        </div>
      </motion.div>
    </section>
  );
}
