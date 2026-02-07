import AddFriendIcon from '@/icons/AddFriendIcon';
import MiniRightChevronIcon from '@/icons/MiniRightChevronIcon';
import SearchIcon from '@/icons/SearchIcon';
import {
  AnimatePresence,
  motion,
  useAnimation,
  useDragControls,
  type PanInfo,
} from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type SheetState = 'closed' | 'halfOpen' | 'open';

const FriendsSheet = () => {
  const navigate = useNavigate();

  const [state, setState] = useState<SheetState>('closed');

  // 애니메이션을 코드로 제어하기 위한 컨트롤러
  // controls.start(), controls.set() 등의 메서드로 애니메이션을 프로그래밍 방식으로 실행
  const controls = useAnimation();

  // 드래그 제어를 위한 컨트롤러
  const dragControls = useDragControls();

  const SHEET_HEIGHT = window.innerHeight * 0.85;
  const PEEK_HEIGHT = 184; // 초기 노출 높이

  const closedY = SHEET_HEIGHT - PEEK_HEIGHT;
  const halfOpenY = (SHEET_HEIGHT - PEEK_HEIGHT) / 2;

  // 시트 위치 초기화
  // controls.set()으로 초기 렌더링 시 애니메이션 없이 즉시 위치 설정
  useEffect(() => {
    controls.set({ y: closedY });
  }, [closedY, controls]);

  // 드래그 종료 시 로직: 사용자가 시트를 드래그하고 손을 뗐을 때 호출
  // info.velocity: 드래그 속도, info.offset: 드래그한 거리
  const onDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const shouldClose = info.velocity.y > 20 || info.offset.y > 100;
    const shouldOpen = info.velocity.y < -20 || info.offset.y < -100;

    if (shouldOpen) {
      setState('open');
      // controls.start()로 y=0 위치까지 부드럽게 애니메이션
      controls.start({ y: 0 });
    } else if (shouldClose) {
      setState('closed');
      // 닫힌 위치까지 부드럽게 애니메이션
      controls.start({ y: closedY });
    } else {
      // 위치가 애매할 경우 현재 상태 유지
      controls.start({
        y: state === 'closed' ? closedY : state === 'halfOpen' ? halfOpenY : 0,
      });
    }
  };

  const handleFocus = () => {
    setState('halfOpen');
    // input 포커스 시 시트를 반 정도 열기 (y = halfOpenY)
    controls.start({ y: halfOpenY });
  };

  const handleSheetClick = () => {
    if (state === 'closed') {
      setState('halfOpen');
      controls.start({ y: halfOpenY });
    }
  };

  const isSheetOpen = state === 'halfOpen' || state === 'open';

  return (
    <>
      {/* 배경 Dim 처리 (시트가 열렸을 때만 나타남) */}
      {/* AnimatePresence는 컴포넌트가 사라질 때 exit 애니메이션을 실행 */}
      <AnimatePresence>
        {isSheetOpen && (
          <motion.div
            // 나타날 때 시작 상태 (투명)
            initial={{ opacity: 0 }}
            // 나타난 후 최종 상태 (불투명)
            animate={{ opacity: 1 }}
            // 사라질 때 상태 (투명하게 페이드아웃)
            exit={{ opacity: 0 }}
            onClick={(e) => {
              e.stopPropagation();
              setState('closed');
              controls.start({ y: closedY });
            }}
            className="max-w-125 min-w-93.75 w-full fixed inset-0 mx-auto bg-black/25 overflow-hidden"
          />
        )}
      </AnimatePresence>

      <motion.div
        className="w-full fixed bottom-0 limit-width p-4 bg-screen-0 rounded-t-2xl shadow-footer-shadow flex flex-col items-center gap-3.5"
        drag="y" // y축 방향으로만 드래그 가능하게 설정
        dragControls={dragControls} // 드래그 컨트롤러 연결
        dragListener={false} // 기본 드래그 리스너 비활성화
        dragConstraints={{ top: 0, bottom: closedY }} // 드래그 가능한 범위 제한 (위쪽: 0, 아래쪽: closedY)
        dragElastic={0.05} // 드래그 시 저항감 (0-1, 낮을수록 더 딱딱함)
        onDragEnd={onDragEnd} // 드래그 종료 시 실행될 함수
        animate={controls} // controls로 애니메이션을 제어
        style={{ height: SHEET_HEIGHT, bottom: -SHEET_HEIGHT + PEEK_HEIGHT }}
        onClick={handleSheetClick}
        onPointerDown={(e) => {
          // 모든 영역에서 드래그 가능하도록 설정
          dragControls.start(e);
        }}
      >
        {/* 검색 영역 */}
        <div className="w-full flex items-center gap-3">
          <div className="relative flex-1">
            {/* input에는 typo-body_reg14가 적용되지 않음 */}
            <input
              className="w-full py-3 pl-4 pr-12 bg-gray-50 rounded-3xl text-gray-600 typo-body_reg14"
              type="text"
              placeholder="친구 이름 검색하기"
              onFocus={handleFocus}
            />

            <button
              onClick={() => {
                /* 검색 로직 */
              }}
              className="absolute top-1/4 right-3"
            >
              <SearchIcon className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          <AddFriendIcon className="w-8 h-8 text-gray-500" />
        </div>

        {/* 친구 목록 영역 */}
        <div className="w-full flex flex-col">
          <button
            onClick={() => {
              navigate('/lived/tree/friend');
            }}
            className="p-4 pr-2.5 flex justify-between items-center border-b border-gray-200 cursor-pointer"
          >
            <div className="typo-body_reg16 text-gray-900">이수민</div>

            <MiniRightChevronIcon className="w-4 h-4 text-gray-500" />
          </button>

          <button
            onClick={() => {
              navigate('/lived/tree/friend');
            }}
            className="p-4 pr-2.5 flex justify-between items-center border-b border-gray-200 cursor-pointer"
          >
            <div className="typo-body_reg16 text-gray-900">홍재원</div>

            <MiniRightChevronIcon className="w-4 h-4 text-gray-500" />
          </button>

          <button
            onClick={() => {
              navigate('/lived/tree/friend');
            }}
            className="p-4 pr-2.5 flex justify-between items-center border-b border-gray-200 cursor-pointer"
          >
            <div className="typo-body_reg16 text-gray-900">구유경</div>

            <MiniRightChevronIcon className="w-4 h-4 text-gray-500" />
          </button>

          <button
            onClick={() => {
              navigate('/lived/tree/friend');
            }}
            className="p-4 pr-2.5 flex justify-between items-center border-b border-gray-200 cursor-pointer"
          >
            <div className="typo-body_reg16 text-gray-900">장연주</div>

            <MiniRightChevronIcon className="w-4 h-4 text-gray-500" />
          </button>

          <button
            onClick={() => {
              navigate('/lived/tree/friend');
            }}
            className="p-4 pr-2.5 flex justify-between items-center border-b border-gray-200 cursor-pointer"
          >
            <div className="typo-body_reg16 text-gray-900">박경호</div>

            <MiniRightChevronIcon className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default FriendsSheet;
