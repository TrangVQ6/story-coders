# Case Study Builder — Bộ tài liệu phân tích nghiệp vụ & kiến trúc

> **Ý tưởng:** Biến kết quả dự án thành câu chuyện ai cũng muốn đọc — chọn chủ đề (cá nhân/đội nhóm), trả lời 10 câu hỏi, nhận 5 đầu ra sẵn sàng phát hành theo giọng văn bản tin FUN.

> **🔄 Phiên bản 2.0 (2026-10-14):** Cấu trúc câu hỏi 2 chủ đề × 10 câu, checkbox xác nhận bảo mật (consent), đánh dấu nổi bật tên riêng + chữ cái đầu, giọng văn theo bản tin FUN. Xem [12-content-standard](./12-content-standard-question-banks-and-style.md), [ADR-005](./08-ADR-005-adaptive-question-bank.md), [ADR-006](./08-ADR-006-consent-and-publication-gate.md).

## Tổng quan tài liệu

### Nhóm 1 — Phân tích nghiệp vụ

| Tài liệu | Nội dung | Trạng thái |
|---|---|---|
| [01-BRD-CaseStudyBuilder.md](./01-BRD-CaseStudyBuilder.md) | Business Requirements Document — phân tích vấn đề, persona, giá trị, phạm vi, KPI, rủi ro, tuân thủ, roadmap | Draft v2.0 |
| [02-SRS-CaseStudyBuilder.md](./02-SRS-CaseStudyBuilder.md) | Software Requirements Specification — FR/NFR, MoSCoW, acceptance criteria | Draft v2.0 |
| [03-user-stories.md](./03-user-stories.md) | User stories theo persona + acceptance criteria | Draft v2.0 |
| [04-process-flows.md](./04-process-flows.md) | Process flows BPMN (Mermaid) — As-Is/To-Be, sequence, state, workflow 3 agent | Draft v2.0 |
| [05-data-dictionary.md](./05-data-dictionary.md) | Data dictionary — thực thể, thuộc tính, schema JSON, dữ liệu mẫu, thuật ngữ | Draft v2.0 |
| [06-traceability-matrix.md](./06-traceability-matrix.md) | Ma trận truy vết BR ↔ FR ↔ User Story ↔ NFR + coverage | Draft v2.0 |

### Nhóm 2 — Kiến trúc & kỹ thuật

| Tài liệu | Nội dung | Trạng thái |
|---|---|---|
| [07-system-design.md](./07-system-design.md) | System Design — kiến trúc 4 lớp, data flow, threat model, defense-in-depth, observability | Draft v2.0 |
| [08-ADR-001-spa-no-backend.md](./08-ADR-001-spa-no-backend.md) | ADR-001 — SPA không backend trong MVP | Accepted |
| [08-ADR-002-sanitization-defense-in-depth.md](./08-ADR-002-sanitization-defense-in-depth.md) | ADR-002 — Sanitization 3 lớp (L1 detector, L2 prompt, L3 residual scan) + L4 WarningGate | Accepted |
| [08-ADR-003-structured-llm-output.md](./08-ADR-003-structured-llm-output.md) | ADR-003 — Đầu ra LLM JSON có cấu trúc, strict validation | Accepted |
| [08-ADR-004-session-only-data.md](./08-ADR-004-session-only-data.md) | ADR-004 — Không lưu trữ dữ liệu trong MVP (session-only, PDPA) | Accepted |
| [08-ADR-005-adaptive-question-bank.md](./08-ADR-005-adaptive-question-bank.md) | ADR-005 — Bộ câu hỏi phân tích theo chủ đề (2 chủ đề × 10 câu) | Proposed |
| [08-ADR-006-consent-and-publication-gate.md](./08-ADR-006-consent-and-publication-gate.md) | ADR-006 — Cổng xác nhận bảo mật & sự đồng ý (Consent Gate) | Proposed |
| [09-technical-spec-prompts-and-security.md](./09-technical-spec-prompts-and-security.md) | Technical Spec — **toàn bộ prompt** (system v2.0/user/3-agent) + **security spec check tên khách hàng/tên dự án** (regex, blocklist, redaction mapping, chống injection) | Draft v2.0 |
| [10-api-contracts.md](./10-api-contracts.md) | API contracts — generateStory, LLM gateway, error codes, data flow, event log | Draft v2.0 |
| [11-implementation-blueprint.md](./11-implementation-blueprint.md) | **MVP Monorepo đã test** — toàn bộ mã nguồn TypeScript + Next.js + SQLite (service layer), 21 unit test + 16 E2E test PASSED | ✅ Tested (v1.0) |
| [12-content-standard-question-banks-and-style.md](./12-content-standard-question-banks-and-style.md) | **Content Standard v2.0** — bộ câu hỏi 2 chủ đề × 10, checkbox consent, đánh dấu tên riêng, giọng văn FUN | Draft v2.0 |

## Tóm tắt một trang

**Vấn đề:** Team dự án tạo ra nhiều thành tựu nhưng hiếm khi được kể lại — truyền thông nội bộ tốn 4–8 giờ/bài, tỷ lệ làm lại ~40%, thành tựu và bài học bị thất thoát.

