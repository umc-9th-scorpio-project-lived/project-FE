const LoginPage = () => {
  return (
    <main className="min-h-dvh bg-[#FCFDFF] font-suite">
      <section className="mx-auto flex min-h-dvh w-full max-w-[500px] flex-col items-center px-6">
        <div className="h-20" />

        <div className="mt-16 flex flex-col items-center">
          <div className="h-[103px] w-[103px] bg-primary-50" />

          <div className="mt-3 text-h1_24 text-gray-900 font-bold">살아보니,</div>
          <div className="mt-1 text-body_18 text-gray-900">열매가 맺히더라</div>
        </div>

        <div className="flex-1" />
        <div className="w-full pb-8">
          <div className="mx-auto w-full max-w-[320px]">
            <button
              type="button"
              className="flex h-[58px] w-full items-center justify-center gap-2 rounded-full border bg-[#FFEE50]"
            >
              <div className="h-4 w-4 rounded-full bg-black" />
              <span className="text-body_14 font-semibold text-gray-500">
                카카오 계정으로 시작하기
              </span>
            </button>

            <button
              type="button"
              className="mt-3 flex h-[58px] w-full items-center justify-center gap-2 rounded-full border  bg-white"
            >
              <div className="flex h-4 w-4 items-center justify-center font-bold text-black">G</div>
              <span className="text-body_14 font-semibold text-gray-500">
                구글 계정으로 시작하기
              </span>
            </button>

            <p className="mt-4 mx-auto text-center typo-body_reg12 text-gray-900">
              <span className="block">가입 시, 살아보니의</span>
              <span className="whitespace-nowrap">
                이용약관 및 개인정보처리방침에 동의하게 됩니다.
              </span>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
