"use client";

import React, { useState } from 'react';
import { Heart } from "lucide-react";
import toast from 'react-hot-toast';
import { toggleLikeAction } from '@/lib/action/like';
import { useRouter } from 'next/navigation';

export default function RecipeLikeButton({ recipeId, initialLikes, isLoggedIn, signinRedirectUrl }) {
  const [likes, setLikes] = useState(initialLikes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleLike = async (e) => {
    if (!isLoggedIn) {
      router.push(signinRedirectUrl);
      return;
    }

    if (isSubmitting) return;
    setIsSubmitting(true);

    const result = await toggleLikeAction(recipeId);

    if (result.success) {
      setLikes(result.likesCount);
      setIsLiked(true);
      toast.success("Liked Successfully!");
    }

    setIsSubmitting(false);
  };

  return (
    <button 
      type="button"
      onClick={handleLike}
      disabled={isSubmitting}
      className="w-full flex items-center justify-center gap-2 border border-gray-200 dark:border-white/10 rounded-xl py-3 text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-black transition-colors cursor-pointer"
    >
      <Heart 
        size={16} 
        className={isLiked ? "text-red-500" : "text-slate-800 dark:text-slate-200"} 
        fill={isLiked ? "currentColor" : "none"} 
      />
      <span>Like ({likes})</span>
    </button>
  );
}