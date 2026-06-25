"use client";

import React, { useState } from 'react';
import { Button } from "@heroui/react";
import { Star } from "lucide-react";
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';
import { addToFavoriteAction } from '@/lib/action/favorite';
import { useRouter } from 'next/navigation';

export default function RecipeFavoriteButton({ recipeId, isLoggedIn, signinRedirectUrl }) {
  const { data: session } = authClient.useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const router = useRouter();

  const handleAddToFavorite = async () => {
    if (!isLoggedIn || !session?.user) {
      toast.error("Please sign in first!");
      router.push(signinRedirectUrl);
      return;
    }

    if (isSubmitting) return;
    setIsSubmitting(true);
    
    try {
      const result = await addToFavoriteAction(
        session.user.id,
        session.user.email,
        recipeId
      );

      if (result.success) {
        toast.success(result.msg || "Added to favorites!");
        setIsFavorited(true); 
      } else {
        toast.error(result.msg || "Already added to favorites!");
        if (result.msg?.toLowerCase().includes("already")) {
          setIsFavorited(true);
        }
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
      disabled={isSubmitting}
      type="button"
      className="w-full flex items-center justify-center gap-2 border border-gray-200 dark:border-white/10 rounded-xl py-3 text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
    >
      <Star 
        size={16} 
        className={isFavorited ? "text-yellow-500" : "text-slate-800 dark:text-slate-200"} 
        fill={isFavorited ? "currentColor" : "none"}
      />
      <span>{isSubmitting ? "Saving..." : "Save to Favorites"}</span>
    </Button>
  );
}