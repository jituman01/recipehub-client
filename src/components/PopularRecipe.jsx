"use client";

import React, { useEffect, useState } from 'react';
import PopularRecipeCard from './recipe/PopularRecipeCard';

export default function PopularRecipe() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopular = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/recipes/popular`); 
      const data = await res.json();
      
      if (Array.isArray(data)) {
        setRecipes(data);
      }
      setLoading(false);
    };

    fetchPopular();
  }, []);


  return (
    <div className="w-full space-y-16 py-12 max-w-7xl mx-auto ">
      {/* Section Header */}
      <div className="space-y-1 text-center">
        <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl items-center gap-2">
          <span className="text-yellow-500">🔥 Popular</span> Recipes
        </h2>
        <p className="text-xs sm:text-sm text-default-400">
          Most loved and highly upvoted recipes by our community members.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-16 mt-12">
        {recipes.map((recipe, index) => (
          <PopularRecipeCard 
            key={recipe._id || recipe.id} 
            recipe={recipe} 
            index={index} 
          />
        ))}
      </div>
    </div>
  );
}