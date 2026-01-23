import useBaseModal from "@/stores/modals/baseModal";
import { useState } from "react";

type DeleteOption = "CURRENT" | "AFTER" | "ALL";

const DeleteRoutineModal = () => {
  const { closeModal } = useBaseModal();

  const [selected, setSelected] = useState<DeleteOption | null>(null);

  const handleSelect = (value: DeleteOption) => {
    if (selected === value) {
      setSelected(null);
      return;
    } else setSelected(value);
  };

  const isSelected = selected !== null;

  const renderItem = (label: string, value: DeleteOption) => {
    const isSelected = selected === value;
    return (
      <div
        role="button"
        onClick={() => handleSelect(value)}
        className={`w-full px-4 py-4 rounded-lg typo-body_bold16 transition-colors
          ${
            isSelected
              ? "bg-primary-10 text-primary-50 border border-primary-50 shadow-mini"
              : selected
                ? "bg-gray-50 text-gray-200"
                : "bg-gray-50 text-gray-500"
          }`}
      >
        {label}
      </div>
    );
  };

  return (
    <div className="bg-white px-4 pt-10 pb-11 rounded-t-2xl flex flex-col gap-9">
      <div className="flex flex-col gap-2.5">
        {renderItem("해당 일정 삭제", "CURRENT")}
        {renderItem("이후 일정 삭제", "AFTER")}
        {renderItem("모든 일정 삭제", "ALL")}
      </div>

      <div
        role="button"
        className={`w-full rounded-full typo-body_bold18 py-3 text-center ${isSelected ? "bg-primary-50 text-screen-0" : "bg-gray-100 text-gray-400"}
        `}
        onClick={() => {
          if (!selected) return;
          else closeModal();
        }}
      >
        삭제하기
      </div>
    </div>
  );
};

export default DeleteRoutineModal;
