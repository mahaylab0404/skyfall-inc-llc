import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronRight } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Process', href: '#how-it-works' },
    { name: 'Automation', href: '#automation' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

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
          <a 
            href="#contact"
            className="ml-4 px-5 py-2.5 bg-white text-black text-[10px] uppercase tracking-widest font-bold hover:bg-brand-sage hover:text-white transition-all duration-500 shadow-lg"
          >
            Consultation
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
              Contact Skyfall.inc LLC
            </a>

            <div className="mt-6 pt-6 border-t border-white/5 flex flex-col gap-4">
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
