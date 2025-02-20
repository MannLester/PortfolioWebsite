'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface PixelBackgroundProps {
  isDark: boolean;
}

const PixelBackground: React.FC<PixelBackgroundProps> = ({ isDark }) => {
  const [stars, setStars] = useState<Array<{ x: number; y: number; size: number; delay: number }>>([]);

  useEffect(() => {
    // Generate random stars
    const newStars = Array.from({ length: 50 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() < 0.3 ? 2 : 1, // 30% chance of being a larger star
      delay: Math.random() * 2
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="fixed inset-0">
      {/* Base background with pixelated noise pattern */}
      <div 
        className={`
          absolute inset-0 
          transition-colors duration-[6000ms]
          ${isDark ? 'bg-[#0B1026]' : 'bg-[#2B4073]'}
        `}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='4' height='4' viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1h1v1H1V1zm2 2h1v1H3V3z' fill='${isDark ? '%23ffffff08' : '%23ffffff05'}' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          imageRendering: 'pixelated',
          backgroundSize: '16px 16px'
        }}
      />

      {/* Pixel grid overlay */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: 
            `linear-gradient(to right, transparent 15px, ${isDark ? '#ffffff05' : '#ffffff03'} 16px),
             linear-gradient(to bottom, transparent 15px, ${isDark ? '#ffffff05' : '#ffffff03'} 16px)`,
          backgroundSize: '16px 16px',
          imageRendering: 'pixelated',
        }}
      />

      {/* Star field (visible in both modes) */}
      <div className="absolute inset-0">
        {stars.map((star, i) => (
          <motion.div
            key={i}
            className={`absolute bg-white transition-opacity duration-[6000ms]`}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              boxShadow: star.size === 2 ? '0 0 2px #fff' : 'none',
              opacity: isDark ? 1 : 0.3,
            }}
            animate={{
              opacity: isDark ? [1, 0.3, 1] : [0.3, 0.1, 0.3],
            }}
            transition={{
              duration: 1.5 + star.delay,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Optional: Scanline effect */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `linear-gradient(
            to bottom,
            ${isDark ? '#ffffff05' : '#00000005'} 50%,
            transparent 50%
          )`,
          backgroundSize: '100% 2px',
          imageRendering: 'pixelated',
        }}
      />
    </div>
  );
};

export default PixelBackground;
