import { COMMUNITY_CATEGORIES } from "@/constants/community";

type CategoryProps = {
  selected: string;
  onSelect: (category: string) => void;
};

const Category = ({ selected, onSelect }: CategoryProps) => {
  return (
    <section className="flex my-2 gap-1 overflow-x-auto">
      {COMMUNITY_CATEGORIES.map((category) => {
        const isActive = selected === category;
        return (
          <button
            key={category}
            onClick={() => onSelect(category)}
            className={`rounded-full px-3 py-1 text-[12px] shrink-0 ${isActive ? "bg-[#8FC600] text-[#FCFDFF]" : "bg-gray-100 text-gray-600"}`}
          >
            {category}
          </button>
        );
      })}
    </section>
  );
};

export default Category;
