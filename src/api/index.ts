import reissue from '@/services/auths/reissue';
import type { ApiError, ApiResponse } from '@/types/Api.types';
import axios, {
  AxiosError,
  AxiosHeaders,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 쿠키 미포함 API
export const baseApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// 쿠키 포함 API
export const authApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const applyInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    (res) => {
      const data = res.data as ApiResponse<unknown>;

      // isSuccess 검사
      if (typeof data?.isSuccess === 'boolean') {
        if (!data.isSuccess) {
          return Promise.reject({
            status: res.status,
            code: data.code,
            message: data.message ?? '요청에 실패했습니다.',
            raw: res,
          } satisfies ApiError);
        }
        return data.result;
      }

      // 공통 포맷이 아닌 응답일 경우 fallback
      return res.data;
    },
    (err: AxiosError<ApiError>) => {
      const status = err?.response?.status ?? 0;
      const serverData = err?.response?.data;

      return Promise.reject({
        status,
        code:
          typeof serverData?.code === 'string' ? serverData.code : undefined,
        message:
          serverData?.message || err?.message || '요청 중 오류가 발생했습니다.',
        raw: err,
      } satisfies ApiError);
    }
  );
};

const addAuthHeader = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const token = localStorage.getItem('accessToken');

  if (token) {
    // headers가 AxiosHeaders인 경우
    if (config.headers instanceof AxiosHeaders) {
      config.headers.set('Authorization', `Bearer ${token}`);
    } else {
      // fallback: 일반 객체일 경우
      config.headers = new AxiosHeaders(config.headers);
      config.headers.set('Authorization', `Bearer ${token}`);
    }
  }

  return config;
};

const applyAuthHeader = (instance: AxiosInstance) => {
  instance.interceptors.request.use(addAuthHeader);
};

let reissuePromise: Promise<string> | null = null;

const requestReissue = async (): Promise<string> => {
  if (!reissuePromise) {
    reissuePromise = reissue()
      .then((data) => {
        const newToken = data.accessToken;
        localStorage.setItem('accessToken', newToken);
        return newToken;
      })
      .finally(() => {
        reissuePromise = null;
      });
  }
  return reissuePromise;
};

const applyReissueInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    (res) => res,
    async (err: AxiosError<ApiError>) => {
      const status = err?.response?.status ?? 0;

      const originalConfig = err.config as
        | (InternalAxiosRequestConfig & {
            _retry?: boolean;
          })
        | undefined;

      if (!originalConfig) {
        return Promise.reject({
          status,
          code: err?.response?.data?.code,
          message: err?.response?.data?.message || err.message,
          raw: err,
        } satisfies ApiError);
      }

      const url = originalConfig.url ?? '';

      // 무한 루프 방지: reissue 요청이면 재시도 금지
      if (url.includes('/auth/reissue')) {
        return Promise.reject({
          status,
          code: err?.response?.data?.code,
          message: err?.response?.data?.message || err.message,
          raw: err,
        } satisfies ApiError);
      }

      // 401이 아니면 그대로 에러 처리
      if (status !== 401) {
        return Promise.reject({
          status,
          code: err?.response?.data?.code,
          message: err?.response?.data?.message || err.message,
          raw: err,
        } satisfies ApiError);
      }

      // 이미 재시도 했으면 더 하지 않음
      if (originalConfig._retry) {
        localStorage.removeItem('accessToken');
        return Promise.reject({
          status,
          code: err?.response?.data?.code,
          message: err?.response?.data?.message || '인증이 필요합니다.',
          raw: err,
        } satisfies ApiError);
      }

      originalConfig._retry = true;

      try {
        const newToken = await requestReissue();

        // 재시도 요청에 새 토큰 세팅
        if (originalConfig.headers instanceof AxiosHeaders) {
          originalConfig.headers.set('Authorization', `Bearer ${newToken}`);
        } else {
          originalConfig.headers = new AxiosHeaders(originalConfig.headers);
          originalConfig.headers.set('Authorization', `Bearer ${newToken}`);
        }

        return instance(originalConfig);
      } catch (reissueErr) {
        localStorage.removeItem('accessToken');
        return Promise.reject(reissueErr);
      }
    }
  );
};

applyAuthHeader(authApi); // 요청에 토큰 붙이기
applyReissueInterceptor(authApi); // 401 잡아서 reissue + 재시도 (AxiosError 살아있을 때!)
applyInterceptors(baseApi); // 성공/실패 공통 포맷 변환
applyInterceptors(authApi); // 성공/실패 공통 포맷 변환
