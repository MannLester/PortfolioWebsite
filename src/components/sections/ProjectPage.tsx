"use client";

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Anton } from 'next/font/google';
import brickBg from '@/assets/images/home_page/brick_bg.jpg';
import { useState } from 'react';

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
    imageUrl?: string;
    githubUrl?: string;
    liveUrl?: string;
}

const projects: Project[] = [
    {
        title: "Portfolio Website",
        description: "A modern, responsive portfolio website built with Next.js and Tailwind CSS, featuring smooth animations and dark mode.",
        technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
        genre: "Web Development",
        language: "TypeScript",
        githubUrl: "https://github.com/yourusername/portfolio",
    },
    {
        title: "Space Shooter Game",
        description: "An exciting 2D space shooter game with power-ups, multiple enemy types, and high score system.",
        technologies: ["Unity", "C#", "Game Design"],
        genre: "Game Development",
        language: "C#",
        githubUrl: "https://github.com/yourusername/space-shooter",
    },
    {
        title: "Inventory Management System",
        description: "A robust desktop application for managing inventory, sales, and generating reports.",
        technologies: ["WPF", "C#", "SQL Server"],
        genre: "Desktop App",
        language: "C#",
        githubUrl: "https://github.com/yourusername/inventory-system",
    },
    {
        title: "Project 4",
        description: "Description for project 4.",
        technologies: ["React", "Node.js", "MongoDB"],
        genre: "Web Development",
        language: "JavaScript",
        githubUrl: "https://github.com/yourusername/project4",
    },
    {
        title: "Project 5",
        description: "Description for project 5.",
        technologies: ["Python", "Django", "PostgreSQL"],
        genre: "Web Development",
        language: "Python",
        githubUrl: "https://github.com/yourusername/project5",
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
                     hover:border-zinc-700/50 focus:border-[#FFD700] focus:outline-none focus:ring-1 focus:ring-[#FFD700]
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
    onClick: () => void;
    disabled: boolean;
    direction: 'prev' | 'next';
}> = ({ onClick, disabled, direction }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`absolute top-1/2 -translate-y-1/2 ${direction === 'prev' ? '-left-4' : '-right-4'}
                   p-3 rounded-full bg-zinc-900/80 backdrop-blur-sm border border-zinc-800/50
                   hover:bg-zinc-800/90 hover:border-[#FFD700] disabled:opacity-50 disabled:cursor-not-allowed
                   transition-all duration-300 z-20 group shadow-lg hover:shadow-[#FFD700]/20
                   ${disabled ? '' : 'hover:scale-110'}`}
    >
        <svg 
            className={`h-6 w-6 text-zinc-400 group-hover:text-[#FFD700] transition-colors ${direction === 'prev' ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
        >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
    </button>
);

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6 hover:bg-zinc-800/50 transition-all duration-300 border border-zinc-800/50 hover:border-zinc-700/50 group"
        >
            {project.imageUrl && (
                <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                    <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                </div>
            )}
            <div className="flex justify-between items-start mb-2">
                <h3 className={`${anton.className} text-2xl text-white [text-shadow:0_0_7px_#FFD700,0_0_10px_#FFD700]`}>
                    {project.title}
                </h3>
                <span className="text-sm px-2 py-1 rounded-full bg-zinc-800/70 text-zinc-300">
                    {project.language}
                </span>
            </div>
            <p className="text-zinc-300 mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, i) => (
                    <span
                        key={i}
                        className="px-3 py-1 text-sm bg-zinc-800/50 rounded-full text-zinc-300 hover:bg-zinc-700/50 transition-colors"
                    >
                        {tech}
                    </span>
                ))}
            </div>
            <div className="flex gap-4">
                {project.githubUrl && (
                    <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-300 hover:text-white transition-colors"
                    >
                        GitHub →
                    </a>
                )}
                {project.liveUrl && (
                    <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-300 hover:text-white transition-colors"
                    >
                        Live Demo →
                    </a>
                )}
            </div>
        </motion.div>
    );
};

const ProjectPage = () => {
    const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
    const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [direction, setDirection] = useState(0); // -1 for prev, 1 for next
    const projectsPerPage = 3;

    const filteredProjects = projects.filter(project => {
        const matchesGenre = !selectedGenre || project.genre === selectedGenre;
        const matchesLanguage = !selectedLanguage || project.language === selectedLanguage;
        return matchesGenre && matchesLanguage;
    });

    const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
    const currentProjects = filteredProjects.slice(
        currentPage * projectsPerPage,
        (currentPage + 1) * projectsPerPage
    );

    const goToNextPage = () => {
        if (currentPage < totalPages - 1) {
            setDirection(1);
            setCurrentPage(prev => prev + 1);
        }
    };

    const goToPrevPage = () => {
        if (currentPage > 0) {
            setDirection(-1);
            setCurrentPage(prev => prev - 1);
        }
    };

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 100 : -100,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            x: direction > 0 ? -100 : 100,
            opacity: 0
        })
    };

    return (
        <div id="projects" className="relative min-h-screen bg-black p-8 pt-24 overflow-hidden">
            {/* Background Image */}
            <Image
                src={brickBg}
                alt="Brick Background"
                fill
                className="object-cover opacity-50"
                priority
            />
            
            {/* Content Container */}
            <div className="relative z-10 container mx-auto">
                {/* Main Projects Heading */}
                <motion.h1 
                    className={`${anton.className} tracking-widest text-6xl font-bold mb-16 text-white text-center [text-shadow:0_0_7px_#FFD700,0_0_10px_#FFD700,0_0_21px_#FFD700,0_0_42px_#FFD700]`}
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
                        onChange={(value) => {
                            setSelectedGenre(value);
                            setCurrentPage(0);
                        }}
                        options={genres}
                        label="Genres"
                    />
                    <SelectFilter
                        value={selectedLanguage}
                        onChange={(value) => {
                            setSelectedLanguage(value);
                            setCurrentPage(0);
                        }}
                        options={languages}
                        label="Languages"
                    />
                </div>

                {/* Projects Grid with Navigation */}
                <div className="relative px-4">
                    <NavigationButton
                        direction="prev"
                        onClick={goToPrevPage}
                        disabled={currentPage === 0}
                    />
                    
                    <div className="overflow-hidden">
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div 
                                key={currentPage}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                custom={direction}
                                transition={{ duration: 0.5 }}
                            >
                                {currentProjects.map((project) => (
                                    <ProjectCard key={project.title} project={project} />
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <NavigationButton
                        direction="next"
                        onClick={goToNextPage}
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
                                    ? 'bg-[#FFD700] w-6'
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