**Giải pháp:** Web app một trang — người dùng **chọn chủ đề (thành tựu cá nhân / đội nhóm)**, trả lời **10 câu hỏi phân tích**, **tick 2 checkbox xác nhận bảo mật**, hệ thống **ẩn thông tin nhạy cảm + đánh dấu nổi bật tên riêng** và tạo **5 đầu ra** theo **giọng văn bản tin FUN**: bản tin nội bộ (~300 từ), post Teams, case study chuẩn khung (Bối cảnh → Thách thức → Giải pháp → Kết quả), bản dịch JA/EN, danh sách cảnh báo.

**Nguyên tắc vàng:**
1. An toàn trước tiên — privacy-by-default, mọi đầu ra đều qua masking; tên riêng được đánh dấu để rà soát hoặc viết chữ cái đầu.
2. Consent bắt buộc — quyền công khai hình ảnh + tính xác thực/đồng ý của người được nhắc tới.
3. Không bịa số liệu — chỉ dùng thông tin người dùng cung cấp.
4. Con người quyết định cuối cùng — mọi đầu ra là bản nháp, cần rà soát.
5. Giọng văn chuẩn — theo bản tin FUN (FPT Japan).
6. Đa ngôn ngữ sẵn sàng — VI/JA/EN phục vụ đối tác FJP và thương hiệu tuyển dụng.

**Chỉ số thành công chính:** tỷ lệ thành tựu được kể lại ≥ 50%; thời gian tạo bản nháp ≤ 10 phút; 0 lỗi lộ thông tin sau phát hành.

## Cấu trúc thư mục

```
docs/
├── 01-BRD-CaseStudyBuilder.md          # Nghiệp vụ (v2.0)
├── 02-SRS-CaseStudyBuilder.md          # Nghiệp vụ (v2.0)
├── 03-user-stories.md                  # Nghiệp vụ (v2.0)
├── 04-process-flows.md                 # Nghiệp vụ (v2.0)
├── 05-data-dictionary.md               # Nghiệp vụ (v2.0)
├── 06-traceability-matrix.md           # Nghiệp vụ (v2.0)
├── 07-system-design.md                 # Kiến trúc (v2.0)
├── 08-ADR-001-spa-no-backend.md        # Kiến trúc
├── 08-ADR-002-sanitization-defense-in-depth.md
├── 08-ADR-003-structured-llm-output.md
├── 08-ADR-004-session-only-data.md
├── 08-ADR-005-adaptive-question-bank.md        # MỚI — câu hỏi theo chủ đề
├── 08-ADR-006-consent-and-publication-gate.md  # MỚI — consent gate
├── 09-technical-spec-prompts-and-security.md   # Prompt v2.0 + security (v2.0)
├── 10-api-contracts.md                 # API contracts (v2.0)
├── 11-implementation-blueprint.md   # MVP monorepo đã test (21 unit + 16 E2E) + §6.1 thay đổi v2.0
├── 12-content-standard-question-banks-and-style.md  # MỚI — bộ câu hỏi, consent, tên riêng, giọng FUN
└── README.md
```

## MVP Monorepo — trạng thái kiểm thử

> **Đã test thật trên Node v20.20.2** (chi tiết: [11-implementation-blueprint.md §5](./11-implementation-blueprint.md#5-ket-qua-kiem-tra-da-chay-that))

- **21/21 unit + workflow tests PASSED** (vitest): EntityDetector (blocklist + regex R1–R7), StoryService (5 đầu ra, masking, no-hallucination), API E2E (generate, 422, GET by id)
- **16/16 Playwright E2E PASSED** trên browser thật: form → 5 tabs → masking "ABC Corporation" → WarningGate khóa Copy khi warning high → copy feedback
- Stack: TypeScript (Express + better-sqlite3) + Next.js 14 SPA, npm workspaces monorepo, service layer pattern

## Điểm bảo mật trọng tâm (check tên khách hàng/tên dự án + consent + tên riêng)

Xem [Technical Spec §3](./09-technical-spec-prompts-and-security.md#3-security-spec--check-tên-khách-hàng--tên-dự-án) — cơ chế **3 lớp defense-in-depth**:

1. **L1 — EntityDetector**: blocklist tên khách/tên dự án + regex (tổ chức EN/VI/JA, email, phone, số liệu mật) + nhận diện tên riêng (`proper_name`) trước khi gọi LLM.
2. **L2 — Prompt constraint**: directive redact/chữ cái đầu + danh sách thực thể truyền vào prompt + bọc `<user_data>` chống prompt injection + phong cách FUN.
3. **L3 — OutputScanner**: quét lại 5 đầu ra, phát hiện rò rỉ → warning `high` + khóa Copy; tên riêng nội bộ → warning `proper_name` + highlight.
4. **L4 — WarningGate**: rào cản UX buộc xác nhận trước khi copy.
5. **ConsentGate (ADR-006)**: 2 checkbox bắt buộc — quyền công khai hình ảnh + tính xác thực/đồng ý của khách hàng/người được nhắc tới.

## Câu hỏi mở cần chủ sản phẩm trả lời

Xem [BRD §13](./01-BRD-CaseStudyBuilder.md#13-câu-hỏi-mở-cần-làm-rõ-open-questions) — 7 câu hỏi ảnh hưởng đến Phase 2 (quy trình duyệt, lưu trữ, ẩn danh người hùng, ngân sách token, tích hợp Jira, upload hình ảnh, chuẩn chữ cái đầu).