"use client";

import React from 'react';
import { motion } from 'framer-motion';

const users = [
  { id: 1, name: "Alvi Ayan", image: "/user-1.jpg", icon:'🍝', thought: "This platform is absolutely amazing! The way recipes are categorized makes it so easy to find what I need. I've learned so many new techniques since I joined this community." },
  { id: 2, name: "Neela Chowdhury", image: "/user-2.jpg", icon:'🥗', thought: "I never thought sharing homemade recipes could be this fun. The interface is so clean and intuitive. Connecting with other home chefs from around the world has truly inspired me." },
  { id: 3, name: "Shafayet Shourov", image: "/user-3.jpg", icon:'🥘', thought: "The community here is so supportive! Every time I post a recipe, I get such positive feedback and helpful tips. It's not just a recipe app; it's a social ecosystem." },
  { id: 4, name: "Nabiya Khan", image: "/user-4.jpg", icon:'🍕', thought: "What I love most is the 'secret family recipe' feature. Finding authentic, traditional recipes that aren't available online is a treasure." },
];

export default function CommunityThoughts() {
  return (
    <section className="py-24 bg-[#FDFBF7] dark:bg-transparent transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-red-500 font-bold text-sm tracking-[0.2em] uppercase mb-4">Our Community</p>
          <h2 className="text-5xl font-extrabold text-slate-900 dark:text-white">
            WHAT <span className='text-yellow-500'>FOODIES</span> ARE SAYING
          </h2>
        </motion.div>

        {/* Thought Section */}
        <div className="space-y-32">
          {users.map((user, index) => (
            <motion.div 
              key={user.id} 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}
              className={`flex flex-col md:flex-row items-center gap-16 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
            >
              
              {/* Organic Shape & Image */}
              <div className="relative w-full md:w-5/12 flex justify-center">
                <div className="absolute w-80 h-80 bg-[#FFDAB9] dark:bg-orange-900/30 rounded-[40%_60%_70%_30%_/_30%_50%_50%_70%] opacity-60"></div>
                <img 
                  src={user.image} 
                  alt={user.name} 
                  className="relative w-64 h-64 rounded-full border-8 border-white dark:border-slate-800 shadow-2xl object-cover"
                />
              </div>

              {/* Large Thought Container */}
              <div className="flex-1 relative">
                <div className="absolute -top-10 -left-6 text-6xl z-10">
                  {user.icon}
                </div>
                <div className="p-10">
                  <p className="text-slate-700 dark:text-slate-300 text-md leading-relaxed font-medium italic mb-6">
                    {user.thought}
                  </p>
                  <div className="flex items-center gap-4 border-t border-slate-100 dark:border-slate-700 pt-6">
                    <div className="h-1 w-12 bg-yellow-500 rounded-full"></div>
                    <h4 className="text-l font-bold text-slate-900 dark:text-white">{user.name}</h4>
                  </div>
                </div>
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}