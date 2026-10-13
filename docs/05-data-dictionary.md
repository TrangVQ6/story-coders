# Data Dictionary — Case Study Builder

| Thuộc tính | Giá trị |
|---|---|
| **Phiên bản** | 1.0 |
| **Trạng thái** | Draft |
| **Phạm vi** | Dữ liệu MVP (Phase 1) |
| **Liên kết** | SRS v1.0 |

---

## 1. Tổng quan thực thể

```mermaid
erDiagram
    SESSION ||--o{ ANSWER : "chứa"
    SESSION ||--o{ OUTPUT : "sinh ra"
    SESSION ||--|| LANGUAGE_SELECTION : "chọn"
    OUTPUT ||--o{ WARNING : "có thể có"
    OUTPUT ||--o{ TRANSLATION : "bao gồm"

    SESSION {
        string session_id PK
        datetime created_at
        string status
    }
    ANSWER {
        string answer_id PK
        string session_id FK
        string question_key
        string content
    }
    LANGUAGE_SELECTION {
        string session_id FK
        string lang_code
    }
    OUTPUT {
        string output_id PK
        string session_id FK
        string type
        string content
    }
    WARNING {
        string warning_id PK
        string output_id FK
        string severity
        string description
    }
    TRANSLATION {
        string translation_id PK
        string output_id FK
        string lang_code
        string content
    }
```

---

## 2. Bảng dữ liệu chi tiết

### 2.1. `SESSION` — Phiên tạo nội dung

| Thuộc tính | Kiểu dữ liệu | Bắt buộc | Mô tả | Ví dụ |
|---|---|---|---|---|
| `session_id` | String (UUID) | ✅ | Khóa chính của phiên | `ses_8f3a...` |
| `created_at` | Datetime | ✅ | Thời điểm bắt đầu phiên | `2026-10-13T09:30:00Z` |
| `status` | Enum | ✅ | Trạng thái phiên: `drafting`, `validating`, `generating`, `ready`, `error`, `copied` | `ready` |
| `source` | Enum | ⬜ | Nguồn dữ liệu: `manual`, `sample_1`, `sample_2` | `sample_1` |

**Ghi chú**: Theo NFR-SEC-001, `SESSION` không được lưu lâu dài ngoài phiên làm việc ở MVP.

### 2.2. `ANSWER` — Câu trả lời đầu vào

| Thuộc tính | Kiểu dữ liệu | Bắt buộc | Mô tả | Ràng buộc |
|---|---|---|---|---|
| `answer_id` | String (UUID) | ✅ | Khóa chính | — |
| `session_id` | String (FK) | ✅ | Liên kết phiên | — |
| `question_key` | Enum | ✅ | Mã câu hỏi: `project_description`, `challenge`, `solution`, `result_metrics`, `lesson`, `unsung_hero` | — |
| `content` | String | ✅ | Nội dung câu trả lời | ≤ 500 ký tự (FR-FORM-004) |

**Ma trận câu hỏi:**

| question_key | Câu hỏi hiển thị | Bắt buộc |
|---|---|---|
| `project_description` | Dự án làm gì? (lĩnh vực, không ghi tên khách) | ✅ |
| `challenge` | Thách thức lớn nhất là gì? | ✅ |
| `solution` | Team đã giải quyết bằng cách nào? | ✅ |
| `result_metrics` | Kết quả có con số nào không? | ⬜ |
| `lesson` | Bài học hoặc mẹo muốn chia sẻ? | ⬜ |
| `unsung_hero` | Ai là người hùng thầm lặng của team? | ⬜ |

### 2.3. `LANGUAGE_SELECTION` — Lựa chọn ngôn ngữ

| Thuộc tính | Kiểu dữ liệu | Bắt buộc | Mô tả | Ví dụ |
|---|---|---|---|---|
| `session_id` | String (FK) | ✅ | Liên kết phiên | — |
| `lang_code` | Enum | ✅ | Mã ngôn ngữ: `vi`, `ja`, `en` | `vi`, `ja` |

**Ràng buộc**: Ít nhất 1 ngôn ngữ; mặc định `vi` khi không chọn (FR-FORM-002.3).

### 2.4. `OUTPUT` — Đầu ra

| Thuộc tính | Kiểu dữ liệu | Bắt buộc | Mô tả |
|---|---|---|---|
| `output_id` | String (UUID) | ✅ | Khóa chính |
| `session_id` | String (FK) | ✅ | Liên kết phiên |
| `type` | Enum | ✅ | Loại đầu ra: `newsletter_vi`, `teams_post`, `case_study`, `translations`, `warnings` |
| `content` | Text | ✅ | Nội dung đầu ra (đã qua masking) |

**Cấu trúc `case_study` (FR-GEN-001.3):**

| Trường con | Mô tả |
|---|---|
| `context` | Bối cảnh dự án |
| `challenge` | Thách thức lớn nhất |
| `solution` | Cách team giải quyết |
| `result` | Kết quả đạt được |

### 2.5. `TRANSLATION` — Bản dịch

