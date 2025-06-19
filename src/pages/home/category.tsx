import TransitionLink from "@/components/transition-link";
import { useAtomValue } from "jotai";
import { categoriesState } from "@/state";

export default function Category() {
  const categories = useAtomValue(categoriesState);

  return (
    <div className="bg-section overflow-x-auto py-2 px-4">
      <div className="flex gap-x-4 flex-nowrap w-max">
        {categories.map((category) => (
          <TransitionLink
            key={category.id}
            className="flex flex-col items-center space-y-1 flex-none cursor-pointer w-16"
            to={`/category/${category.id}`}
          >
            <img
              src={category.image}
              className="w-12 h-12 object-cover rounded-full bg-skeleton"
              alt={category.name}
            />
            <div className="text-center text-3xs w-full line-clamp-2 text-subtitle">
              {category.name}
            </div>
          </TransitionLink>
        ))}
      </div>
    </div>
  );
}
