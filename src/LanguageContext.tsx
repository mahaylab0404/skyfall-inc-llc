import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { type Language, t } from './translations';

type LanguageContextType = {
  lang: Language;
  setLang: (l: Language) => void;
  tr: typeof t['en'];
};

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
  tr: t['en'],
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('en');
  return (
    <LanguageContext.Provider value={{ lang, setLang, tr: t[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
