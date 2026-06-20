"use client";

import React from "react";
import { Button } from "@heroui/react";
import { ChefHat, Clock, Globe, User } from "lucide-react";

const RecipeCard = ({ recipe }) => {
    const title = recipe.recipeName || "Untitled Recipe";
    const category = recipe.category || "General";
    const cuisine = recipe.cuisineType || "International";
    const prepTime = recipe.prepTime || "N/A";
    const difficulty = recipe.difficulty || "N/A";
    const imageUrl = recipe.image || "Image Not Found"; 
    
    const authorName = recipe.authorName || recipe.userName || "Anonymous User";

    const difficultyColors = {
        easy: "bg-success-50 text-success-600 dark:bg-success-900/30 dark:text-success-400 border-success-200",
        medium: "bg-warning-50 text-warning-600 dark:bg-warning-900/30 dark:text-warning-400 border-warning-200",
        hard: "bg-danger-50 text-danger-600 dark:bg-danger-900/30 dark:text-danger-400 border-danger-200",
    };

    return (
        <div className="group bg-white dark:bg-slate-900 border border-default-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
            
            <div className="relative h-70 w-full overflow-hidden bg-default-100">
                <img 
                    src={imageUrl} 
                    alt={title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                    <span className="text-[11px] font-bold px-2.5 py-1 bg-black/60 backdrop-blur-md text-white rounded-lg uppercase tracking-wider">
                        {category}
                    </span>
                    <span className={`text-[11px] font-bold px-2.5 py-1 border rounded-lg uppercase tracking-wider backdrop-blur-md ${difficultyColors[difficulty.toLowerCase()] || difficultyColors.easy}`}>
                        {difficulty}
                    </span>
                </div>
            </div>

            {/* info */}
            <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                <div className="space-y-3">
                    <div>
                        <h3 className="text-lg font-black text-foreground group-hover:text-orange-500 transition-colors line-clamp-1 mb-2">
                            {title}
                        </h3>
                        <div className="flex items-center gap-1  text-xs">
                            <Globe size={12} className="text-orange-500"/>
                            <span>{cuisine}</span>
                        </div>
                    </div>

                    {/* time */}
                    <div className="flex items-center gap-2 text-sm text-default-600 dark:text-default-300 bg-default-50 dark:bg-default-800/50 rounded-xl w-fit">
                        <Clock size={14} className="text-orange-500" />
                        <span className="font-medium text-xs">Time: {prepTime}</span>
                    </div>

                   {/* recipe added owner name*/}

                    <div className="flex items-center gap-1.5">
                        <div className=" flex items-center justify-center ">
                            <User size={12} />:
                        </div>
                        <span className="font-medium text-xs">
                           {authorName}
                        </span>
                    </div>
                    
                </div>

                <div className="border-t border-default-100 dark:border-white/5 pt-4 mt-2 space-y-3">
                    

                    <Button 
                        size="md" 
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-md shadow-orange-500/10 flex items-center gap-2"
                    >
                        <ChefHat size={16} />
                        View Details
                    </Button>
                </div>
            </div>

        </div>
    );
};

export default RecipeCard;