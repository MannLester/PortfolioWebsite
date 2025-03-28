'use client'

import { Anton } from 'next/font/google';
import { motion } from 'framer-motion';
import brickBackground from '@/assets/images/home_page/brick_bg.jpg';

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
            className="relative w-72 h-[380px] group"
        >
            {/* Neon border effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#00BFFF] to-[#0080FF] opacity-50 blur-md group-hover:opacity-75 transition-opacity"></div>
            
            {/* Card content */}
            <div className="relative bg-zinc-900/90 p-6 rounded-lg h-full flex flex-col border border-[#00BFFF] shadow-[0_0_15px_rgba(0,191,255,0.3)] group-hover:shadow-[0_0_25px_rgba(0,191,255,0.5)] transition-shadow">
                <h3 className={`${anton.className} text-2xl text-[#00BFFF] mb-3`}>{experience.title}</h3>
                <p className="text-zinc-400 mb-2 text-base">{experience.company}</p>
                <p className="text-sm text-zinc-500 mb-4">{experience.period}</p>
                <ul className="list-disc list-inside space-y-2 text-base">
                    {experience.description.map((point, idx) => (
                        <li key={idx} className="text-zinc-300">{point}</li>
                    ))}
                </ul>
            </div>
        </motion.div>
    );
};

const ExperiencePage = () => {
    return (
        <div id="experience" className="min-h-screen pt-32 flex flex-col items-center overflow-hidden relative" 
            style={{ backgroundImage: `url(${brickBackground.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/70" />
            
            <motion.h2 
                className={`text-6xl ${anton.className} tracking-wider mb-24 relative z-10 text-white
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
                <div className="flex justify-center gap-12 flex-nowrap">
                    {experiences.map((exp, index) => (
                        <ExperienceCard key={exp.title} experience={exp} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ExperiencePage;