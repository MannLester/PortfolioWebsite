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
        <div className="w-full h-full bg-white rounded-[20px] border-8 border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            <div className="absolute inset-0 border-2 border-black rounded-[12px] bg-[#1a1a1a] overflow-hidden">
                {/* Pattern Grid */}
                <div className="absolute inset-0 grid grid-cols-8 gap-2 p-4">
                    {[...Array(48)].map((_, i) => (
                        <div key={i} className="aspect-square">
                            <Image
                                src={spadeImage}
                                alt="Pattern"
                                width={30}
                                height={30}
                                className="w-full h-full opacity-20"
                            />
                        </div>
                    ))}
                </div>
                {/* Center Logo */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-24 h-24">
                        <Image
                            src={spadeImage}
                            alt="Center Spade"
                            fill
                            className="opacity-50"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const CardFront = () => (
    <div 
        className="absolute inset-0 w-full h-full [backface-visibility:hidden]"
        style={{ transform: "rotateY(0deg)" }}
    >
        <div className="w-full h-full bg-white rounded-[20px] border-8 border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            {/* Card Border */}
            <div className="absolute inset-0 border-2 border-black rounded-[12px]" />
            
            {/* Card Corner Decorations - Top Left */}
            <div className="absolute top-4 left-4 flex flex-col items-center">
                <Image
                    src={spadeImage}
                    alt="Spade"
                    width={30}
                    height={30}
                    className="mb-1"
                />
                <span className={`text-black text-2xl ${anton.className}`}>J</span>
            </div>

            {/* Card Corner Decorations - Bottom Right */}
            <div className="absolute bottom-4 right-4 flex flex-col items-center rotate-180">
                <Image
                    src={spadeImage}
                    alt="Spade"
                    width={30}
                    height={30}
                    className="mb-1"
                />
                <span className={`text-black text-2xl ${anton.className}`}>J</span>
            </div>

            {/* Card Image */}
            <div className="absolute inset-0 flex items-center justify-center p-16">
                <div className="relative w-full h-full">
                    <Image
                        src={personImage}
                        alt="Mann Lee"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            </div>

            {/* Card Title */}
            <div className="absolute bottom-20 left-0 right-0 text-center">
                <h3 className={`text-black text-2xl ${anton.className}`}>JACK OF ALL TRADES</h3>
            </div>
        </div>
    </div>
);

const AboutPage = () => {
    return (
        <div id="about" className="h-screen flex bg-black text-white overflow-hidden">
            {/* Left Section - Playing Card */}
            <div className="flex-1 relative flex items-center justify-center">
                {/* Rotating Card Container */}
                <div className="relative [perspective:2000px]">
                    <motion.div
                        className="relative w-[400px] h-[560px] [transform-style:preserve-3d]"
                        initial={{ rotateY: 0 }}
                        animate={{
                            rotateY: 360
                        }}
                        transition={{
                            duration: 20,
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
            <div className="flex-1 flex flex-col justify-center pr-16">
                {/* About Me Title */}
                <div className="flex justify-end w-full mb-16 pr-20">
                    <motion.h2 
                        className={`text-8xl ${anton.className} tracking-wider [text-shadow:0_0_7px_#00BFFF,0_0_10px_#00BFFF,0_0_21px_#00BFFF,0_0_42px_#00BFFF]`}
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
                <div className={`tracking-wider text-2xl space-y-4 text-right ${anton.className}`}>
                    <p>Hi, I'm Lester, The Jack of All Trades Junior Developer.</p>
                    
                    <div className="space-y-1">
                        <p>From idea generation to product creation.</p>
                        <p>From deployment to marketing and maintenance.</p>
                        <p>I can execute and be a part of it all.</p>
                    </div>

                    <p>
                        With my technical and soft skills, alongside my innate <br /> programming capabilities
                        enhanced with my expertise <br /> of taking AI tools to the next level.
                    </p>

                    <br />    
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
                        <span className="tracking-widest text-4xl [text-shadow:0_0_4px_#DAA520,0_0_8px_#DAA520,0_0_12px_#DAA520,0_0_20px_#DAA520] block">
                            THERE IS NOTHING WE CAN'T CREATE!
                        </span>
                    </div>
                    
                    <br/>
                    <p>
                        I may be a <span className="[text-shadow:0_0_4px_#DC143C,0_0_8px_#DC143C,0_0_12px_#DC143C,0_0_20px_#DC143C,0_0_40px_#DC143C]">MASTER OF NONE</span>, 
                        But I will always <span className="[text-shadow:0_0_7px_#00cc66,0_0_14px_#00cc66,0_0_21px_#00cc66,0_0_42px_#00cc66,0_0_82px_#00cc66]">GET IT DONE</span>.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AboutPage;