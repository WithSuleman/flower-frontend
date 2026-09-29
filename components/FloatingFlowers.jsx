import React from 'react';
import { motion } from 'framer-motion';

// Reusable lightweight floating petals and flower icons
const flowerIcons = [
  { icon: '🌸', size: 'text-2xl', x: '10%', y: '15%', delay: 0, duration: 6, rotate: 20 },
  { icon: '🌷', size: 'text-xl', x: '85%', y: '20%', delay: 1, duration: 7, rotate: -25 },
  { icon: '🌹', size: 'text-3xl', x: '75%', y: '70%', delay: 1.5, duration: 8, rotate: 15 },
  { icon: '🌼', size: 'text-xl', x: '15%', y: '65%', delay: 0.5, duration: 5.5, rotate: -15 },
  { icon: '🌻', size: 'text-2xl', x: '90%', y: '50%', delay: 2, duration: 6.5, rotate: 30 },
  { icon: '🍃', size: 'text-lg', x: '5%', y: '40%', delay: 2.5, duration: 7.5, rotate: -40 },
  { icon: '✨', size: 'text-sm', x: '45%', y: '10%', delay: 0.8, duration: 4.5, rotate: 10 },
  { icon: '🌺', size: 'text-2xl', x: '50%', y: '85%', delay: 1.2, duration: 6, rotate: -18 },
];

export default function FloatingFlowers({ count = 8, className = '' }) {
  const items = flowerIcons.slice(0, count);

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none z-0 ${className}`}
      aria-hidden="true"
    >
      {items.map((item, index) => (
        <motion.div
          key={index}
          className={`absolute ${item.size} opacity-70 filter drop-shadow-sm`}
          style={{ left: item.x, top: item.y }}
          animate={{
            y: [0, -18, 0, 14, 0],
            x: [0, 8, -6, 4, 0],
            rotate: [0, item.rotate, 0, -item.rotate * 0.7, 0],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
            delay: item.delay,
          }}
        >
          {item.icon}
        </motion.div>
      ))}
    </div>
  );
}
