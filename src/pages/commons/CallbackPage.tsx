import { useSocialAuthStore } from '@/stores/auths/socialAuthStore';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const toProviderEnum = (raw: string | null) => {
  if (!raw) return null;

  // 서버가 GOOGLE/KAKAO 형태로 내려주는 경우
  if (raw === 'GOOGLE' || raw === 'KAKAO') return raw;

  // 서버가 Kakao/Google 형태로 내려주는 경우
  const upper = raw.toUpperCase();
  if (upper === 'GOOGLE' || upper === 'KAKAO') return upper;

  return null;
};

// 소셜 로그인 후 리다이렉트가 진행되는 페이지
const CallbackPage = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const setSocialAuth = useSocialAuthStore((s) => s.setSocialAuth);

  useEffect(() => {
    const isNewMember = params.get('isNewMember') === 'true';

    // 신규 회원일 경우 - 회원가입을 위한 정보 입력 단계로 이동
    if (isNewMember) {
      const socialId = params.get('socialId') ?? '';
      const name = params.get('name') ?? '';
      const provider = toProviderEnum(params.get('provider'));

      // 신규 회원인데 필수 쿼리값이 누락되면, 이후 회원가입이 실패하므로 즉시 중단
      if (!socialId || !name || !provider) {
        // 팀 스타일에 맞춰 toast/모달로 대체 가능
        alert('소셜 로그인 정보가 올바르지 않습니다. 다시 시도해주세요.');
        navigate('/', { replace: true });
        return;
      }

      // 이후 온보딩에서 회원가입 요청에 사용할 소셜 정보를 스토어에 저장
      setSocialAuth({ socialId, provider, name });

      navigate('/onboardings/basic-info', { replace: true });
      return;
    }

    // 기존 회원일 경우 - (토큰은 HttpOnly Cookie로 내려온다고 가정) 홈 화면으로 이동
    navigate('/lived', { replace: true });
  }, [navigate, params, setSocialAuth]);

  return <></>;
};

export default CallbackPage;
