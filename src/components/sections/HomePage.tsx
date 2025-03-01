"use client";

import { Anton } from 'next/font/google';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Import images
import personImage from '@/assets/images/home_page/person_design.png';
import heartImage from '@/assets/images/home_page/heart_design.png';
import spadeImage from '@/assets/images/home_page/spade_design.png';
import clubImage from '@/assets/images/home_page/club_design.png';
import diamondImage from '@/assets/images/home_page/diamond_design.png';

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
});

const HomePage = () => {
  return (
    <div className="h-screen flex bg-black overflow-hidden">
      {/* Hero Section */}
      <section className="flex w-full h-full">
        {/* Left side - content */}
        <div className="flex-1 flex items-center justify-center px-16">
          <div className="space-y-6">
            <h2 className="text-white text-4xl font-bold">Hi, I'm Lester</h2>
            <div className="space-y-4">
              <p className="text-gray-300 text-lg">
                The Jack of All Trades Junior Developer.
                <br />
                <br />
                From idea generation to product creation. From deployment to marketing and maintenance. I can execute and be a part of it all.
              </p>
              <p className="text-gray-300 text-lg">
                With my technical and soft skills, alongside my innate programming capabilities enhanced with my expertise of taking AI tools to the next level. There is nothing we can't create!
              </p>
              <p className="text-gray-300 text-lg">
                I may be a Master of None, But I will always get it Done.
              </p>
            </div>
          </div>
        </div>

        {/* Right side - contains image and text */}
        <div className="w-[50%] relative">
          {/* Title and Image Container */}
          <div className="absolute right-[10%] top-[20%] text-right pr-8 flex flex-col items-end">
            <div className="relative w-[350px]">
              {/* Top text overlapping with image */}
              <div className={`absolute top-6 right-0 z-10 text-[98px] leading-none whitespace-nowrap flex gap-5 ${anton.className}`}>
                <motion.span
                  className="[text-shadow:unset]"
                  initial={{ opacity: 1, color: "#000000" }}
                  animate={{
                    color: ["#000000", "#fff", "#000000", "#fff", "#000000", "#fff"],
                    textShadow: [
                      "unset",
                      "0 0 7px #990904, 0 0 10px #990904, 0 0 21px #990904, 0 0 42px #990904",
                      "unset",
                      "0 0 7px #990904, 0 0 10px #990904, 0 0 21px #990904, 0 0 42px #990904",
                      "unset",
                      "0 0 7px #990904, 0 0 10px #990904, 0 0 21px #990904, 0 0 42px #990904"
                    ]
                  }}
                  transition={{
                    duration: 1.5,
                    times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                    ease: "easeInOut"
                  }}
                >
                  JACK
                </motion.span>
                <motion.span
                  className="[text-shadow:unset]"
                  initial={{ opacity: 1, color: "#000000" }}
                  animate={{
                    color: ["#000000", "#fff", "#000000", "#fff", "#000000", "#fff"],
                    textShadow: [
                      "unset",
                      "0 0 7px #990904, 0 0 10px #990904, 0 0 21px #990904, 0 0 42px #990904",
                      "unset",
                      "0 0 7px #990904, 0 0 10px #990904, 0 0 21px #990904, 0 0 42px #990904",
                      "unset",
                      "0 0 7px #990904, 0 0 10px #990904, 0 0 21px #990904, 0 0 42px #990904"
                    ]
                  }}
                  transition={{
                    duration: 1.5,
                    times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                    delay: 0.5,
                    ease: "easeInOut"
                  }}
                >
                  OF
                </motion.span>
                <motion.span
                  className="[text-shadow:unset]"
                  initial={{ opacity: 1, color: "#000000" }}
                  animate={{
                    color: ["#000000", "#fff", "#000000", "#fff", "#000000", "#fff"],
                    textShadow: [
                      "unset",
                      "0 0 7px #990904, 0 0 10px #990904, 0 0 21px #990904, 0 0 42px #990904",
                      "unset",
                      "0 0 7px #990904, 0 0 10px #990904, 0 0 21px #990904, 0 0 42px #990904",
                      "unset",
                      "0 0 7px #990904, 0 0 10px #990904, 0 0 21px #990904, 0 0 42px #990904"
                    ]
                  }}
                  transition={{
                    duration: 1.5,
                    times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                    delay: 1,
                    ease: "easeInOut"
                  }}
                >
                  ALL
                </motion.span>
              </div>

              <motion.div className="relative">
                {/* Background Spade */}
                <div className="absolute -left-20 top-32 z-5 scale-[1.8]">
                  <Image src={spadeImage} alt="Spade" width={600} height={600} className="opacity-100" />
                </div>

                {/* Background Diamond */}
                <div className="absolute left-[-5vw] top-32 z-5 scale-[2]">
                  <Image src={diamondImage} alt="Diamond" width={600} height={600} className="opacity-100" />
                </div>

                {/* Background Club */}
                <div className="absolute left-[-5vw] top-32 z-5 scale-[1.8]">
                  <Image src={clubImage} alt="Club" width={600} height={600} className="opacity-100" />
                </div>

                {/* Background Heart */}
                <div className="absolute left-[-5vw] top-32 z-5 scale-[1.9]">
                  <Image src={heartImage} alt="Heart" width={600} height={600} className="opacity-100" />
                </div>

                {/* Main image */}
                <Image
                  src={personImage}
                  alt="Mann Lee"
                  width={350}
                  height={437}
                  className="relative z-20 -translate-x-16 -translate-y-3"
                  priority
                />
                {/* Bottom text overlapping with image */}
                <motion.div
                  className={`absolute -bottom-4 -right-8 z-30 text-[112px] tracking-[25px] leading-none whitespace-nowrap [text-shadow:unset] ${anton.className}`}
                  initial={{ opacity: 1, color: "#000000" }}
                  animate={{
                    color: ["#000000", "#fff", "#000000", "#fff", "#000000", "#fff"],
                    textShadow: [
                      "unset",
                      "0 0 7px #f97316, 0 0 10px #f97316, 0 0 21px #f97316, 0 0 42px #f97316",
                      "unset",
                      "0 0 7px #f97316, 0 0 10px #f97316, 0 0 21px #f97316, 0 0 42px #f97316",
                      "unset",
                      "0 0 7px #f97316, 0 0 10px #f97316, 0 0 21px #f97316, 0 0 42px #f97316"
                    ]
                  }}
                  transition={{
                    duration: 1.5,
                    times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                    delay: 2,
                    ease: "easeInOut"
                  }}
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
};

export default HomePage;
