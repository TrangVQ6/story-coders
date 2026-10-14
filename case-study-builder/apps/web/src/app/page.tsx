'use client';

import { useState } from 'react';
import QuestionForm from '../components/QuestionForm';
import ResultTabs from '../components/ResultTabs';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { generateStory } from '../lib/api';
import { SAMPLES } from '../lib/samples';
import { I18nProvider, useI18n } from '../lib/i18n-context';
import {
  Answers,
  EMPTY_ANSWERS,
  EMPTY_CONSENT,
  Consent,
  GenerateResponse,
  LangCode,
  AchievementType,
} from '../lib/types';
import { IconTerminal, IconArrowRight, IconSparkle, IconShield, IconRocket } from '../components/icons';

function HomeContent() {
  const { t } = useI18n();
  const [achievementType, setAchievementType] = useState<AchievementType | null>(null);
  const [answers, setAnswers] = useState<Answers>(EMPTY_ANSWERS);
  const [consent, setConsent] = useState<Consent>(EMPTY_CONSENT);
  const [languages, setLanguages] = useState<LangCode[]>(['vi']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GenerateResponse | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const patch = (p: Partial<Answers>) =>
    setAnswers((prev) => ({ ...prev, ...p }) as Answers);
  const patchConsent = (p: Partial<Consent>) => setConsent((prev) => ({ ...prev, ...p }));

  const loadSample = (id: string) => {
    const sample = SAMPLES.find((s) => s.id === id);
    if (sample) {
      setAchievementType(sample.type);
      setAnswers(sample.answers);
    }
  };

  const handleGenerate = async () => {
    setError(null);
    if (!achievementType) {
      setError(t.form.errSelectTopic);
      return;
    }
    const required =
      achievementType === 'personal'
        ? ['pa_name', 'pa_role', 'pa_contribution', 'pa_importance']
        : ['team_intro', 'team_achievement', 'team_challenge', 'team_solution'];
    const missing = required.find((k) => !(answers[k] ?? '').trim());
    if (missing) {
      setError(t.form.errFillRequired);
      return;
    }
    if (!consent.consent_media_public || !consent.consent_truthful) {
      setError(t.form.errConsent);
      return;
    }
    setLoading(true);
    try {
      const resp = await generateStory(achievementType, answers, languages, consent);
      setResult(resp);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Đã xảy ra lỗi. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey((prev) => (prev === key ? null : prev)), 1600);
    } catch {
      setError('Không thể sao chép. Vui lòng chọn thủ công.');
    }
  };

  return (
    <main className="shell">
      <header className="site-header">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">
            <IconTerminal size={20} />
          </span>
          <div>
            <h1>{t.header.title}</h1>
            <p>{t.header.subtitle}</p>
          </div>
        </div>
        <div className="header-actions">
          <span className="header-chip" aria-hidden="true">
            <IconShield size={13} /> {t.header.chip}
          </span>
          <LanguageSwitcher />
        </div>
      </header>

      <section className="hero">
        <h2>
          {t.hero.titleLead} <em>{t.hero.titleEm}</em> {t.hero.titleTail}
        </h2>
        <p className="hero-sub">{t.hero.sub}</p>

        <div className="pipeline" aria-hidden="true">
          <div className="pipe-step">
            <IconTerminal size={15} />
            <span>{t.hero.pipeline.input}</span>
          </div>
          <IconArrowRight size={16} className="pipe-arrow" />
          <div className="pipe-step">
            <IconRocket size={15} />
            <span>{t.hero.pipeline.engine}</span>
          </div>
          <IconArrowRight size={16} className="pipe-arrow" />
          <div className="pipe-step">
            <IconSparkle size={15} />
            <span>{t.hero.pipeline.outputs}</span>
          </div>
          <code className="pipe-code">{t.hero.pipeline.ship}</code>
        </div>
      </section>

      <section className="workspace">
        <QuestionForm
          answers={answers}
          achievementType={achievementType ?? 'team'}
          onAchievementTypeChange={(t2) => setAchievementType(t2)}
          onChange={patch}
          consent={consent}
          onConsentChange={patchConsent}
          languages={languages}
          onLanguagesChange={setLanguages}
          onGenerate={handleGenerate}
          onLoadSample={loadSample}
          loading={loading}
          error={error}
        />
        <ResultTabs result={result} onCopy={handleCopy} copiedKey={copiedKey} />
      </section>
    </main>
  );
}

export default function HomePage() {
  return (
    <I18nProvider>
      <HomeContent />
    </I18nProvider>
  );
}