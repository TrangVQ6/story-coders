import { Answers, LangCode } from '../lib/types';
import { SAMPLES } from '../lib/samples';

interface Props {
  answers: Answers;
  onChange: (patch: Partial<Answers>) => void;
  languages: LangCode[];
  onLanguagesChange: (langs: LangCode[]) => void;
  onGenerate: () => void;
  onLoadSample: (id: string) => void;
  loading: boolean;
  error: string | null;
}

const QUESTIONS: {
  key: keyof Answers;
  label: string;
  required: boolean;
  hint?: string;
  placeholder?: string;
  rows?: number;
}[] = [
  {
    key: 'project_description',
    label: 'Dự án làm gì?',
    required: true,
    hint: 'Lĩnh vực, không ghi tên khách hàng.',
    placeholder: 'VD: Phần mềm giao diện ô tô cho khách hàng Nhật Bản',
  },
  {
    key: 'challenge',
    label: 'Thách thức lớn nhất là gì?',
    required: true,
    placeholder: 'VD: Áp dụng thiết kế mới mà không làm giảm hiệu năng',
  },
  {
    key: 'solution',
    label: 'Team đã giải quyết bằng cách nào?',
    required: true,
    placeholder: 'VD: Đánh giá rủi ro trước và triển khai theo thứ tự ưu tiên',
    rows: 3,
  },
  {
    key: 'result_metrics',
    label: 'Kết quả có con số nào không?',
    required: false,
    hint: 'Nếu để trống, hệ thống sẽ nhắc bổ sung con số.',
    placeholder: 'VD: Giảm 30% thời gian xử lý',
  },
  {
    key: 'lesson',
    label: 'Bài học hoặc mẹo muốn chia sẻ?',
    required: false,
    placeholder: 'VD: Đánh giá rủi ro sớm giúp giảm sốc khi thay đổi',
  },
  {
    key: 'unsung_hero',
    label: 'Ai là người hùng thầm lặng của team?',
    required: false,
    hint: 'Có thể ẩn danh nếu muốn.',
    placeholder: 'VD: Kỹ sư kiểm thử hiệu năng',
  },
];

const LANGS: { code: LangCode; label: string }[] = [
  { code: 'vi', label: 'Tiếng Việt' },
  { code: 'ja', label: '日本語' },
  { code: 'en', label: 'English' },
];

export default function QuestionForm({
  answers,
  onChange,
  languages,
  onLanguagesChange,
  onGenerate,
  onLoadSample,
  loading,
  error,
}: Props) {
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
        <h2>1 · Kể về dự án</h2>
        <select
          aria-label="Dự án mẫu"
          defaultValue=""
          onChange={(e) => {
            if (e.target.value) onLoadSample(e.target.value);
          }}
        >
          <option value="">Dự án mẫu…</option>
          {SAMPLES.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {QUESTIONS.map((q, i) => (
        <div className="field" key={q.key}>
          <label htmlFor={q.key}>
            <span className="q-num">{i + 1}</span>
            <span>
              {q.label} {q.required && <span className="req">*</span>}
            </span>
          </label>
          <textarea
            id={q.key}
            rows={q.rows ?? 2}
            maxLength={500}
            value={answers[q.key]}
            placeholder={q.placeholder}
            onChange={(e) => onChange({ [q.key]: e.target.value } as Partial<Answers>)}
          />
          <div className="field-meta">
            {q.hint ? <p className="hint">{q.hint}</p> : <span />}
            <p className="counter">{answers[q.key].length}/500</p>
          </div>
        </div>
      ))}

      <fieldset className="languages">
        <legend>Ngôn ngữ đầu ra</legend>
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

      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      <button type="submit" className="btn-generate" disabled={loading}>
        {loading ? 'Đang tạo câu chuyện…' : 'Tạo câu chuyện'}
      </button>
    </form>
  );
}
