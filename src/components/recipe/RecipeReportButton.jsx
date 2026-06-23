"use client";

import React, { useState } from 'react';
import { Flag } from "lucide-react";
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import RecipeReportModal from './RecipeReportModal';

export default function RecipeReportButton({ recipeId, recipeName }) {
  const { data: session } = authClient.useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    if (!session?.user) {
      return toast.error("Please login first to report!");
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

      <RecipeReportModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        recipeId={recipeId}
        recipeName={recipeName}
        userEmail={session?.user?.email}
      />
    </>
  );
}