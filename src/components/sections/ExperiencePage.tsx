'use client'

import { Anton } from 'next/font/google';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const anton = Anton({
    weight: '400',
    subsets: ['latin'],
});

interface Experience {
    title: string;
    company: string;
    period: string;
    description: string[];
}

const experiences: Experience[] = [
    {
        title: "Full Stack Developer, Team Leader",
        company: "Center for AI and Science Technologies (CAIST)",
        period: "May - July",
        description: [
            "Did Full Stack on the Project",
            "Lead a team of developers towards success",
            "Engineered mock data for AI training"
        ]
    },
    {
        title: "Full Stack Developer",
        company: "StayEase",
        period: "May - July",
        description: [
            "Developed and maintained the website",
            "Primarily focused on the dorm owner side of the website"
        ]
    },
    {
        title: "Full Stack Developer",
        company: "Freelance",
        period: "May 2025",
        description: [
            "Freelanced and developed SmartPlate"
        ]
    },
    {
        title: "Beta Tester Intern",
        company: "Bowled.io / Internshala",
        period: "August 11 - September 11",
        description: [
            "Conducted thorough testing of web applications and features",
            "Identified and documented bugs and usability issues",
            "Provided detailed feedback for product improvement"
        ]
    },
    {
        title: "Virtual Apprentice",
        company: "Limitless Lab / KadaKareer",
        period: "May 20 - July 1",
        description: [
            "Participated in virtual apprenticeship program",
            "Gained hands-on experience in web development",
            "Collaborated with team members on various projects"
        ]
    },
    {
        title: "Social Media Manager",
        company: "QuickSpace & JackOfAllTrades Academics",
        period: "August 18 - September 18",
        description: [
            "Managed social media presence across multiple platforms",
            "Created and scheduled engaging content",
            "Analyzed engagement metrics and optimized content strategy"
        ]
    },
    {
        title: "Web Developer",
        company: "The Green Light Project / LinkedIn",
        period: "August 21 - November 30",
        description: [
            "Developed and maintained web applications",
            "Implemented responsive design principles",
            "Collaborated with team on project requirements and deliverables"
        ]
    }
];

