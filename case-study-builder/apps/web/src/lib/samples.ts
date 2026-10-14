import { Answers, AchievementType } from './types';

export interface SampleProject {
  id: string;
  label: string;
  type: AchievementType;
  answers: Answers;
}

export const SAMPLES: SampleProject[] = [
  {
    id: 'sample-team-topology',
    label: 'Mẫu 1 — Dự án triệu USD (đội nhóm)',
    type: 'team',
    answers: {
      team_intro:
        'Dự án hệ thống giao diện ô tô cho khách Nhật Bản, team phụ trách toàn bộ vòng đời phát triển từ thiết kế đến bàn giao',
      team_achievement:
        'Hoàn thành phase 1 trước hạn, khách tin tưởng giao tiếp phase 2 trị giá khoảng 500.000 USD',
      team_challenge:
        'Yêu cầu cao về kiến thức toán học và hiểu biết xây dựng, deadline gấp, thiếu nhân sự chuyên sâu',
      team_solution:
        'Đánh giá rủi ro trước, chia nhỏ milestone, phối hợp chặt chẽ offshore + onsite',
      team_tools: 'Ứng dụng AI hỗ trợ review code, áp dụng CI/CD tự động hóa',
      team_difference:
        'Chủ động đề xuất giải pháp thay vì chờ yêu cầu, đo lường tiến độ liên tục với khách',
      team_metrics: 'Giao hàng đúng hạn, khách đánh giá cao, mở rộng phase 2',
      team_feedback:
        'Khách đánh giá cao chất lượng, gửi thư cảm ơn và đề xuất mở rộng phase 3, 4',
      team_lesson: 'Đánh giá rủi ro sớm giúp giảm sốc khi thay đổi thiết kế',
      team_advice:
        'Bắt đầu nhỏ, đo lường rõ, mở rộng dần; luôn giữ kênh giao tiếp với khách',
    },
  },
  {
    id: 'sample-team-ai-flow',
    label: 'Mẫu 2 — Đưa AI vào quy trình (đội nhóm)',
    type: 'team',
    answers: {
      team_intro:
        'Dự án nội bộ tự động hóa quy trình xử lý yêu cầu bằng AI, team phát triển phối hợp với phòng ban pilot',
      team_achievement:
        'Giảm 30% thời gian xử lý yêu cầu, tạo nền tảng nhân rộng AI toàn tổ chức',
      team_challenge:
        'Nhân viên lo ngại độ chính xác của AI và thay đổi quy trình làm việc quen thuộc',
      team_solution:
        'Pilot trên 1 phòng ban, đo lường song song với quy trình cũ trước khi mở rộng',
      team_tools: 'AI hỗ trợ phân loại và gợi ý xử lý yêu cầu, dashboard đo lường hiệu quả',
      team_difference:
        'Đo lường song song với quy trình cũ, có số liệu chứng minh trước khi thuyết phục mở rộng',
      team_metrics: 'Giảm 30% thời gian xử lý yêu cầu',
      team_feedback: 'Phòng ban pilot hài lòng, đề xuất nhân rộng sang các phòng khác',
      team_lesson: 'Bắt đầu nhỏ, đo lường rõ, mở rộng dần',
      team_advice:
        'Luôn có số liệu so sánh trước/sau khi áp dụng để thuyết phục các bên liên quan',
    },
  },
];