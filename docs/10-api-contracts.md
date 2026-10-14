# API Contracts — Case Study Builder

| Thuộc tính | Giá trị |
|---|---|
| **Tài liệu** | API Contracts & Data Flow |
| **Phiên bản** | 2.0 |
| **Trạng thái** | Draft |
| **Liên kết** | SRS v2.0, System Design v2.0, ADR-003, ADR-005, ADR-006 |
| **Phạm vi** | MVP (Phase 1) — hợp đồng nội bộ giữa các lớp + hợp đồng LLM gateway |

---

## 1. Nguyên tắc chung

- **Định dạng**: JSON (UTF-8).
- **Versioning**: `Content-Type: application/json`; contract version trong field `contract_version`.
- **Encoding**: Unicode bình thường; không dùng escape đặc biệt.
- **Xử lý lỗi**: mọi lỗi trả về `{ "error": { "code": "...", "message": "...", "retryable": boolean } }`.
- **Không log**: nội dung `answers` không được ghi vào log (ADR-004).

---

## 2. Contract nội bộ: `generateStory`

> Hợp đồng giữa Application Layer và Security/Engine Layer (gọi nội bộ trong SPA).

### 2.1. Request

```json
{
  "contract_version": "2.0",
  "achievement_type": "personal | team",
  "answers": {
    "pa_context": "string ≤ 500 ký tự, bắt buộc (nếu personal)",
    "pa_role": "string ≤ 500 ký tự, bắt buộc (nếu personal)",
    "pa_challenge": "string ≤ 500 ký tự, bắt buộc (nếu personal)",
    "pa_action": "string ≤ 500 ký tự, bắt buộc (nếu personal)",
    "pa_result": "string ≤ 500 ký tự | null",
    "pa_support": "string ≤ 500 ký tự | null",
    "pa_lesson": "string ≤ 500 ký tự | null",
    "pa_impact": "string ≤ 500 ký tự | null",
    "pa_evidence": "string ≤ 500 ký tự | null",
    "pa_quote": "string ≤ 500 ký tự | null"
  },
  "languages": ["vi", "ja", "en"],
  "consent": {
    "consent_media_public": true,
    "consent_truthful": true
  },
  "options": {
    "use_sample": "sample_1 | sample_2 | null"
  }
}
```

> Khi `achievement_type = team`, `answers` chứa các khóa `team_*` tương ứng
> (`team_context`, `team_project`, `team_challenge`, `team_solution`, `team_result`,
> `team_members`, `team_collab`, `team_lesson`, `team_impact`, `team_quote`).
> Bộ câu hỏi chuẩn: docs/12 §2.2–2.3.

**Ràng buộc**:
- `achievement_type` ∈ {`personal`, `team`}, bắt buộc (FR-FORM-001).
- `answers` chỉ chứa 10 question_key của chủ đề đã chọn.
- `consent.consent_media_public` và `consent.consent_truthful` **bắt buộc = true**; thiếu → `ERR_VALIDATION` (FR-FORM-005, ADR-006).
- `languages` ⊆ {`vi`, `ja`, `en`}, không rỗng, mặc định `["vi"]`.
- Các trường bắt buộc: A1–A4 (personal) / B1–B4 (team).
- Tổng độ dài tất cả câu trả lời ≤ 5500 ký tự (10 trường × 500 + 500 dự phòng).

### 2.2. Response — Thành công (HTTP 200)

```json
{
  "contract_version": "2.0",
  "outputs": {
    "newsletter_vi": "string ~300 từ, giọng FUN",
    "teams_post": "string ≤ 280 ký tự + hashtag",
    "case_study": {
      "context": "string",
      "challenge": "string",
      "solution": "string",
      "result": "string"
    },
    "translations": {
      "ja": "string | null",
      "en": "string | null"
    }
  },
  "warnings": [
    {
      "severity": "high | medium | low | info",
      "category": "client_name | project_name | confidential_data | missing_metric | translation_check | proper_name | consent_missing | general",
      "description": "string"
    }
  ],
  "meta": {
    "session_id": "string (UUID)",
    "duration_ms": 1234,
    "masked_entities": 3,
    "token_usage": { "input": 3800, "output": 3500 },
    "prompt_version": "2.0"
  }
}
```