const ExperienceCard: React.FC<{ experience: Experience; index: number }> = ({ experience, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="relative w-72 h-[380px] group flex-shrink-0"
        >
            {/* Neon border effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#00BFFF] to-[#0080FF] opacity-50 blur-md group-hover:opacity-75 transition-opacity"></div>
            
            {/* Card content */}
            <div className="relative bg-zinc-900/90 p-6 rounded-lg h-full flex flex-col border border-[#00BFFF] shadow-[0_0_15px_rgba(0,191,255,0.3)] group-hover:shadow-[0_0_25px_rgba(0,191,255,0.5)] transition-shadow">
                {/* Fixed header section */}
                <div className="flex-shrink-0 mb-4">
                    <h3 className={`${anton.className} text-2xl text-[#00BFFF] mb-3`}>{experience.title}</h3>
                    <p className="text-zinc-400 mb-2 text-base">{experience.company}</p>
                    <p className="text-sm text-zinc-500">{experience.period}</p>
                </div>
                
                {/* Scrollable content section */}
                <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-600 hover:scrollbar-thumb-zinc-500">
                    <style jsx>{`
                        .content-scrollbar::-webkit-scrollbar {
                            width: 4px;
                        }
                        .content-scrollbar::-webkit-scrollbar-track {
                            background: transparent;
                        }
                        .content-scrollbar::-webkit-scrollbar-thumb {
                            background: rgba(113, 113, 122, 0.5);
                            border-radius: 2px;
                        }
                        .content-scrollbar::-webkit-scrollbar-thumb:hover {
                            background: rgba(113, 113, 122, 0.7);
                        }
                    `}</style>
                    <ul className="list-disc list-inside space-y-2 text-s content-scrollbar">
                        {experience.description.map((point, idx) => (
                            <li key={idx} className="text-zinc-300">{point}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </motion.div>
    );
};

const ExperiencePage = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [currentExperience, setCurrentExperience] = useState(1);
    const [currentDesktopIndex, setCurrentDesktopIndex] = useState(1);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const desktopScrollRef = useRef<HTMLDivElement>(null);
    
    // Handle responsive layout detection
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        // Check on initial render
        checkMobile();
        
        // Add event listener for window resize
        window.addEventListener('resize', checkMobile);
        
        // Cleanup
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    
    // Track which experience card is currently visible in mobile view
    useEffect(() => {
        if (!isMobile || !scrollContainerRef.current) return;
        
        const scrollContainer = scrollContainerRef.current;
        let scrollTimeout: NodeJS.Timeout;
        
        const handleScroll = () => {
            if (!scrollContainer) return;
            
            clearTimeout(scrollTimeout);
            
            scrollTimeout = setTimeout(() => {
                const scrollPosition = scrollContainer.scrollLeft;
                const cardWidth = 300; // Width of each card including margin
                
                // Calculate which experience card is currently most visible
                const expIndex = Math.floor(scrollPosition / cardWidth);
                
                // Add 1 for human-readable index (1-based instead of 0-based)
                const newIndex = Math.min(Math.max(expIndex + 1, 1), experiences.length);
                setCurrentExperience(newIndex);
            }, 50);
        };
        
        scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
        
        // Initialize with first experience
        setTimeout(handleScroll, 100);
        
        return () => {
            clearTimeout(scrollTimeout);
            scrollContainer.removeEventListener('scroll', handleScroll);
        };
    }, [isMobile]);

    // Track desktop scroll position
    useEffect(() => {
        if (isMobile || !desktopScrollRef.current) return;
        
        const scrollContainer = desktopScrollRef.current;
        let scrollTimeout: NodeJS.Timeout;
        
        const handleDesktopScroll = () => {
            if (!scrollContainer) return;
            
            clearTimeout(scrollTimeout);
            
            scrollTimeout = setTimeout(() => {
                const scrollPosition = scrollContainer.scrollLeft;
                const cardWidth = 336; // 288px (w-72) + 48px (gap-12)
                const expIndex = Math.floor(scrollPosition / cardWidth);
                const newIndex = Math.min(Math.max(expIndex + 1, 1), experiences.length);
                setCurrentDesktopIndex(newIndex);
            }, 50);
        };
        
        scrollContainer.addEventListener('scroll', handleDesktopScroll, { passive: true });
        setTimeout(handleDesktopScroll, 100);
        
        return () => {
            clearTimeout(scrollTimeout);
            scrollContainer.removeEventListener('scroll', handleDesktopScroll);
        };
    }, [isMobile]);
    
    return (
        <div id="experience" className="min-h-screen pt-32 flex flex-col items-center overflow-hidden relative bg-black">
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/70" />
            
            <motion.h2 
                className={`text-4xl md:text-6xl ${anton.className} tracking-wider mb-12 md:mb-24 relative z-10 text-white
                    [text-shadow:0_0_7px_#00BFFF,0_0_10px_#00BFFF,0_0_21px_#00BFFF,0_0_42px_#00BFFF,0_0_82px_#00BFFF]
                    before:content-[''] before:absolute before:-inset-4 before:bg-[#00BFFF]/10 before:blur-xl before:-z-10
                    after:content-[''] after:absolute after:-inset-8 after:bg-[#00BFFF]/5 after:blur-2xl after:-z-20`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ 
                    opacity: 1, 
                    y: 0,
                    textShadow: [
                        "0 0 7px #00BFFF, 0 0 10px #00BFFF, 0 0 21px #00BFFF, 0 0 42px #00BFFF, 0 0 82px #00BFFF",
                        "0 0 7px #00BFFF, 0 0 10px #00BFFF, 0 0 21px #00BFFF, 0 0 42px #00BFFF",
                        "0 0 7px #00BFFF, 0 0 10px #00BFFF, 0 0 21px #00BFFF, 0 0 42px #00BFFF, 0 0 82px #00BFFF",
                        "0 0 7px #00BFFF, 0 0 10px #00BFFF, 0 0 21px #00BFFF",
                        "0 0 7px #00BFFF, 0 0 10px #00BFFF, 0 0 21px #00BFFF, 0 0 42px #00BFFF, 0 0 82px #00BFFF"
                    ]
                }}
                transition={{
                    duration: 0.5,
                    textShadow: {
                        duration: 2,
                        repeat: Infinity,
                        times: [0, 0.1, 0.2, 0.21, 1]
                    }
                }}
            >
                EXPERIENCE
            </motion.h2>
            
            <div className="container mx-auto px-4 relative z-10">
                {/* Desktop View - Show 4 cards, scrollable if more */}
                <div className="hidden md:block w-full">
                    <style jsx>{`
                        .thin-scrollbar::-webkit-scrollbar {
                            height: 4px;
                        }
                        .thin-scrollbar::-webkit-scrollbar-track {
                            background: transparent;
                        }
                        .thin-scrollbar::-webkit-scrollbar-thumb {
                            background: rgba(0, 191, 255, 0.3);
                            border-radius: 2px;
                        }
                        .thin-scrollbar::-webkit-scrollbar-thumb:hover {
                            background: rgba(0, 191, 255, 0.5);
                        }
                    `}</style>
                    <div 
                        ref={desktopScrollRef}
                        className="overflow-x-auto pb-6 scroll-smooth thin-scrollbar"
                        style={{ 
                            scrollSnapType: 'x mandatory',
                            scrollbarWidth: 'thin',
                            scrollbarColor: '#00BFFF40 transparent'
                        }}
                    >
                        <div className="flex gap-12 w-max">
                            {experiences.map((exp, index) => (
                                <div 
                                    key={`desktop-${index}`} 
                                    className="flex-shrink-0" 
                                    style={{ scrollSnapAlign: 'center' }}
                                >
                                    <ExperienceCard experience={exp} index={index} />
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Desktop scroll indicator */}
                    {experiences.length > 4 && (
                        <div className="text-center text-xs text-[#00BFFF]/70 mt-4">
                            <span>{`${currentDesktopIndex}/${experiences.length} Experiences`}</span>
                            <p className="text-[#00BFFF]/50 mt-1">Scroll horizontally to see more →</p>
                        </div>
                    )}
                </div>
                
                {/* Mobile View - Horizontal Scrolling */}
                <div className="md:hidden w-full">
                    <div 
                        ref={scrollContainerRef}
                        className="overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide scroll-smooth" 
                        style={{ scrollSnapType: 'x mandatory' }}
                        onScroll={(e) => {
                            const container = e.currentTarget;
                            const scrollPosition = container.scrollLeft;
                            const cardWidth = 300; // Width of each card
                            const expIndex = Math.floor(scrollPosition / cardWidth);
                            const newIndex = Math.min(Math.max(expIndex + 1, 1), experiences.length);
                            if (newIndex !== currentExperience) {
                                setCurrentExperience(newIndex);
                            }
                        }}
                    >
                        <div className="flex space-x-6 w-max">
                            {experiences.map((exp, index) => (
                                <div 
                                    key={`mobile-${index}`} 
                                    className="w-[300px] flex-shrink-0" 
                                    style={{ scrollSnapAlign: 'center' }}
                                >
                                    <ExperienceCard experience={exp} index={index} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="text-center text-xs text-[#00BFFF]/70 mt-4">
                        <span>{`${currentExperience}/${experiences.length} Experiences`}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExperiencePage;