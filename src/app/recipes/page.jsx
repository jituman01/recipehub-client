import { getAllRecipes } from '@/lib/api/recipe';
import RecipeCard from '@/components/recipe/RecipeCard';
import SearchRecipe from '@/components/SearchRecipe';
import CategoryFilter from '@/components/recipe/CategoryFilter';
import PaginationControls from '@/components/recipe/PaginationControls';

const RecipesPage = async ({ searchParams }) => {
  const params = await searchParams;
  const search = params?.search || '';
  const category = params?.category || '';
  const currentPage = Number(params?.page) || 1;
  // console.log(currentPage);


  const { data: recipes = [], totalPage } = await getAllRecipes(search, category, currentPage) || {};
  // console.log(recipes);
  

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
      <h1 className="text-3xl font-black">Explore All Recipes</h1>
      
      <div className='flex flex-col sm:flex-row justify-between gap-4'>
        <CategoryFilter />
        <SearchRecipe />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
      {/* Pagination */}
      {totalPage > 1 && (
        <div className="flex justify-center mt-10">
          <PaginationControls totalPages={totalPage} currentPage={currentPage} />
        </div>
      )}


    </div>
  );
};

export default RecipesPage;