import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useLang } from '../LanguageContext';
import { LANGUAGES } from '../translations';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const { lang, setLang, tr } = useLang();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const navLinks = [
    { name: tr.nav.home, href: '#home' },
    { name: tr.nav.services, href: '#services' },
    { name: tr.nav.process, href: '#how-it-works' },
    { name: tr.nav.automation, href: '#automation' },
    { name: tr.nav.gallery, href: '#gallery' },
    { name: tr.nav.about, href: '#about' },
    { name: tr.nav.contact, href: '#contact' },
  ];

  const currentLang = LANGUAGES.find(l => l.code === lang)!;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-black/90 backdrop-blur-xl border-b border-white/5 h-[64px] md:h-[72px]' : 'bg-transparent h-[72px] md:h-[80px]'
      } flex items-center`}
    >
      <div className="w-full max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="flex items-center group shrink-0">
          <img
            src="/skyfall-inc-logo-custom-grow-rooms.png.png"
            alt="Skyfall Inc. LLC Logo"
            className="max-h-[40px] md:max-h-[48px] w-auto object-contain hover:opacity-90 transition-all duration-500 group-hover:scale-105"
          />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[11px] uppercase tracking-[0.2em] text-zinc-400 hover:text-brand-sage transition-colors font-bold"
            >
              {link.name}
            </a>
          ))}

          {/* Language Switcher */}
          <div ref={langRef} className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold text-zinc-400 hover:text-brand-sage transition-colors"
            >
              <span>{currentLang.flag}</span>
              <span>{currentLang.code.toUpperCase()}</span>
              <ChevronDown size={11} className={`transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden min-w-[140px] shadow-2xl"
                >
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setLangOpen(false); }}
                      className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-[11px] font-medium transition-colors text-left hover:bg-brand-sage/10 hover:text-brand-sage ${lang === l.code ? 'text-brand-sage bg-brand-sage/5' : 'text-zinc-300'}`}
                    >
                      <span>{l.flag}</span>
                      <span>{l.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a
            href="#contact"
            className="ml-2 px-5 py-2.5 bg-white text-black text-[10px] uppercase tracking-widest font-bold hover:bg-brand-sage hover:text-white transition-all duration-500 shadow-lg"
          >
            {tr.nav.consultation}
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-zinc-100 p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-2xl border-b border-white/5 p-8 flex flex-col gap-6 md:hidden max-h-[90vh] overflow-y-auto"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-lg text-zinc-100 hover:text-brand-sage transition-colors font-medium tracking-wide"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              className="mt-4 px-6 py-4 bg-white text-black text-center font-bold uppercase tracking-widest text-sm shadow-xl active:scale-95 transition-transform"
              onClick={() => setIsOpen(false)}
            >
              {tr.nav.contactMobile}
            </a>

            {/* Mobile Language Switcher */}
            <div className="mt-2 pt-4 border-t border-white/5">
              <p className="text-zinc-600 text-[9px] uppercase tracking-widest font-bold mb-3">Language</p>
              <div className="grid grid-cols-3 gap-2">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setIsOpen(false); }}
                    className={`flex flex-col items-center gap-1 py-2 px-1 rounded-lg text-[10px] font-medium transition-colors border ${lang === l.code ? 'border-brand-sage/40 text-brand-sage bg-brand-sage/5' : 'border-white/5 text-zinc-400 hover:text-brand-sage hover:border-brand-sage/20'}`}
                  >
                    <span className="text-base">{l.flag}</span>
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-white/5 flex flex-col gap-4">
              <a href="tel:5733058900" className="text-zinc-500 text-sm italic hover:text-brand-sage transition-colors">
                (573) 305-8900
              </a>
              <a href="mailto:skyfallinc@icloud.com" className="text-zinc-500 text-sm italic hover:text-brand-sage transition-colors">
                skyfallinc@icloud.com
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
