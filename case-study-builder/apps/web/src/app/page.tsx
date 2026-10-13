'use client';

import { useState } from 'react';
import QuestionForm from '../components/QuestionForm';
import ResultTabs from '../components/ResultTabs';
import { generateStory } from '../lib/api';
import { SAMPLES } from '../lib/samples';
import { Answers, EMPTY_ANSWERS, GenerateResponse, LangCode } from '../lib/types';

export default function HomePage() {
  const [answers, setAnswers] = useState<Answers>(EMPTY_ANSWERS);
  const [languages, setLanguages] = useState<LangCode[]>(['vi']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GenerateResponse | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const patch = (p: Partial<Answers>) => setAnswers((prev) => ({ ...prev, ...p }));

  const loadSample = (id: string) => {
    const sample = SAMPLES.find((s) => s.id === id);
    if (sample) setAnswers(sample.answers);
  };

  const handleGenerate = async () => {
    setError(null);
    if (
      !answers.project_description.trim() ||
      !answers.challenge.trim() ||
      !answers.solution.trim()
    ) {
      setError('Vui lòng điền đủ 3 trường bắt buộc (dự án, thách thức, giải pháp).');
      return;
    }
    setLoading(true);
    try {
      const resp = await generateStory(answers, languages);
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
            ✦
          </span>
          <div>
            <h1>Case Study Builder</h1>
            <p>Biến kết quả dự án thành câu chuyện ai cũng muốn đọc</p>
          </div>
        </div>
      </header>

      <section className="hero">
        <p className="eyebrow">6 câu hỏi · 5 đầu ra · dưới 10 phút</p>
        <h2>
          Thành tựu của team, <em>kể lại</em> đúng cách.
        </h2>
        <p className="hero-sub">
          Trả lời 6 câu hỏi ngắn. Hệ thống tự ẩn thông tin nhạy cảm và tạo bản tin, post Teams,
          case study, bản dịch JA/EN cùng danh sách cảnh báo.
        </p>
      </section>

      <section className="workspace">
        <QuestionForm
          answers={answers}
          onChange={patch}
          languages={languages}
          onLanguagesChange={setLanguages}
          onGenerate={handleGenerate}
          onLoadSample={loadSample}
          loading={loading}
          error={error}
        />
        <ResultTabs result={result} onCopy={handleCopy} copiedKey={copiedKey} />
      </section>

      <footer className="site-footer">
        <p>An toàn thông tin mặc định · Không bịa số liệu · Con người quyết định cuối cùng</p>
      </footer>
    </main>
  );
}
