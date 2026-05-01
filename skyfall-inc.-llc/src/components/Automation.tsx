import { motion } from 'motion/react';
import { Cpu, Zap, Bell, Waves } from 'lucide-react';

export default function Automation() {
  return (
    <section id="automation" className="py-12 md:py-20 bg-[#050505] px-6 overflow-hidden relative border-b border-white/5">
      {/* Decorative background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-brand-blue/3 blur-[100px] md:blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] text-sky-400 font-bold mb-3 md:mb-4 block text-glow-blue">Technology</span>
          <h2 className="text-2xl md:text-5xl font-medium tracking-tight text-white mb-4 md:mb-6 leading-tight italic">Advanced Grow Room Automation.</h2>
          
          <p className="text-[14px] md:text-[15px] text-zinc-400 mb-8 leading-relaxed font-light max-w-xl italic">
            "The automation system can help manage lights, fans, humidity, temperature, watering, sensors, and safety shutoffs. The goal is to help customers create clean, reliable, and easier-to-manage grow spaces."
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex gap-3 group">
              <div className="shrink-0 p-2.5 glass-card silver-border rounded-lg text-sky-400 group-hover:bg-sky-500 group-hover:text-black transition-all duration-700 h-fit"><Zap size={18} /></div>
              <div>
                <h4 className="text-white font-medium mb-0.5 tracking-wide uppercase text-[10px]">Total Control</h4>
                <p className="text-[11px] text-zinc-500 leading-relaxed font-light">Manage lights, fans, humidity, and temperature.</p>
              </div>
            </div>
            <div className="flex gap-3 group">
              <div className="shrink-0 p-2.5 glass-card silver-border rounded-lg text-brand-sage group-hover:bg-brand-sage group-hover:text-black transition-all duration-700 h-fit"><Waves size={18} /></div>
              <div>
                <h4 className="text-white font-medium mb-0.5 tracking-wide uppercase text-[10px]">Smart Watering</h4>
                <p className="text-[11px] text-zinc-500 leading-relaxed font-light">Integrated relays for irrigation and nutrient cycles.</p>
              </div>
            </div>
            <div className="flex gap-3 group">
              <div className="shrink-0 p-2.5 glass-card silver-border rounded-lg text-zinc-400 group-hover:bg-white group-hover:text-black transition-all duration-700 h-fit"><Cpu size={18} /></div>
              <div>
                <h4 className="text-white font-medium mb-0.5 tracking-wide uppercase text-[10px]">Sensor Logic</h4>
                <p className="text-[11px] text-zinc-500 leading-relaxed font-light">Programming custom smart grow room controllers.</p>
              </div>
            </div>
            <div className="flex gap-3 group">
              <div className="shrink-0 p-2.5 glass-card silver-border rounded-lg text-red-400/70 group-hover:bg-red-500 group-hover:text-black transition-all duration-700 h-fit"><Bell size={18} /></div>
              <div>
                <h4 className="text-white font-medium mb-0.5 tracking-wide uppercase text-[10px]">Safety Shutoffs</h4>
                <p className="text-[11px] text-zinc-500 leading-relaxed font-light">Automated systems to prevent equipment failure.</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="relative group"
        >
          <div className="aspect-[4/5] md:aspect-square glass-card silver-border rounded-[1.25rem] md:rounded-[1.5rem] overflow-hidden relative">
            <img 
              src="/skyfall-inc-custom-grow-room-st-louis-mo.png.png" 
              alt="Skyfall Automation Controller"
              className="w-full h-full object-cover grayscale brightness-[0.5] transition-all duration-1000 group-hover:grayscale-0 group-hover:brightness-100"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            
            <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6 p-3 md:p-4 glass-card silver-border backdrop-blur-md rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-sky-500 rounded-full animate-pulse"></div>
                <span className="text-[9px] md:text-[11px] text-white uppercase tracking-[0.2em] font-medium">Smart Controller Unit</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
