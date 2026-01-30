import LeftChevronIcon from '@/icons/LeftChevronIcon';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, useMotionValue, animate } from 'framer-motion';
import { useRef } from 'react';

type AlarmTab = 'ROUTINE' | 'COMMUNITY';
type CommunityCategory = 'ALL' | 'COMMENT' | 'TRENDING';

type AlarmLocationState = {
  initialTab?: AlarmTab;
};

const COMMUNITY_CATEGORIES: { label: string; value: CommunityCategory }[] = [
  { label: '전체', value: 'ALL' },
  { label: '댓글', value: 'COMMENT' },
  { label: '실시간 인기글', value: 'TRENDING' },
];

const REVEAL_PX = 80; // 오른쪽 버튼 노출 폭
const OPEN_THRESHOLD = 40; // 이 이상 밀면 열린 상태로 고정

type Props = {
  children: React.ReactNode;
  onRead?: () => void;
};

export const SwipeRow = ({ children, onRead }: Props) => {
  const x = useMotionValue(0);
  const isOpenRef = useRef(false);

  const snap = () => {
    const cur = x.get(); // 음수면 왼쪽으로 민 상태
    const open = cur <= -OPEN_THRESHOLD;

    isOpenRef.current = open;
    animate(x, open ? -REVEAL_PX : 0, {
      type: 'spring',
      stiffness: 500,
      damping: 40,
    });
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* 뒤에 깔리는 액션 영역(읽음 버튼) */}
      <div className="absolute inset-y-0 right-0 w-20 flex items-center justify-center bg-gray-100">
        <button
          className="typo-body_reg14 text-gray-900"
          onClick={() => {
            onRead?.();
            // 버튼 누르면 닫기
            animate(x, 0, { type: 'spring', stiffness: 500, damping: 40 });
            isOpenRef.current = false;
          }}
        >
          읽음
        </button>
      </div>

      {/* 실제 컨텐츠(드래그 되는 부분) */}
      <motion.div
        className="relative bg-screen-0"
        style={{ x, touchAction: 'pan-y' }} // 세로 스크롤은 유지
        drag="x"
        dragConstraints={{ left: -REVEAL_PX, right: 0 }}
        dragElastic={0.1}
        onDragEnd={snap}
        onPointerDown={() => {
          // 열린 상태에서 다른 곳 누르면 닫히게 하고 싶으면:
          if (isOpenRef.current) {
            animate(x, 0, { type: 'spring', stiffness: 500, damping: 40 });
            isOpenRef.current = false;
          }
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

const AlarmPage = () => {
  const navigate = useNavigate();
  const location = useLocation() as { state?: AlarmLocationState };

  // 알람 페이지 탭 상태
  const [tab, setTab] = useState<AlarmTab>(
    () => location.state?.initialTab ?? 'ROUTINE'
  );

  // 커뮤니티 카테고리 상태
  const [selectedCategory, setSelectedCategory] =
    useState<CommunityCategory>('ALL');

  const handleChangeTab = (next: AlarmTab) => {
    setTab(next);
    if (next === 'COMMUNITY') setSelectedCategory('ALL');
  };

  const isRoutine = tab === 'ROUTINE';
  const isCommunity = tab === 'COMMUNITY';

  return (
    <div className="w-full h-dvh pt-10">
      {/* 헤더 */}
      <div className="w-full py-2 px-4">
        <div className="relative flex w-full items-center justify-center">
          <LeftChevronIcon
            className="absolute left-0 w-7 h-7 text-gray-900"
            onClick={() => navigate(-1)}
          />
          <span className="typo-h2_bold20 text-gray-900">알림</span>
          <span className="absolute right-0 typo-body_reg12 text-gray-900">
            모두 읽음
          </span>
        </div>
      </div>
      {/* 탭 */}
      <div className="w-full flex">
        <div
          role="button"
          onClick={() => handleChangeTab('ROUTINE')}
          className={`w-1/2 py-2.5 text-center typo-body_bold18 ${
            isRoutine
              ? ' text-primary-50 border-b border-primary-50'
              : ' text-gray-400'
          }`}
        >
          루틴
        </div>

        <div
          role="button"
          onClick={() => handleChangeTab('COMMUNITY')}
          className={`w-1/2 py-2.5 text-center typo-body_bold18 ${
            isCommunity
              ? 'text-primary-50 border-b border-primary-50'
              : 'text-gray-400'
          }`}
        >
          커뮤니티
        </div>
      </div>

      {/* 커뮤니티 카테고리 chip */}
      {isCommunity && (
        <div className="w-full flex gap-2 px-4 py-2.5">
          {COMMUNITY_CATEGORIES.map(({ label, value }) => {
            const active = selectedCategory === value;

            return (
              <div
                key={value}
                role="button"
                onClick={() => setSelectedCategory(value)}
                className={`typo-body_reg12 py-2 px-3 rounded-2xl transition-colors
            ${active ? 'bg-primary-50 text-screen-0' : 'bg-gray-50 text-gray-800'}
          `}
              >
                {label}
              </div>
            );
          })}
        </div>
      )}

      {/* 알림 리스트 */}
      <div className="flex flex-col w-full">
        {/* 루틴 알림 */}
        {isRoutine && (
          <div className="flex flex-col w-full">
            <SwipeRow onRead={() => console.log('읽음 처리!')}>
              <div className="w-full flex p-4 bg-primary-10 gap-5 items-center">
                <div className="text-[28px]">💊</div>
                <div className="w-full flex flex-col gap-0.5">
                  <div className="w-full flex justify-between items-center typo-body_reg12 text-gray-300">
                    <span>루틴</span>
                    <span>23분 전</span>
                  </div>
                  <div className="flex flex-col items-start justify-center text-gray-900">
                    <span className="typo-body_reg16">물 1L 마시기</span>
                    <span className="typo-body_reg12">
                      루틴을 완료하셨나요?
                    </span>
                  </div>
                </div>
              </div>
            </SwipeRow>

            <div className="w-full flex p-4 bg-none gap-5 items-center">
              <div className="text-[28px]">🌳</div>
              <div className="w-full flex flex-col gap-0.5">
                <div className="w-full flex justify-between items-center typo-body_reg12 text-gray-300">
                  <span>루틴 나무</span>
                  <span>3일 전</span>
                </div>
                <div className="flex flex-col items-start justify-center text-gray-900">
                  <span className="typo-body_reg16">
                    새로운 열매가 열렸어요!
                  </span>
                  <span className="typo-body_reg12">
                    루틴 나무 확인하러 가기 {'>'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 커뮤니티 알림 */}
        {isCommunity && (
          <div className="flex flex-col w-full">
            <div className="w-full flex p-4 bg-primary-10 gap-5 items-center">
              <div className="text-[28px]">💬</div>
              <div className="w-full flex flex-col gap-0.5">
                <div className="w-full flex justify-between items-center typo-body_reg12 text-gray-300">
                  <span>댓글</span>
                  <span>4시간 전</span>
                </div>
                <div className="flex flex-col items-start justify-center text-gray-900">
                  <span className="typo-body_reg16">
                    민님 외 6명이 게시글에 좋아요를 남겼어요.
                  </span>
                  <span className="typo-body_reg12">
                    아 제발...ㅋㅋㅋㅋㅋㅋ
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full flex p-4 bg-none gap-5 items-center">
              <div className="text-[28px]">📈</div>
              <div className="w-full flex flex-col gap-0.5">
                <div className="w-full flex justify-between items-center typo-body_reg12 text-gray-300">
                  <span>실시간 인기글</span>
                  <span>4일 전</span>
                </div>
                <div className="flex flex-col items-start justify-center text-gray-900">
                  <span className="typo-body_reg16">
                    게시글이 실시간 인기글로 채택 됐어요!
                  </span>
                  <span className="typo-body_reg12">
                    게시글 확인하러 가기 {'>'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlarmPage;
