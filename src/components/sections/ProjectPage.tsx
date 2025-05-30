"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Anton } from 'next/font/google';
import React, { useState, useEffect, useRef } from 'react';
import { useModal } from '@/context/ModalContext';
import Link from 'next/link';

// StayEase Project Images
import stayeasePic1 from '@/assets/images/stayease_pics/stayease_pic1.png';
import stayeasePic2 from '@/assets/images/stayease_pics/stayease_pic2.png';
import stayeasePic3 from '@/assets/images/stayease_pics/stayease_pic3.png';
import stayeasePic4 from '@/assets/images/stayease_pics/stayease_pic4.png';
import stayeasePic5 from '@/assets/images/stayease_pics/stayease_pic5.png';

// Gocery Project Images
import goceryPic1 from '@/assets/images/gocery_pics/gocery_pic1.jpg';
import goceryPic2 from '@/assets/images/gocery_pics/gocery_pic2.jpg';
import goceryPic3 from '@/assets/images/gocery_pics/gocery_pic3.jpg';
import goceryPic4 from '@/assets/images/gocery_pics/gocery_pic4.jpg';
import goceryPic5 from '@/assets/images/gocery_pics/gocery_pic5.jpg';
import goceryPic6 from '@/assets/images/gocery_pics/gocery_pic6.jpg';
import goceryPic7 from '@/assets/images/gocery_pics/gocery_pic7.jpg';
import goceryPic8 from '@/assets/images/gocery_pics/gocery_pic8.jpg';
import goceryPic9 from '@/assets/images/gocery_pics/gocery_pic9.jpg';
import goceryPic10 from '@/assets/images/gocery_pics/gocery_pic10.jpg';


const anton = Anton({
    weight: '400',
    subsets: ['latin'],
});

interface Project {
    title: string;
    description: string;
    technologies: string[];
    genres: string[];
    languages: string[];
    deployed: boolean;
    githubUrl: string;
    liveUrl?: string;   
    role?: string[];
    collaborators?: {
        name: string;
        role: string[];
        link?: string;
    }[];
    images?: {
        src: string;
        alt: string;
        caption?: string;
    }[];
}

