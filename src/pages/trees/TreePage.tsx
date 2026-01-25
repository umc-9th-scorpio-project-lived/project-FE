import FriendsSheet from "@/components/trees/FriendsSheet";
import RoutineTree from "@/components/trees/RoutineTree";
import GoldenFruitIcon from "@/icons/GoldenFruitIcon";
import GrowingFruitIcon from "@/icons/GrowingFruitIcon";
import InfoIcon from "@/icons/InfoIcon";
import MiniRightChevronIcon from "@/icons/MiniRightChevronIcon";
import NormalFruitIcon from "@/icons/NormalFruitIcon";
import useBaseModal from "@/stores/modals/baseModal";

const TreePage = () => {
  const { openModal } = useBaseModal();

  return (
    // 친구 목록 바텀시트가 루틴 나무를 가리는 걸 방지하기 위해 h-[120%] 추가
    <div className="bg-gray-50 w-full h-[120%] overflow-y-auto">
      <div className="pt-13.5 px-4 flex justify-between">
        <span className="typo-h2_bold20 text-gray-900">루틴 나무</span>

        <button
          onClick={() => {
            // 루틴나무_통계분석(주간통계)으로 전환
          }}
          className="border border-primary-50 rounded-2xl py-1.5 px-3.5 flex items-center"
        >
          <span className="typo-body_bold12 text-primary-50">통계 분석</span>
        </button>
      </div>

      <div className="pt-6 px-4 flex justify-between items-center">
        <div className="flex items-center gap-1.5">
          <span className="typo-body_reg16 text-gray-900">이번 달에 맺힌 열매</span>
          <button
            onClick={() => openModal("fruitInfoModal", { position: "center" })}
            className="cursor-pointer"
          >
            <InfoIcon className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        <button
          onClick={() => {
            // 루틴나무 모아보기 화면으로 전환
          }}
          className="flex items-center gap-0.5"
        >
          <span className="typo-body_reg12 text-gray-900">루틴 나무 모아보기</span>
          <MiniRightChevronIcon className="w-3 h-3 text-gray-900" />
        </button>
      </div>

      {/* 열매 개수 계산 로직 필요 */}
      <div className="pt-4 pb-15.5 px-4 flex items-center gap-7.5">
        <div className="flex items-center gap-1.5">
          <GoldenFruitIcon className="w-12.5" />
          <span className="typo-body_bold14 text-gray-900">2개</span>
        </div>

        <div className="flex items-center gap-1.5">
          <NormalFruitIcon className="w-12.5" />
          <span className="typo-body_bold14 text-gray-900">3개</span>
        </div>

        <div className="flex items-center gap-1.5">
          <GrowingFruitIcon className="w-12.5" />
          <span className="typo-body_bold14 text-gray-900">1개</span>
        </div>
      </div>

      <RoutineTree />

      <FriendsSheet />
    </div>
  );
};

export default TreePage;
