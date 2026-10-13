import { useEffect, useMemo, useState } from 'react';
import { GenerateResponse } from '../lib/types';

interface Props {
  result: GenerateResponse | null;
  onCopy: (key: string, text: string) => void;
  copiedKey: string | null;
}

type TabKey = 'newsletter' | 'teams' | 'casestudy' | 'translations' | 'warnings';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'newsletter', label: 'Bản tin nội bộ' },
  { key: 'teams', label: 'Post Teams' },
  { key: 'casestudy', label: 'Case study' },
  { key: 'translations', label: 'Bản dịch' },
  { key: 'warnings', label: 'Cảnh báo' },
];

export default function ResultTabs({ result, onCopy, copiedKey }: Props) {
  const [activeTab, setActiveTab] = useState<TabKey>('newsletter');
  const [confirmed, setConfirmed] = useState(false);
  const [editors, setEditors] = useState<Record<string, string>>({});

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
        `Bối cảnh: ${result.outputs.case_study.context}`,
        `Thách thức: ${result.outputs.case_study.challenge}`,
        `Giải pháp: ${result.outputs.case_study.solution}`,
        `Kết quả: ${result.outputs.case_study.result}`,
      ].join('\n\n'),
      translations: [
        result.outputs.ja_version ? `【日本語】\n${result.outputs.ja_version}` : '',
        result.outputs.en_version ? `\n\n[English]\n${result.outputs.en_version}` : '',
      ]
        .filter(Boolean)
        .join('') || 'Không có bản dịch (chỉ chọn VI).',
      warnings: (
        result.warnings.length
          ? result.warnings.map((w) => `[${w.severity.toUpperCase()}] ${w.category}: ${w.description}`)
          : ['Đã rà soát — không phát hiện rủi ro.']
      ).join('\n\n'),
    });
    setActiveTab('newsletter');
    setConfirmed(false);
  }, [result]);

  if (!result) {
    return (
      <div className="results-panel empty-state">
        <div className="empty-mark" aria-hidden="true">
          6 → 5
        </div>
        <p>Nhập câu chuyện dự án bên trái và nhấn “Tạo câu chuyện”.</p>
      </div>
    );
  }

  const copyLocked = highWarnings.length > 0 && !confirmed;

  return (
    <div className="results-panel">
      <div className="results-head">
        <h2>2 · Câu chuyện đã sẵn sàng</h2>
        <span className={`mode-badge ${result.meta.mode}`}>
          {result.meta.mode === 'llm' ? 'AI' : 'Demo'} · {result.meta.masked_entities} thực thể đã ẩn
        </span>
      </div>

      <nav className="tabrail" role="tablist" aria-label="Kết quả">
        {TABS.map((t) => (
          <button
            key={t.key}
            role="tab"
            aria-selected={activeTab === t.key}
            className={`tab ${activeTab === t.key ? 'active' : ''} ${
              t.key === 'warnings' && highWarnings.length > 0 ? 'has-warning' : ''
            }`}
            onClick={() => setActiveTab(t.key)}
          >
            {t.label}
            {t.key === 'warnings' && highWarnings.length > 0 && (
              <span className="badge">{highWarnings.length}</span>
            )}
          </button>
        ))}
      </nav>

      <div className="tabpane">
        <div className="pane-head">
          <h3>{TABS.find((t) => t.key === activeTab)?.label}</h3>
          <button
            className="btn-copy"
            disabled={copyLocked}
            onClick={() => onCopy(activeTab, editors[activeTab] ?? '')}
          >
            {copiedKey === activeTab ? 'Đã sao chép ✓' : 'Copy'}
          </button>
        </div>
        <textarea
          className="editor"
          value={editors[activeTab] ?? ''}
          onChange={(e) => setEditors((prev) => ({ ...prev, [activeTab]: e.target.value }))}
          spellCheck={false}
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
            <span>Tôi đã đọc cảnh báo và chịu trách nhiệm rà soát trước khi phát hành.</span>
          </label>
          <p>
            Có {highWarnings.length} cảnh báo mức cao. Copy bị khóa cho đến khi xác nhận.
          </p>
        </div>
      )}
    </div>
  );
}
