"use client";

import React, { useEffect, useState, useRef } from 'react';
import RecipeCard from '@/components/recipe/RecipeCard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedSection() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/recipes/featured`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setRecipes(data);
        }
      } catch (err) {
        console.error("Failed to fetch recipes", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  useEffect(() => {
    if (recipes.length > 0) {
      const ctx = gsap.context(() => {
        gsap.from(".recipe-card-item", {
          scrollTrigger: {
            trigger: ".grid-container",
            start: "top 85%",
          },
          opacity: 0,
          y: 60,
          stagger: 0.15, 
          duration: 0.8,
          ease: "power3.out"
        });
      }, sectionRef);

      return () => ctx.revert();
    }
  }, [recipes]);

  if (loading || recipes.length === 0) return null;

  return (
    <section ref={sectionRef} className='bg-[#fef1e1] dark:bg-transparent transition-colors duration-300'>
      <div className="mt-20 w-full max-w-7xl mx-auto space-y-6 py-12 px-4">
        
        {/* Section Header */}
        <div className="space-y-1 text-center mx-auto mb-12">
          <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
            <span className="text-yellow-500">✨ Featured</span> Recipes
          </h2>
          <p className="text-xs sm:text-sm text-default-400">
            Hand-picked premium culinary masterpieces curated by our editors.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 grid-container">
          {recipes.map((recipe) => (
            <div key={recipe._id || recipe.id} className="recipe-card-item">
              <RecipeCard recipe={recipe} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}