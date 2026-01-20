// src/components/products/CategoryFilters.tsx
import { Category } from "../../types/index";

interface Props {
  categories: Category[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

export const CategoryFilters = ({ categories, selectedId, onSelect }: Props) => {
  return (
    <div className="flex flex-wrap gap-3 mb-10">
      <button
        onClick={() => onSelect(null)}
        className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
          selectedId === null 
          ? "bg-blue-600 text-white shadow-lg" 
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
      >
        Todos
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
            selectedId === cat.id 
            ? "bg-blue-600 text-white shadow-lg" 
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {cat.name.toUpperCase()}
        </button>
      ))}
    </div>
  );
};