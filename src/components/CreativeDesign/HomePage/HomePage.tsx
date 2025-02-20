'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import PixelBackground from './PixelBackground';
import Image from 'next/image';
import sunAsset from '@/assets/CreativeDesign/pics/sun_asset.png';
import moonAsset from '@/assets/CreativeDesign/pics/moon_asset.png';
import rocketAsset from '@/assets/CreativeDesign/pics/rocket_ship.png';
import moonSurface from '@/assets/CreativeDesign/pics/moon_surface.png';
import sunIcon from '@/assets/CreativeDesign/buttons/sun_icon.png';
import moonIcon from '@/assets/CreativeDesign/buttons/moon_icon.png';

const HomePage = () => {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className="fixed inset-0 w-full h-screen overflow-hidden"> 
      {/* Pixel Background */}
      <PixelBackground isDark={isDark} />

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 5 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-white">
            Hello, I'm Mann Lester
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-white/80">
            A passionate developer crafting digital experiences
          </p>
        </motion.div>
      </div>

      {/* Sun (visible in light mode) */}
      <motion.div
        className="absolute w-[20rem] md:w-[24rem] lg:w-[28rem] aspect-square z-20"
        style={{ 
          imageRendering: 'pixelated',
          left: '10%',
          top: '20%',
          transformOrigin: 'center center'
        }}
        animate={isDark ? {
          x: '-50vw',
          y: '50vh',
          opacity: 0,
          scale: 0.8,
        } : {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
        }}
        whileInView={!isDark ? {
          y: [-5, 5, -5],
          rotate: [-1, 1, -1],
        } : undefined}
        transition={{ 
          duration: 6,
          ease: [0.4, 0, 0.2, 1],
          y: {
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut"
          },
          rotate: {
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut"
          }
        }}
      >
        <Image
          src={sunAsset}
          alt="Sun"
          fill
          className="object-contain"
          style={{ imageRendering: 'pixelated' }}
        />
      </motion.div>

      {/* Moon (visible in dark mode) */}
      <motion.div
        className="absolute w-[20rem] md:w-[24rem] lg:w-[28rem] aspect-square z-20"
        style={{ 
          imageRendering: 'pixelated',
          transformOrigin: 'center center'
        }}
        animate={isDark ? {
          x: 'calc(70vw - 100px)',
          y: '15vh',
          opacity: 1,
          scale: 1,
        } : {
          x: '100vw',
          y: '50vh',
          opacity: 0,
          scale: 0.8,
        }}
        whileInView={isDark ? {
          y: ['15vh', '13vh', '15vh'],
          rotate: [-1, 1, -1],
        } : undefined}
        transition={{ 
          duration: 6,
          ease: [0.4, 0, 0.2, 1],
          y: {
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut"
          },
          rotate: {
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut"
          }
        }}
      >
        <Image
          src={moonAsset}
          alt="Moon"
          fill
          className="object-contain"
          style={{ imageRendering: 'pixelated' }}
        />
      </motion.div>

      {/* Moon Surface */}
      <div 
        className="fixed bottom-0 left-0 right-0 z-30"
        style={{
          height: '63vh',
          backgroundImage: `url(${moonSurface.src})`,
          backgroundRepeat: 'repeat-x',
          backgroundSize: '800px 100%',
          imageRendering: 'pixelated',
          backgroundPosition: '0 0',
          transform: 'translateZ(0)'
        }}
      />

      {/* Rocket */}
      <motion.div
        className="fixed left-1/2 -translate-x-1/2 z-40"
        style={{ 
          bottom: '7vh',
          left: '40%',
          transform: 'translateX(-50%)'
        }}
          animate={{
            y: [-5, 0, -5],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
      >
        <div className="relative w-64 md:w-72 lg:w-96 aspect-square">
          <Image
            src={rocketAsset}
            alt="Rocket"
            fill
            className="object-contain"
            quality={100}
            style={{ imageRendering: 'pixelated' }}
          />
        </div>
      </motion.div>

      {/* Theme Toggle Button */}
      <button
        onClick={() => setIsDark(!isDark)}
        className="fixed top-24 right-4 z-50 p-2 rounded-full bg-white/10 backdrop-blur hover:bg-white/20 transition-colors"
      >
        <div className="w-6 md:w-8 aspect-square relative">
          <Image 
            src={isDark ? sunIcon : moonIcon}
            alt={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            fill
            className="object-contain"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>
      </button>
    </div>
  );
};

export default HomePage;