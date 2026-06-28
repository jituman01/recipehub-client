"use client";

import React, { useState } from 'react';
import { Button } from "@heroui/react";
import { Star } from "lucide-react";
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';
import { addToFavoriteAction } from '@/lib/action/favorite';
import { useRouter } from 'next/navigation';

export default function RecipeFavoriteButton({ recipeId, isLoggedIn, initialIsFavorited, signinRedirectUrl }) {
  const { data: session } = authClient.useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFavorited, setIsFavorited] = useState(initialIsFavorited || false);
  const router = useRouter();

  const handleAddToFavorite = async () => {
    if (!isLoggedIn || !session?.user) {
      toast.error("Please sign in first!");
      router.push(signinRedirectUrl);
      return;
    }

    if (isSubmitting || isFavorited) return;
    setIsSubmitting(true);
    
    try {
      const result = await addToFavoriteAction(session.user.id, session.user.email, recipeId);

      if (result.success) {
        toast.success("Added to favorites!");
        setIsFavorited(true); 
      } else {
        toast.error(result.msg || "Already added to favorites!");
        if (result.msg?.toLowerCase().includes("already")) setIsFavorited(true);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Button
      variant="bordered"
      onClick={handleAddToFavorite}
      disabled={isSubmitting || isFavorited}
      type="button"
      className={`w-full flex items-center justify-center gap-2 border rounded-xl py-3 text-sm font-medium transition-colors ${isFavorited ? "opacity-70 cursor-not-allowed" : "hover:bg-slate-100 dark:hover:bg-black cursor-pointer"}`}
    >
      <Star 
        size={16} 
        className={isFavorited ? "text-yellow-500" : "text-slate-800 dark:text-slate-200"} 
        fill={isFavorited ? "currentColor" : "none"}
      />
      <span className="text-slate-800 dark:text-slate-200">
        {isFavorited ? "Favorited" : "Save to Favorites"}
      </span>
    </Button>
  );
}