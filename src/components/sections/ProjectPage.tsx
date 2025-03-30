"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Anton } from 'next/font/google';
import { useState, useEffect } from 'react';
import { useModal } from '@/context/ModalContext';

const anton = Anton({
    weight: '400',
    subsets: ['latin'],
});

interface Project {
    title: string;
    description: string;
    technologies: string[];
    genre: string;
    language: string;
    deployed: boolean;
    githubUrl?: string;
    liveUrl?: string;
}

const projects: Project[] = [
    {
        title: "StayEase",
        description: "StayEase description",
        technologies: ["TypeScript", "JavaScript","HTML","CSS","React","Vite","Tailwind CSS", "MongoDB", "Firebase"],
        genre: "Web Development",
        language: "TypeScript",
        deployed: true,
        githubUrl: "https://github.com/clarenzmauro/StayEase",
    },
    {
        title: "Versus",
        description: "Versus is a 2-player C++ console game wherein the players can choose to battle from three different games: 1v1 Fighting Game, Password Game, and Tic-Tac-Toe Game. Not only does it provide entertainment it also educates the players by incorporating learning materials across the different games.",
        technologies: ["C++", "Game Design","Game Development"],
        genre: "Game Development",
        language: "C++",
        deployed: false,
        githubUrl: "https://github.com/MannLester/Versus",
    },
    {
        title: "Quantum Chase",
        description: "In Quantum Chase: Hunt For Victory In The Quantum Realm, the users will embark on a journey through the quantum realm, where they will be challenged with questions related to the 17 SDGs. The program incorporates the basic quiz-based game setup which includes a dictionary of questions from different SDGs. It also incorporates passive and skill features that can be used by player to aid them in their game. However, it is of assurance that the passive and skills will not hinder the main purpose of the program, which is to raise awareness.",
        technologies: ["Python", "Flask", "Game Design", "Game Development"],
        genre: "Game Development",
        language: "Python",
        deployed: false,
        githubUrl: "https://github.com/MannLester/Quantum-Chase-WebGame",
    },
    {
        title: "Poker Game",
        description: "Welcome to the C++ console-based poker game. This game allows you to play against three computer opponents and test your poker skills. The game follows the rules of Texas Hold'em, and at the end of each match, the card hands are analyzed to determine the winner.",
        technologies: ["C++", "Game Design", "Game Development"],
        genre: "Game Development",
        language: "C++",
        deployed: false,
        githubUrl: "https://github.com/MannLester/Poker-Game",
    },
    {
        title: "GoCery!",
        description: "Go-Cery is a cutting-edge Android application that enhances the efficiency of traditional grocery shopping by leveraging modern technology. With Go-Cery, customers enjoy a faster, more streamlined experience, while store owners efficiently manage their inventory and operations.",
        technologies: ["Java", "Android Studio", "Firebase", "Glide QR"],
        genre: "App Development",
        language: "Java",
        deployed: false,
        githubUrl: "https://github.com/MannLester/GoCery",
    },
    {
        title: "Reforge",
        description: "Reforge: Rise of the Seventeen Cities is an RPG game created using the Java language whilst implementing Java Swing modules. It showcases 25 items, 8 pets, 20 bosses, 18 cities, and a compelling storyline. The program allows the user to travel to those 18 cities and learn more about the problem they’re facing, and is equipped with 4 items to beat 3 bosses of each city. After defeating a boss, a loot will be dropped containing resources such as: gold, iron, herb, biscuit, and diamond. This can be used to buy new items or fund programs to help the city progress.",
        technologies: ["Java", "Java Swing", "SQL", "Game Design", "Game Development"],
        genre: "Game Development",
        language: "Java",
        deployed: false,
        githubUrl: "https://github.com/MannLester/reforge",
    },
    // Add more projects as needed
];

const genres = Array.from(new Set(projects.map(project => project.genre)));
const languages = Array.from(new Set(projects.map(project => project.language)));

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
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedProject(null), 200); // Clear selection after animation
    };

    useEffect(() => {
        if (!isModalOpen) {
            setTimeout(() => setSelectedProject(null), 200);
        }
    }, [isModalOpen]);

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
                className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6 hover:bg-zinc-800/50 transition-all duration-300 
                           border border-zinc-800/50 hover:border-zinc-700/50 group w-[360px] h-[280px] flex flex-col cursor-pointer"
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
                <p className="text-zinc-300 mb-4 line-clamp-2">{project.description}</p>
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
                            <div className="w-[420px] h-[570px] bg-zinc-900/95 backdrop-blur-sm rounded-xl p-6 border border-zinc-800/50">
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
                                            <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" 
                                               className="text-zinc-300">
                                                {selectedProject.githubUrl}
                                            </a>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-zinc-400">Deployment Link:</span>
                                            {selectedProject.deployed && selectedProject.liveUrl ? (
                                                <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" 
                                                   className="text-zinc-300">
                                                    {selectedProject.liveUrl}
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
                                            {selectedProject.genre}
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

                                    <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" 
                                       className="text-[#00FF00] hover:underline text-sm mt-auto">
                                        See Detailed Page
                                    </a>
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
    const [direction, setDirection] = useState(0);

    const filteredProjects = projects.filter(project => {
        const matchesGenre = !selectedGenre || project.genre === selectedGenre;
        const matchesLanguage = !selectedLanguage || project.language === selectedLanguage;
        return matchesGenre && matchesLanguage;
    });

    const projectsPerPage = 3;
    const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
    const currentProjects = filteredProjects.slice(
        currentPage * projectsPerPage,
        (currentPage + 1) * projectsPerPage
    );

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
        <div id="projects" className="relative min-h-screen bg-black p-6 overflow-hidden">
            {/* Content Container */}
            <div className="relative z-10 container mx-auto">
                <motion.h1 
                    className={`${anton.className} tracking-widest text-6xl font-bold mb-16 text-white text-center [text-shadow:0_0_7px_#00FF00,0_0_10px_#00FF00,0_0_21px_#00FF00,0_0_42px_#00FF00]`}
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ duration: 1 }}
                >
                    PROJECTS
                </motion.h1>

                {/* Filters */}
                <div className="mb-12 flex flex-wrap gap-4 justify-center items-center">
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
                </div>

                {/* Projects Grid with Navigation */}
                <div className="relative mx-auto max-w-7xl px-20">
                    <div className="overflow-hidden">
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div 
                                key={currentPage}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
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
                                    <ProjectCard key={project.title} project={project} />
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>

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

                {/* Page Indicator */}
                <div className="flex justify-center gap-2 mt-8">
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