| Thuộc tính | Kiểu dữ liệu | Bắt buộc | Mô tả |
|---|---|---|---|
| `translation_id` | String (UUID) | ✅ | Khóa chính |
| `output_id` | String (FK) | ✅ | Liên kết đầu ra gốc |
| `lang_code` | Enum | ✅ | `ja` hoặc `en` |
| `content` | Text | ✅ | Nội dung bản dịch |

**Ràng buộc**: Chỉ tạo khi người dùng chọn JA/EN (FR-FORM-002.2).

### 2.6. `WARNING` — Cảnh báo

| Thuộc tính | Kiểu dữ liệu | Bắt buộc | Mô tả | Ví dụ |
|---|---|---|---|---|
| `warning_id` | String (UUID) | ✅ | Khóa chính | — |
| `output_id` | String (FK) | ✅ | Liên kết đầu ra | — |
| `severity` | Enum | ✅ | Mức độ: `high`, `medium`, `low`, `info` | `high` |
| `category` | Enum | ✅ | Loại rủi ro: `client_name`, `project_name`, `confidential_data`, `missing_metric`, `translation_check`, `general` | `client_name` |
| `description` | Text | ✅ | Mô tả rủi ro + gợi ý xử lý | "Tên dự án hoặc tên khách hàng có thể bị lộ qua mô tả kỹ thuật, cần lead duyệt." |

**Danh mục cảnh báo chuẩn:**

| category | severity mặc định | Kích hoạt khi | Gợi ý xử lý |
|---|---|---|---|
| `client_name` | high | Phát hiện tên công ty/khách hàng | Thay bằng mô tả chung |
| `project_name` | high | Phát hiện tên dự án thật | Thay bằng mô tả chung |
| `confidential_data` | high | Số liệu mật, chi tiết hợp đồng | Bỏ hoặc ẩn; cần lead duyệt |
| `missing_metric` | medium | Q4 trống | Ghi "Nên bổ sung con số cụ thể" |
| `translation_check` | medium | Bản dịch có thuật ngữ nghi vấn | Kiểm tra thuật ngữ thủ công |
| `general` | low | Rủi ro khác | Rà soát thủ công |

---

## 3. Schema JSON đầu ra của prompt hệ thống (FR-GEN-004)

```json
{
  "newsletter_vi": "string — bản tin nội bộ ~300 từ",
  "teams_post": "string — post Teams ≤ 280 ký tự + hashtag",
  "case_study": {
    "context": "string",
    "challenge": "string",
    "solution": "string",
    "result": "string"
  },
  "ja_version": "string — bản dịch tiếng Nhật",
  "en_version": "string — bản dịch tiếng Anh",
  "warnings": [
    {
      "severity": "high | medium | low | info",
      "category": "client_name | project_name | confidential_data | missing_metric | translation_check | general",
      "description": "string"
    }
  ]
}
```

**Ràng buộc parse (FR-GEN-004.1)**:
- Mọi khóa bắt buộc phải tồn tại; thiếu khóa → coi là lỗi → FR-GEN-005.
- `warnings` luôn là mảng, có thể rỗng.

---

## 4. Dữ liệu mẫu (Demo — FR-FORM-003)

### Dự án mẫu 1 — Giao diện ô tô (khách Nhật)

| Trường | Giá trị |
|---|---|
| `project_description` | Dự án phần mềm giao diện ô tô cho khách hàng Nhật Bản |
| `challenge` | Áp dụng thiết kế mới mà không làm giảm hiệu năng |
| `solution` | Team đánh giá rủi ro trước và triển khai theo thứ tự ưu tiên |
| `result_metrics` | Giao hàng đúng hạn, khách đánh giá cao |
| `lesson` | Đánh giá rủi ro sớm giúp giảm sốc khi thay đổi thiết kế |
| `unsung_hero` | Kỹ sư kiểm thử hiệu năng (ẩn danh nếu muốn) |

### Dự án mẫu 2 — Đưa AI vào quy trình

| Trường | Giá trị |
|---|---|
| `project_description` | Đưa AI vào quy trình xử lý yêu cầu nội bộ |
| `challenge` | Nhân viên lo ngại độ chính xác và thay đổi quy trình |
| `solution` | Pilot trên 1 phòng ban, đo lường song song với quy trình cũ |
| `result_metrics` | Giảm 30% thời gian xử lý yêu cầu |
| `lesson` | Bắt đầu nhỏ, đo lường rõ, mở rộng dần |
| `unsung_hero` | Trưởng phòng pilot đã thuyết phục đội ngũ thử nghiệm |

---

## 5. Thuật ngữ miền (Domain Glossary)

| Thuật ngữ | Định nghĩa | Nguồn |
|---|---|---|
| Case study | Bài viết mô tả một dự án theo khung Bối cảnh → Thách thức → Giải pháp → Kết quả | BRD |
| Masking | Thay thế thông tin nhạy cảm bằng mô tả chung | BRD §4.5 |
| Bản nháp (Draft) | Đầu ra chưa phê duyệt, mặc định của mọi đầu ra | BRD §4.5 |
| FJP | Đối tác/tổ chức Nhật Bản của công ty | BRD |
| PDPA | Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân (VN) | BRD §9 |
| APPI | Act on the Protection of Personal Information (JP) | BRD §9 |
| Hashtag | Thẻ phân loại nội dung trên mạng xã hội/Teams | SRS FR-GEN-001.2 |