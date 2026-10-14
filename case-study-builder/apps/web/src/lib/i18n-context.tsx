'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { DICTS, Dict, UiLang, UI_LANGS } from './i18n';

interface I18nContextValue {
  lang: UiLang;
  setLang: (lang: UiLang) => void;
  t: Dict;
}

const I18nContext = createContext<I18nContextValue>({
  lang: 'vi',
  setLang: () => {},
  t: DICTS.vi,
});

const STORAGE_KEY = 'csb-ui-lang';

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<UiLang>('vi');

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY) as UiLang | null;
      if (saved && UI_LANGS.includes(saved)) setLangState(saved);
    } catch {
      /* localStorage unavailable — keep default */
    }
  }, []);

  const setLang = (next: UiLang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t: DICTS[lang] }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextValue {
  return useContext(I18nContext);
}