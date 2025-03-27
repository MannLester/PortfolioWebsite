"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Anton } from 'next/font/google';
import brickBg from '@/assets/images/home_page/brick_bg.jpg';

const anton = Anton({
    weight: '400',
    subsets: ['latin'],
});

const SkillsPage = () => (
    <div id="skills" className="relative min-h-screen bg-black p-8 pt-24 overflow-hidden">
        {/* Brick Background */}
        <Image
            src={brickBg}
            alt="Brick Background"
            fill
            className="object-cover opacity-50"
            priority
        />
        
        {/* Content Container */}
        <div className={`relative z-10 flex flex-col h-full ${anton.className}`}>
            {/* Main Skills Heading */}
            <motion.h1 
                className="tracking-widest text-6xl font-bold mb-16 text-white text-center [text-shadow:0_0_7px_#FFD700,0_0_10px_#FFD700,0_0_21px_#FFD700,0_0_42px_#FFD700]"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 1 }}
            >
                SKILLS
            </motion.h1>

            {/* Skills Sections Container */}
            <div className="flex flex-col md:flex-row md:justify-between md:gap-16 mt-8">
                {/* Technical Skills - Left Side */}
                <div className="flex-1 flex flex-col items-center">
                    <motion.h2 
                        className="tracking-widest text-4xl font-bold mb-8 text-white text-center [text-shadow:0_0_7px_#00ffff,0_0_10px_#00ffff,0_0_21px_#00ffff,0_0_42px_#00ffff]" 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        transition={{ duration: 1 }}
                    >
                        Technical Skills
                    </motion.h2>
                    <ul className="space-y-6 text-white text-2xl">
                        <li className="flex items-center before:content-['•'] before:mr-4 before:text-[#00ffff] before:[text-shadow:0_0_5px_#00ffff,0_0_10px_#00ffff] before:text-2xl">
                            HTML, CSS, JavaScript, React.js, Vite
                        </li>
                        <li className="flex items-center before:content-['•'] before:mr-4 before:text-[#00ffff] before:[text-shadow:0_0_5px_#00ffff,0_0_10px_#00ffff] before:text-2xl">
                            Python, Java, C++, C#, C
                        </li>
                        <li className="flex items-center before:content-['•'] before:mr-4 before:text-[#00ffff] before:[text-shadow:0_0_5px_#00ffff,0_0_10px_#00ffff] before:text-2xl">
                            Frameworks (Blazor, Java Swing)
                        </li>
                        <li className="flex items-center before:content-['•'] before:mr-4 before:text-[#00ffff] before:[text-shadow:0_0_5px_#00ffff,0_0_10px_#00ffff] before:text-2xl">
                            Database Management (Firebase, MySQL)
                        </li>
                        <li className="flex items-center before:content-['•'] before:mr-4 before:text-[#00ffff] before:[text-shadow:0_0_5px_#00ffff,0_0_10px_#00ffff] before:text-2xl">
                            GitHub Repository Management
                        </li>
                        <li className="flex items-center before:content-['•'] before:mr-4 before:text-[#00ffff] before:[text-shadow:0_0_5px_#00ffff,0_0_10px_#00ffff] before:text-2xl">
                            Development (Godot, Unity, Flutter, Android Studio)
                        </li>
                    </ul>
                </div>

                {/* Soft Skills - Right Side */}
                <div className="flex-1 mt-8 md:mt-0 flex flex-col items-center">
                    <motion.h2 
                        className="tracking-widest text-4xl font-bold mb-8 text-white text-center [text-shadow:0_0_7px_#b300ff,0_0_10px_#b300ff,0_0_21px_#b300ff,0_0_42px_#b300ff]"
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        transition={{ duration: 1 }}
                    >
                        Soft Skills
                    </motion.h2>
                    <ul className="space-y-6 text-white text-2xl">
                        <li className="flex items-center before:content-['•'] before:mr-4 before:text-[#b300ff] before:[text-shadow:0_0_5px_#b300ff,0_0_10px_#b300ff] before:text-2xl">
                            Fluent English Communicator
                        </li>
                        <li className="flex items-center before:content-['•'] before:mr-4 before:text-[#b300ff] before:[text-shadow:0_0_5px_#b300ff,0_0_10px_#b300ff] before:text-2xl">
                            Project Management
                        </li>
                        <li className="flex items-center before:content-['•'] before:mr-4 before:text-[#b300ff] before:[text-shadow:0_0_5px_#b300ff,0_0_10px_#b300ff] before:text-2xl">
                            Collaborator and Team Player
                        </li>
                        <li className="flex items-center before:content-['•'] before:mr-4 before:text-[#b300ff] before:[text-shadow:0_0_5px_#b300ff,0_0_10px_#b300ff] before:text-2xl">
                            Harmonious Blend of Logic and Creativity
                        </li>
                        <li className="flex items-center before:content-['•'] before:mr-4 before:text-[#b300ff] before:[text-shadow:0_0_5px_#b300ff,0_0_10px_#b300ff] before:text-2xl">
                            Innovative and Resourceful
                        </li>
                        <li className="flex items-center before:content-['•'] before:mr-4 before:text-[#b300ff] before:[text-shadow:0_0_5px_#b300ff,0_0_10px_#b300ff] before:text-2xl">
                            Self-Sufficient and Adaptable
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
);

export default SkillsPage;
