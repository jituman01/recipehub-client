"use client";

import React, { useState } from 'react';
import { Heart } from "lucide-react";
import toast from 'react-hot-toast';
import { toggleLikeAction } from '@/lib/action/like';
import { useRouter } from 'next/navigation';

export default function RecipeLikeButton({ recipeId, initialLikes, initialIsLiked, isLoggedIn, signinRedirectUrl }) {
  const [likes, setLikes] = useState(initialLikes || 0);
  const [isLiked, setIsLiked] = useState(initialIsLiked || false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleLike = async () => {
    if (!isLoggedIn) {
      router.push(signinRedirectUrl);
      return;
    }

    if (isSubmitting || isLiked) return;
    setIsSubmitting(true);

    try {
      const result = await toggleLikeAction(recipeId);

      if (result.success) {
        setLikes(result.likesCount);
        setIsLiked(true);
        toast.success("Liked Successfully!");
      } else {
        toast.error(result.msg || "Already liked!");
        if (result.msg?.toLowerCase().includes("already")) setIsLiked(true);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <button 
      type="button"
      onClick={handleLike}
      disabled={isSubmitting || isLiked}
      className={`w-full flex items-center justify-center gap-2 border border-gray-200 dark:border-white/10 rounded-xl py-3 text-sm font-medium transition-colors ${isLiked ? "opacity-70 cursor-not-allowed bg-slate-50 dark:bg-slate-900" : "hover:bg-slate-100 dark:hover:bg-black cursor-pointer"}`}
    >
      <Heart 
        size={16} 
        className={isLiked ? "text-red-500" : "text-slate-800 dark:text-slate-200"} 
        fill={isLiked ? "currentColor" : "none"} 
      />
      <span className="text-slate-800 dark:text-slate-200">
        {isLiked ? "Liked" : `Like (${likes})`}
      </span>
    </button>
  );
}