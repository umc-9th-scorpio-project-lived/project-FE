import type { ApiError, ApiResponse } from "@/types/Api.types";
import axios, {
  AxiosError,
  AxiosHeaders,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 쿠키 미포함 API
export const baseApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// 쿠키 포함 API
export const authApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const applyInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    (res) => {
      const data = res.data as ApiResponse<unknown>;

      // isSuccess 검사
      if (typeof data?.isSuccess === "boolean") {
        if (!data.isSuccess) {
          return Promise.reject({
            status: res.status,
            code: data.code,
            message: data.message ?? "요청에 실패했습니다.",
            raw: res,
          } satisfies ApiError);
        }
        return data.result;
      }

      // 공통 포맷이 아닌 응답일 경우 fallback
      return res.data;
    },
    (err: AxiosError<any>) => {
      const status = err?.response?.status ?? 0;
      const serverData = err?.response?.data;

      return Promise.reject({
        status,
        code: typeof serverData?.code === "string" ? serverData.code : undefined,
        message:
          serverData?.message ||
          serverData?.error ||
          err?.message ||
          "요청 중 오류가 발생했습니다.",
        raw: err,
      } satisfies ApiError);
    },
  );
};

const addAuthHeader = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    // headers가 AxiosHeaders인 경우
    if (config.headers instanceof AxiosHeaders) {
      config.headers.set("Authorization", `Bearer ${token}`);
    } else {
      // fallback: 일반 객체일 경우
      config.headers = new AxiosHeaders(config.headers);
      config.headers.set("Authorization", `Bearer ${token}`);
    }
  }

  return config;
};

const applyAuthHeader = (instance: AxiosInstance) => {
  instance.interceptors.request.use(addAuthHeader);
};

applyInterceptors(baseApi);
applyInterceptors(authApi);
applyAuthHeader(authApi);
