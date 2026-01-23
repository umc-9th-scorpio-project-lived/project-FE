import useBaseModal from "@/stores/modals/baseModal";

const HomePage = () => {
  const { openModal } = useBaseModal();
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex gap-2">
        <button
          onClick={() => openModal("centerModal", { position: "center" })}
          className="px-4 py-2 bg-primary-900 text-white rounded"
        >
          중앙 모달
        </button>

        <button
          onClick={() => openModal("bottomModal", { position: "bottom" })}
          className="px-4 py-2 bg-sub-900 text-white rounded"
        >
          하단 모달
        </button>
      </div>
    </div>
  );
};

export default HomePage;
