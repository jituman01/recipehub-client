"use client";

import React from 'react';
import Image from 'next/image';
import { BiUserCircle } from 'react-icons/bi'; 
import { FcLike } from 'react-icons/fc';

const colorOptions = [
  'bg-pink-200 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300',
  'bg-orange-200 dark:bg-orange-900/40 text-orange-800 dark:text-orange-300',
  'bg-emerald-200 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300',
  'bg-indigo-200 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-300',
];

const PopularRecipeCard = ({ recipe, index }) => {
  const cardColor = colorOptions[index % colorOptions.length];
  
  const { 
    recipeName, 
    image , 
    likesCount, 
    authorName 
  } = recipe;

  return (
    <div className={`relative group w-full rounded-4xl p-6 ${cardColor} flex flex-col items-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}>
      
      <div className="absolute -top-12 w-27 h-27 rounded-full border-5 border-white dark:text-black/10 shadow-xl overflow-hidden z-10 transition-transform duration-500 group-hover:scale-105">
        <Image 
          src={image}
          alt={recipeName}
          fill
          className="object-cover"
        />
      </div>

      <div className="mt-20 flex-grow w-full text-center space-y-4">
        
        <h3 className="font-extrabold text-sm tracking-tighter leading-tight line-clamp-2 flex items-center justify-center">
          {recipeName}
        </h3>

        <p className="text-xs font-semibold flex items-center justify-center gap-1.5 opacity-80 ">
          <BiUserCircle className="w-4 h-4" />
          <span>{authorName}</span>
        </p>

        <div className="flex items-center justify-center gap-2 pt-2">
          <FcLike className="w-3 h-3" />
          <span className="font-semibold text-sm text-black/70 dark:text-white">
            {`${likesCount} Likes`}
          </span>
        </div>

      </div>

    </div>
  );
};

export default PopularRecipeCard;