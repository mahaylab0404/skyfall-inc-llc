import { useLang } from '../LanguageContext';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { tr } = useLang();
  const f = tr.footer;

  return (
    <footer className="py-12 md:py-16 bg-black px-6 border-t border-white/5 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 md:gap-12">
          <div className="flex items-center grayscale md:opacity-30 hover:opacity-100 transition-all duration-700 md:hover:grayscale-0">
            <img
              src="/skyfall-inc-logo-custom-grow-rooms.png.png"
              alt="Skyfall Inc. LLC — Custom Grow Room Builder & Indoor Cultivation Specialists, Missouri"
              className="w-28 md:w-32 h-auto"
            />
          </div>

          <div className="flex flex-col items-center md:items-end gap-3 md:gap-4 text-center md:text-right">
            <div className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] text-zinc-600 font-bold">
              © {currentYear} Skyfall Inc. LLC. <br className="sm:hidden" /> Professional Cultivation Tech.
            </div>

            <div className="flex gap-6 md:gap-8">
              <a href="#" className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-zinc-700 hover:text-emerald-400 transition-colors font-bold">{f.privacy}</a>
              <a href="#" className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-zinc-700 hover:text-emerald-400 transition-colors font-bold">{f.terms}</a>
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-16 pt-6 md:pt-8 border-t border-white/5 text-center">
          <p className="text-[8px] md:text-[9px] uppercase tracking-[0.3em] md:tracking-[0.5em] text-zinc-800 font-black px-4">
            {f.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
