import RoutineTree from "@/components/trees/RoutineTree";
import LeftChevronIcon from "@/icons/LeftChevronIcon";
import MiniGoldenFruitIcon from "@/icons/MiniGoldenFruitIcon";
import MiniGrowingFruitIcon from "@/icons/MiniGrowingFruitIcon";
import MiniNormalFruitIcon from "@/icons/MiniNormalFruitIcon";
import { useNavigate } from "react-router-dom";

const TreeArchivePage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col items-center gap-5 overflow-y-auto">
      <div className="pt-10 px-4 w-full flex items-center gap-7">
        <button onClick={() => navigate("/lived/tree")} className="cursor-pointer">
          <LeftChevronIcon className="w-7 h-7 text-gray-900" />
        </button>
        <span className="typo-h2_bold20 text-gray-900">루틴 나무 모아보기</span>
      </div>

      {/* 페이지 바닥과 열매 개수 사이 여백을 위해 pb-4 추가 */}
      <div className="px-4 pb-4 w-full grid grid-cols-2 gap-x-4 gap-y-6 place-items-center">
        <div className="w-full flex flex-col items-center gap-4">
          <div className="w-full py-1 bg-primary-20 rounded-sm typo-body_bold14 text-gray-900 text-center">
            2025.10
          </div>

          <div className="w-full h-49 bg-gray-50 rounded-sm flex justify-center relative overflow-y-hidden">
            <div className="w-full absolute bottom-3">
              <RoutineTree width={111.26} isFruitClickable={false} />
            </div>
          </div>

          <div className="flex w-full justify-between items-center px-0.5">
            <div className="flex items-center gap-1">
              <MiniGoldenFruitIcon className="h-7" />
              <div className="typo-body_reg12 text-gray-900">8개</div>
            </div>

            <div className="flex items-center gap-1">
              <MiniNormalFruitIcon className="h-7" />
              <div className="typo-body_reg12 text-gray-900">8개</div>
            </div>

            <div className="flex items-center gap-1">
              <MiniGrowingFruitIcon className="h-7" />
              <div className="typo-body_reg12 text-gray-900">4개</div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col items-center gap-4">
          <div className="w-full py-1 bg-primary-20 rounded-sm typo-body_bold14 text-gray-900 text-center">
            2025.11
          </div>

          <div className="w-full h-49 bg-gray-50 rounded-sm flex justify-center relative overflow-y-hidden">
            <div className="w-full absolute bottom-3">
              <RoutineTree width={111.26} isFruitClickable={false} />
            </div>
          </div>

          <div className="flex w-full justify-between items-center px-0.5">
            <div className="flex items-center gap-1">
              <MiniGoldenFruitIcon className="h-7" />
              <div className="typo-body_reg12 text-gray-900">8개</div>
            </div>

            <div className="flex items-center gap-1">
              <MiniNormalFruitIcon className="h-7" />
              <div className="typo-body_reg12 text-gray-900">8개</div>
            </div>

            <div className="flex items-center gap-1">
              <MiniGrowingFruitIcon className="h-7" />
              <div className="typo-body_reg12 text-gray-900">4개</div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col items-center gap-4">
          <div className="w-full py-1 bg-primary-20 rounded-sm typo-body_bold14 text-gray-900 text-center">
            2025.12
          </div>

          <div className="w-full h-49 bg-gray-50 rounded-sm flex justify-center relative overflow-y-hidden">
            <div className="w-full absolute bottom-3">
              <RoutineTree width={111.26} isFruitClickable={false} />
            </div>
          </div>

          <div className="flex w-full justify-between items-center px-0.5">
            <div className="flex items-center gap-1">
              <MiniGoldenFruitIcon className="h-7" />
              <div className="typo-body_reg12 text-gray-900">8개</div>
            </div>

            <div className="flex items-center gap-1">
              <MiniNormalFruitIcon className="h-7" />
              <div className="typo-body_reg12 text-gray-900">8개</div>
            </div>

            <div className="flex items-center gap-1">
              <MiniGrowingFruitIcon className="h-7" />
              <div className="typo-body_reg12 text-gray-900">4개</div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col items-center gap-4">
          <div className="w-full py-1 bg-primary-20 rounded-sm typo-body_bold14 text-gray-900 text-center">
            2026.01
          </div>

          <div className="w-full h-49 bg-gray-50 rounded-sm flex justify-center relative overflow-y-hidden">
            <div className="w-full absolute bottom-3">
              <RoutineTree width={111.26} isFruitClickable={false} />
            </div>
          </div>

          <div className="flex w-full justify-between items-center px-0.5">
            <div className="flex items-center gap-1">
              <MiniGoldenFruitIcon className="h-7" />
              <div className="typo-body_reg12 text-gray-900">8개</div>
            </div>

            <div className="flex items-center gap-1">
              <MiniNormalFruitIcon className="h-7" />
              <div className="typo-body_reg12 text-gray-900">8개</div>
            </div>

            <div className="flex items-center gap-1">
              <MiniGrowingFruitIcon className="h-7" />
              <div className="typo-body_reg12 text-gray-900">4개</div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col items-center gap-4">
          <div className="w-full py-1 bg-primary-20 rounded-sm typo-body_bold14 text-gray-900 text-center">
            2026.02
          </div>

          <div className="w-full h-49 bg-gray-50 rounded-sm flex justify-center relative overflow-y-hidden">
            <div className="w-full absolute bottom-3">
              <RoutineTree width={111.26} isFruitClickable={false} />
            </div>
          </div>

          <div className="flex w-full justify-between items-center px-0.5">
            <div className="flex items-center gap-1">
              <MiniGoldenFruitIcon className="h-7" />
              <div className="typo-body_reg12 text-gray-900">8개</div>
            </div>

            <div className="flex items-center gap-1">
              <MiniNormalFruitIcon className="h-7" />
              <div className="typo-body_reg12 text-gray-900">8개</div>
            </div>

            <div className="flex items-center gap-1">
              <MiniGrowingFruitIcon className="h-7" />
              <div className="typo-body_reg12 text-gray-900">4개</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreeArchivePage;
