"use client";

import React from "react";
import { motion } from "framer-motion";

// JSON Data Structure
const data = {
  features: [
    { id: 1, title: "SECRET RECIPES", icon: "🔥" },
    { id: 2, title: "MASTERCLASSES", icon: "👨‍🍳" },
    { id: 3, title: "ORGANIC INGREDIENTS", icon: "🥗" },
    { id: 4, title: "COMMUNITY HUB", icon: "🌍" },
    { id: 5, title: "PREMIUM ACCESS", icon: "💎" },
  ],
};

export default function MarqueeSection() {
  return (
    <section className="w-full  bg-white dark:bg-black/10 transition-colors duration-300">
      
      {/* 1. Transparent Marquee Section */}
      <div className="w-full py-6 overflow-hidden border-y border-zinc-200/20 dark:border-zinc-800/50 backdrop-blur-sm">
        <motion.div
          className="flex whitespace-nowrap gap-16"
          initial={{ x: "0%" }}
          animate={{ x: "-50%" }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
        >
          {[...data.features, ...data.features].map((item, index) => (
            <div key={index} className="flex items-center gap-6">
              <span className="text-slate-300 dark:text-zinc-400 font-bold text-sm md:text-base tracking-widest uppercase hover:text-yellow-500 dark:hover:text-yellow-500 transition-colors cursor-default flex items-center gap-2 italic">
                {item.icon} {item.title}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  );
}