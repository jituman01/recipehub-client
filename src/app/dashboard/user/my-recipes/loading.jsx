'use client';

import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-transparent">
      <div className="relative flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-default-200 border-t-neutral-900 dark:border-t-zinc-200 rounded-full animate-spin"></div>
      </div>
      <p className="mt-4 text-xs font-bold text-default-500 tracking-wider animate-pulse">
        LOADING PAGE...
      </p>
    </div>
  );
}