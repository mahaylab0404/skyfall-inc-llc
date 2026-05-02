import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send } from 'lucide-react';
import { useLang } from '../LanguageContext';

interface Message {
  role: 'user' | 'model';
  content: string;
}

interface LeadAction {
  action: 'send_lead';
  name: string;
  phone: string;
  email: string;
  summary: string;
}

const GREETINGS: Record<string, string> = {
  en: "Hi! I'm the Skyfall Assistant. Are you looking to build a new grow room, upgrade an existing setup, or just exploring your options?",
  es: "¡Hola! Soy el Asistente de Skyfall. ¿Estás buscando construir un nuevo cuarto de cultivo, mejorar uno existente, o solo explorando opciones?",
  fr: "Bonjour ! Je suis l'Assistant Skyfall. Vous cherchez à construire une nouvelle salle de culture, à améliorer une installation existante, ou à explorer vos options ?",
  ht: "Bonjou! Mwen se Asistan Skyfall. Èske ou ap chèche bati yon nouvo chanm pou kiltivasyon, amelyore youn ki egziste deja, oswa jis eksplore opsyon ou yo?",
  ru: "Привет! Я Ассистент Skyfall. Вы хотите построить новую комнату для выращивания, обновить существующую систему, или просто изучаете варианты?",
  pt: "Olá! Sou o Assistente Skyfall. Você está procurando construir um novo grow room, melhorar uma configuração existente, ou apenas explorando suas opções?",
};

const SEND_CONFIRM: Record<string, string> = {
  en: "Your info has been sent to the Skyfall team. They'll be in touch soon!",
  es: "Tu información fue enviada al equipo de Skyfall. ¡Pronto se pondrán en contacto!",
  fr: "Vos informations ont été envoyées à l'équipe Skyfall. Ils vous contacteront bientôt !",
  ht: "Enfòmasyon ou te voye bay ekip Skyfall la. Yo pral kontakte ou byento!",
  ru: "Ваши данные отправлены команде Skyfall. Они свяжутся с вами в ближайшее время!",
  pt: "Suas informações foram enviadas para a equipe Skyfall. Eles entrarão em contato em breve!",
};

export default function ChatWidget() {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [leadSent, setLeadSent] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && !initialized) {
      setMessages([{ role: 'model', content: GREETINGS[lang] ?? GREETINGS.en }]);
      setInitialized(true);
    }
  }, [open, initialized, lang]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: 'user', content: text.trim() };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next, lang }),
      });
      const data = await res.json() as { reply?: string; error?: string };
      if (!res.ok || data.error) {
        throw new Error(data.error ?? `Server error ${res.status}`);
      }
      const reply = data.reply ?? '';

      // Extract JSON action — handles raw JSON or markdown code-fenced JSON
      const jsonMatch = reply.match(/\{[\s\S]*"action"\s*:\s*"send_lead"[\s\S]*\}/);
      if (jsonMatch) {
        try {
          const lead = JSON.parse(jsonMatch[0]) as LeadAction;
          await sendLead(lead);
          setMessages((prev) => [
            ...prev,
            { role: 'model', content: SEND_CONFIRM[lang] ?? SEND_CONFIRM.en },
          ]);
          setLeadSent(true);
        } catch {
          setMessages((prev) => [...prev, { role: 'model', content: reply }]);
        }
      } else {
        setMessages((prev) => [...prev, { role: 'model', content: reply }]);
      }
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        { role: 'model', content: `Something went wrong (${err?.message ?? 'network error'}). Please try again or email us at skyfallinc@icloud.com.` },
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function sendLead(lead: LeadAction) {
    const formData = new FormData();
    formData.append('name', lead.name);
    formData.append('email', lead.email);
    formData.append('phone', lead.phone);
    formData.append('message', lead.summary);
    formData.append('_subject', 'New Chat Lead — Skyfall.inc LLC');
    formData.append('_captcha', 'false');
    formData.append('_template', 'table');
    await fetch('https://formsubmit.co/skyfallinc@icloud.com', { method: 'POST', body: formData });
  }

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-brand-sage shadow-[0_0_30px_rgba(130,166,140,0.4)] flex items-center justify-center text-black hover:scale-110 transition-transform duration-300"
        whileTap={{ scale: 0.93 }}
        aria-label="Open chat"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={22} />
            </motion.span>
          ) : (
            <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle size={22} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] max-w-[380px] h-[520px] max-h-[calc(100vh-7rem)] flex flex-col bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/5 bg-black/60 shrink-0">
              <div className="w-8 h-8 rounded-full bg-brand-sage/20 border border-brand-sage/30 flex items-center justify-center">
                <MessageCircle size={15} className="text-brand-sage" />
              </div>
              <div>
                <p className="text-white text-[13px] font-semibold leading-none">Skyfall Assistant</p>
                <p className="text-brand-sage text-[10px] mt-0.5">Online</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-thin">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-white text-black rounded-br-sm'
                        : 'bg-white/5 border border-white/10 text-zinc-200 rounded-bl-sm'
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5 items-center">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-brand-sage block"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="px-3 py-3 border-t border-white/5 bg-black/40 shrink-0">
              <form
                onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
                className="flex gap-2 items-center"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={loading || leadSent}
                  placeholder={leadSent ? '✓ Info sent to Skyfall team' : 'Type a message...'}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-[13px] text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-brand-sage/50 transition-colors disabled:opacity-40"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim() || leadSent}
                  className="w-9 h-9 rounded-xl bg-brand-sage flex items-center justify-center text-black hover:bg-brand-sage/80 transition-colors disabled:opacity-30 shrink-0"
                >
                  <Send size={15} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
