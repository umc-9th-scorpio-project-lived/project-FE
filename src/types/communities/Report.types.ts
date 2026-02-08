import type { ReportReason, ReportTargetType } from '@/constants/report';

export type ReportRequest = {
  targetType: ReportTargetType;
  targetId: number;
  reason: ReportReason;
  detail?: string | null;
};

export type ReportResponse = {
  reportId: number;
};
