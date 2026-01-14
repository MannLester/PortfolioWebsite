"use client"

import React, { useState } from 'react';
import Image from 'next/image';

const affiliations = [
    {
        affiliationImage: "image.png",
        affiliationTitle: "Company A",
        affiliationLink: "https://example.com",
        affilitationRole: "Partner"
    },
    {
        affiliationImage: "image2.png",
        affiliationTitle: "Organization B",
        affiliationLink: "https://example2.com",
        affilitationRole: "Member"
    },
    {
        affiliationImage: "image3.png",
        affiliationTitle: "Institute C",
        affiliationLink: "https://example3.com",
        affilitationRole: "Collaborator"
    },
    {
        affiliationImage: "image4.png",
        affiliationTitle: "Foundation D",
        affiliationLink: "https://example4.com",
        affilitationRole: "Advisor"
    }
]

export function AffiliationSection() {
    return (
        <div className="w-full py-6 overflow-hidden bg-gradient-to-r from-gray-50 to-white">
            <div className="relative">
                <div className="center">
                    <h2 className="text-3xl font-bold text-center mb-8 text-black">Affiliations & Organizations</h2>
                </div>
                {/* Animated Strip Container */}
                <div className="flex animate-scroll space-x-8">
                    {/* Multiple sets for seamless continuous loop */}
                    {[...Array(3)].map((_, setIndex) => 
                        affiliations.map((affiliation, index) => (
                            <div
                                key={`set-${setIndex}-${index}`}
                                className="flex-shrink-0 group cursor-pointer transform hover:scale-105 transition-all duration-300 ml-8"
                                onClick={() => window.open(affiliation.affiliationLink, '_blank')}
                            >
                                <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden group-hover:bg-gray-100 transition-colors duration-300">
                                        <Image 
                                            src={`/images/${affiliation.affiliationImage}`} 
                                            alt={affiliation.affiliationTitle} 
                                            width={64}
                                            height={64}
                                            />
                                        <div className="hidden text-gray-500 text-xs font-medium">
                                            {affiliation.affiliationTitle.charAt(0)}
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                                            {affiliation.affiliationTitle}
                                        </h3>
                                        <p className="text-xs text-gray-600 mt-1">
                                            {affiliation.affilitationRole}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Gradient overlays for smooth edges */}
                <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-gray-50 to-transparent pointer-events-none z-10"></div>
                <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
            </div>
            
            <style jsx>{`
                @keyframes scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-33.33%);
                    }
                }
                
                .animate-scroll {
                    animation: scroll 20s linear infinite;
                }
                
                .animate-scroll:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </div>
    );
}