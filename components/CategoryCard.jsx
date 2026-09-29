import React from 'react';
import { motion } from 'framer-motion';

export default function CategoryCard({ category, isSelected, onClick }) {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -4, scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`group relative flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl sm:rounded-3xl border transition-all cursor-pointer min-w-[100px] sm:min-w-[120px] ${
        isSelected
          ? 'bg-gradient-to-br from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-200 border-rose-400'
          : 'bg-white/80 backdrop-blur-sm text-stone-700 hover:bg-rose-50/50 border-rose-100 hover:border-rose-200 shadow-xs'
      }`}
    >
      {/* Category Icon Badges */}
      <div
        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl mb-2.5 transition-transform duration-300 group-hover:scale-110 ${
          isSelected
            ? 'bg-white/20 shadow-inner'
            : 'bg-rose-50 text-stone-800'
        }`}
      >
        {category.icon}
      </div>

      {/* Category Name */}
      <span className={`text-xs sm:text-sm font-semibold tracking-wide ${
        isSelected ? 'text-white' : 'text-stone-800 group-hover:text-rose-600'
      }`}>
        {category.name}
      </span>
    </motion.button>
  );
}
