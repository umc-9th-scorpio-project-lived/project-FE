import CalendarIcon from "@/icons/CalendarIcon";
import LeftChevronIcon from "@/icons/LeftChevronIcon";
import MiniGoldenFruitIcon from "@/icons/MiniGoldenFruitIcon";
import MiniGrowingFruitIcon from "@/icons/MiniGrowingFruitIcon";
import MiniNormalFruitIcon from "@/icons/MiniNormalFruitIcon";
import { useNavigate } from "react-router-dom";

const RoutineTrackerPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 w-full h-dvh overflow-y-auto flex flex-col items-center gap-6">
      <div className="w-full bg-primary-50 rounded-b-2xl pt-15.5 pb-5">
        <div className="px-4 py-2 flex justify-center items-center gap-7 relative">
          <button
            onClick={() => navigate("/lived/tree")}
            className="flex justify-center items-center cursor-pointer"
          >
            <LeftChevronIcon className="text-screen-0 w-7 h-7 absolute left-4" />
          </button>

          <div className="typo-h2_bold20 text-screen-0">루틴 트래커</div>
        </div>
      </div>

      <div className="w-full px-4 pb-6 flex flex-col gap-6">
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center gap-1">
            {/* 날짜 선택 모달 디자인 미완 */}
            <CalendarIcon className="w-6 h-6" />
            <span className="typo-body_reg16 text-gray-900">2025년 12월</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <MiniGoldenFruitIcon className="h-7" />
              <span className="typo-body_reg12 text-gray-900">8개</span>
            </div>

            <div className="flex items-center gap-1">
              <MiniNormalFruitIcon className="h-7" />
              <span className="typo-body_reg12 text-gray-900">8개</span>
            </div>

            <div className="flex items-center gap-1">
              <MiniGrowingFruitIcon className="h-7" />
              <span className="typo-body_reg12 text-gray-900">4개</span>
            </div>
          </div>
        </div>

        <div className="w-full px-4 py-6.5 bg-screen-0 rounded-2xl flex flex-col gap-5.5">
          <div className="typo-body_bold18">일어나자마자 이불 정리하기</div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <div className="typo-body_reg12 text-gray-900">달성률</div>
              <div className="typo-body_reg12 text-gray-900">90%</div>
            </div>

            <div className="relative w-full">
              <div className="w-full min-h-2 bg-gray-100 rounded-sm"></div>
              <div className="absolute top-0 left-0 w-9/10 min-h-2 bg-primary-50 rounded-sm"></div>
            </div>
          </div>

          <div className="px-4 py-3 border border-primary-50 rounded-lg">
            <div className="typo-body_reg14 text-gray-900">🏃🏼‍♀ 완벽해요! 황금열매를 얻었어요!</div>
          </div>

          <div className="w-full flex justify-center">
            <div className="px-4 grid grid-cols-8 gap-x-1 gap-y-2 place-items-center">
              {Array.from({ length: 30 }, (_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 bg-primary-40 rounded-lg flex items-center justify-center typo-body_reg16 text-screen-0"
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full px-4 py-6.5 bg-screen-0 rounded-2xl flex flex-col gap-5.5">
          <div className="typo-body_bold18">정해진 시간에 일어나기</div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <div className="typo-body_reg12 text-gray-900">달성률</div>
              <div className="typo-body_reg12 text-gray-900">60%</div>
            </div>

            <div className="relative w-full">
              <div className="w-full min-h-2 bg-gray-100 rounded-sm"></div>
              <div className="absolute top-0 left-0 w-6/10 min-h-2 bg-primary-50 rounded-sm"></div>
            </div>
          </div>

          <div className="px-4 py-3 border border-primary-50 rounded-lg">
            <div className="typo-body_reg14 text-gray-900">열매가 열렸어요!</div>
          </div>

          <div className="w-full flex justify-center">
            <div className="px-4 grid grid-cols-8 gap-x-1 gap-y-2 place-items-center">
              {Array.from({ length: 30 }, (_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 bg-primary-10 rounded-lg flex items-center justify-center typo-body_reg16 text-gray-300"
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full px-4 py-6.5 bg-screen-0 rounded-2xl flex flex-col gap-5.5">
          <div className="typo-body_bold18">빨래 돌리기</div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <div className="typo-body_reg12 text-gray-900">달성률</div>
              <div className="typo-body_reg12 text-gray-900">20%</div>
            </div>

            <div className="relative w-full">
              <div className="w-full min-h-2 bg-gray-100 rounded-sm"></div>
              <div className="absolute top-0 left-0 w-2/10 min-h-2 bg-primary-50 rounded-sm"></div>
            </div>
          </div>

          <div className="px-4 py-3 border border-primary-50 rounded-lg">
            <div className="typo-body_reg14 text-gray-900">아직 자라나는 중이에요</div>
          </div>

          <div className="w-full flex justify-center">
            <div className="px-4 grid grid-cols-8 gap-x-1 gap-y-2 place-items-center">
              {Array.from({ length: 30 }, (_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 bg-screen-0 rounded-lg flex items-center justify-center typo-body_reg16 text-gray-200"
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoutineTrackerPage;
