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
import brickBackground from '@/assets/images/home_page/brick_bg.jpg';

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
});

const HomePage = () => {
  return (
    <div 
      id="home" 
      className={`h-screen flex flex-col md:flex-row overflow-hidden backdrop-blur-lg transition-colors duration-300 bg-black`} 
      style={{ 
        backgroundImage: `url(${brickBackground.src})`,
        backgroundSize: 'cover', 
        backgroundPosition: 'center' 
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50" />
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row w-full h-full z-10">
        {/* Left side - content */}
        <div className="flex-1 flex items-start justify-start px-6 sm:px-8 md:px-16 pt-24 md:pt-0">
          <div className="space-y-4 md:space-y-6 mt-10 md:mt-40">
            <div className="space-y-8">
              <h1 className={`text-white [text-shadow:0_0_7px_#9933ff,0_0_10px_#9933ff,0_0_21px_#9933ff,0_0_42px_#9933ff] text-3xl md:text-4xl tracking-normal font-bold ${anton.className}`}>
                H E L L O !
              </h1>

              <h2 className={`text-white text-5xl sm:text-6xl md:text-8xl tracking-normal ${anton.className}`}>
                I&apos;m <span className="text-white">Mann Lester Magbuhos</span>
              </h2>

              <p className="text-white text-xl md:text-3xl font-semibold tracking-wider ${anton.className}">
                Junior Full Stack Developer
              </p>

              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className={`${anton.className} bg-[#9933ff] text-white [text-shadow:0_0_7px_#9933ff] [box-shadow:0_0_7px_#9933ff,0_0_10px_#9933ff] hover:bg-[#ad5fff] hover:[text-shadow:0_0_7px_#9933ff,0_0_10px_#9933ff,0_0_21px_#9933ff] hover:[box-shadow:0_0_7px_#9933ff,0_0_10px_#9933ff,0_0_21px_#9933ff] px-8 py-3 rounded-lg text-base md:text-lg tracking-wide transition-all w-full sm:w-auto text-center`}
                  onClick={() => window.open('/resume.pdf', '_blank')}
                >
                  See Resume
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className={`${anton.className} bg-[#3366ff] text-white [text-shadow:0_0_7px_#3366ff] [box-shadow:0_0_7px_#3366ff,0_0_10px_#3366ff] hover:bg-[#4d7fff] hover:[text-shadow:0_0_7px_#3366ff,0_0_10px_#3366ff,0_0_21px_#3366ff] hover:[box-shadow:0_0_7px_#3366ff,0_0_10px_#3366ff,0_0_21px_#3366ff] px-8 py-3 rounded-lg text-base md:text-lg tracking-wide transition-all w-full sm:w-auto text-center`}
                  onClick={() => {
                    const contactSection = document.getElementById('contact');
                    contactSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Contact Me
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - contains image and text */}
        <div className="w-full md:w-[50%] relative mt-8 md:mt-0 hidden md:block">
          {/* Title and Image Container */}
          <div className="absolute right-[5%] sm:right-[10%] top-[5%] md:top-[20%] text-right pr-4 md:pr-8 flex flex-col items-end">
            <div className="relative w-[250px] sm:w-[300px] md:w-[350px]">
              {/* Top text overlapping with image */}
              <div className={`absolute top-2 md:top-6 right-0 z-10 text-[60px] sm:text-[80px] md:text-[98px] leading-none whitespace-nowrap flex gap-2 sm:gap-5 ${anton.className}`}>
                <motion.span
                  className="text-white"
                  initial={{
                    color: "#000000",
                    textShadow: "unset"
                  }}
                  animate={{
                    color: ["#000000", "#fff", "#fff", "#fff", "#fff", "#fff", "#000000", "#fff"],
                    textShadow: [
                      "unset",
                      "0 0 7px #ff1a1a, 0 0 10px #ff1a1a, 0 0 21px #ff1a1a, 0 0 42px #ff1a1a",
                      "0 0 4px #ff1a1a, 0 0 8px #ff1a1a, 0 0 16px #ff1a1a, 0 0 32px #ff1a1a",
                      "0 0 7px #ff1a1a, 0 0 10px #ff1a1a, 0 0 21px #ff1a1a, 0 0 42px #ff1a1a",
                      "0 0 4px #ff1a1a, 0 0 8px #ff1a1a, 0 0 16px #ff1a1a, 0 0 32px #ff1a1a",
                      "0 0 7px #ff1a1a, 0 0 10px #ff1a1a, 0 0 21px #ff1a1a, 0 0 42px #ff1a1a",
                      "unset",
                      "0 0 7px #ff1a1a, 0 0 10px #ff1a1a, 0 0 21px #ff1a1a, 0 0 42px #ff1a1a"
                    ],
                    x: [0, 0.5, -0.5, 0.25, -0.25, 0, 0, 0]
                  }}
                  transition={{
                    duration: 2.5,
                    times: [0, 0.1, 0.2, 0.4, 0.6, 0.7, 0.8, 1],
                    ease: "easeInOut",
                    delay: 0.3,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                >
                  JACK
                </motion.span>
                <motion.span
                  className="text-white"
                  initial={{
                    color: "#000000",
                    textShadow: "unset"
                  }}
                  animate={{
                    color: ["#000000", "#fff", "#fff", "#fff", "#fff", "#fff", "#000000", "#fff"],
                    textShadow: [
                      "unset",
                      "0 0 7px #ff1a1a, 0 0 10px #ff1a1a, 0 0 21px #ff1a1a, 0 0 42px #ff1a1a",
                      "0 0 4px #ff1a1a, 0 0 8px #ff1a1a, 0 0 16px #ff1a1a, 0 0 32px #ff1a1a",
                      "0 0 7px #ff1a1a, 0 0 10px #ff1a1a, 0 0 21px #ff1a1a, 0 0 42px #ff1a1a",
                      "0 0 4px #ff1a1a, 0 0 8px #ff1a1a, 0 0 16px #ff1a1a, 0 0 32px #ff1a1a",
                      "0 0 7px #ff1a1a, 0 0 10px #ff1a1a, 0 0 21px #ff1a1a, 0 0 42px #ff1a1a",
                      "unset",
                      "0 0 7px #ff1a1a, 0 0 10px #ff1a1a, 0 0 21px #ff1a1a, 0 0 42px #ff1a1a"
                    ],
                    x: [0, -0.25, 0.25, -0.5, 0.5, 0, 0, 0]
                  }}
                  transition={{
                    duration: 2.5,
                    times: [0, 0.1, 0.2, 0.4, 0.6, 0.7, 0.8, 1],
                    ease: "easeInOut",
                    delay: 0.6,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                >
                  OF
                </motion.span>
                <motion.span
                  className="text-white"
                  initial={{
                    color: "#000000",
                    textShadow: "unset"
                  }}
                  animate={{
                    color: ["#000000", "#fff", "#fff", "#fff", "#fff", "#fff", "#000000", "#fff"],
                    textShadow: [
                      "unset",
                      "0 0 7px #ff1a1a, 0 0 10px #ff1a1a, 0 0 21px #ff1a1a, 0 0 42px #ff1a1a",
                      "0 0 4px #ff1a1a, 0 0 8px #ff1a1a, 0 0 16px #ff1a1a, 0 0 32px #ff1a1a",
                      "0 0 7px #ff1a1a, 0 0 10px #ff1a1a, 0 0 21px #ff1a1a, 0 0 42px #ff1a1a",
                      "0 0 4px #ff1a1a, 0 0 8px #ff1a1a, 0 0 16px #ff1a1a, 0 0 32px #ff1a1a",
                      "0 0 7px #ff1a1a, 0 0 10px #ff1a1a, 0 0 21px #ff1a1a, 0 0 42px #ff1a1a",
                      "unset",
                      "0 0 7px #ff1a1a, 0 0 10px #ff1a1a, 0 0 21px #ff1a1a, 0 0 42px #ff1a1a"
                    ],
                    x: [0, 0.5, -0.25, 0.25, -0.5, 0, 0, 0]
                  }}
                  transition={{
                    duration: 2.5,
                    times: [0, 0.1, 0.2, 0.4, 0.6, 0.7, 0.8, 1],
                    ease: "easeInOut",
                    delay: 0.9,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                >
                  ALL
                </motion.span>
              </div>

              <motion.div className="relative">
                {/* Background Spade */}
                <div className="absolute -left-10 sm:-left-20 top-20 sm:top-32 z-5 scale-[1.2] sm:scale-[1.5] md:scale-[1.8]">
                  <Image src={spadeImage} alt="Spade" width={600} height={600} className="opacity-100" />
                </div>

                {/* Background Diamond */}
                <div className="absolute left-[-5vw] top-20 sm:top-32 z-5 scale-[1.3] sm:scale-[1.7] md:scale-[2]">
                  <Image src={diamondImage} alt="Diamond" width={600} height={600} className="opacity-100" />
                </div>

                {/* Background Club */}
                <div className="absolute left-[-5vw] top-20 sm:top-32 z-5 scale-[1.2] sm:scale-[1.5] md:scale-[1.8]">
                  <Image src={clubImage} alt="Club" width={600} height={600} className="opacity-100" />
                </div>

                {/* Background Heart */}
                <div className="absolute left-[-5vw] top-20 sm:top-32 z-5 scale-[1.3] sm:scale-[1.6] md:scale-[1.9]">
                  <Image src={heartImage} alt="Heart" width={600} height={600} className="opacity-100" />
                </div>

                {/* Main image */}
                <Image
                  src={personImage}
                  alt="Mann Lee"
                  width={350}
                  height={437}
                  className="relative z-20 -translate-x-8 sm:-translate-x-12 md:-translate-x-16 -translate-y-3 w-[220px] sm:w-[280px] md:w-[350px] h-auto"
                  priority
                />
                {/* Bottom text overlapping with image */}
                <motion.div
                  className={`absolute -bottom-2 sm:-bottom-4 -right-4 sm:-right-8 z-30 text-[70px] sm:text-[90px] md:text-[112px] tracking-[15px] sm:tracking-[20px] md:tracking-[25px] leading-none whitespace-nowrap ${anton.className}`}
                  initial={{
                    color: "#000000",
                    textShadow: "unset"
                  }}
                  animate={{
                    color: ["#000000", "#fff", "#fff", "#fff", "#fff", "#fff", "#000000", "#fff"],
                    textShadow: [
                      "unset",
                      "0 0 7px #ff6600, 0 0 10px #ff6600, 0 0 21px #ff6600, 0 0 42px #ff6600",
                      "0 0 4px #ff6600, 0 0 8px #ff6600, 0 0 16px #ff6600, 0 0 32px #ff6600",
                      "0 0 7px #ff6600, 0 0 10px #ff6600, 0 0 21px #ff6600, 0 0 42px #ff6600",
                      "0 0 4px #ff6600, 0 0 8px #ff6600, 0 0 16px #ff6600, 0 0 32px #ff6600",
                      "0 0 7px #ff6600, 0 0 10px #ff6600, 0 0 21px #ff6600, 0 0 42px #ff6600",
                      "unset",
                      "0 0 7px #ff6600, 0 0 10px #ff6600, 0 0 21px #ff6600, 0 0 42px #ff6600"
                    ],
                    x: [0, -0.5, 0.25, -0.25, 0.5, 0, 0, 0]
                  }}
                  transition={{
                    duration: 2.5,
                    times: [0, 0.1, 0.2, 0.4, 0.6, 0.7, 0.8, 1],
                    ease: "easeInOut",
                    delay: 1.2,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                >
                  TRADES
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Red glow effects */}
          <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-[100px]" />
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-[150px]" />
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-[150px]" />
          </div>
        </div>
      </section>
      
      {/* Mobile-only red glow effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none md:hidden">
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-red-500/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-red-500/5 rounded-full blur-[80px]" />
        <div className="absolute top-2/3 right-1/2 w-64 h-64 bg-red-500/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/2 left-1/2 w-64 h-64 bg-red-500/10 rounded-full blur-[100px]" />
      </div>
    </div>
  );
};

export default HomePage;
