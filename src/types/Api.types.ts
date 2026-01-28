// API 공통 응답 타입
export type ApiResponse<T> = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
};

// API 에러 타입
export type ApiError = { status: number; code?: string; message: string; raw?: unknown };
