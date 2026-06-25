"use client";

import React, { useEffect, useState } from 'react';
import RecipeCard from '@/components/recipe/RecipeCard';

export default function FeaturedSection() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/recipes/featured`); 
      const data = await res.json();
      
      if (Array.isArray(data)) {
        setRecipes(data);
      }
      setLoading(false);
    };

    fetchFeatured();
  }, []);


  if (recipes.length === 0) return null;

  return (
    <div className="mt-10 w-full max-w-7xl mx-auto space-y-6 py-6">
      {/* Section Header */}
      <div className="space-y-1 text-center mx-auto">
        <h2 className="text-center text-2xl font-black tracking-tight sm:text-3xl items-center gap-2">
          <span className="text-yellow-500 text-center">✨ Featured</span> Recipes
        </h2>
        <p className="text-xs sm:text-sm text-default-400">
          Hand-picked premium culinary masterpieces curated by our editors.
        </p>
      </div>

      {/* Recipe Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe._id || recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}