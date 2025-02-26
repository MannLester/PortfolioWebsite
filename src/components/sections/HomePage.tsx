"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Anton } from 'next/font/google';

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
});

// Import images
import personImage from '@/assets/images/home_page/person_design.png';
import heartImage from '@/assets/images/home_page/heart_design.png';
import spadeImage from '@/assets/images/home_page/spade_design.png';
import clubImage from '@/assets/images/home_page/club_design.png';
import diamondImage from '@/assets/images/home_page/diamond_design.png';

export default function HomePage() {
  return (
    <div className="h-screen flex bg-black overflow-hidden">
      {/* Hero Section */}
      <section className="flex w-full h-full">
        {/* Left side - content */}
        <div className="flex-1 flex items-center justify-center px-16">
          <div className="space-y-6">
            <h2 className="text-white text-4xl font-bold">Junior Full Stack Developer</h2>
            <p className="text-gray-300 text-lg max-w-xl">
              Passionate about crafting seamless web experiences with expertise in both frontend and backend technologies.
            </p>
          </div>
        </div>

        {/* Right side - contains image and card suits */}
        <div className="w-[50%] relative">
          {/* Title and Image Container */}
          <div className="absolute right-[10%] top-[20%] text-right pr-8 flex flex-col items-end">
            {/* Image and card suits container */}
            <div className="relative w-[350px]">
              {/* Top text overlapping with image */}
              <motion.div 
                className={`absolute top-6 right-0 z-10 text-[98px] text-white leading-none whitespace-nowrap [text-shadow:0_0_10px_#990904,0_0_20px_#990904,0_0_30px_#990904] ${anton.className}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                JACK OF ALL
              </motion.div>

              <motion.div 
                className="relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {/* Main image */}
                <Image
                  src={personImage}
                  alt="Mann Lee"
                  width={350}
                  height={437}
                  className="relative z-20 -translate-x-16 -translate-y-3"
                  priority
                />

                {/* Card suits */}
                <motion.div
                  className="absolute -right-8 -top-8"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Image src={heartImage} alt="Heart" width={60} height={60} />
                </motion.div>

                <motion.div
                  className="absolute right-16 -top-4"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <Image src={clubImage} alt="Club" width={60} height={60} />
                </motion.div>

                <motion.div
                  className="absolute right-4 bottom-16"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <Image src={spadeImage} alt="Spade" width={60} height={60} />
                </motion.div>

                <motion.div
                  className="absolute -right-4 bottom-32"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                >
                  <Image src={diamondImage} alt="Diamond" width={60} height={60} />
                </motion.div>

                {/* Bottom text overlapping with image */}
                <motion.div 
                  className={`absolute -bottom-4 -right-8 z-30 text-[112px] tracking-[25px] text-white leading-none whitespace-nowrap [text-shadow:0_0_10px_#990904,0_0_20px_#990904,0_0_30px_#990904] ${anton.className}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  TRADES
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Background pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute -rotate-12 left-0 top-0 w-full h-full flex flex-wrap gap-8 overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="text-4xl text-white/10">
                  ♠♥♣♦
                </div>
              ))}
            </div>
          </div>

          {/* Red glow effects */}
          <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-[100px]" />
          </div>
        </div>
      </section>
    </div>
  );
}
