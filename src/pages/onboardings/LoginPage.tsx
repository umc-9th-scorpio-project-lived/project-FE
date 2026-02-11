import GoogleGIcon from '@/icons/GoogleIcon';
import KakaoIcon from '@/icons/KakaoIcon';
import LogoIcon from '@/icons/LogoIcon';
import { redirectToSocialLogin } from '@/services/auths/socialLogin';

const LoginPage = () => {
  return (
    <main className="h-dvh">
      <section className="flex-1 flex h-full w-full max-w-125 flex-col items-center pb-8 justify-between">
        {/* 로고 & 타이틀 영역 */}
        <div className="flex flex-col items-center gap-6 pt-33.75">
          {/* <div className="w-full h-25 bg-logo bg-center bg-no-repeat" /> */}
          <LogoIcon />
          <div className="flex flex-col justify-center items-center">
            <div className="typo-h1_bold24 text-gray-900">살아보니,</div>
            <div className="typo-body_reg18 text-gray-900">열매가 맺히더라</div>
          </div>
        </div>

        <div className="w-full flex flex-col items-center gap-3">
          {/* Kakao Login Button */}
          <button
            type="button"
            onClick={() => redirectToSocialLogin('kakao')}
            className="flex items-center justify-center w-72.5 h-14.5 gap-2 rounded-full bg-[#FFEE50] py-6"
          >
            <KakaoIcon className="size-8" />
            <span className="typo-body_reg14 font-semibold text-gray-400 whitespace-nowrap">
              카카오 계정으로 시작하기
            </span>
          </button>

          {/* Google Login Button */}
          <button
            type="button"
            className="flex items-center justify-center w-72.5 h-14.5 gap-2 rounded-full bg-screen-0 border border-gray-900"
            onClick={() => redirectToSocialLogin('google')}
          >
            <GoogleGIcon className="size-6" />
            <span className="typo-body_reg14 font-semibold text-gray-400 whitespace-nowrap">
              구글 계정으로 시작하기
            </span>
          </button>

          {/* 약관 안내 문구 */}
          <p className="text-center typo-body_reg12 text-gray-900">
            <span className="block">가입 시, 살아보니의</span>
            <span className="whitespace-nowrap">
              이용약관 및 개인정보처리방침에 동의하게 됩니다.
            </span>
          </p>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
