type Provider = "kakao" | "google";

// 카카오/구글 소셜 로그인 리다이렉트 API
export const redirectToSocialLogin = (provider: Provider) => {
  window.location.href = `http://13.209.154.236/api/auth/login/${provider}`;
};