**Ràng buộc**:
- `outputs.translations.ja/en` = `null` khi ngôn ngữ tương ứng không được chọn.
- `warnings` luôn là mảng (có thể rỗng).
- `meta.masked_entities` = số thực thể bị ẩn trong phiên.
- Tên riêng nội bộ còn trong đầu ra được đánh dấu (highlight) kèm warning `proper_name`.

### 2.3. Response — Lỗi (HTTP 4xx/5xx)

| code | HTTP | retryable | Ý nghĩa | Hành động UI |
|---|---|---|---|---|
| `ERR_VALIDATION` | 422 | ❌ | Form không hợp lệ (thiếu trường, quá dài) | Hiển thị lỗi tại trường |
| `ERR_TIMEOUT` | 504 | ✅ | LLM vượt 45s | "Thử lại" |
| `ERR_PARSE` | 502 | ✅ | JSON response không parse được sau retry | "Thử lại" |
| `ERR_MODEL` | 503 | ✅ | Model API lỗi | "Thử lại" |
| `ERR_RATE_LIMIT` | 429 | ⏳ | Vượt giới hạn phiên đồng thời | Chờ + thử lại |

**Body lỗi**:
```json
{
  "error": {
    "code": "ERR_TIMEOUT",
    "message": "Quá trình tạo nội dung chưa hoàn tất trong thời gian cho phép.",
    "retryable": true
  }
}
```

---

## 3. Contract LLM Gateway (external)

> Hợp đồng giữa `LLMClient` và model API. MVP dùng endpoint tương thích Messages API (Anthropic) hoặc Chat Completions (OpenAI). Đặc tả dưới đây theo dạng chuẩn hóa.

### 3.1. Request

```json
{
  "model": "configured-model-id",
  "max_tokens": 4600,
  "temperature": 0.3,
  "system": "<SYSTEM_PROMPT v2.0 — xem Technical Spec §2.2>",
  "messages": [
    {
      "role": "user",
      "content": "<USER_PROMPT — xem Technical Spec §2.3>"
    }
  ]
}
```

### 3.2. Response (thành công)

```json
{
  "content": [
    {
      "type": "text",
      "text": "{ \"newsletter_vi\": \"...\", \"teams_post\": \"...\", \"case_study\": {...}, \"ja_version\": \"...\", \"en_version\": \"...\", \"warnings\": [...] }"
    }
  ],
  "usage": { "input_tokens": 3900, "output_tokens": 3450 },
  "stop_reason": "end_turn"
}
```

### 3.3. Xử lý response

1. Trích xuất chuỗi `text` từ `content[0]`.
2. `JsonParser`: bỏ markdown fence nếu có → `JSON.parse`.
3. `SchemaValidator`: kiểm tra schema (ADR-003) → fail → retry 1 lần → `ERR_PARSE`.
4. `OutputScanner`: quét rò rỉ (L3) → fail nặng → `ERR_MODEL` với message "phát hiện rủi ro, vui lòng thử lại".

---

## 4. Luồng dữ liệu chi tiết (Data Flow)

### 4.1. Sơ đồ thành phần & luồng dữ liệu

