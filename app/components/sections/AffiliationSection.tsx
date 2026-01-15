"use client"

import React from 'react';
import Image from 'next/image';
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export function AffiliationSection() {
    const affiliations = useQuery(api.queries.affiliationsQueries.getAll);
    
    if (!affiliations) {
        return (
            <div className="w-full py-6 overflow-hidden bg-gradient-to-r from-gray-50 to-white">
                <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading affiliations...</p>
                </div>
            </div>
        );
    }
    
    return (
        <div className="w-full py-6 overflow-hidden bg-gradient-to-r from-gray-50 to-white">
            <div className="relative">
                <div className="center">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8 text-black">Affiliations & Organizations</h2>
                </div>
                {/* Animated Strip Container */}
                <div 
                    className="flex space-x-8 animate-scroll" 
                    onMouseEnter={(e) => e.currentTarget.style.animationPlayState = 'paused'}
                    onMouseLeave={(e) => e.currentTarget.style.animationPlayState = 'running'}
                >
                    {/* Exactly 3 sets for true circular seamless loop */}
                    {[...Array(3)].map((_, setIndex) => 
                        affiliations.map((affiliation, index) => (
                            <div
                                key={`set-${setIndex}-${index}`}
                                className="flex-shrink-0 group cursor-pointer transform hover:scale-105 transition-all duration-80 ml-3 md:ml-5"
                                onClick={() => window.open(affiliation.affiliationLink, '_blank')}
                            >
                                <div className="flex flex-col items-center space-y-1.5 md:space-y-2 p-2.5 md:p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden group-hover:bg-gray-100 transition-colors duration-300">
                                        {affiliation.affiliationImage ? (
                                            <Image 
                                                src={affiliation.affiliationImage.startsWith('http') 
                                                    ? affiliation.affiliationImage 
                                                    : `/images/${affiliation.affiliationImage}`
                                                } 
                                                alt={affiliation.affiliationTitle} 
                                                width={48}
                                                height={48}
                                                className="w-full h-full object-cover rounded-full md:w-16 md:h-16"
                                            />
                                        ) : (
                                            <div className="text-gray-500 text-xs font-medium">
                                                {affiliation.affiliationTitle.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-xs md:text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                                            {affiliation.affiliationTitle}
                                        </h3>
                                        <p className="text-xs text-gray-600 mt-1">
                                            {Array.isArray(affiliation.affilitationRole) ? affiliation.affilitationRole.join(", ") : affiliation.affilitationRole}
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
            
            <style dangerouslySetInnerHTML={{
                __html: `
                    @keyframes scroll {
                        0% {
                            transform: translateX(0);
                        }
                        100% {
                            transform: translateX(-33.33%);
                        }
                    }
                    
                    .animate-scroll {
                        animation: scroll 30s linear infinite;
                    }
                `
            }} />
        </div>
    );
}