'use client'

import { Anton } from 'next/font/google';
import { motion } from 'framer-motion';

const anton = Anton({
    weight: '400',
    subsets: ['latin'],
});

interface Recognition {
    title: string;
    year: string;
}

const recognitions: Recognition[] = [
    { title: "AWS Cloud Practitioner Essentials Completer", year: "2024" },
    { title: "Virtual Apprenticeship Completer", year: "2024" },
    { title: "KadaKareer Coaches' Choice Award", year: "2024" },
    { title: "2nd Placer Website Pitching Competition", year: "2024" },
    { title: "Participant Hackathon: World Engineering Day Pitching Competition", year: "2024" },
    { title: "Top 10 Finalist CTI SUCCESS Program", year: "2024" },
    { title: "5th Place: CodeChum National Programming Competition", year: "2024" },
    { title: "Top 7: Sustainability Expo 2024 Hackathon x Circular Innovation Challenge (International)", year: "2024" },
    { title: "CSE Sub-Professional Passer", year: "2024" },
    { title: "TOPCIT Software Competency Exam Taker", year: "2024" },
    { title: "Head of SCRIPT Organization - Game Development Branch", year: "2024" }
];

const RecognitionPath = () => {
    return (
        <div className="relative w-full max-w-5xl mx-auto">
            {/* Path line */}
            <motion.div
                className="absolute left-1/2 -translate-x-[1px] top-0 w-[2px] h-full bg-[#FF00CC]/30"
                initial={{ height: 0 }}
                animate={{ height: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
            />

            {/* Recognition items */}
            <div className="relative space-y-16 md:space-y-12">
                {recognitions.map((recognition, index) => (
                    <motion.div
                        key={index}
                        className={`flex items-center gap-4 md:gap-8 ${
                            index % 2 === 0 ? 'md:flex-row flex-col' : 'md:flex-row-reverse flex-col'
                        }`}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        {/* Content */}
                        <div className={`flex-1 ${
                            index % 2 === 0 ? 'md:text-right text-center' : 'md:text-left text-center'
                        }`}>
                            <motion.h3
                                className={`text-lg md:text-xl ${anton.className} mb-1 leading-tight`}
                                whileHover={{
                                    textShadow: [
                                        "0 0 7px #FF00CC",
                                        "0 0 10px #FF00CC",
                                        "0 0 21px #FF00CC",
                                        "0 0 42px #FF00CC",
                                        "0 0 82px #FF00CC",
                                        "0 0 92px #FF00CC",
                                        "0 0 102px #FF00CC",
                                        "0 0 151px #FF00CC"
                                    ],
                                    color: "#FF00CC"
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                {recognition.title}
                            </motion.h3>
                            <span className="text-zinc-400 text-sm md:text-base">{recognition.year}</span>
                        </div>

                        {/* Center dot */}
                        <motion.div
                            className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#FF00CC] relative z-10"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            whileHover={{ scale: 1.5, boxShadow: "0 0 20px #FF00CC" }}
                        />

                        {/* Empty div for spacing on the other side */}
                        <div className="flex-1 hidden md:block" />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

const RecognitionPage = () => {
    return (
        <div id="recognitions" className="min-h-screen pt-20 pb-20 flex flex-col items-center bg-black text-white overflow-hidden">
            <motion.h2 
                className={`text-4xl md:text-6xl ${anton.className} tracking-wider mb-16 text-center px-4 [text-shadow:0_0_7px_#FF00CC,0_0_10px_#FF00CC,0_0_21px_#FF00CC,0_0_42px_#FF00CC]`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                RECOGNITIONS
            </motion.h2>
            
            <div className="w-full px-4 md:px-8">
                <RecognitionPath />
            </div>
        </div>
    );
};

export default RecognitionPage;