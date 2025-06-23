import { useAtomValue } from "jotai";
import { categoriesStateUpwrapped } from "@/state";

export default function CategorySlider() {
  const categories = useAtomValue(categoriesStateUpwrapped);

  return (
    <div className="w-full overflow-x-auto py-3">
      <div className="flex space-x-4 px-2">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="flex flex-col items-center min-w-[80px] bg-white rounded-xl shadow hover:shadow-md transition p-2"
            style={{ minWidth: 80 }}
          >
            <img
              src={cat.icon || "/default-category.png"}
              alt={cat.name}
              className="w-12 h-12 object-contain mb-2"
            />
            <span className="text-xs text-center font-semibold text-gray-700">{cat.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}