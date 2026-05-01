import { motion } from 'motion/react';
import { useLang } from '../LanguageContext';

const images = [
  '/indoor-cultivation-room-grow-setup-missouri.png.png',
  '/custom-grow-room-irrigation-system-missouri.png.png',
  '/skyfall-inc-custom-grow-room-st-louis-mo.png.png',
];

export default function Gallery() {
  const { tr } = useLang();
  const g = tr.gallery;

  return (
    <section id="gallery" className="py-12 md:py-20 bg-[#050505] px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full haze-overlay opacity-30 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-10 md:mb-12 text-center max-w-2xl mx-auto">
          <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] text-brand-sage font-bold text-glow-green">{g.eyebrow}</span>
          <h2 className="text-2xl md:text-4xl font-medium tracking-tight text-white mt-3 md:mt-4 italic">{g.heading}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {g.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="relative group overflow-hidden rounded-[1.5rem] md:rounded-3xl silver-border aspect-[4/5] md:aspect-square"
            >
              <img
                src={images[index]}
                alt={item.title}
                className="w-full h-full object-cover grayscale brightness-75 transition-all duration-[2000ms] group-hover:grayscale-0 group-hover:brightness-100 md:group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-transparent opacity-100 transition-opacity duration-700"></div>

              <div className="absolute bottom-5 left-5 right-5 md:bottom-6 md:left-6 md:right-6 md:opacity-0 md:group-hover:opacity-100 transition-all duration-700 transform md:translate-y-4 md:group-hover:translate-y-0">
                <p className="text-white text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-bold mb-1.5 md:mb-2">
                  {item.title}
                </p>
                <p className="text-[11px] md:text-[12px] text-zinc-400 font-light italic leading-relaxed line-clamp-2 md:line-clamp-none">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
