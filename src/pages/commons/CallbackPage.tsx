import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

// 소셜 로그인 후 리다이렉트가 진행되는 페이지
const CallbackPage = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  useEffect(() => {
    const isNewMember = params.get("isNewMember") === "true";

    // 신규 회원일 경우 - 회원가입을 위한 정보 입력 단계로 이동
    if (isNewMember) {
      navigate("/onboardings/basic-info", { replace: true });
      return;
    }

    // 기존 회원일 겨우 - 홈 화면으로 이동
    navigate("/lived", { replace: true });
  }, [navigate, params]);

  return <></>;
};

export default CallbackPage;
