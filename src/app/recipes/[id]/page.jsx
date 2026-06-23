import { getRecipeById } from '@/lib/api/recipe';
import React from 'react';
import { notFound } from 'next/navigation';
import { Clock, Utensils, Award, CheckCircle, Heart, Flag } from "lucide-react";
import RecipeFavoriteButton from '@/components/recipe/RecipeFavoriteButton';
import RecipeLikeButton from '@/components/recipe/RecipeLikeButton';
import RecipeReportButton from '@/components/recipe/RecipeReportButton';

const RecipeDetailsPage = async ({ params }) => {
  const { id } = await params;
  const recipe = await getRecipeById(id);
  
  if (!recipe) {
    return notFound();
  }

  const ingredientsList = recipe.ingredients 
    ? recipe.ingredients.split("\n").filter(line => line.trim() !== "")
    : [];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-6 pb-12">
      
      {/* banner*/}
      <div className="relative h-[300px] sm:h-[600px] w-full rounded-3xl overflow-hidden shadow-md">
        <img 
          src={recipe.image || "https://placehold.co/600x400"} 
          alt={recipe.recipeName} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-6">
          <div className="text-white space-y-2">
            <span className="bg-orange-500 text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wider">
              {recipe.category || "General"}
            </span>
            <h1 className="text-2xl sm:text-4xl font-black">{recipe.recipeName}</h1>
            <p className="text-xs text-gray-300">
              Chef: <span className="text-orange-400 font-medium">{recipe.authorName || "Anonymous"}</span>
            </p>
          </div>
        </div>
      </div>

      {/*  Necessary Information: Time, Cuisine, Difficulty */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-default-50 dark:bg-slate-800 p-4 rounded-2xl border border-gray-400/40">
          <Clock size={20} className="text-orange-500 mx-auto mb-1" />
          <p className="text-[10px] text-default-400 font-semibold uppercase">Prep Time</p>
          <p className="text-sm font-bold">{recipe.prepTime || "N/A"} mins</p>
        </div>
        
        <div className="bg-default-50 dark:bg-slate-800 p-4 rounded-2xl border border-gray-400/40">
          <Utensils size={20} className="text-orange-500 mx-auto mb-1" />
          <p className="text-[10px] text-default-400 font-semibold uppercase">Cuisine</p>
          <p className="text-sm font-bold capitalize">{recipe.cuisineType || "International"}</p>
        </div>
        
        <div className="bg-default-50 dark:bg-slate-800 p-4 rounded-2xl border border-gray-400/40">
          <Award size={20} className="text-orange-500 mx-auto mb-1" />
          <p className="text-[10px] text-default-400 font-semibold uppercase">Difficulty</p>
          <p className="text-sm font-bold capitalize">{recipe.difficulty || "Easy"}</p>
        </div>
      </div>

            <div className="w-full bg-white dark:bg-slate-900 border border-default-200 dark:border-white/10 p-6 rounded-3xl shadow-sm space-y-4">
        <span className="text-[11px] font-bold text-gray-400 dark:text-gray-500 tracking-wider uppercase block">
          Actions
        </span>

        {/* Like Button */}
        <RecipeLikeButton recipeId={recipe._id} initialLikes={recipe.likesCount || 0} />

        {/*  Favorites  */}
        <RecipeFavoriteButton recipeId={recipe._id} />


        {/* Report Issue  */}
        <RecipeReportButton recipeId={recipe._id} />
      </div>

        {/* Purchase Details Button*/}
      <div>
        <form action={'/api/payment'} method='POST' className="w-full">
          <input type="hidden" value="4.99" name="price" />
          <input type="hidden" value={recipe.recipeName} name="recipeName" />
          <input type="hidden" value={recipe._id} name="recipeId" />
          <input type="hidden" value={recipe.image} name="image" />
          <input type="hidden" value={recipe.authorName} name="authorName" />
          <button 
            type="submit"
            className="w-full bg-orange-500 dark:bg-orange-800 hover:bg-orange dark:hover:bg-orange-700 text-white font-medium rounded-xl py-3 text-sm transition-colors shadow-sm cursor-pointer text-center block"
          >
            Purchase Recipe
          </button>
        </form>
      </div>

      {/*  Ingredients & Instructions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Ingredients Card */}
        <div className="md:col-span-1 bg-white dark:bg-slate-900 border border-default-200 p-6 rounded-2xl space-y-4">
          <h3 className="text-lg font-bold border-b pb-2 flex items-center gap-2">
            <CheckCircle size={18} className="text-orange-500" /> Ingredients
          </h3>
          <ul className="space-y-2 text-sm text-default-600 dark:text-default-300">
            {ingredientsList.length > 0 ? (
              ingredientsList.map((ing, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full flex-shrink-0" />
                  <span>{ing}</span>
                </li>
              ))
            ) : (
              <p className="text-xs text-default-400">{recipe.ingredients || "No ingredients listed."}</p>
            )}
          </ul>
        </div>

        {/* Instructions Card */}
        <div className="md:col-span-2 bg-white dark:bg-slate-900 border border-default-200 p-6 rounded-2xl space-y-4">
          <h3 className="text-lg font-bold border-b pb-2">Cooking Instructions</h3>
          <p className="text-sm text-default-600 dark:text-default-300 whitespace-pre-line leading-relaxed">
            {recipe.instructions || "No instructions provided."}
          </p>
        </div>

      </div>

    </div>
  );
};

export default RecipeDetailsPage;