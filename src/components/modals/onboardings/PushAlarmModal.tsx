import { useNavigate } from 'react-router-dom';
import useBaseModal from '@/stores/modals/baseModal';
import AlarmIcon from '@/icons/AlarmIcon';

import useOnboardingStore from '@/stores/onboarding/onboardingStore';

import type { SignupRequest } from '@/types/auths/Auth.types';
import {
  toGenderEnum,
  toLivingPeriod,
  yyyymmddToDate,
} from '@/utils/homes/authUtils';
import { useSocialAuthStore } from '@/stores/auths/socialAuthStore';
import { useSignupStore } from '@/stores/auths/signupStore';

export default function PushAlarmModal() {
  const navigate = useNavigate();
  const { closeModal } = useBaseModal();

  // 온보딩에서 모아둔 값들
  const {
    livingYear,
    gender,
    birth,
    concerns,
    routineIds,
    setNotificationStatus,
  } = useOnboardingStore();

  // 콜백에서 저장해둔 소셜 값들
  const { socialId, provider, name, email } = useSocialAuthStore();

  // signup API 호출 상태
  const { isSigningUp, signupAction } = useSignupStore();

  const buildBody = (notificationStatus: 1 | 2): SignupRequest | null => {
    // 신규회원인데 소셜 값이 없으면 회원가입 불가
    if (!socialId || !provider || !name) return null;

    const body: SignupRequest = {
      socialId,
      provider,
      name,
      email,

      livingPeriod: toLivingPeriod(livingYear),
      gender: toGenderEnum(gender),
      birth: yyyymmddToDate(birth),

      concernIds: concerns,
      notificationStatus,

      ...(routineIds && routineIds.length > 0 ? { routineIds } : {}),
    };

    // 최소 검증
    if (!body.birth) return null;
    if (!body.livingPeriod) return null;
    if (!body.gender) return null;
    if (body.concernIds.length === 0) return null;

    return body;
  };

  const handleSelect = async (notificationStatus: 1 | 2) => {
    if (isSigningUp) return;

    // store에 notificationStatus 저장
    setNotificationStatus?.(notificationStatus);
    console.log({
      socialId,
      provider,
      name,
      email,
      concerns,
      birth,
      livingYear,
      gender,
      routineIds,
    });

    const body = buildBody(notificationStatus);
    if (!body) {
      alert(
        '회원가입에 필요한 정보가 부족합니다. 다시 로그인부터 진행해주세요.'
      );
      closeModal();
      navigate('/', { replace: true });
      return;
    }

    console.log('signup body =>', body);
    const result = await signupAction(body);

    if (!result) {
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
      return;
    }

    localStorage.setItem('accessToken', result.accessToken);
    localStorage.setItem('refreshToken', result.refreshToken);

    closeModal();

    if (notificationStatus === 1) {
      navigate('/onboardings/push-guide', { replace: true });
    } else {
      navigate('/lived', { replace: true });
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="relative w-full rounded-2xl bg-screen-0 flex flex-col items-center gap-8.5 px-5 py-5"
    >
      {/* content */}
      <div className="flex flex-col items-center gap-3.75">
        {/* 아이콘 */}
        <div className="flex items-center justify-center pt-4.5">
          <AlarmIcon className="h-12.5 w-12.5" />
        </div>

        {/* 타이틀 */}
        <div className="text-center typo-body_bold18 text-gray-900">
          알림으로 하루의 리듬을 가볍게 맞춰보세요!
        </div>

        {/* 설명 */}
        <div className="text-center typo-body_reg16 text-gray-900">
          설정한 루틴 시간에 알림을 보내드려요.
          <br />
          꾸준한 습관 형성을 도와드릴게요!
        </div>
      </div>

      {/* buttons */}
      <div className="mt-auto flex w-full flex-col gap-2.5">
        <div
          role="button"
          onClick={() => handleSelect(1)}
          aria-disabled={isSigningUp}
          className={`flex justify-center items-center h-12.75 w-full rounded-lg typo-body_bold16 text-screen-0 ${isSigningUp ? 'bg-primary-20' : 'bg-primary-50'}`}
        >
          알림 받기
        </div>

        <div
          role="button"
          onClick={() => handleSelect(2)}
          aria-disabled={isSigningUp}
          className={`flex justify-center items-center h-12.75 w-full rounded-lg typo-body_bold16 text-gray-400 ${isSigningUp ? 'bg-gray-50' : 'bg-gray-100'}`}
        >
          나중에 설정할게요
        </div>
      </div>
    </div>
  );
}
