// 📂 PATH: app/recipes/[id]/page.jsx
import { getRecipeById } from '@/lib/api/recipe';
import React from 'react';
import { notFound } from 'next/navigation';
import { Button } from "@heroui/react";
import { Heart, ThumbsUp, AlertTriangle, Clock, Utensils, Award, CreditCard, CheckCircle } from "lucide-react";

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
    <div className=" container mx-auto px-4 py-8 max-w-6xl space-y-6 pb-12">
      
      {/* ১. banner*/}
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

      {/*  (Like Count, Purchase, Like, Favorite, Report) */}
      <div className='space-y-5'>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white dark:bg-slate-900 border border-default-200 p-5 rounded-3xl shadow-sm">
        
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-center sm:justify-start">
          {/* Like Count & Like Button */}
          <Button 
            variant="flat" 
            color="primary" 
            className="font-bold"
            startContent={<ThumbsUp size={18} fill="currentColor" />}
          >
            {recipe.likes || 12} Likes
          </Button>

          {/*  Favorite Button */}
          <Button 
            isIconOnly 
            variant="flat" 
            color="danger"
            title="Add to Favorite"
          >
            <Heart size={20} />
          </Button>

          {/* Report Button (Will show modal) */}
          <Button 
            isIconOnly 
            variant="flat" 
            color="warning"
            title="Report Recipe"
          >
            <AlertTriangle size={20} />
          </Button>
        </div>

        {/* Stripe Purchase Button */}
        <div className="w-full sm:w-auto">
            <form action={'/api/payment'} method='POST'>
              <input type="hidden" value="4.99" name="price" />
              <input type="hidden" value={recipe.recipeName} name="recipeName" />
              <input type="hidden" value={recipe._id} name="recipeId" />
              <input type="hidden" value={recipe.image} name="image" />
              <input type="hidden" value={recipe.authorName} name="authorName" />
              <Button
              type='submit'  
            color="success" 
            className="w-full sm:w-auto bg-emerald-600 text-white font-black px-6 py-6 rounded-2xl shadow-lg shadow-emerald-600/20 flex items-center gap-2 text-sm uppercase tracking-wider"
            startContent={<CreditCard size={18} />}
          >
            Purchase Recipe ($4.99)
          </Button>
          </form>
        </div>
      </div>

      {/* (Necessary Information: Time, Cuisine, Difficulty) */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-default-50 dark:bg-slate-800 p-4 rounded-2xl border border-gray-400">
          <Clock size={20} className="text-orange-500 mx-auto mb-1" />
          <p className="text-[10px] text-default-400 font-semibold uppercase">Prep Time</p>
          <p className="text-sm font-bold">{recipe.prepTime || "N/A"} mins</p>
        </div>
        
        <div className="bg-default-50 dark:bg-slate-800 p-4 rounded-2xl border border-gray-400">
          <Utensils size={20} className="text-orange-500 mx-auto mb-1" />
          <p className="text-[10px] text-default-400 font-semibold uppercase">Cuisine</p>
          <p className="text-sm font-bold capitalize">{recipe.cuisineType || "International"}</p>
        </div>
        
        <div className="bg-default-50 dark:bg-slate-800 p-4 rounded-2xl border border-gray-400">
          <Award size={20} className="text-orange-500 mx-auto mb-1" />
          <p className="text-[10px] text-default-400 font-semibold uppercase">Difficulty</p>
          <p className="text-sm font-bold capitalize">{recipe.difficulty || "Easy"}</p>
        </div>
      </div>

      {/* (Ingredients) &(Instructions) */}
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

    </div>
  );
};

export default RecipeDetailsPage;