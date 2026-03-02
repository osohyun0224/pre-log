"use client";

interface CategoryTabsProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryTabs({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryTabsProps) {
  return (
    <div className="flex gap-3 flex-wrap">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`inline-flex items-center justify-center px-4 py-1.5 rounded-lg text-[15px] font-semibold leading-[160%] whitespace-nowrap transition-colors ${
            activeCategory === category
              ? "bg-[#e8f3ff] text-[#3182f6] dark:bg-[#1a2744] dark:text-[#4a9eff]"
              : "text-text-secondary-light dark:text-text-secondary-dark hover:text-[#3182f6] dark:hover:text-[#4a9eff]"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
