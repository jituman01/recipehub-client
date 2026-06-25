"use client";

import React, { useState } from 'react';
import { Flag } from "lucide-react";
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import RecipeReportModal from './RecipeReportModal';
import { useRouter } from 'next/navigation';

export default function RecipeReportButton({ recipeId, recipeName, isLoggedIn, signinRedirectUrl }) {
  const { data: session } = authClient.useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleOpenModal = () => {
    if (!isLoggedIn || !session?.user) {
      toast.error("Please sign in first to report!");
      router.push(signinRedirectUrl);
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="text-center pt-2">
        <button 
          onClick={handleOpenModal}
          type="button"
          className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 font-medium transition-colors inline-flex items-center gap-1.5 cursor-pointer"
        >
          <Flag size={13} /> Report Issue
        </button>
      </div>

      {isLoggedIn && session?.user && (
        <RecipeReportModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          recipeId={recipeId}
          recipeName={recipeName}
          userEmail={session.user.email}
        />
      )}
    </>
  );
}