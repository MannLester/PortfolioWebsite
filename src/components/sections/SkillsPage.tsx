"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Anton } from 'next/font/google';
import brickBg from '@/assets/images/home_page/brick_bg.jpg';
import { useState, useEffect } from 'react';

const anton = Anton({
    weight: '400',
    subsets: ['latin'],
});

const SkillsPage = () => {
    const [activeTab, setActiveTab] = useState('technical');
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    
    // Track window width for responsive behavior
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        // Set initial value
        handleResize();
        
        // Add event listener
        window.addEventListener('resize', handleResize);
        
        // Clean up
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX);
    };
    
    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };
    
    const handleTouchEnd = () => {
        if (touchStart - touchEnd > 100) {
            // Swipe left
            setActiveTab('soft');
        }
        
        if (touchEnd - touchStart > 100) {
            // Swipe right
            setActiveTab('technical');
        }
    };
    
    return (
    <div 
        id="skills" 
        className="relative min-h-screen bg-black p-4 md:p-8 pt-20 md:pt-24 overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
    >
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
            <style jsx global>{`
                @keyframes glowPulse {
                    0%, 100% {
                        text-shadow: 0 0 5px currentColor, 0 0 10px currentColor;
                        transform: scale(1);
                    }
                    50% {
                        text-shadow: 0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor;
                        transform: scale(1.1);
                    }
                }
                .glow-bullet::before {
                    animation: glowPulse 2s infinite;
                }
            `}</style>
            {/* Main Skills Heading */}
            <motion.h1 
                className="tracking-widest text-4xl md:text-6xl font-bold mb-8 md:mb-16 text-white text-center [text-shadow:0_0_7px_#FFD700,0_0_10px_#FFD700,0_0_21px_#FFD700,0_0_42px_#FFD700]"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 1 }}
            >
                SKILLS
            </motion.h1>

            {/* Mobile Tabs - Only visible on mobile */}
            <div className="flex md:hidden justify-center space-x-4 mb-6">
                <button 
                    onClick={() => setActiveTab('technical')}
                    className={`px-4 py-2 rounded-full transition-all duration-300 ${activeTab === 'technical' ? 'bg-[#00ffff]/20 text-[#00ffff] [text-shadow:0_0_5px_#00ffff,0_0_10px_#00ffff]' : 'bg-gray-800/50 text-white/70'}`}
                >
                    Technical
                </button>
                <button 
                    onClick={() => setActiveTab('soft')}
                    className={`px-4 py-2 rounded-full transition-all duration-300 ${activeTab === 'soft' ? 'bg-[#b300ff]/20 text-[#b300ff] [text-shadow:0_0_5px_#b300ff,0_0_10px_#b300ff]' : 'bg-gray-800/50 text-white/70'}`}
                >
                    Soft Skills
                </button>
            </div>
            

            
            {/* Skills Sections Container */}
            <div className="relative flex flex-col md:flex-row md:justify-between md:gap-16 mt-4 md:mt-8">
                {/* Technical Skills - Left Side */}
                <div className={`flex-1 flex flex-col items-center ${isMobile ? 'absolute inset-0' : ''} ${isMobile && activeTab !== 'technical' ? 'opacity-0 pointer-events-none' : 'opacity-100'} transition-opacity duration-300`}>
                    <motion.h2 
                        className="tracking-widest text-3xl md:text-4xl font-bold mb-4 md:mb-8 text-white text-center [text-shadow:0_0_7px_#00ffff,0_0_10px_#00ffff,0_0_21px_#00ffff,0_0_42px_#00ffff]" 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        transition={{ duration: 1 }}
                    >
                        Technical Skills
                    </motion.h2>
                    <ul className="space-y-3 md:space-y-6 text-white text-lg md:text-2xl">
                        <li className="flex items-start md:items-center glow-bullet before:content-['•'] before:mr-2 md:before:mr-4 before:text-[#00ffff] before:[text-shadow:0_0_5px_#00ffff,0_0_10px_#00ffff] before:text-xl md:before:text-2xl before:mt-1 md:before:mt-0">
                            HTML, CSS, JavaScript, React.js, Vite
                        </li>
                        <li className="flex items-start md:items-center glow-bullet before:content-['•'] before:mr-2 md:before:mr-4 before:text-[#00ffff] before:[text-shadow:0_0_5px_#00ffff,0_0_10px_#00ffff] before:text-xl md:before:text-2xl before:mt-1 md:before:mt-0">
                            Python, Java, C++, C#, C
                        </li>
                        <li className="flex items-start md:items-center glow-bullet before:content-['•'] before:mr-2 md:before:mr-4 before:text-[#00ffff] before:[text-shadow:0_0_5px_#00ffff,0_0_10px_#00ffff] before:text-xl md:before:text-2xl before:mt-1 md:before:mt-0">
                            Frameworks (Blazor, Java Swing)
                        </li>
                        <li className="flex items-start md:items-center glow-bullet before:content-['•'] before:mr-2 md:before:mr-4 before:text-[#00ffff] before:[text-shadow:0_0_5px_#00ffff,0_0_10px_#00ffff] before:text-xl md:before:text-2xl before:mt-1 md:before:mt-0">
                            Database Management (Firebase, MySQL)
                        </li>
                        <li className="flex items-start md:items-center glow-bullet before:content-['•'] before:mr-2 md:before:mr-4 before:text-[#00ffff] before:[text-shadow:0_0_5px_#00ffff,0_0_10px_#00ffff] before:text-xl md:before:text-2xl before:mt-1 md:before:mt-0">
                            GitHub Repository Management
                        </li>
                        <li className="flex items-start md:items-center glow-bullet before:content-['•'] before:mr-2 md:before:mr-4 before:text-[#00ffff] before:[text-shadow:0_0_5px_#00ffff,0_0_10px_#00ffff] before:text-xl md:before:text-2xl before:mt-1 md:before:mt-0">
                            Development (Godot, Unity, Flutter, Android Studio)
                        </li>
                    </ul>
                </div>

                {/* Soft Skills - Right Side */}
                <div className={`flex-1 md:mt-0 flex flex-col items-center ${isMobile ? 'absolute inset-0' : ''} ${isMobile && activeTab !== 'soft' ? 'opacity-0 pointer-events-none' : 'opacity-100'} transition-opacity duration-300`}>
                    <motion.h2 
                        className="tracking-widest text-3xl md:text-4xl font-bold mb-4 md:mb-8 text-white text-center [text-shadow:0_0_7px_#b300ff,0_0_10px_#b300ff,0_0_21px_#b300ff,0_0_42px_#b300ff]"
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        transition={{ duration: 1 }}
                    >
                        Soft Skills
                    </motion.h2>
                    <ul className="space-y-3 md:space-y-6 text-white text-lg md:text-2xl">
                        <li className="flex items-start md:items-center glow-bullet before:content-['•'] before:mr-2 md:before:mr-4 before:text-[#b300ff] before:[text-shadow:0_0_5px_#b300ff,0_0_10px_#b300ff] before:text-xl md:before:text-2xl before:mt-1 md:before:mt-0">
                            Fluent English Communicator
                        </li>
                        <li className="flex items-start md:items-center glow-bullet before:content-['•'] before:mr-2 md:before:mr-4 before:text-[#b300ff] before:[text-shadow:0_0_5px_#b300ff,0_0_10px_#b300ff] before:text-xl md:before:text-2xl before:mt-1 md:before:mt-0">
                            Project Management
                        </li>
                        <li className="flex items-start md:items-center glow-bullet before:content-['•'] before:mr-2 md:before:mr-4 before:text-[#b300ff] before:[text-shadow:0_0_5px_#b300ff,0_0_10px_#b300ff] before:text-xl md:before:text-2xl before:mt-1 md:before:mt-0">
                            Collaborator and Team Player
                        </li>
                        <li className="flex items-start md:items-center glow-bullet before:content-['•'] before:mr-2 md:before:mr-4 before:text-[#b300ff] before:[text-shadow:0_0_5px_#b300ff,0_0_10px_#b300ff] before:text-xl md:before:text-2xl before:mt-1 md:before:mt-0">
                            Harmonious Blend of Logic and Creativity
                        </li>
                        <li className="flex items-start md:items-center glow-bullet before:content-['•'] before:mr-2 md:before:mr-4 before:text-[#b300ff] before:[text-shadow:0_0_5px_#b300ff,0_0_10px_#b300ff] before:text-xl md:before:text-2xl before:mt-1 md:before:mt-0">
                            Innovative and Resourceful
                        </li>
                        <li className="flex items-start md:items-center glow-bullet before:content-['•'] before:mr-2 md:before:mr-4 before:text-[#b300ff] before:[text-shadow:0_0_5px_#b300ff,0_0_10px_#b300ff] before:text-xl md:before:text-2xl before:mt-1 md:before:mt-0">
                            Self-Sufficient and Adaptable
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  );
};

export default SkillsPage;
