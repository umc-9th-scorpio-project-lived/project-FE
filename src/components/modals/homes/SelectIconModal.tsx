import { useRoutineStore } from "@/stores/homes/routineStore";
import useBaseModal from "@/stores/modals/baseModal";

type IconSection = {
  title: string;
  icons: string[];
};

const ICON_SECTIONS: IconSection[] = [
  {
    title: "감정",
    icons: ["👍", "😁", "😂", "🤩", "🤪", "😤", "😶", "😍", "😪", "😎"],
  },
  {
    title: "음식",
    icons: ["☕️", "🥗", "🍎", "🥤", "🍕", "🍜", "🍱", "🍔", "🥐", "🍰"],
  },
  {
    title: "활동",
    icons: ["🛏️", "🏃", "📚", "💪", "🧘", "🎮", "🎨", "🎵", "✍️", "🍳"],
  },
  {
    title: "자연",
    icons: ["🌞", "🌙", "⭐️", "🌈", "🌸", "🌳", "🍃", "🌊", "🔥", "❄️"],
  },
  {
    title: "사물",
    icons: ["🎧", "💻", "📖", "✏️", "⚽️", "💡", "⏰", "📅", "🔔", "🎁"],
  },
  {
    title: "하트",
    icons: ["🩷", "❤️", "💔", "🤎", "💙", "🖤", "🤍", "🩶", "❤️‍🔥", "💗"],
  },
];

const SelectIconModal = () => {
  const { closeModal } = useBaseModal();

  const setIcon = useRoutineStore((s) => s.setIcon);

  const handlePick = (icon: string) => {
    setIcon(icon);
    closeModal();
  };

  return (
    <div className="bg-screen-0 px-4 pt-7 rounded-t-2xl max-h-[430px] flex flex-col gap-3.5">
      <span className="typo-h2_bold20 text-gray-900 px-4">아이콘 선택</span>
      <div className="px-4 pb-8 h-[380px] overflow-y-auto">
        <div className="flex flex-col gap-4">
          {ICON_SECTIONS.map((section) => (
            <div key={section.title} className="flex flex-col gap-2">
              <div className="typo-body_reg14 text-gray-800">{section.title}</div>

              <div className="grid grid-cols-5 gap-2">
                {section.icons.map((icon) => {
                  return (
                    <span
                      key={`${section.title}-${icon}`}
                      onClick={() => handlePick(icon)}
                      className="bg-[#E9E9E9] rounded-xl flex items-center justify-center py-3"
                    >
                      <span className="text-[24px] leading-none">{icon}</span>
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectIconModal;
