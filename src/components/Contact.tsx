import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, ChevronDown } from 'lucide-react';
import { useLang } from '../LanguageContext';

export default function Contact() {
  const { tr } = useLang();
  const c = tr.contact;
  const f = c.form;

  return (
    <section id="contact" className="py-12 md:py-20 bg-[#050505] px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full haze-overlay opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] text-brand-sage font-bold text-glow-green">{c.eyebrow}</span>
            <h2 className="text-2xl md:text-5xl font-medium tracking-tight text-white mt-3 md:mt-4 mb-4 md:mb-6 leading-tight capitalize italic">{c.heading}</h2>
            <p className="text-[14px] md:text-base text-zinc-400 mb-8 md:mb-10 max-w-lg leading-relaxed font-light italic">
              {c.sub}
            </p>

            <div className="space-y-4 md:space-y-6">
              <div className="flex gap-4 items-center group">
                <div className="w-10 h-10 md:w-12 md:h-12 glass-card silver-border rounded-xl flex items-center justify-center text-brand-sage group-hover:bg-brand-sage group-hover:text-black transition-all duration-700 hover:shadow-[0_0_30px_rgba(130,166,140,0.2)]">
                  <MapPin size={18} />
                </div>
                <div className="text-sm">
                  <p className="text-zinc-500 uppercase tracking-widest text-[8px] md:text-[9px] mb-0.5 font-bold">{c.hqLabel}</p>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=2662%20First%20Street%2C%20Doe%20Run%2C%20MO%2063637"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-100 hover:text-brand-sage transition-colors text-[13px] md:text-[14px] font-light italic"
                  >
                    2662 First Street, Doe Run, MO 63637
                  </a>
                </div>
              </div>
              <div className="flex gap-4 items-center group">
                <div className="w-10 h-10 md:w-12 md:h-12 glass-card silver-border rounded-xl flex items-center justify-center text-brand-sage group-hover:bg-brand-sage group-hover:text-black transition-all duration-700 hover:shadow-[0_0_30px_rgba(130,166,140,0.2)]">
                  <Mail size={18} />
                </div>
                <div className="text-sm">
                  <p className="text-zinc-500 uppercase tracking-widest text-[8px] md:text-[9px] mb-0.5 font-bold">{c.emailLabel}</p>
                  <a href="mailto:skyfallinc@icloud.com" className="text-zinc-100 hover:text-brand-sage transition-colors text-[13px] md:text-[14px] font-light italic">skyfallinc@icloud.com</a>
                </div>
              </div>
              <div className="flex gap-4 items-center group">
                <div className="w-10 h-10 md:w-12 md:h-12 glass-card silver-border rounded-xl flex items-center justify-center text-brand-sage group-hover:bg-brand-sage group-hover:text-black transition-all duration-700 hover:shadow-[0_0_30px_rgba(130,166,140,0.2)]">
                  <Phone size={18} />
                </div>
                <div className="text-sm">
                  <p className="text-zinc-500 uppercase tracking-widest text-[8px] md:text-[9px] mb-0.5 font-bold">{c.phoneLabel}</p>
                  <a href="tel:5733058900" className="text-zinc-100 hover:text-brand-sage transition-colors text-[13px] md:text-[14px] font-light italic">(573) 305-8900</a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="glass-card silver-border p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-sage/5 blur-[80px] -z-10 group-hover:bg-brand-sage/10 transition-colors duration-1000"></div>

            <form
              action="https://formsubmit.co/skyfallinc@icloud.com"
              method="POST"
              className="space-y-4 md:space-y-6"
            >
              <input type="hidden" name="_subject" value="New Skyfall.inc LLC Website Inquiry" />
              <input type="hidden" name="_captcha" value="true" />
              <input type="hidden" name="_template" value="table" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-1.5 md:space-y-2">
                  <label className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-zinc-500 ml-1 font-bold">{f.nameLabel}</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg md:rounded-xl px-4 py-3 md:py-3.5 text-zinc-100 focus:outline-none focus:border-brand-sage transition-all font-light text-[13px] md:text-sm"
                    placeholder={f.namePlaceholder}
                  />
                </div>
                <div className="space-y-1.5 md:space-y-2">
                  <label className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-zinc-500 ml-1 font-bold">{f.phoneLabel}</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg md:rounded-xl px-4 py-3 md:py-3.5 text-zinc-100 focus:outline-none focus:border-brand-sage transition-all font-light text-[13px] md:text-sm"
                    placeholder={f.phonePlaceholder}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-1.5 md:space-y-2">
                  <label className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-zinc-500 ml-1 font-bold">{f.emailLabel}</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg md:rounded-xl px-4 py-3 md:py-3.5 text-zinc-100 focus:outline-none focus:border-brand-sage transition-all font-light text-[13px] md:text-sm"
                    placeholder={f.emailPlaceholder}
                  />
                </div>
                <div className="space-y-1.5 md:space-y-2">
                  <label className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-zinc-500 ml-1 font-bold">{f.projectLabel}</label>
                  <div className="relative">
                    <select
                      name="project_type"
                      className="w-full bg-white/5 border border-white/10 rounded-lg md:rounded-xl px-4 py-3 md:py-3.5 text-zinc-100 focus:outline-none focus:border-brand-sage transition-all appearance-none cursor-pointer font-light text-[13px] md:text-sm"
                    >
                      {f.projectOptions.map((opt, i) => (
                        <option key={i} className="bg-zinc-900 text-white">{opt}</option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                      <ChevronDown size={14} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 md:space-y-2">
                <label className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-zinc-500 ml-1 font-bold">{f.messageLabel}</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-lg md:rounded-xl px-4 py-3 md:py-3.5 text-zinc-100 focus:outline-none focus:border-brand-sage transition-all resize-none font-light text-[13px] md:text-sm"
                  placeholder={f.messagePlaceholder}
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-white text-black font-bold uppercase tracking-widest text-[10px] md:text-[11px] py-4 md:py-5 rounded-lg md:rounded-xl flex items-center justify-center gap-3 hover:bg-brand-sage hover:text-white transition-all duration-700 shadow-xl active:scale-[0.98] mt-2 md:mt-4"
              >
                {f.submit} <Send size={15} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