export const projects: Project[] = [
    {
        title: "GameChagerAI",
        description: "GameChangerAI is a Flutter-based mobile app that uses advanced machine learning to provide data-driven win probability predictions for NBA games. It offers clear, insightful forecasts for fans, analysts, and sports bettors.",
        technologies: ["Dart", "Flutter", "Python","NBA Stats API", "Pandas"],
        genres: ["Mobile Development", "AI/ML"],
        languages: ["Dart", "Python"],
        deployed: false,
        githubUrl: "https://github.com/Chesterlajara/Game-Changer-AI",
        role: ["Full Stack Developer", "UI/UX Designer", "AI Model Integrator"],
        collaborators: [
            {
                name: "Chester Lajara",
                role: ["Frontend Developer", "Quality Assurance", "Project Manager"],
                link: "https://github.com/Chesterlajara"
            },
            {
                name: "Christine Joyce De Leon",
                role: ["Frontend Developer", "UI/UX Designer"],
                link: "https://github.com/christinedln"
            },
            {
                name: "Marc Linus Rosales",
                role: ["AI Model Integrator", "Backend Developer"],
                link: "https://github.com/MarcLinus"
            }
        ]
    },
    {
        title: "CPU Simulator",
        description: "CPU Simulator is an interactive educational tool designed to help students, educators, and curious learners understand how a CPU processes instructions and functions within a computer.",
        technologies: ["TypeScript", "JavaScript","React", "Next.js", "Tailwind CSS"],
        genres: ["Website Development"],
        languages: ["TypeScript", "JavaScript"],
        deployed: true,
        liveUrl: "https://computer-archi.vercel.app",
        githubUrl: "https://github.com/Gerard-M/computer-archi",
        role: ["Full Stack Developer"],
        collaborators: [
            {
                name: "Gerard Andrei Malapote",
                role: ["Full Stack Developer", "Project Manager"],
                link: "https://github.com/Gerard-M"
            },
            {
                name: "Diomael Francis Lecaroz",
                role: ["Frontend Developer", "UI/UX Designer"],
                link: "https://github.com/DiomaelLecaroz"
            },
            {
                name: "Marc Linus Rosales",
                role: ["Documentation Writer"],
                link: "https://github.com/MarcLinus"
            },
            {
                name: "Jett Mark Manalo",
                role: ["Documentation Writer"],
                link: "https://github.com/jettmanalo"
            },
            {
                name: "Jofether Mendoza",
                role: ["Documentation Writer"],
                link: "https://github.com/jofether"
            },
            {
                name: "Kristhian Pinili",
                role: ["Documentation Writer"],
                link: "https://github.com/Kristhian-ai"
            },
        ]
    },
    {
        title: "SmartPlate",
        description: "SmartPlate is an intelligent meal planning system that delivers personalized meal plans, Gemini API-powered recipe suggestions, and nutrition tracking to help users meet their dietary needs and health goals.",
        technologies: ["TypeScript", "JavaScript","React", "Next.js", "Tailwind CSS"],
        genres: ["Website Development", "Mobile Development"],
        languages: ["TypeScript", "JavaScript"],
        deployed: false,
        githubUrl: "https://github.com/KimMathew/SmartPlate",
        role: ["Freelance Developer"],
    },
    {
        title: "StayEase",
        description: "StayEase is a dedicated platform designed to simplify the process of finding and listing student accommodations. Tailored for college students seeking dorms and dorm owners looking to rent out their properties, StayEase connects both parties seamlessly. With an intuitive interface, detailed listings, and essential filters, finding the perfect student housing has never been easier.",
        technologies: ["TypeScript", "JavaScript","HTML","CSS","React","Vite","Tailwind CSS", "MongoDB", "Firebase"],
        genres: ["Website Development"],
        languages: ["TypeScript"],
        deployed: true,
        liveUrl: "https://stayease-frontend.vercel.app",
        githubUrl: "https://github.com/clarenzmauro/StayEase",
        role: ["Full Stack Developer", "Project Manager", "Database Administrator"],
        images: [
            {
                src: stayeasePic1.src,
                alt: "StayEase Homepage",
                caption: "Modern and intuitive homepage design"
            },
            {
                src: stayeasePic2.src,
                alt: "StayEase Search",
                caption: "Property Page"
            },
            {
                src: stayeasePic3.src,
                alt: "StayEase Booking",
                caption: "Streamlined booking process"
            },
            {
                src: stayeasePic4.src,
                alt: "StayEase Details",
                caption: "Detailed property information"
            },
            {
                src: stayeasePic5.src,
                alt: "StayEase Reviews",
                caption: "User accounts and details"
            }
        ],
        collaborators: [
            {
                name: "Clarenz Mauro",
                role: ["Backend Developer", "Database Administrator"],
                link: "https://github.com/clarenzmauro"
            },
            {
                name: "Edrian Hernandez",
                role: ["Frontend Developer", "UI/UX Designer"],
                link: "https://github.com/EdrianHernandez"
            },
            {
                name: "Jett Mark Manalo",
                role: ["Frontend Developer", "UI/UX Designer"],
                link: "https://github.com/jettmanalo"
            }
        ]
    },
    {
        title: "Cards of Power",
        description: "Cards of Power is a turn-based trading card game that revolutionizes strategy and trading. With over 100+ unique cards, each equipped with custom mechanics, players can craft their playstyle to dominate the battlefield. Featuring non-fungible cards with unique IDs, every card gains a real-world and in-game market value, fostering a dynamic trading ecosystem. The game also integrates data visualization to help players improve their strategies and allows users to submit custom card ideas via the Workshop station for approval by developers. Whether you’re battling opponents, investing in your card deck, or strategizing with stats, Cards of Power delivers a thrilling and competitive gaming experience.",
        technologies: ["JavaScript","HTML","CSS","React", "Vite","Tailwind CSS", "Firebase", "Game Design", "Game Development"],
        genres: ["Game Development"],
        languages: ["JavaScript"],
        deployed: false,
        githubUrl: "https://github.com/MannLester/CardsofPower",
        role: ["Full Stack Developer", "Project Manager", "Database Administrator", "Assets Designer"],
        collaborators: [
            {
                name: "Clarenz Mauro",
                role: ["Backend Developer", "Database Administrator"],
                link: "https://github.com/clarenzmauro"
            },
            {
                name: "Jett Mark Manalo",
                role: ["Frontend Developer", "UI/UX Designer"],
                link: "https://github.com/jettmanalo"
            },
            {
                name: "Vince Jericho Abella",
                role: ["Backend Developer"],
                link: "https://github.com/VinceAbella"
            }
        ]
    },
    {
        title: "GoCery!",
        description: "Go-Cery is a cutting-edge Android application that enhances the efficiency of traditional grocery shopping by leveraging modern technology. With Go-Cery, customers enjoy a faster, more streamlined experience, while store owners efficiently manage their inventory and operations.",
        technologies: ["Java", "Android Studio", "Firebase", "Glide QR"],
        genres: ["Mobile Development"],
        languages: ["Java"],
        deployed: false,
        githubUrl: "https://github.com/MannLester/Go-cery",
        role: ["Backend Developer", "Project Manager", "Database Administrator"],
        collaborators: [
            {
                name: "Gerard Malapote",
                role: ["Frontend Developer", "Assets Designer"],
                link: "https://github.com/Gerard-M"
            },
            {
                name: "Marc Linus Rosales",
                role: ["Backend Developer", "Database Administrator"],
                link: "https://github.com/MarcLinus"
            }
        ],
        images: [
            {
                src: goceryPic1.src,
                alt: "StayEase Homepage",
                caption: "Landing Page with Logo Design"
            },
            {
                src: goceryPic2.src,
                alt: "StayEase Search",
                caption: "Intuitive User Cart"
            },
            {
                src: goceryPic3.src,
                alt: "StayEase Booking",
                caption: "Admin Dashboard"
            },
            {
                src: goceryPic4.src,
                alt: "StayEase Details",
                caption: "Add Store Feature"
            },
            {
                src: goceryPic5.src,
                alt: "StayEase Reviews",
                caption: "Add Product Feature"
            },
            {
                src: goceryPic6.src,
                alt: "StayEase Reviews",
                caption: "QR Generation Feature"
            },
            {
                src: goceryPic7.src,
                alt: "StayEase Reviews",
                caption: "Inventory Management Feature"
            },
            {
                src: goceryPic8.src,
                alt: "StayEase Reviews",
                caption: "QR Scanner Feature"
            },
            {
                src: goceryPic9.src,
                alt: "StayEase Reviews",
                caption: "Receipt Details"
            },
            {
                src: goceryPic10.src,
                alt: "StayEase Reviews",
                caption: "Store History"
            },
        ],
    },
    {
        title: "Reforge",
        description: "Reforge: Rise of the Seventeen Cities is an RPG game created using the Java language whilst implementing Java Swing modules. It showcases 25 items, 8 pets, 20 bosses, 18 cities, and a compelling storyline. The program allows the user to travel to those 18 cities and learn more about the problem they’re facing, and is equipped with 4 items to beat 3 bosses of each city. After defeating a boss, a loot will be dropped containing resources such as: gold, iron, herb, biscuit, and diamond. This can be used to buy new items or fund programs to help the city progress.",
        technologies: ["Java", "Java Swing", "SQL", "Game Design", "Game Development"],
        genres: ["Game Development"],
        languages: ["Java"],
        deployed: false,
        githubUrl: "https://github.com/MannLester/reforge",
        role: ["Full Stack Developer", "Project Manager", "Assets Designer", "UI/UX Designer"],
        collaborators: [
            {
                name: "Gerard Malapote",
                role: ["Frontend Developer", "Assets Designer", "UI/UX Designer"],
                link: "https://github.com/Gerard-M"
            },
            {
                name: "Marc Linus Rosales",
                role: ["Backend Developer", "Database Administrator"],
                link: "https://github.com/MarcLinus"
            },
            {
                name: "Kristhian Pinili",
                role: ["Backend Developer", "Quality Assurance"],
                link: "https://github.com/Kristhian-ai"
            },
            {
                name: "Jett Mark Manalo",
                role: ["Frontend Developer", "UI/UX Designer"],
                link: "https://github.com/jettmanalo"
            } 
        ]
    },
    {
        title: "EduHub",
        description: "EduHub is a Blazor.NET-powered information platform designed to revolutionize career education through interactive module-based learning, community engagement, and simulation-driven experiences. By integrating these elements, EduHub provides a dynamic and immersive approach to skill development and professional growth.",
        technologies: ["C#","Blazor.NET", "Game Development", "Website Development"],
        genres: ["Website Development"],
        languages: ["Blazor.NET"],
        deployed: false,
        role: ["Full Stack Developer", "Project Manager", "Database Administrator", "Assets Designer", "UI/UX Designer"],
        githubUrl: "https://github.com/MannLester/EduHub/tree/master",
        collaborators: [
            {
                name: "Marc Linus Rosales",
                role: ["Backend Developer", "Database Administrator"],
                link: "https://github.com/MarcLinus"
            },
            {
                name: "Edrian Hernandez",
                role: ["Frontend Developer", "UI/UX Designer"],
                link: "https://github.com/EdrianHernandez"
            },
            {
                name: "Diomael Francis Lecaroz",
                role: ["Quality Assurance"],
                link: "https://github.com/DiomaelLecaroz"
            },
            {
                name: "Gerard Andrei Malapote",
                role: ["Frontend Developer", "Assets Designer", "UI/UX Designer"],
                link: "https://github.com/Gerard-M"
            }
        ]
    },
    {
        title: "Knapsack Program",
        description: "A C programming implementation of the Knapsack Algorithm, designed with a cleaner and more scalable code structure. This project demonstrates efficient data handling for solving the 0/1 Knapsack problem.",
        technologies: ["C"],
        genres: ["Data Structure and Algorithm"],
        languages: ["C"],
        deployed: false,
        role: ["Backend Developer"],
        githubUrl: "https://github.com/MannLester/KnapsackProgram",
    }, 
    {
        title: "Automatic File Organizer",
        description: "This scripting project automates the organization of downloaded files by categorizing them into separate folders for images, videos, and PDFs. Additionally, files are sorted based on their download date, ensuring a structured and easily accessible directory.",
        technologies: ["Python"],
        genres: ["Automation"],
        languages: ["Python"],
        role: ["Backend Developer"],
        deployed: false,
        githubUrl: "https://github.com/MannLester/FileOrganizer",
    }, 
    {
        title: "The Green Light Project",
        description: "The Green Light Project is a volunteer-driven initiative, and its website is being redesigned to enhance functionality and user experience. This project is an opportunity to contribute as a volunteer web designer while gaining valuable experience in web development.",
        technologies: ["HTML", "CSS", "JavaScript"],
        genres: ["Website Development"],
        languages: ["JavaScript"],
        deployed: true,
        liveUrl: "https://mannlester.github.io/TheGreenLightProject/HomePage.html",
        githubUrl: "https://github.com/MannLester/TheGreenLightProject",
    },
    
    {
        title: "Versus",
        description: "Versus is a 2-player C++ console game wherein the players can choose to battle from three different games: 1v1 Fighting Game, Password Game, and Tic-Tac-Toe Game. Not only does it provide entertainment it also educates the players by incorporating learning materials across the different games.",
        technologies: ["C++", "Game Design","Game Development","Console Application"],
        genres: ["Game Development"],
        languages: ["C++"],
        deployed: false,
        githubUrl: "https://github.com/MannLester/Versus",
    },
    {
        title: "Quantum Chase",
        description: "In Quantum Chase: Hunt For Victory In The Quantum Realm, the users will embark on a journey through the quantum realm, where they will be challenged with questions related to the 17 SDGs. The program incorporates the basic quiz-based game setup which includes a dictionary of questions from different SDGs. It also incorporates passive and skill features that can be used by player to aid them in their game. However, it is of assurance that the passive and skills will not hinder the main purpose of the program, which is to raise awareness.",
        technologies: ["Python", "Flask", "Game Design", "Game Development"],
        genres: ["Game Development"],
        languages: ["Python"],
        deployed: false,
        githubUrl: "https://github.com/MannLester/Quantum-Chase-WebGame",
    },
    {
        title: "Poker Game",
        description: "Welcome to the C++ console-based poker game. This game allows you to play against three computer opponents and test your poker skills. The game follows the rules of Texas Hold'em, and at the end of each match, the card hands are analyzed to determine the winner.",
        technologies: ["C++", "Game Design", "Game Development"],
        genres: ["Game Development"],
        languages: ["C++"],
        deployed: false,
        githubUrl: "https://github.com/MannLester/Poker-Game",
    },
    // Add more projects as needed
];