```mermaid
flowchart LR
    subgraph UI["UI Layer"]
        TS["TopicSelector"]
        F["QuestionForm"]
        CG["ConsentGate"]
        T["ResultTabs"]
        PH["ProperNameHighlighter"]
        C["CopyButton"]
    end
    subgraph APP["Application Layer"]
        S["SessionStore"]
        G["GenerateController"]
        E["ErrorHandler"]
    end
    subgraph SEC["Security Layer"]
        D["EntityDetector"]
        R["Redactor"]
        O["OutputScanner"]
        V["SchemaValidator"]
        W["WarningEngine"]
    end
    subgraph ENG["Engine Layer"]
        P["PromptBuilder"]
        L["LLMClient"]
        J["JsonParser"]
    end

    TS -->|achievement_type| F
    F -->|answers + languages| CG
    CG -->|consent| G
    G -->|sanitizeInput| D
    D -->|entityRegister| R
    R -->|answers đã chuẩn hóa| P
    P -->|prompt v2.0| L
    L -->|raw JSON| J
    J -->|parsed| V
    V -->|outputs| O
    O -->|clean outputs + risks| W
    W -->|outputs + warnings| G
    G -->|render + highlight| T
    T -->|proper names| PH
    T -->|copy| C
    E -->|error| G
```

### 4.2. Luồng xử lý lỗi

```mermaid
flowchart TD
    A["generateStory()"] --> B{"Validate form"}
    B -- "Lỗi" --> C["ERR_VALIDATION → highlight trường"]
    B -- "OK" --> D["Gọi LLM"]
    D --> E{"Timeout > 45s?"}
    E -- "Có" --> F["ERR_TIMEOUT → 'Thử lại'"]
    E -- "Không" --> G{"Parse JSON?"}
    G -- "Lỗi lần 1" --> H["Retry 1 lần"]
    H --> G
    G -- "Lỗi lần 2" --> I["ERR_PARSE → 'Thử lại'"]
    G -- "OK" --> J{"Validate schema?"}
    J -- "Lỗi" --> I
    J -- "OK" --> K{"Scan rò rỉ?"}
    K -- "Rò rỉ nặng" --> L["ERR_MODEL → 'Thử lại'"]
    K -- "OK / rò rỉ nhẹ" --> M["Render 5 tab + warnings"]
```

---

## 5. Event log (Observability — không chứa nội dung)

| Field | Kiểu | Ví dụ |
|---|---|---|
| `event` | string | `story_generated`, `story_error`, `story_copied`, `consent_declined` |
| `session_id` | UUID | `ses_8f3a...` |
| `achievement_type` | string | `personal` |
| `duration_ms` | int | `12340` |
| `masked_entities` | int | `3` |
| `warning_counts` | object | `{"high": 1, "medium": 1}` |
| `token_usage` | object | `{"input": 3850, "output": 950}` |
| `error_code` | string \| null | `ERR_TIMEOUT` |

**Ràng buộc**: Không bao giờ ghi `answers` hoặc nội dung đầu ra vào log (ADR-004, NFR-SEC-001).

---

## 6. Contract Google Cloud Translation (bản dịch thật — demo mode)

> Khi chưa cấu hình LLM API key (demo mode), `ja_version`/`en_version` được dịch thật qua **Google Cloud Translation API v2** nếu có `GOOGLE_TRANSLATE_API_KEY`. Không có key → fallback về chuỗi placeholder demo.

### 6.1. Cấu hình

| Env var | Bắt buộc | Mô tả |
|---|---|---|
| `GOOGLE_TRANSLATE_API_KEY` | Không | API key Google Cloud (bật Translation API). Đặt trong `.env.preview` hoặc env của container API. |

### 6.2. Request

```
POST https://translation.googleapis.com/language/translate/v2?key=API_KEY
Content-Type: application/json

{ "q": "<newsletter_vi>", "target": "ja | en", "format": "text" }
```

### 6.3. Response (thành công)

```json
{ "data": { "translations": [ { "translatedText": "..." } ] } }
```

### 6.4. Xử lý lỗi

- Không có key / lỗi mạng / HTTP ≠ 200 → trả về `null` → giữ placeholder demo (không làm hỏng luồng tạo story).
- Timeout: 15s mỗi request; dịch song song `ja` + `en` bằng `Promise.all`.