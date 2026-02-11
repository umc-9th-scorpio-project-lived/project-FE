import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useBaseModal from '@/stores/modals/baseModal';
import useOnboardingStore from '@/stores/onboarding/onboardingStore';
import LeftChevronIcon from '@/icons/LeftChevronIcon';
import DownChevronIcon from '@/icons/DownChevronIcon';

// YYYYMMDD -> YYYY.MM.DD
const formatBirth = (value: string) => {
  if (value.length <= 4) return value;
  if (value.length <= 6) return `${value.slice(0, 4)}.${value.slice(4)}`;
  return `${value.slice(0, 4)}.${value.slice(4, 6)}.${value.slice(6)}`;
};

const BasicInfoPage = () => {
  const navigate = useNavigate();
  const { openModal } = useBaseModal();

  // 온보딩 상태
  const { livingYear, gender, birth, setGender, setBirth } =
    useOnboardingStore();

  // 생년월일 유효성 검사
  const isInvalidBirth = useMemo(() => {
    if (!birth) return false;
    if (birth.length !== 8) return true;

    const year = Number(birth.slice(0, 4));
    const month = Number(birth.slice(4, 6));
    const day = Number(birth.slice(6, 8));

    if (month < 1 || month > 12) return true;

    const lastDay = new Date(year, month, 0).getDate();
    if (day < 1 || day > lastDay) return true;

    return false;
  }, [birth]);

  // 다음 버튼 활성화 조건
  const isNextEnabled = Boolean(
    livingYear && gender && birth && !isInvalidBirth
  );

  // 임시 처리:
  // 캘린더 클릭 시 항상 고정된 생년월일을 입력
  const setTempBirth = () => {
    openModal('setBirthModal', {
      position: 'center',
      props: {
        initialValue: birth
          ? {
              year: Number(birth.slice(0, 4)),
              month: Number(birth.slice(4, 6)),
              date: Number(birth.slice(6, 8)),
            }
          : undefined,
        onApply: ({
          year,
          month,
          date,
        }: {
          year: number;
          month: number;
          date: number;
        }) => {
          const y = String(year);
          const m = String(month).padStart(2, '0');
          const d = String(date).padStart(2, '0');
          setBirth(`${y}${m}${d}`);
        },
      },
    });
  };

  return (
    <main className="h-dvh font-suite flex">
      <section className="flex-1 flex h-full w-full max-w-125 flex-col px-4 pt-5 justify-between pb-8">
        <div className="flex flex-col gap-16">
          <div className="flex flex-col gap-6">
            {/* 상단 뒤로가기 */}
            <div className="h-11 w-full py-1.25">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="h-8.5 w-8.5 text-gray-900"
                aria-label="뒤로가기"
              >
                <LeftChevronIcon className="size-6" />
              </button>
            </div>

            {/* 진행바 */}
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-8 rounded-full bg-primary-50" />
                <span className="h-1.5 w-1.5 rounded-full bg-primary-30" />
                <span className="h-1.5 w-1.5 rounded-full bg-primary-30" />
              </div>
            </div>

            {/* 타이틀 */}
            <div className="flex flex-col">
              <span className="typo-h2_bold20 text-gray-900">
                반가워요! <br /> 당신의 이야기를 들려주세요.
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-7.5">
            {/* 자취 연차 */}
            <div className="flex flex-col gap-2">
              <div className="typo-body_reg14 text-gray-900">자취 연차</div>
              <button
                type="button"
                onClick={() =>
                  openModal('livingYearModal', { position: 'bottom' })
                }
                className="flex h-15 w-full items-center justify-between rounded-lg bg-gray-50 px-5"
              >
                <span
                  className={
                    livingYear
                      ? 'typo-body_bold16 text-gray-900'
                      : 'typo-body_reg16 text-gray-500'
                  }
                >
                  {livingYear || '자취 연차를 선택해주세요.'}
                </span>
                <DownChevronIcon className="size-6 text-gray-700" />
              </button>
            </div>

            {/* 성별 */}
            <div className="flex flex-col gap-2">
              <div className="typo-body_reg14 text-gray-900">성별</div>

              <div className="grid w-full grid-cols-3 gap-2">
                {(['남성', '여성', '기타'] as const).map((g) => {
                  const active = gender === g;

                  return (
                    <div
                      key={g}
                      role="button"
                      tabIndex={0}
                      onClick={() => setGender(g)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setGender(g);
                        }
                      }}
                      className={`h-14 w-full rounded-lg flex items-center justify-center
                    ${active ? 'typo-body_bold16 bg-primary-50 text-screen-0' : 'typo-body_reg16 bg-primary-20 text-gray-500'}`}
                    >
                      {g}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 생년월일 (임시 입력 방식) */}
            <div className="flex flex-col gap-2">
              <div className="text-gray-900 flex gap-0.5 items-center">
                <span className="typo-body_reg14">생년월일</span>
                <span className="typo-body_reg12">(8자리)</span>
              </div>

              <div className="relative">
                <div
                  role="button"
                  tabIndex={0}
                  onClick={setTempBirth}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setTempBirth();
                    }
                  }}
                  className={`h-15 w-full rounded-lg bg-gray-50 px-5 pr-12
                flex items-center cursor-pointer
                ${birth ? 'typo-body_bold16 text-gray-900' : 'typo-body_reg16 text-gray-900'}`}
                >
                  {birth ? (
                    formatBirth(birth)
                  ) : (
                    <span className="text-gray-300">2000.11.10</span>
                  )}
                </div>

                {/* 캘린더 버튼 */}
                <button
                  type="button"
                  onClick={() => {
                    setTempBirth(); // 임시 값 세팅
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-md p-2"
                  aria-label="생년월일 선택"
                >
                  <span className="bg-calender block size-6" />
                </button>

                {isInvalidBirth && (
                  <p className="pt-2 typo-body_reg12 text-alert-50">
                    8자리 생년월일을 입력해주세요.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div
          role="button"
          tabIndex={0}
          aria-disabled={!isNextEnabled}
          onClick={() => isNextEnabled && navigate('/onboardings/concern')}
          onKeyDown={(e) => {
            if (!isNextEnabled) return;
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              navigate('/onboardings/concern');
            }
          }}
          className={`h-12.5 w-full rounded-full flex items-center justify-center typo-body_bold18
              ${isNextEnabled ? 'bg-primary-50 text-screen-0' : 'bg-gray-100 text-gray-400 pointer-events-none'}`}
        >
          다음
        </div>
      </section>
    </main>
  );
};

export default BasicInfoPage;
