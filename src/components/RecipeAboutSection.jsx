"use client"
import React from 'react';
import animationData from '../animations/react.json';
import Lottie from 'lottie-react';

const RecipeAboutSection = () => {
  return (
    <section className="relative py-20 bg-[#FAF9F5] dark:bg-black/10  transition-colors duration-300 overflow-hidden">
      
      {/* Floating Elements */}
      <div className="absolute top-12 left-[10%] text-3xl opacity-30 animate-bounce duration-1000">🍃</div>
      <div className="absolute bottom-16 right-[8%] text-4xl opacity-30 rotate-45">🍅</div>
      <div className="absolute top-1/3 right-[12%] text-2xl opacity-30">🌿</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT SIDE: Lottie Animation Container */}
          <div className="lg:col-span-5 flex items-center justify-center min-h-[350px] relative">
            <div className="w-full max-w-[420px] aspect-square bg-transparent flex items-center justify-center border-2 border-dashed border-stone-200 dark:border-stone-700 rounded-3xl relative group overflow-hidden transition-colors duration-300">
               <Lottie animationData={animationData} loop={true} />
            </div>
          </div>

          {/* RIGHT SIDE: Text Content & Features */}
          <div className="lg:col-span-7 space-y-6">
            
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-red-500 dark:text-red-400 font-mono block mb-2">
                About Our Platform
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-stone-900 dark:text-stone-100 tracking-tight leading-tight uppercase transition-colors duration-300">
                Showcase Your Unique <br />
                <span className="text-amber-500 dark:text-amber-400">Homemade Recipes</span>
              </h2>
              <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 mt-4 leading-relaxed max-w-2xl transition-colors duration-300">
                Welcome to the ultimate hub for food creators! This is a social ecosystem built for passionate cooks, home chefs, and culinary artists to publish their unique recipes, share cooking secrets, and inspire foodies worldwide. It is not about ordering food—it is about celebrating the art of making it.
              </p>
            </div>

            {/* Premium Icon Features Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-stone-200/60 dark:border-stone-700/60 transition-colors duration-300">
              
              {/* Feature 1 */}
              <div className="flex flex-col items-start space-y-2">
                <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/30 flex items-center justify-center text-2xl border border-amber-100 dark:border-amber-900/50 shadow-sm transition-colors duration-300">
                  🍝
                </div>
                <h4 className="text-xs font-black uppercase tracking-wider text-stone-900 dark:text-stone-200 pt-1 leading-snug transition-colors duration-300">
                  Publish & Share <br />Your Creations
                </h4>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col items-start space-y-2">
                <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-950/30 flex items-center justify-center text-2xl border border-red-100 dark:border-red-900/50 shadow-sm transition-colors duration-300">
                  💡
                </div>
                <h4 className="text-xs font-black uppercase tracking-wider text-stone-900 dark:text-stone-200 pt-1 leading-snug transition-colors duration-300">
                  Discover Secret <br />Family Recipes
                </h4>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col items-start space-y-2">
                <div className="w-12 h-12 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-2xl border border-stone-200 dark:border-stone-700 shadow-sm transition-colors duration-300">
                  👥
                </div>
                <h4 className="text-xs font-black uppercase tracking-wider text-stone-900 dark:text-stone-200 pt-1 leading-snug transition-colors duration-300">
                  Build Your Loyal <br />Foodie Community
                </h4>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default RecipeAboutSection;