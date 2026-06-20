import { getAllRecipes } from '@/lib/api/recipe';
import React from 'react';
import RecipeCard from '@/components/recipe/RecipeCard';

const RecipesPage = async () => {
  const recipes = await getAllRecipes() || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
      <div className="space-y-2 border-b border-default-100 dark:border-white/5 pb-6">
        <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
          Explore All Recipes
        </h1>
        <p className="text-sm sm:text-base text-default-400">
          Discover delicious, hand-picked culinary arts from passionate chefs around the world.
        </p>
      </div>

      
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe._id || recipe.id} recipe={recipe} />
          ))}
        </div>
      
    </div>
  );
};

export default RecipesPage;