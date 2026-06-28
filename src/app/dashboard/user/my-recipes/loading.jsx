'use client';

import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-transparent">
      {/* Dot Loading Animation */}
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-neutral-900 dark:bg-zinc-200 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-3 h-3 bg-neutral-900 dark:bg-zinc-200 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-3 h-3 bg-neutral-900 dark:bg-zinc-200 rounded-full animate-bounce"></div>
      </div>
      
      {/* Loading Text */}
      <p className="mt-6 text-[10px] font-bold text-neutral-500 dark:text-zinc-500 tracking-[0.2em] animate-pulse uppercase">
        Loading please wait
      </p>
    </div>
  );
}