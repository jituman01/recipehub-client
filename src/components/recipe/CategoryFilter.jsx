'use client';
import { useSearchParams, useRouter } from 'next/navigation';

export default function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category');
  
  const categories = ['chicken', 'beef', 'mutton', 'dessert'];

  const handleCategoryClick = (cat) => {
    const params = new URLSearchParams(searchParams.toString());
    cat ? params.set('category', cat) : params.delete('category');
    router.push(`/recipes?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button 
        onClick={() => handleCategoryClick('')}
        className={`px-4 py-2 rounded-full border transition-all ${
          !activeCategory ? 'bg-yellow-500  text-white' : 'dark:text-white  dark:bg-black/10 border dark:border-gray-600 border-gray-300 hover:bg-gray-200'
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => handleCategoryClick(cat)}
          className={`px-4 py-2 rounded-full border capitalize transition-all ${
            activeCategory === cat ? 'bg-yellow-500  text-white' : 'dark:text-white dark:bg-black/10 border dark:border-gray-600 border-gray-300 hover:bg-gray-200'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}