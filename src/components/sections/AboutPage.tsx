"use client";

import { Anton } from 'next/font/google';
import { motion } from 'framer-motion';
import Image from 'next/image';
import personImage from '@/assets/images/home_page/person_design.png';
import spadeImage from '@/assets/images/home_page/spade_design.png';

const anton = Anton({
    weight: '400',
    subsets: ['latin'],
});

interface SparkleProps {
    delay?: number;
    className?: string;
}

const Sparkle = ({ delay = 0, className = "" }: SparkleProps) => {
    return (
        <motion.div
            className={`absolute w-2 h-2 bg-[#FFD700] rounded-full shadow-[0_0_8px_4px_#DAA520] opacity-100 ${className}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
                opacity: [0, 0.9, 0.9, 0],
                scale: [0, 1.5, 1.5, 0],
                y: [0, -15, -20, -25],
            }}
            transition={{
                duration: 2.5,
                delay,
                repeat: Infinity,
                repeatDelay: Math.random() * 1,
                ease: "easeInOut",
                times: [0, 0.4, 0.6, 1]
            }}
        />
    );
};

const CardBack = () => (
    <div 
        className="absolute inset-0 w-full h-full [backface-visibility:hidden]"
        style={{ transform: "rotateY(180deg)" }}
    >
        <div className="w-full h-full rounded-[20px] bg-black/20 backdrop-blur-sm border-2 border-white/50 shadow-[0_0_15px_rgba(255,105,180,0.5),0_0_30px_rgba(255,105,180,0.3),0_0_45px_rgba(255,105,180,0.2)] overflow-hidden">
            {/* Outer Border Pattern */}
            <div className="absolute inset-4 border border-white/20">
                <div className="absolute inset-2 border border-white/20" />
            </div>

            {/* Corner Decorations */}
            {[...Array(4)].map((_, i) => (
                <div key={i} 
                    className={`absolute w-16 h-16 ${
                        i === 0 ? 'top-2 left-2' : 
                        i === 1 ? 'top-2 right-2' : 
                        i === 2 ? 'bottom-2 right-2' : 
                        'bottom-2 left-2'
                    }`}
                >
                    <div className="absolute inset-0 border-t-2 border-l-2 border-white/20 rounded-tl-lg" 
                         style={{ transform: `rotate(${i * 90}deg)` }} 
                    />
                    <Image
                        src={spadeImage}
                        alt="Corner Spade"
                        width={24}
                        height={24}
                        className="absolute top-2 left-2 [filter:drop-shadow(0_0_5px_#FF69B4)]"
                        style={{ transform: `rotate(${i * 90}deg)` }}
                    />
                </div>
            ))}

            {/* Center Pattern */}
            <div className="fixed top-1/2 left-[63%] -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px]">
                <Image
                    src={spadeImage}
                    alt="Center Spade"
                    fill
                    priority
                    className="object-contain [filter:drop-shadow(0_0_20px_#FF69B4)_drop-shadow(0_0_40px_#FF69B4)_drop-shadow(0_0_60px_#FF69B4)]"
                />
            </div>

            {/* Background Grid Pattern */}
            <div className="absolute inset-0 grid grid-cols-8 gap-2 p-4 opacity-5">
                {[...Array(48)].map((_, i) => (
                    <div key={i} className="aspect-square">
                        <Image
                            src={spadeImage}
                            alt="Pattern"
                            width={30}
                            height={30}
                            className="w-full h-full [filter:drop-shadow(0_0_3px_#FF69B4)]"
                        />
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const CardFront = () => (
    <div 
        className="absolute inset-0 w-full h-full [backface-visibility:hidden]"
        style={{ transform: "rotateY(0deg)" }}
    >
        <div className="w-full h-full rounded-[20px] bg-black/20 backdrop-blur-sm border-2 border-white/50 shadow-[0_0_15px_rgba(255,105,180,0.5),0_0_30px_rgba(255,105,180,0.3),0_0_45px_rgba(255,105,180,0.2)]">
            {/* Card Border */}
            <div className="absolute inset-0 border-2 border-white/70 rounded-[12px] [box-shadow:inset_0_0_15px_rgba(255,105,180,0.3)]" />
            
            {/* Decorative Corner Patterns - Top Left */}
            <div className="absolute top-4 left-4 w-24 h-24">
                <div className="absolute inset-0 border-t-2 border-l-2 border-white/30 rounded-tl-lg" />
                <div className="absolute top-2 left-2 w-4 h-4 border-2 border-white/30 rounded-full" />
                <Image
                    src={spadeImage}
                    alt="Spade"
                    width={30}
                    height={30}
                    className="absolute top-4 left-4 mb-1 [filter:drop-shadow(0_0_5px_#FF69B4)_drop-shadow(0_0_10px_#FF69B4)]"
                />
                <span className={`absolute bottom-0 left-4 text-white text-2xl ${anton.className} [text-shadow:0_0_5px_#FF69B4,0_0_10px_#FF69B4,0_0_15px_#FF69B4]`}>J</span>
            </div>

            {/* Decorative Corner Patterns - Bottom Right */}
            <div className="absolute bottom-4 right-4 w-24 h-24 rotate-180">
                <div className="absolute inset-0 border-t-2 border-l-2 border-white/30 rounded-tl-lg" />
                <div className="absolute top-2 left-2 w-4 h-4 border-2 border-white/30 rounded-full" />
                <Image
                    src={spadeImage}
                    alt="Spade"
                    width={30}
                    height={30}
                    className="absolute top-4 left-4 mb-1 [filter:drop-shadow(0_0_5px_#FF69B4)_drop-shadow(0_0_10px_#FF69B4)]"
                />
                <span className={`absolute bottom-0 left-4 text-white text-2xl ${anton.className} [text-shadow:0_0_5px_#FF69B4,0_0_10px_#FF69B4,0_0_15px_#FF69B4]`}>J</span>
            </div>

            {/* Decorative Frame */}
            <div className="absolute inset-12 border border-white/20 rounded-lg">
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-8">
                    <Image
                        src={spadeImage}
                        alt="Top Spade"
                        width={20}
                        height={20}
                        className="w-full h-full [filter:drop-shadow(0_0_5px_#FF69B4)]"
                    />
                </div>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-8 rotate-180">
                    <Image
                        src={spadeImage}
                        alt="Bottom Spade"
                        width={20}
                        height={20}
                        className="w-full h-full [filter:drop-shadow(0_0_5px_#FF69B4)]"
                    />
                </div>
            </div>

            {/* Card Image */}
            <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="relative w-[95%] h-[95%]">
                    <Image
                        src={personImage}
                        alt="Mann Lee"
                        fill
                        className="object-contain [filter:drop-shadow(0_0_10px_#FF69B4)_drop-shadow(0_0_20px_#FF69B4)]"
                        priority
                    />
                </div>
            </div>

            {/* Small Decorative Spades in Corners */}
            <div className="absolute top-24 left-8 w-4 h-4 opacity-30">
                <Image src={spadeImage} alt="Decorative" fill className="[filter:drop-shadow(0_0_3px_#FF69B4)]" />
            </div>
            <div className="absolute top-8 left-24 w-4 h-4 opacity-30">
                <Image src={spadeImage} alt="Decorative" fill className="[filter:drop-shadow(0_0_3px_#FF69B4)]" />
            </div>
            <div className="absolute bottom-24 right-8 w-4 h-4 opacity-30 rotate-180">
                <Image src={spadeImage} alt="Decorative" fill className="[filter:drop-shadow(0_0_3px_#FF69B4)]" />
            </div>
            <div className="absolute bottom-8 right-24 w-4 h-4 opacity-30 rotate-180">
                <Image src={spadeImage} alt="Decorative" fill className="[filter:drop-shadow(0_0_3px_#FF69B4)]" />
            </div>
        </div>
    </div>
);

const AboutPage = () => {
    return (
        <>
            <div id="about" className="min-h-screen pt-10 flex flex-col md:flex-row bg-black text-white overflow-hidden">
            {/* Left Section - Playing Card - Hidden on Mobile */}
            <div className="flex-1 relative hidden md:flex items-center justify-center">
                {/* Rotating Card Container */}
                <div className="relative [perspective:2000px]">
                    <motion.div
                        className="relative w-[350px] h-[470px] [transform-style:preserve-3d]"
                        initial={{ rotateY: 0 }}
                        animate={{
                            rotateY: 360
                        }}
                        transition={{
                            duration: 13,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        <div className="relative w-full h-full [transform-style:preserve-3d]">
                            <CardFront />
                            <CardBack />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Right Section - Title and Content */}
            <div className="flex-1 flex flex-col justify-center px-6 sm:px-8 md:px-0 md:pr-16">
                {/* About Me Title */}
                <div className="flex justify-center md:justify-end w-full -mt-3 mb-6 md:mb-16 pr-0 md:pr-20">
                    <motion.h2 
                        className={`text-5xl md:text-6xl ${anton.className} tracking-wider [text-shadow:0_0_7px_#00BFFF,0_0_10px_#00BFFF,0_0_21px_#00BFFF,0_0_42px_#00BFFF]`}
                        initial={{ opacity: 1, color: "#000000" }}
                        animate={{
                            color: ["#000000", "#fff", "#fff", "#fff", "#fff", "#fff", "#000000", "#fff"],
                            textShadow: [
                                "unset",
                                "0 0 7px #00BFFF, 0 0 10px #00BFFF, 0 0 21px #00BFFF, 0 0 42px #00BFFF",
                                "0 0 4px #00BFFF, 0 0 8px #00BFFF, 0 0 16px #00BFFF, 0 0 32px #00BFFF",
                                "0 0 7px #00BFFF, 0 0 10px #00BFFF, 0 0 21px #00BFFF, 0 0 42px #00BFFF",
                                "0 0 4px #00BFFF, 0 0 8px #00BFFF, 0 0 16px #00BFFF, 0 0 32px #00BFFF",
                                "0 0 7px #00BFFF, 0 0 10px #00BFFF, 0 0 21px #00BFFF, 0 0 42px #00BFFF",
                                "unset",
                                "0 0 7px #00BFFF, 0 0 10px #00BFFF, 0 0 21px #00BFFF, 0 0 42px #00BFFF"
                            ],
                            x: [0, 0.5, -0.5, 0.25, -0.25, 0, 0, 0]
                        }}
                        transition={{
                            duration: 2.5,
                            times: [0, 0.1, 0.2, 0.4, 0.6, 0.7, 0.8, 1],
                            ease: "easeInOut",
                            repeat: Infinity
                        }}
                    >
                        ABOUT ME
                    </motion.h2>
                </div>

                {/* Content */}
                <div className={`tracking-wider text-base md:text-2xl space-y-0 md:space-y-4 text-center md:text-right ${anton.className}`}>
                    <p>Hi, I&apos;m Lester, The Jack of All Trades Junior Developer.</p>
                    
                    <div className="space-y-0 md:space-y-1 text-base md:text-2xl">
                        <p>From idea generation to product creation.</p>
                        <p>From deployment to marketing and maintenance.</p>
                        <p>I can execute and be a part of it all.</p>
                    </div>

                    <p className="text-base md:text-sm md:whitespace-nowrap">
                        With my technical and soft skills, alongside my innate programming capabilities enhanced with my expertise of taking AI tools to the next level.
                    </p>

                    <div className="h-4 md:h-4"></div>
                    <div className="relative">
                        {/* Sparkles */}
                        <Sparkle delay={0} className="top-[10%] left-[30%]" />
                        <Sparkle delay={0.3} className="top-[20%] left-[70%]" />
                        <Sparkle delay={0.5} className="top-[30%] left-[40%]" />
                        <Sparkle delay={0.7} className="top-[15%] left-[60%]" />
                        <Sparkle delay={1.1} className="top-[25%] left-[50%]" />
                        <Sparkle delay={0.2} className="top-[35%] left-[35%]" />
                        <Sparkle delay={0.9} className="top-[5%] left-[55%]" />
                        <Sparkle delay={1.3} className="top-[40%] left-[65%]" />
                        <Sparkle delay={0.4} className="top-[8%] left-[45%]" />
                        <Sparkle delay={0.8} className="top-[28%] left-[75%]" />
                        <Sparkle delay={1.2} className="top-[18%] left-[25%]" />
                        <Sparkle delay={0.6} className="top-[38%] left-[80%]" />
                        <Sparkle delay={1.0} className="top-[33%] left-[20%]" />
                        <Sparkle delay={0.1} className="top-[12%] left-[85%]" />
                        <Sparkle delay={1.4} className="top-[22%] left-[15%]" />
                        <span className="tracking-widest text-2xl md:text-4xl [text-shadow:0_0_4px_#DAA520,0_0_8px_#DAA520,0_0_12px_#DAA520,0_0_20px_#DAA520] block">
                            THERE IS NOTHING WE CAN&apos;T CREATE!
                        </span>
                    </div>
                    
                    <div className="h-4 md:h-4"></div>
                    <p className="text-xl md:text-sm">
                        I may be a <span className="[text-shadow:0_0_4px_#DC143C,0_0_8px_#DC143C,0_0_12px_#DC143C,0_0_20px_#DC143C,0_0_40px_#DC143C]">MASTER OF NONE</span>, But I will always <span className="[text-shadow:0_0_7px_#00cc66,0_0_14px_#00cc66,0_0_21px_#00cc66,0_0_42px_#00cc66,0_0_82px_#00cc66]">GET IT DONE</span>.
                    </p>
                </div>
            </div>
            </div>

            {/* Mobile card completely removed */}
        </>
    );
}

export default AboutPage;