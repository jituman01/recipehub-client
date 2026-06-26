"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { PiCookingPot } from "react-icons/pi";
import { Button } from "@heroui/react";

const sliderImages = [
  { id: 1, src: "/burger-bg.png", alt: "The Double Decker Burger" },
  { id: 2, src: "/bg-2.png", alt: "Special Recipe Dish" },
  { id: 3, src: "/bg-5.png", alt: "Healthy Salad Bowl" },
  { id: 4, src: "/chicken-fry.png", alt: "Mexican Fry" },
];

const SLIDE_INTERVAL = 3500;

export default function Banner() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === sliderImages.length - 1 ? 0 : prevIndex + 1
      );
    }, SLIDE_INTERVAL);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentImageIndex]);

  const slideVariants = {
    initial: {
      opacity: 0,
      scale: 1.1,
      x: 30
    },
    animate: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 1.2,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      x: -30,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <section className="relative min-h-[91vh] flex items-center dark:bg-transparent overflow-hidden w-full select-none">
      
      <div className="absolute right-0 top-0 bottom-0 w-full md:w-[30%] lg:w-[35%] h-full bg-[#F9C723] hidden md:block z-0" />
      <div className="absolute bottom-0 left-0 right-0 h-[35%] bg-[#F9C723] block md:hidden z-0" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center w-full relative z-10 px-4 sm:px-6 lg:px-8 py-12 md:py-0">
        
        {/*  LEFT SIDE: CONTENT */}
        <div className="md:col-span-5 text-left space-y-5 max-w-4xl z-10 lg:pr-6">
          
          {/* New Badge */}
          <div className="inline-flex items-center gap-2 bg-green-500/10 dark:bg-yellow-500/20 text-green-600 dark:text-yellow-400 text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full border border-green-500/25 shadow-sm">
            <span>✨</span> Checking The Proxy!
          </div>
          
          {/* Main Big Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1] uppercase"
          >
            <span className="text-3xl sm:text-4xl">Taste the Best that</span>
            <br />
            <span className="text-yellow-500 dark:text-yellow-500">Surprise you</span>
          </motion.h1>

          {/* Description */}
          <p className="text-slate-500 dark:text-zinc-400 text-sm sm:text-base leading-relaxed max-w-sm">
            Delicious, nutritious, meals made with fresh, organic ingredients for better you.
          </p>

          {/* Ingredients Icons */}
          <div className="space-y-2">
            <span className="text-[10px] text-slate-400 dark:text-zinc-500 uppercase tracking-wider font-bold">Main Ingredients</span>
            <div className="flex items-center gap-2.5">
              {["🍅", "🥬", "🧅", "🧀", "🥩"].map((item, idx) => (
                <div key={idx} className="w-8 h-8 flex items-center justify-center bg-slate-50 dark:bg-zinc-900 rounded-full border border-slate-100 dark:border-zinc-800 text-base shadow-inner">
                  {item}
                </div>
              ))}
              <div className="w-8 h-8 flex items-center justify-center bg-[#2ECC71] text-white text-xs font-bold rounded-full shadow">+3</div>
            </div>
          </div>

          <div className="pt-2">
            <Link href="/recipes">
              <Button className="px-8 py-6 bg-yellow-500 hover:bg-yellow-600 text-white font-bold uppercase tracking-wider rounded-full text-xs shadow-lg shadow-yellow-500/20 transition-all active:scale-95 flex items-center gap-2">
                Explore Collection <PiCookingPot className="text-lg" />
              </Button>
            </Link>
          </div>
        </div>

        {/*  CENTER & RIGHT SIDE: SLIDER */}
        <div className="md:col-span-7 grid grid-cols-1 lg:grid-cols-12 items-center relative w-full h-[400px] sm:h-[500px] md:h-[550px] lg:h-[600px] z-20">
          
          {/* Main Center Slider wrapper */}
          <div className="lg:col-span-8 relative w-full h-full flex items-center justify-center md:-translate-x-10 lg:translate-x-16 overflow-visible">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={sliderImages[currentImageIndex].id}
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute w-[95%] h-[95%] lg:w-[100%] lg:h-[100%]"
              >
                <Image
                  src={sliderImages[currentImageIndex].src}
                  alt={sliderImages[currentImageIndex].alt}
                  fill
                  priority
                  className="object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.2)]"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Nutrients Cards & Side Burger */}
          <div className="lg:col-span-4 hidden lg:flex flex-col justify-between h-full py-16 relative z-10 pl-6 pr-4">
            
            {/* Nutrition Cards */}
            <div className="flex gap-2.5">
              {[
                { label: "Calories", val: "1370", unit: "Kcal" },
                { label: "Fat", val: "93", unit: "g" },
                { label: "Protein", val: "85", unit: "g" }
              ].map((card, i) => (
                <div key={i} className="bg-white shadow-lg rounded-xl p-3 text-center min-w-[70px] flex flex-col justify-center border border-slate-50 transition-transform hover:scale-105 duration-300">
                  <span className="text-[10px] text-slate-400 font-medium block leading-tight">{card.label}</span>
                  <span className="text-[9px] text-slate-300 block pb-0.5">{card.unit}</span>
                  <span className="text-sm font-black text-[#E74C3C]">{card.val}</span>
                </div>
              ))}
            </div>

            {/* Nutrition & Allergens Link */}
            <div className="-mb-20">
              {/* <h1 className="font-extrabold text-7xl text-yellow-300">RECIPEHUB</h1> */}
              <p className="font-extrabold text-6xl text-yellow-300">RECIPE SHARING PLATFORM</p>
            </div>
          </div>

          {/* Decoration Image */}
          <div className="absolute right-[-430px] top-[10%] w-[550px] h-[550px] hidden xl:block opacity-[0.6] pointer-events-none z-0">
            <Image
              src="/bg-5.png" 
              alt="Background Burger Decoration"
              fill
              className="object-contain blur-[1px]"
            />
          </div>

        </div>

      </div>
    </section>
  );
}