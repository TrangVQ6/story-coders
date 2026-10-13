import { Answers } from './types';

export interface SampleProject {
  id: string;
  label: string;
  answers: Answers;
}

export const SAMPLES: SampleProject[] = [
  {
    id: 'sample-car-ui',
    label: 'Mẫu 1 — Giao diện ô tô (khách Nhật)',
    answers: {
      project_description: 'Phần mềm giao diện ô tô cho khách hàng Nhật Bản',
      challenge: 'Áp dụng thiết kế mới mà không làm giảm hiệu năng',
      solution: 'Team đánh giá rủi ro trước và triển khai theo thứ tự ưu tiên',
      result_metrics: 'Giao hàng đúng hạn, khách đánh giá cao',
      lesson: 'Đánh giá rủi ro sớm giúp giảm sốc khi thay đổi thiết kế',
      unsung_hero: 'Kỹ sư kiểm thử hiệu năng',
    },
  },
  {
    id: 'sample-ai-flow',
    label: 'Mẫu 2 — Đưa AI vào quy trình',
    answers: {
      project_description: 'Đưa AI vào quy trình xử lý yêu cầu nội bộ',
      challenge: 'Nhân viên lo ngại độ chính xác và thay đổi quy trình',
      solution: 'Pilot trên 1 phòng ban, đo lường song song với quy trình cũ',
      result_metrics: 'Giảm 30% thời gian xử lý yêu cầu',
      lesson: 'Bắt đầu nhỏ, đo lường rõ, mở rộng dần',
      unsung_hero: 'Trưởng phòng pilot đã thuyết phục đội ngũ thử nghiệm',
    },
  },
];
