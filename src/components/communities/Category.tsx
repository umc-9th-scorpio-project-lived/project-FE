type CategoryProps = {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
};

const Category = ({ categories, selected, onSelect }: CategoryProps) => {
  return (
    <section className="flex my-2 gap-1 overflow-x-auto">
      {categories.map((category) => {
        const isActive = selected === category;
        return (
          <button
            key={category}
            onClick={() => onSelect(category)}
            className={`rounded-full px-3 py-1 text-[12px] shrink-0 ${isActive ? "bg-primary-50 text-screen-0" : "bg-gray-100 text-gray-600"}`}
          >
            {category}
          </button>
        );
      })}
    </section>
  );
};

export default Category;
