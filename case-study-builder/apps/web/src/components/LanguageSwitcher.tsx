'use client';

import { useI18n } from '../lib/i18n-context';
import { UI_LANGS, UiLang } from '../lib/i18n';

const FLAGS: Record<UiLang, string> = {
  vi: '🇻🇳',
  en: '🇬🇧',
  ja: '🇯🇵',
};

const LABELS: Record<UiLang, string> = {
  vi: 'Tiếng Việt',
  en: 'English',
  ja: '日本語',
};

export default function LanguageSwitcher() {
  const { lang, setLang } = useI18n();

  return (
    <div className="lang-switcher" role="group" aria-label="Ngôn ngữ hiển thị / Display language / 表示言語">
      {UI_LANGS.map((code) => (
        <button
          key={code}
          type="button"
          className={`lang-btn ${lang === code ? 'active' : ''}`}
          aria-pressed={lang === code}
          title={LABELS[code]}
          onClick={() => setLang(code)}
        >
          <span className="lang-flag" aria-hidden="true">
            {FLAGS[code]}
          </span>
          <span className="lang-code">{code.toUpperCase()}</span>
        </button>
      ))}
    </div>
  );
}