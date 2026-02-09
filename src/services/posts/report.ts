import { authApi } from '@/api';
import type {
  ReportRequest,
  ReportResponse,
} from '@/types/communities/Report.types';

// 게시글/댓글 신고
export const report = async (body: ReportRequest): Promise<ReportResponse> => {
  return authApi.post(`/reports`, body);
};
