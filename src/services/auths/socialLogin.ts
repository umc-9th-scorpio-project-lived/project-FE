type Provider = "kakao" | "google";

// 카카오/구글 소셜 로그인 리다이렉트 API
export const redirectToSocialLogin = (provider: Provider) => {
  window.location.href = `https://api.saraboni.co.kr/api/auth/login/${provider}`;
};
