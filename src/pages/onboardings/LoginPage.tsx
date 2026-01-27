import GoogleGIcon from "@/icons/GoogleIcon";
import KakaoIcon from "@/icons/KakaoIcon";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-dvh">
      <section className="mx-auto flex min-h-dvh w-full max-w-[500px] flex-col items-center">
        <div className="h-20" />
        {/* 로고 & 타이틀 영역 */}
        <div className="mt-16 flex flex-col items-center gap-1">
          <div className="h-[103px] w-[103px] bg-logo" />
          <div className="typo-h1_bold24 text-gray-900">살아보니,</div>
          <div className="typo-body_reg18 text-gray-900">열매가 맺히더라</div>
        </div>

        <div className="flex-1" />
        <div className="w-full pb-8 flex flex-col items-center gap-2">
          {/* Kakao Login Button */}
          <button
            type="button"
            onClick={() => navigate("/onboardings/basic-info")}
            className="
              flex items-center justify-center w-[290px] h-[58px] gap-[8px] rounded-full bg-[#FFEE50] py-[24px]"
          >
            <KakaoIcon className="size-8" />
            <span className="typo-body_reg14 font-semibold text-gray-400 whitespace-nowrap">
              카카오 계정으로 시작하기
            </span>
          </button>

          {/* Google Login Button */}
          <button
            type="button"
            className="flex items-center justify-center w-[290px] h-[58px] gap-2 rounded-full bg-screen-0 border-[0.5px] border-gray-900"
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
