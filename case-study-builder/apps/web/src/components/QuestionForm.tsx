import { useState } from 'react';
import {
  Answers,
  Consent,
  LangCode,
  AchievementType,
  PERSONAL_QUESTIONS,
  TEAM_QUESTIONS,
  TOPICS,
  EMPTY_CONSENT,
} from '../lib/types';
import { SAMPLES } from '../lib/samples';
import { useI18n } from '../lib/i18n-context';
import { topicLabel, topicDesc } from '../lib/i18n';
import {
  IconPerson,
  IconTeam,
  IconTerminal,
  IconShield,
  IconLock,
  IconImage,
  IconCheck,
  IconSparkle,
} from './icons';

interface Props {
  answers: Answers;
  achievementType: AchievementType;
  onAchievementTypeChange: (type: AchievementType) => void;
  onChange: (patch: Partial<Answers>) => void;
  consent: Consent;
  onConsentChange: (patch: Partial<Consent>) => void;
  languages: LangCode[];
  onLanguagesChange: (langs: LangCode[]) => void;
  onGenerate: () => void;
  onLoadSample: (id: string) => void;
  loading: boolean;
  error: string | null;
}

const LANGS: { code: LangCode; label: string }[] = [
  { code: 'vi', label: 'Tiếng Việt' },
  { code: 'ja', label: '日本語' },
  { code: 'en', label: 'English' },
];

const TOPIC_ICONS: Record<string, (p: { size?: number }) => React.JSX.Element> = {
  person: IconPerson,
  team: IconTeam,
};

export default function QuestionForm({
  answers,
  achievementType,
  onAchievementTypeChange,
  onChange,
  consent,
  onConsentChange,
  languages,
  onLanguagesChange,
  onGenerate,
  onLoadSample,
  loading,
  error,
}: Props) {
  const { t } = useI18n();
  const questions = achievementType === 'personal' ? PERSONAL_QUESTIONS : TEAM_QUESTIONS;
  const consentOk = consent.consent_media_public && consent.consent_truthful;

  const handleTopicChange = (type: AchievementType) => {
    if (Object.values(answers).some((v) => v?.trim())) {
      if (!window.confirm(t.form.confirmReset)) return;
    }
    onAchievementTypeChange(type);
    // Reset answers cua chu de cu
    Object.keys(answers).forEach((k) => onChange({ [k]: '' }));
  };

  return (
    <form
      className="form-panel"
      onSubmit={(e) => {
        e.preventDefault();
        onGenerate();
      }}
      noValidate
    >
      <div className="panel-head">
        <h2>
          <IconTerminal size={16} /> <span>{t.form.head}</span>
        </h2>
        <select
          aria-label={t.form.samplePlaceholder}
          defaultValue=""
          onChange={(e) => {
            if (e.target.value) onLoadSample(e.target.value);
          }}
        >
          <option value="">{t.form.samplePlaceholder}</option>
          {SAMPLES.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {/* Bước 0 — Chọn chủ đề */}
      <div className="topic-step" role="radiogroup" aria-label={t.form.step0Question}>
        <p className="step-label">
          <span className="step-chip">{t.form.step0}</span> {t.form.step0Question}
        </p>
        <div className="topic-grid">
          {TOPICS.map((tp) => {
            const Icon = TOPIC_ICONS[tp.icon] ?? IconSparkle;
            const active = achievementType === tp.type;
            return (
              <button
                type="button"
                key={tp.type}
                role="radio"
                aria-checked={active}
                className={`topic-card ${active ? 'active' : ''}`}
                onClick={() => handleTopicChange(tp.type)}
              >
                <span className="topic-icon">
                  <Icon size={20} />
                </span>
                <span className="topic-body">
                  <strong>{topicLabel(t, tp.type)}</strong>
                  <small>{topicDesc(t, tp.type)}</small>
                </span>
                <span className="topic-check" aria-hidden="true">
                  {active && <IconCheck size={14} />}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bước 1 — 10 câu hỏi theo chủ đề */}
      {achievementType && (
        <div className="question-list">
          <p className="step-label">
            <span className="step-chip">1</span>{' '}
            {achievementType === 'personal' ? t.form.step1Personal : t.form.step1Team}
          </p>
          {questions.map((q, i) => {
            const qd = t.questions[q.key];
            return (
              <div className="field" key={q.key}>
                <label htmlFor={q.key}>
                  <span className="q-num">{i + 1}</span>
                  <span>
                    {qd.label} {q.required && <span className="req">{t.form.requiredMark}</span>}
                  </span>
                </label>
                <textarea
                  id={q.key}
                  rows={q.rows ?? 2}
                  maxLength={500}
                  value={answers[q.key] ?? ''}
                  placeholder={qd.placeholder}
                  onChange={(e) => onChange({ [q.key]: e.target.value } as Partial<Answers>)}
                />
                <div className="field-meta">
                  {qd.hint ? <p className="hint">{qd.hint}</p> : <span />}
                  <p className="counter">
                    {(answers[q.key] ?? '').length}
                    {t.form.counterSuffix}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <fieldset className="languages">
        <legend>{t.form.languagesLegend}</legend>
        {LANGS.map((l) => (
          <label key={l.code} className="chip">
            <input
              type="checkbox"
              checked={languages.includes(l.code)}
              onChange={(e) => {
                const next = e.target.checked
                  ? [...languages, l.code]
                  : languages.filter((x) => x !== l.code);
                onLanguagesChange(next.length ? next : ['vi']);
              }}
            />
            <span>{l.label}</span>
          </label>
        ))}
      </fieldset>

      {/* Bước 2 — Consent */}
      <div className="consent-box">
        <p className="step-label">
          <span className="step-chip">{t.form.step2}</span> {t.form.step2}
        </p>
        <label className={`consent-item ${consent.consent_media_public ? 'checked' : ''}`}>
          <input
            type="checkbox"
            checked={consent.consent_media_public}
            onChange={(e) => onConsentChange({ consent_media_public: e.target.checked })}
          />
          <span className="consent-icon">
            <IconImage size={16} />
          </span>
          <span>
            {t.form.consentMediaPre}
            <strong>{t.form.consentMediaStrong}</strong>
            {t.form.consentMediaPost}
          </span>
        </label>
        <label className={`consent-item ${consent.consent_truthful ? 'checked' : ''}`}>
          <input
            type="checkbox"
            checked={consent.consent_truthful}
            onChange={(e) => onConsentChange({ consent_truthful: e.target.checked })}
          />
          <span className="consent-icon">
            <IconShield size={16} />
          </span>
          <span>
            {t.form.consentTruthPre}
            <strong>{t.form.consentTruthStrong}</strong>
            {t.form.consentTruthPost}
          </span>
        </label>
        {!consentOk && (
          <p className="consent-note">
            <IconLock size={13} /> {t.form.consentNote}
          </p>
        )}
      </div>

      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="btn-generate"
        disabled={loading || !consentOk || !achievementType}
      >
        {loading ? t.form.generating : t.form.generate}
      </button>
    </form>
  );
}