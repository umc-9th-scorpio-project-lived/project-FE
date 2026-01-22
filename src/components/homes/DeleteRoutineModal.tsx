import useBaseModal from "@/stores/modals/baseModal";
import { useState } from "react";

type DeleteOption = "CURRENT" | "AFTER" | "ALL";

const DeleteRoutineModal = () => {
  const { closeModal } = useBaseModal();

  const [selected, setSelected] = useState<DeleteOption | null>(null);

  const handleSelect = (value: DeleteOption) => {
    setSelected(value);
    // closeModal();
  };

  const renderItem = (label: string, value: DeleteOption) => {
    const isSelected = selected === value;
    return (
      <div
        role="button"
        onClick={() => handleSelect(value)}
        className={`w-full px-4 py-4 rounded-lg typo-body_bold16 transition-colors
          ${
            isSelected
              ? "bg-primary-50 text-screen-0"
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
    <div className="bg-white px-4 pt-10 pb-11 rounded-t-2xl">
      <div className="flex flex-col gap-2.5">
        {renderItem("해당 일정 삭제", "CURRENT")}
        {renderItem("이후 일정 삭제", "AFTER")}
        {renderItem("모든 일정 삭제", "ALL")}
      </div>
    </div>
  );
};

export default DeleteRoutineModal;
