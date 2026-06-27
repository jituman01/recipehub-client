import React from 'react';

const TrendingRecipe = () => {
  return (
    <section className="relative w-full py-20 md:py-32 overflow-hidden  transition-colors duration-300">
      
      <div className="relative max-w-[1400px] mx-auto bg-gradient-to-r from-yellow-400 to-yellow-400 dark:from-yellow-500 dark:to-yellow-500 rounded-[40px] md:rounded-[50px] mx-4 p-6 md:p-12 text-stone-900 dark:text-stone-950 shadow-xl min-h-[380px] md:min-h-[400px] flex items-center transition-all duration-300">
        
        <div className="absolute inset-0 opacity-[0.06] dark:opacity-[0.09] pointer-events-none select-none flex justify-around items-center overflow-hidden rounded-[40px] md:rounded-[50px]">
          <div className="text-8xl font-extrabold text-white rotate-[-15deg] transform translate-x-[-20%]">FRESH</div>
          <div className="text-8xl font-extrabold text-white rotate-[-15deg] transform translate-x-[20%]">TASTY</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full relative z-10">

          <div className="lg:col-span-7 space-y-5 md:space-y-6">
            
            <div className="space-y-2">
              <span className="bg-stone-950/10 dark:bg-stone-950/20 backdrop-blur-sm text-stone-900 dark:text-stone-950 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-stone-950/10 inline-block">
                🔥 Community Top Pick
              </span>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight uppercase font-sans text-stone-900 dark:text-stone-950">
                Trending Recipe <br />
                <span className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]">Of The Month</span>
              </h2>
              <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-900 max-w-xl font-medium leading-relaxed opacity-95">
                This stunning masterpiece has taken our platform by storm this month! Handcrafted by our top community chef, this refreshing creation balances pure nutrition with an unforgettable taste. Check out the key culinary metrics below.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-stone-900/15 dark:border-stone-950/20 max-w-lg">
              
              <div className="space-y-1">
                <span className="text-xl md:text-2xl font-black block font-mono text-white drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.15)]">4.9 ★</span>
                <span className="text-[10px] md:text-xs font-black uppercase tracking-wider block text-stone-900 dark:text-stone-950">Rating</span>
                <span className="text-[9px] md:text-[10px] text-stone-800 dark:text-stone-900/90 block leading-tight font-medium">From 1.2k+ active foodies reviews</span>
              </div>

              <div className="space-y-1">
                <span className="text-xl md:text-2xl font-black block font-mono text-white drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.15)]">12.5k</span>
                <span className="text-[10px] md:text-xs font-black uppercase tracking-wider block text-stone-900 dark:text-stone-950">Views Only</span>
                <span className="text-[9px] md:text-[10px] text-stone-800 dark:text-stone-900/90 block leading-tight font-medium">Most viewed recipe this week</span>
              </div>

              <div className="space-y-1">
                <span className="text-xl md:text-2xl font-black block font-mono text-white drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.15)]">189</span>
                <span className="text-[10px] md:text-xs font-black uppercase tracking-wider block text-stone-900 dark:text-stone-950">Calories</span>
                <span className="text-[9px] md:text-[10px] text-stone-800 dark:text-stone-900/90 block leading-tight font-medium">Perfect low-fat guilt-free diet</span>
              </div>

            </div>

          </div>

          <div className="lg:col-span-5 relative flex justify-center lg:justify-end min-h-[240px] lg:min-h-[350px]">
            
            <div className="absolute -bottom-12 lg:-bottom-20 lg:-top-72 right-0 left-0 lg:left-auto flex justify-center lg:block w-full lg:w-[135%] aspect-square max-w-[680px] z-20">
              <img 
                src="burger-new.png" 
                alt="Trending Recipe of the Month" 
                className="w-full h-full object-contain filter select-none pointer-events-none transform hover:scale-105 transition-transform duration-500"
              />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default TrendingRecipe;