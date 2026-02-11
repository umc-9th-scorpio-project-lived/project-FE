import { getFcmToken } from '@/services/notifications/getFcmToken';
import registerFcmToken from '@/services/notifications/registerFcmToken';
import { useSocialAuthStore } from '@/stores/auths/socialAuthStore';
import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const toProviderEnum = (raw: string | null) => {
  if (!raw) return null;
  if (raw === 'GOOGLE' || raw === 'KAKAO') return raw;

  const upper = raw.toUpperCase();
  if (upper === 'GOOGLE' || upper === 'KAKAO') return upper;

  return null;
};

const CallbackPage = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const setSocialAuth = useSocialAuthStore((s) => s.setSocialAuth);

  const ranRef = useRef(false);

  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;

    const run = async () => {
      const isNewMember = params.get('isNewMember') === 'true';
      const accessToken = params.get('accessToken');

      // 신규 회원
      if (isNewMember) {
        const socialId = params.get('socialId') ?? '';
        const name = params.get('name') ?? '';
        const provider = toProviderEnum(params.get('provider'));
        const email = params.get('email') ?? '';

        if (!socialId || !name || !provider || !email) {
          alert('소셜 로그인 정보가 올바르지 않습니다. 다시 시도해주세요.');
          navigate('/', { replace: true });
          return;
        }

        setSocialAuth({ socialId, provider, name, email });
        navigate('/onboardings/basic-info', { replace: true });
        return;
      }

      // 기존 회원
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
      }

      const userToken = localStorage.getItem('accessToken');

      if (userToken) {
        try {
          const fcmToken = await getFcmToken();
          if (fcmToken) {
            await registerFcmToken(fcmToken);
          }
        } catch {
          // 실패해도 로그인 흐름은 진행
        }
      }

      const redirectUrl = localStorage.getItem('redirectAfterLogin');
      if (redirectUrl) {
        localStorage.removeItem('redirectAfterLogin');
        window.location.href = redirectUrl;
        return;
      }

      navigate('/lived', { replace: true });
    };

    void run();
  }, [navigate, params, setSocialAuth]);

  return null;
};

export default CallbackPage;
