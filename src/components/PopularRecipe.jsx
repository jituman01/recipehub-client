"use client";

import React, { useEffect, useState, useRef } from 'react';
import PopularRecipeCard from './recipe/PopularRecipeCard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PopularRecipe() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/recipes/popular`); 
        const data = await res.json();
        if (Array.isArray(data)) {
          setRecipes(data);
        }
      } catch (error) {
        console.error("Error fetching popular recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopular();
  }, []);

  useEffect(() => {
    if (recipes.length > 0) {
      const ctx = gsap.context(() => {
        gsap.from(".popular-card-item", {
          scrollTrigger: {
            trigger: ".popular-grid",
            start: "top 80%",
          },
          opacity: 0,
          scale: 0.5,
          y: 30,
          stagger: 0.1, 
          duration: 0.6,
          ease: "back.out(1.7)"
        });
      }, sectionRef);

      return () => ctx.revert();
    }
  }, [recipes]);

  if (loading) return null;

  return (
    <section ref={sectionRef} className=''>
      <div className=''>
        <div className="w-full space-y-16 py-6 rounded-4xl px-10 dark:bg-black/20 bg-white max-w-7xl mx-auto mt-20 mb-20">
          
          {/* Section Header */}
          <div className="space-y-1 text-center ">
            <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl items-center gap-2">
              <span className="text-yellow-500">🔥 Popular</span> Recipes
            </h2>
            <p className="text-xs sm:text-sm text-default-400">
              Most loved and highly upvoted recipes by our community members.
            </p>
          </div>

          {/* Recipe Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-16 mt-25 popular-grid">
            {recipes.map((recipe, index) => (
              <div key={recipe._id || recipe.id} className="popular-card-item">
                <PopularRecipeCard 
                  recipe={recipe} 
                  index={index} 
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}