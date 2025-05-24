"use client";

import React from "react";
import { Anton } from 'next/font/google';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';


const anton = Anton({
    weight: '400',
    subsets: ['latin'],
});

interface DetailedPageProps {
    project: {
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
    };
}

const DetailedPage: React.FC<DetailedPageProps> = ({ project }) => {
    // State for mobile Show More/Less
    const [showAllImages, setShowAllImages] = React.useState(false);
    return (
        <div className="min-h-screen bg-black pt-28">
            <div className="max-w-4xl mx-auto px-4">
                {/* Back Button */}
                <div className="mb-8">
                    <Link 
                        href="/#projects"
                        className="inline-flex items-center gap-2 text-white hover:text-[#00FF00] transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span className="text-sm font-medium">Back to Projects</span>
                    </Link>
                </div>

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <h1 className={`${anton.className} text-3xl sm:text-5xl text-white mb-2 sm:mb-4 [text-shadow:0_0_7px_#00FF00,0_0_10px_#00FF00]`}>
                        {project.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-zinc-400 text-xs sm:text-base">
                        {project.genres && project.genres.length > 0 && (
                            <span className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-zinc-800/70">
                                {project.genres[0]}
                            </span>
                        )}
                        {project.role && (
                            <div className="flex flex-wrap gap-2">
                                {project.role.map((role, index) => (
                                    <span key={index} className="px-2 py-0.5 sm:px-3 sm:py-1 text-xs sm:text-sm rounded-full bg-[#00FF00]/10 text-[#00FF00] border border-[#00FF00]/20">
                                        {role}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Links Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-wrap gap-2 sm:gap-4 mb-6 sm:mb-12"
                >
                    <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 rounded-lg hover:bg-zinc-700/50 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
                        </svg>
                        GitHub Repository
                    </a>
                    {project.liveUrl && (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 rounded-lg hover:bg-zinc-700/50 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            Live Demo
                        </a>
                    )}
                </motion.div>

                {/* Technologies Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-12"
                >
                    <h2 className={`${anton.className} text-lg sm:text-2xl text-white mb-2 sm:mb-4`}>Technologies Used</h2>
                    <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                            <span
                                key={index}
                                className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-zinc-800/70 text-zinc-300 text-xs sm:text-sm"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </motion.div>

                {/* Description Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-12"
                >
                    <h2 className={`${anton.className} text-lg sm:text-2xl text-white mb-2 sm:mb-4`}>About the Project</h2>
                    <p className="text-zinc-300 leading-relaxed whitespace-pre-line text-sm sm:text-base">{project.description}</p>
                </motion.div>

                {/* Role Section */}
                {project.role && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mb-12"
                    >
                        <h2 className={`${anton.className} text-lg sm:text-2xl text-white mb-2 sm:mb-4`}>My Role</h2>
                        <div className="flex flex-wrap gap-1 sm:gap-3">
                            {project.role.map((role, index) => (
                                <div key={index} className="px-2 py-1 sm:px-4 sm:py-2 rounded-lg bg-[#00FF00]/10 border border-[#00FF00]/20 text-xs sm:text-base">
                                    <span className="text-[#00FF00] font-medium">{role}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Collaborators Section */}
                {project.collaborators && project.collaborators.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="mb-12"
                    >
                        <h2 className={`${anton.className} text-lg sm:text-2xl text-white mb-2 sm:mb-4`}>Collaborators</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4">
                            {project.collaborators.map((collaborator, index) => (
                                <div key={index} className="p-2 sm:p-4 bg-zinc-800/30 rounded-lg">
                                    <h3 className="text-white font-semibold mb-1 sm:mb-2 text-sm sm:text-base">{collaborator.name}</h3>
                                    <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3">
                                        {collaborator.role.map((role, index) => (
                                            <span key={index} className="px-1 py-0.5 sm:px-2 text-xs rounded-full bg-zinc-700/50 text-zinc-300 border border-zinc-600/30">
                                                {role}
                                            </span>
                                        ))}
                                    </div>
                                    {collaborator.link && (
                                        <a
                                            href={collaborator.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#00FF00] hover:underline text-xs sm:text-sm"
                                        >
                                            View Profile
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Images Section */}
                {project.images && project.images.length > 0 && (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mb-12"
    >
        <h2 className={`${anton.className} text-lg sm:text-2xl text-white mb-2 sm:mb-4`}>Project Gallery</h2>
        {/* Mobile: Show only first 2 images, with Show More/Show Less button */}
        <div className="sm:hidden">
            <div className="grid grid-cols-1 gap-2">
                {(showAllImages ? project.images : project.images.slice(0, 2)).map((image, index) => (
                    <div key={index} className="relative">
                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg max-h-48">
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className="object-contain rounded-lg hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        {image.caption && (
                            <p className="text-zinc-400 text-xs mt-1">{image.caption}</p>
                        )}
                    </div>
                ))}
            </div>
            {project.images.length > 2 && (
                <button
                    className="mt-2 mx-auto block px-4 py-1 text-xs rounded bg-zinc-800/70 text-white border border-zinc-600 hover:bg-zinc-700 transition-colors"
                    onClick={() => setShowAllImages((prev) => !prev)}
                >
                    {showAllImages ? 'Show Less' : 'Show More'}
                </button>
            )}
        </div>
        {/* Desktop: Show all images */}
        <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.images.map((image, index) => (
                <div key={index} className="relative">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg max-h-none">
                        <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            className="object-contain rounded-lg hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                    {image.caption && (
                        <p className="text-zinc-400 text-sm mt-2">{image.caption}</p>
                    )}
                </div>
            ))}
        </div>
    </motion.div>
)}

                {/* Collaboration CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mt-10 sm:mt-20 mb-6 sm:mb-12 text-center"
                >
                    <h2 className={`${anton.className} text-xl sm:text-3xl text-white mb-2 sm:mb-4`}>Want to collaborate?</h2>
                    <p className="text-zinc-300 mb-3 sm:mb-6 text-sm sm:text-base">I&apos;m always open to discussing new projects and opportunities.</p>
                    <Link
                        href="/#contact"
                        className="inline-block px-6 py-2 sm:px-8 sm:py-3 bg-[#00FF00] text-black font-semibold rounded-lg hover:bg-[#00CC00] transition-colors text-sm sm:text-base"
                    >
                        Send me a message
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default DetailedPage;