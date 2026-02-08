type CategoryProps<T extends string> = {
  categories: T[];
  selected: T;
  onSelect: (category: T) => void;
};

const Category = <T extends string>({
  categories,
  selected,
  onSelect,
}: CategoryProps<T>) => {
  return (
    <section className="flex px-4 my-2 gap-2 overflow-x-auto">
      {categories.map((category) => {
        const isActive = selected === category;
        return (
          <div
            role="button"
            key={category}
            onClick={() => onSelect(category)}
            className={`rounded-2xl px-4 py-2 typo-body_reg12 shrink-0 ${isActive ? 'bg-primary-50 text-screen-0' : 'bg-gray-50 text-gray-800'}`}
          >
            {category}
          </div>
        );
      })}
    </section>
  );
};

export default Category;
