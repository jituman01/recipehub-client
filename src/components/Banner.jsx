"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Banner() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-transparent overflow-hidden px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full relative z-10">
        
        {/* LEFT SIDE: CONTENT */}
        <div className="text-left space-y-6 max-w-xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-green-500/10 dark:bg-yellow-500/20 text-green-600 dark:text-yellow-400 text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full border border-green-500/25"
          >
            <span>✨</span> Checking The Proxy!
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight"
          >
            Taste the Best that <br />
            <span className="text-orange-500 dark:text-orange-500">Surprise you</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-slate-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed"
          >
            Delicious, nutritious, meals made with fresh, organic ingredients for better you.
          </motion.p>

          {/* Pricing Info (Optional/Customizable) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-4 py-2"
          >
            <span className="text-2xl font-bold text-slate-900 dark:text-white">$15.00</span>
            <span className="text-slate-400 dark:text-zinc-500 line-through text-sm">$25.00</span>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center gap-4"
          >
            <Link
              href="/recipes"
              className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-full shadow-md hover:shadow-orange-600/20 active:scale-95 transition-all text-center text-sm min-w-[120px]"
            >
              Explore Menu
            </Link>
            
            
          </motion.div>
        </div>

        {/* RIGHT SIDE: IMAGE WITH ANIMATION */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 15 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          className="flex justify-center md:justify-end relative w-full aspect-square max-w-[450px] md:max-w-full mx-auto"
        >
          {/* Floating Leaf Particles For Better Visual Impact */}
          <div className="absolute top-10 left-5 w-6 h-6 bg-emerald-500/20 rounded-full blur-sm animate-bounce"></div>
          <div className="absolute bottom-16 right-10 w-6 h-4 bg-lime-500/30 rounded-full blur-xs animate-pulse"></div>

          <Image
            src="/banner.png"
            alt="Delicious Food Plate Banner"
            fill
            priority
            className="object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_20px_35px_rgba(255,255,255,0.05)]"
          />
        </motion.div>

      </div>
    </section>
  );
}