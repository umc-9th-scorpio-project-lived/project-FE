import WriteIcon from "@/icons/WirteIcon";

const WritingButton = () => {
  return (
    <div className="relative">
      <button className="fixed bottom-32 right-[calc((100vw-min(500px,100vw))/2+16px)] w-14 h-14 rounded-full bg-[#D4EA80] flex items-center justify-center shadow-lg z-50">
        <WriteIcon className="w-7 h-7 text-[#8FC600]" />
      </button>
    </div>
  );
};

export default WritingButton;
