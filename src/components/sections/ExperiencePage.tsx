'use client'

import { Anton } from 'next/font/google';
import { motion } from 'framer-motion';

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
            className="bg-zinc-900/50 p-6 rounded-lg border border-zinc-800 hover:border-[#00BFFF] transition-colors w-72 h-[380px] flex flex-col"
        >
            <h3 className={`${anton.className} text-2xl text-[#00BFFF] mb-3`}>{experience.title}</h3>
            <p className="text-zinc-400 mb-2 text-base">{experience.company}</p>
            <p className="text-sm text-zinc-500 mb-4">{experience.period}</p>
            <ul className="list-disc list-inside space-y-2 text-base">
                {experience.description.map((point, idx) => (
                    <li key={idx} className="text-zinc-300">{point}</li>
                ))}
            </ul>
        </motion.div>
    );
};

const ExperiencePage = () => {
    return (
        <div id="experience" className="min-h-screen pt-20 flex flex-col items-center bg-black text-white overflow-hidden">
            <motion.h2 
                className={`text-6xl ${anton.className} tracking-wider mb-16 [text-shadow:0_0_7px_#00BFFF,0_0_10px_#00BFFF,0_0_21px_#00BFFF,0_0_42px_#00BFFF]`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Experience
            </motion.h2>
            
            <div className="container mx-auto px-4">
                <div className="flex justify-center gap-6 flex-nowrap">
                    {experiences.map((exp, index) => (
                        <ExperienceCard key={exp.title} experience={exp} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ExperiencePage;