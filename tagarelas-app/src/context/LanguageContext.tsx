import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Language, I18nText } from '../types/content';

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  /** Resolve an i18n object to the current language string */
  t: (obj: I18nText) => string;
  /** Resolve a feature-style object with flat pt/en keys */
  tf: (obj: { pt: string; en: string }) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getInitialLang(): Language {
  if (typeof window === 'undefined') return 'pt';
  const stored = localStorage.getItem('lang');
  if (stored === 'en' || stored === 'pt') return stored;
  // Check URL params
  const params = new URLSearchParams(window.location.search);
  const urlLang = params.get('lang');
  if (urlLang === 'en') return 'en';
  return 'pt';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(getInitialLang);

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('lang', newLang);
    document.documentElement.lang = newLang;
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === 'pt' ? 'en' : 'pt');
  }, [lang, setLang]);

  const t = useCallback(
    (obj: I18nText) => obj[lang] || obj.pt || '',
    [lang],
  );

  const tf = useCallback(
    (obj: { pt: string; en: string }) => obj[lang] || obj.pt || '',
    [lang],
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t, tf }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
