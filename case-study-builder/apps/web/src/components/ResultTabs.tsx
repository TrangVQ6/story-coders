import { useEffect, useMemo, useState } from 'react';
import { GenerateResponse } from '../lib/types';
import { useI18n } from '../lib/i18n-context';
import {
  IconMegaphone,
  IconClipboard,
  IconBook,
  IconTranslate,
  IconAlert,
  IconCheck,
  IconSparkle,
} from './icons';

interface Props {
  result: GenerateResponse | null;
  onCopy: (key: string, text: string) => void;
  copiedKey: string | null;
}

type TabKey = 'newsletter' | 'teams' | 'casestudy' | 'translations' | 'warnings';

/**
 * ProperNameHighlighter — danh dau ten rieng noi bat (FR-GEN-003.4).
 * Matches: ma don vi FPT (FJP.XXX), ten nguoi day du kem chuc danh.
 */
const PROPER_NAME_RE =
  /(\b(?:FJP|FNS|FKO|FJA|FHM|FDN|FSOFT|FPT)\.[A-Z0-9]{2,}(?:\.[A-Z0-9]{2,})?\b)|((?<![\p{L}\p{M}])[A-ZÀ-Ỹ][\p{L}\p{M}]{1,20}(?:\s+[A-ZÀ-Ỹ][\p{L}\p{M}]{1,20}){1,3}\s*(?:-|–|—)?\s*(?:PM|AM|DM|CEO|CDO|Lead|Manager|Sub Delivery Lead)(?![\p{L}\p{M}]))/gu;

function highlightProperNames(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;
  for (const m of text.matchAll(PROPER_NAME_RE)) {
    const idx = m.index ?? 0;
    if (idx > lastIndex) nodes.push(text.slice(lastIndex, idx));
    nodes.push(
      <mark key={key++} className="proper-name" title="Proper name — review or abbreviate">
        {m[0]}
      </mark>
    );
    lastIndex = idx + m[0].length;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

function HighlightedText({ text }: { text: string }) {
  return <span className="hl-text">{highlightProperNames(text)}</span>;
}

export default function ResultTabs({ result, onCopy, copiedKey }: Props) {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<TabKey>('newsletter');
  const [confirmed, setConfirmed] = useState(false);
  const [editors, setEditors] = useState<Record<string, string>>({});

  const TABS: { key: TabKey; label: string; icon: (p: { size?: number }) => React.JSX.Element }[] = [
    { key: 'newsletter', label: t.results.tabNewsletter, icon: IconMegaphone },
    { key: 'teams', label: t.results.tabTeams, icon: IconClipboard },
    { key: 'casestudy', label: t.results.tabCasestudy, icon: IconBook },
    { key: 'translations', label: t.results.tabTranslations, icon: IconTranslate },
    { key: 'warnings', label: t.results.tabWarnings, icon: IconAlert },
  ];

  const highWarnings = useMemo(
    () => (result?.warnings ?? []).filter((w) => w.severity === 'high'),
    [result]
  );

  useEffect(() => {
    if (!result) return;
    setEditors({
      newsletter: result.outputs.newsletter_vi,
      teams: result.outputs.teams_post,
      casestudy: [
        `${t.results.caseStudyPrefix}${result.outputs.case_study.context}`,
        `Challenge: ${result.outputs.case_study.challenge}`,
        `Solution: ${result.outputs.case_study.solution}`,
        `Result: ${result.outputs.case_study.result}`,
      ].join('\n\n'),
      translations: [
        result.outputs.ja_version ? `【日本語】\n${result.outputs.ja_version}` : '',
        result.outputs.en_version ? `\n\n[English]\n${result.outputs.en_version}` : '',
      ]
        .filter(Boolean)
        .join('') || t.results.noTranslations,
      warnings: (
        result.warnings.length
          ? result.warnings.map((w) => `[${w.severity.toUpperCase()}] ${w.category}: ${w.description}`)
          : [t.results.reviewed]
      ).join('\n\n'),
    });
    setActiveTab('newsletter');
    setConfirmed(false);
  }, [result, t]);

  if (!result) {
    return (
      <div className="results-panel empty-state">
        <div className="empty-mark" aria-hidden="true">
          <IconSparkle size={26} />
        </div>
        <p>{t.results.emptyTitle}</p>
        <p className="empty-hint">{t.results.emptyHint}</p>
      </div>
    );
  }

  const copyLocked = highWarnings.length > 0 && !confirmed;
  const activeLabel = TABS.find((tb) => tb.key === activeTab)?.label ?? '';

  return (
    <div className="results-panel">
      <div className="results-head">
        <h2>
          <IconSparkle size={15} /> <span>{t.results.head}</span>
        </h2>
        <span className={`mode-badge ${result.meta.mode}`}>
          {result.meta.mode === 'llm' ? t.results.modeAi : t.results.modeDemo} ·{' '}
          {result.meta.masked_entities} {t.results.masked}
        </span>
      </div>

      <nav className="tabrail" role="tablist" aria-label={t.results.tabNewsletter}>
        {TABS.map((tb) => {
          const Icon = tb.icon;
          return (
            <button
              key={tb.key}
              role="tab"
              aria-selected={activeTab === tb.key}
              className={`tab ${activeTab === tb.key ? 'active' : ''} ${
                tb.key === 'warnings' && highWarnings.length > 0 ? 'has-warning' : ''
              }`}
              onClick={() => setActiveTab(tb.key)}
            >
              <Icon size={14} />
              {tb.label}
              {tb.key === 'warnings' && highWarnings.length > 0 && (
                <span className="badge">{highWarnings.length}</span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="tabpane">
        <div className="pane-head">
          <h3>{activeLabel}</h3>
          <button
            className="btn-copy"
            disabled={copyLocked}
            onClick={() => onCopy(activeTab, editors[activeTab] ?? '')}
          >
            {copiedKey === activeTab ? (
              <>
                <IconCheck size={14} /> {t.results.copied}
              </>
            ) : (
              <>
                <IconClipboard size={14} /> {t.results.copy}
              </>
            )}
          </button>
        </div>

        {/* Chế độ xem có highlight tên riêng (chỉ tab văn bản) */}
        {activeTab !== 'warnings' && (
          <div className="hl-preview" aria-label={`Preview ${activeLabel}`}>
            <HighlightedText text={editors[activeTab] ?? ''} />
            <p className="hl-note">
              <IconSparkle size={12} /> {t.results.hlNote}
            </p>
          </div>
        )}

        <textarea
          className="editor"
          value={editors[activeTab] ?? ''}
          onChange={(e) => setEditors((prev) => ({ ...prev, [activeTab]: e.target.value }))}
          spellCheck={false}
          aria-label={`Edit ${activeLabel}`}
        />
      </div>

      {copyLocked && (
        <div className="warning-gate" role="alert">
          <label>
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
            />
            <span>{t.results.warningGateLabel}</span>
          </label>
          <p>
            {highWarnings.length} · {t.results.warningGateDesc}
          </p>
        </div>
      )}
    </div>
  );
}