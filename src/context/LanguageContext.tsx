import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LangCode, LANGUAGES, TRANSLATIONS, Translations } from '@/lib/i18n';

interface LanguageContextType {
  lang: LangCode;
  setLang: (code: LangCode) => void;
  t: Translations;
  dir: 'ltr' | 'rtl';
  languages: typeof LANGUAGES;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
  t: TRANSLATIONS.en,
  dir: 'ltr',
  languages: LANGUAGES,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<LangCode>(() => {
    return (localStorage.getItem('kreo_lang') as LangCode) || 'en';
  });

  const setLang = (code: LangCode) => {
    setLangState(code);
    localStorage.setItem('kreo_lang', code);
  };

  const langMeta = LANGUAGES.find(l => l.code === lang);
  const dir = langMeta?.dir === 'rtl' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
  }, [lang, dir]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: TRANSLATIONS[lang], dir, languages: LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => useContext(LanguageContext);