const genres = Array.from(new Set(projects.flatMap(project => project.genres)));
const languages = Array.from(new Set(projects.flatMap(project => project.languages)));

const SelectFilter: React.FC<{
    value: string | null;
    onChange: (value: string | null) => void;
    options: string[];
    label: string;
}> = ({ value, onChange, options, label }) => (
    <div className="relative">
        <select
            value={value || ""}
            onChange={(e) => onChange(e.target.value || null)}
            className="appearance-none bg-zinc-900/70 text-zinc-300 px-4 py-2 pr-8 rounded-lg border border-zinc-800/50 
                     hover:border-[#00FF00] focus:border-[#00FF00] focus:outline-none focus:ring-1 focus:ring-[#00FF00]
                     transition-all duration-300 cursor-pointer backdrop-blur-sm w-[200px] [-webkit-appearance:none] [-moz-appearance:none]"
        >
            <option value="">{`All ${label}`}</option>
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-zinc-400">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
        </div>
    </div>
);

const NavigationButton: React.FC<{
    direction: 'prev' | 'next';
    onClick: () => void;
    disabled: boolean;
}> = ({ direction, onClick, disabled }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`absolute top-1/2 -translate-y-1/2 ${direction === 'prev' ? '-left-16' : '-right-16'}
            bg-zinc-900/70 text-zinc-300 p-2 rounded-full border border-zinc-800/50
            hover:border-[#00FF00] hover:text-[#00FF00] disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-300 z-20 backdrop-blur-sm`}
    >
        <svg
            className={`h-6 w-6 ${direction === 'next' && 'rotate-180'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
    </button>
);

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
    const { isModalOpen, setIsModalOpen } = useModal();
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const handleOpenModal = () => {
        setSelectedProject(project);
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProject(null);
        document.body.style.overflow = 'unset';
    };

    useEffect(() => {
        return () => {
            // Cleanup when component unmounts
            document.body.style.overflow = 'unset';
        };
    }, []);

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isModalOpen]);

    return (
        <>
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                onClick={handleOpenModal}
                className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-4 md:p-6 hover:bg-zinc-800/50 transition-all duration-300 
                           border border-zinc-800/50 hover:border-zinc-700/50 group w-full h-[280px] flex flex-col cursor-pointer"
            >
                <div className="flex justify-between items-start mb-2">
                    <h3 className={`${anton.className} text-2xl text-white [text-shadow:0_0_7px_#00FF00,0_0_10px_#00FF00]`}>
                        {project.title}
                    </h3>
                    <div className="flex items-center">
                        <span className={`text-sm px-2 py-1 rounded-full ${project.deployed ? 'bg-green-900/70 text-green-400' : 'bg-red-900/70 text-red-400'}`}>
                            {project.deployed ? 'Deployed' : 'Undeployed'}
                        </span>
                    </div>
                </div>
                <p className="text-zinc-300 text-sm md:text-base mb-3 md:mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, i) => (
                        <span
                            key={i}
                            className="px-3 py-1 text-sm bg-zinc-800/50 rounded-full text-[#00FF00] hover:bg-zinc-700/50 transition-colors"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
                <div className="flex gap-4 mt-auto">
                    {project.githubUrl && (
                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-zinc-300 hover:text-[#00FF00] transition-colors"
                            onClick={(e) => e.stopPropagation()}
                        >
                            GitHub →
                        </a>
                    )}
                    {project.liveUrl && (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-zinc-300 hover:text-[#00FF00] transition-colors"
                            onClick={(e) => e.stopPropagation()}
                        >
                            Live Demo →
                        </a>
                    )}
                </div>
            </motion.div>

            <AnimatePresence>
                {isModalOpen && selectedProject && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                            onClick={() => setIsModalOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ type: "spring", damping: 25, stiffness: 400 }}
                            className="fixed inset-0 flex items-center justify-center z-50"
                        >
                            <div className="w-[90vw] max-w-[420px] h-[90vh] max-h-[570px] overflow-y-auto bg-zinc-900/95 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-zinc-800/50">
                                <div className="flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-4">
                                        <h2 className={`${anton.className} text-xl text-white [text-shadow:0_0_7px_#00FF00,0_0_10px_#00FF00]`}>
                                            {selectedProject.title}
                                        </h2>
                                        <button
                                            onClick={handleCloseModal}
                                            className="text-zinc-400 hover:text-white transition-colors"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>

                                    <span className={`text-sm px-3 py-1 rounded-full ${selectedProject.deployed ? 'bg-green-900/70 text-green-400' : 'bg-red-900/70 text-red-400'} w-fit mb-5`}>
                                        {selectedProject.deployed ? 'Deployed' : 'Undeployed'}
                                    </span>

                                    <div className="flex flex-col gap-2 mb-6 text-sm">
                                        <div className="flex items-center gap-2">
                                            <span className="text-zinc-400">Github:</span>
                                            {selectedProject.githubUrl && (
                                                <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" 
                                                   className="text-zinc-300 truncate">
                                                    {selectedProject.githubUrl.replace('https://github.com/', '')}
                                                </a>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-zinc-400">Deployment Link:</span>
                                            {selectedProject.deployed && selectedProject.liveUrl ? (
                                                <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" 
                                                   className="text-zinc-300 truncate">
                                                    {selectedProject.liveUrl.replace('https://', '')}
                                                </a>
                                            ) : (
                                                <span className="text-zinc-500">N/A</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <p className="text-zinc-300 text-sm leading-relaxed max-h-[120px] overflow-y-auto pr-2 scrollbar-thin scrollbar-track-zinc-800 scrollbar-thumb-zinc-600">
                                            {selectedProject.description}
                                        </p>
                                    </div>

                                    <div className="mb-6">
                                        <span className="text-zinc-400 text-sm">Genre:</span>
                                        <span className="text-sm px-3 py-1 rounded-full bg-zinc-800/70 text-zinc-300 w-fit ml-2">
                                            {selectedProject.genres.join(', ')}
                                        </span>
                                    </div>

                                    <div className="mb-6">
                                        <span className="text-zinc-400 text-sm mb-3 block">Tags:</span>
                                        <div className="flex flex-wrap gap-1.5">
                                            {selectedProject.technologies.map((tech, i) => (
                                                <span
                                                    key={i}
                                                    className="px-2 py-1 text-xs bg-zinc-800/50 rounded-full text-[#00FF00] hover:bg-zinc-700/50 transition-colors"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <Link 
                                        href={`/projects/${selectedProject.title.toLowerCase().replace(/\s+/g, '-')}`}
                                        className="text-[#00FF00] underline text-sm mt-auto inline-block"
                                    >
                                        See Detailed Page
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

const ProjectPage = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
    const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
    const [selectedDeployed, setSelectedDeployed] = useState<string | null>(null);
    const [direction, setDirection] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [currentMobileProject, setCurrentMobileProject] = useState(1);
    
    // Reference to the scroll container
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    
    // Filter projects based on selected filters
    const filteredProjects = projects.filter(project => {
        const matchesGenre = !selectedGenre || project.genres.includes(selectedGenre);
        const matchesLanguage = !selectedLanguage || project.languages.includes(selectedLanguage);
        const matchesDeployed = selectedDeployed === null || 
            (selectedDeployed === 'Deployed' && project.deployed) ||
            (selectedDeployed === 'Not Deployed' && !project.deployed);
        return matchesGenre && matchesLanguage && matchesDeployed;
    });
    
    const projectsPerPage = 3;
    const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
    const currentProjects = filteredProjects.slice(
        currentPage * projectsPerPage,
        (currentPage + 1) * projectsPerPage
    );
    
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
    
    // Track which project is currently visible in mobile view
    useEffect(() => {
        if (!isMobile || !scrollContainerRef.current) return;
        
        const scrollContainer = scrollContainerRef.current;
        let scrollTimeout: NodeJS.Timeout;
        
        const handleScroll = () => {
            if (!scrollContainer) return;
            
            // Clear any existing timeout to debounce the scroll event
            clearTimeout(scrollTimeout);
            
            // Set a timeout to update the counter after scrolling stops
            scrollTimeout = setTimeout(() => {
                const scrollPosition = scrollContainer.scrollLeft;
                const cardWidth = 300; // Width of each card including margin
                
                // Calculate which project is currently most visible
                const projectIndex = Math.floor(scrollPosition / cardWidth);
                
                // Add 1 for human-readable index (1-based instead of 0-based)
                // and ensure it doesn't exceed the number of projects
                const newIndex = Math.min(Math.max(projectIndex + 1, 1), filteredProjects.length || 1);
                setCurrentMobileProject(newIndex);
            }, 50); // Small delay to ensure accurate position after scroll momentum
        };
        
        // Add event listeners for both scroll and touch events
        scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
        scrollContainer.addEventListener('touchend', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll, { passive: true });
        
        // Force an update when the component mounts
        setTimeout(handleScroll, 100);
        
        return () => {
            clearTimeout(scrollTimeout);
            scrollContainer.removeEventListener('scroll', handleScroll);
            scrollContainer.removeEventListener('touchend', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, [isMobile, filteredProjects.length]);

    const handlePrevPage = () => {
        setDirection(-1);
        setCurrentPage(prev => Math.max(0, prev - 1));
    };

    const handleNextPage = () => {
        setDirection(1);
        setCurrentPage(prev => Math.min(totalPages - 1, prev + 1));
    };

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 300 : -300,
            opacity: 0
        })
    };

    return (
        <div id="projects" className="min-h-screen bg-black pt-28">
            {/* Content Container */}
            <div className="relative z-10 container mx-auto px-4">
                <motion.h1 
                    className={`${anton.className} tracking-widest text-4xl md:text-6xl font-bold mb-8 md:mb-16 text-white text-center [text-shadow:0_0_7px_#00FF00,0_0_10px_#00FF00,0_0_21px_#00FF00,0_0_42px_#00FF00]`}
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ duration: 1 }}
                >
                    PROJECTS
                </motion.h1>

                {/* Filters */}
                <div className="mb-6 md:mb-12 flex flex-wrap gap-3 md:gap-4 justify-center items-center">
                    <SelectFilter
                        value={selectedGenre}
                        options={genres}
                        onChange={(value) => {
                            setSelectedGenre(value);
                            setCurrentPage(0);
                        }}
                        label="Genres"
                    />
                    <SelectFilter
                        value={selectedLanguage}
                        options={languages}
                        onChange={(value) => {
                            setSelectedLanguage(value);
                            setCurrentPage(0);
                        }}
                        label="Languages"
                    />
                    <SelectFilter
                        value={selectedDeployed}
                        options={['Deployed', 'Not Deployed']}
                        onChange={(value) => {
                            setSelectedDeployed(value);
                            setCurrentPage(0);
                        }}
                        label="Status"
                    />
                </div>

                {/* Projects Grid with Navigation */}
                <div className="relative mx-auto max-w-7xl px-2 md:px-4 lg:px-20">
                    <div className="overflow-hidden">
                        <AnimatePresence mode="wait" custom={direction}>
                            {!isMobile ? (
                                /* Desktop View - Grid Layout */
                                <motion.div 
                                    key={`desktop-view-${currentPage}`}
                                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
                                    custom={direction}
                                    variants={variants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ 
                                        duration: 0.7,
                                        ease: "easeInOut"
                                    }}
                                >
                                    {currentProjects.map((project) => (
                                        <ProjectCard key={`desktop-${project.title}`} project={project} />
                                    ))}
                                </motion.div>
                            ) : (
                                /* Mobile View - Horizontal Scroll */
                                <motion.div 
                                    key="mobile-view"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="w-full"
                                >
                                    <div 
                                        ref={scrollContainerRef}
                                        className="overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide scroll-smooth" 
                                        style={{ scrollSnapType: 'x mandatory' }}
                                        onScroll={(e) => {
                                            // Direct event handler for immediate feedback
                                            const container = e.currentTarget;
                                            const scrollPosition = container.scrollLeft;
                                            const cardWidth = 300; // Width of each card
                                            const projectIndex = Math.floor(scrollPosition / cardWidth);
                                            const newIndex = Math.min(Math.max(projectIndex + 1, 1), filteredProjects.length);
                                            if (newIndex !== currentMobileProject) {
                                                setCurrentMobileProject(newIndex);
                                            }
                                        }}
                                    >
                                        <div className="flex space-x-4 w-max">
                                            {filteredProjects.map((project, index) => (
                                                <div 
                                                    key={`mobile-${project.title}`} 
                                                    className="w-[300px] flex-shrink-0" 
                                                    style={{ scrollSnapAlign: 'center' }}
                                                    id={`project-card-${index}`}
                                                >
                                                    <ProjectCard key={`mobile-card-${project.title}`} project={project} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="text-center text-xs text-zinc-500 mt-2">
                                        <span>{filteredProjects.length > 0 ? `${currentMobileProject}/${filteredProjects.length} Projects` : 'No projects found'}</span>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Navigation buttons only shown on desktop */}
                    <div className="hidden md:block">
                        <NavigationButton
                            direction="prev"
                            onClick={handlePrevPage}
                            disabled={currentPage === 0}
                        />
                        <NavigationButton
                            direction="next"
                            onClick={handleNextPage}
                            disabled={currentPage >= totalPages - 1}
                        />
                    </div>
                </div>

                {/* Page Indicator */}
                <div className="hidden md:flex justify-center gap-2 mt-8">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                i === currentPage 
                                    ? 'bg-[#00FF00] w-6'
                                    : 'bg-zinc-600 hover:bg-zinc-500'
                            }`}
                            aria-label={`Go to page ${i + 1}`}
                        />
                    ))}
                </div>

                {/* No Results Message */}
                {filteredProjects.length === 0 && (
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center text-zinc-400 mt-8"
                    >
                        No projects found with the selected filters.
                    </motion.p>
                )}
            </div>
        </div>
    );
};

export default ProjectPage;
