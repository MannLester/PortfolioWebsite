"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

export function RecognitionSection() {
  // 1. Fetch live data from Convex
  const groupedData = useQuery(api.queries.recognitionsQueries.getGroupedByLevel);
  const [currentIndices, setCurrentIndices] = useState<{[key: string]: number}>({
    "International": 0,
    "National": 0,
    "National (Secondary)": 0,
    "Program Award": 0,
  });
  const [modalImage, setModalImage] = useState<{ url: string; title: string } | null>(null);

  // 2. Define our layout "Slots" and map them to DB levels
  const bentoSlots = [
    {
      level: "International",
      data: groupedData?.international || [],
      area: "md:col-span-2 md:row-span-2",
      glowColor: "rgba(59, 130, 246, 0.4)",
    },
    {
      level: "National",
      data: groupedData?.national || [],
      area: "md:col-span-2 md:row-span-1",
      glowColor: "rgba(245, 158, 11, 0.3)",
    },
    {
      level: "National (Secondary)",
      data: groupedData?.national?.slice(1) || [], // Example: showing other national awards
      area: "md:col-span-1 md:row-span-1",
      glowColor: "rgba(16, 185, 129, 0.3)",
    },
    {
      level: "Program Award",
      data: groupedData?.program || [],
      area: "md:col-span-1 md:row-span-1",
      glowColor: "rgba(139, 92, 246, 0.3)",
    }
  ];

  // 3. Auto-swiper logic for all levels with multiple entries
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndices(prev => {
        const newIndices = { ...prev };
        
        // Update each level if it has multiple entries
        bentoSlots.forEach(slot => {
          const count = slot.data.length;
          if (count > 1) {
            newIndices[slot.level] = (newIndices[slot.level] + 1) % count;
          }
        });
        
        return newIndices;
      });
    }, 5000);
    
    return () => clearInterval(timer);
  }, [groupedData]);

  if (!groupedData) return <div className="py-24 text-center text-zinc-500">Loading Milestones...</div>;

  return (
    <section className="py-24 px-6 bg-black text-white">
      <div className="max-w-7xl mx-auto mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-bold tracking-tighter"
        >
          Recognitions<span className="text-blue-500">.</span>
        </motion.h2>
        <p className="text-zinc-500 mt-4 text-xl text-balance">Honoring global and local excellence.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[240px] max-w-7xl mx-auto">
        {bentoSlots.map((slot, index) => {
          // Safety check if data for this level exists
          if (slot.data.length === 0) return null;

          const displayEntry = slot.data[currentIndices[slot.level] || 0];
          const isCarousel = slot.data.length > 1;

          return (
            <motion.div 
              key={`${slot.level}-${index}`} 
              layout
              className={`${slot.area} group relative flex flex-row overflow-hidden rounded-[3rem] bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-sm transition-colors hover:border-zinc-700`}
            >
              {/* RADIAL GLOW */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ background: `radial-gradient(circle at 50% 50%, ${slot.glowColor} 0%, transparent 80%)` }} />

              {/* IMAGE SECTION */}
              <div 
                className="relative w-1/2 min-h-full overflow-hidden cursor-pointer"
                onClick={() => displayEntry.imageUrl && setModalImage({ url: displayEntry.imageUrl, title: displayEntry.title })}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={displayEntry._id} // Using Convex ID for better animation tracking
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    {displayEntry.imageUrl ? (
                      <Image
                        src={displayEntry.imageUrl}
                        alt={displayEntry.title}
                        fill
                        className="object-cover scale-105 group-hover:scale-110 transition-transform duration-1000"
                      />
                    ) : (
                      <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                        <span className="text-zinc-600 font-black">IMAGE PENDING</span>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* PROGRESS BAR */}
                {isCarousel && (
                  <div className="absolute bottom-0 left-0 h-1 bg-white/20 w-full z-30">
                    <motion.div 
                      key={currentIndices[slot.level]}
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 5, ease: "linear" }}
                      className="h-full bg-blue-500"
                    />
                  </div>
                )}
              </div>

              {/* TEXT SECTION */}
              <div className={`relative z-10 w-1/2 p-8 flex flex-col justify-center bg-gradient-to-r from-zinc-900/90 to-zinc-950 ${
                slot.level === "International" 
                  ? "text-base" 
                  : slot.level === "National" 
                    ? "text-sm" 
                    : "text-xs"
              }`}>
                <div className="mb-4">
                  <span className={`px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-xl border border-white/10 font-black tracking-widest uppercase ${
                    slot.level === "International" 
                      ? "text-[10px]" 
                      : slot.level === "National" 
                        ? "text-[9px]" 
                        : "text-[8px]"
                  }`}>
                    {displayEntry.level}
                  </span>
                </div>
                <motion.span 
                  key={`org-${displayEntry.organization}`}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className={`font-bold text-blue-500 uppercase tracking-[0.2em] ${
                    slot.level === "International" 
                      ? "text-[10px]" 
                      : slot.level === "National" 
                        ? "text-[9px]" 
                        : "text-[8px]"
                  }`}
                >
                  {displayEntry.organization}
                </motion.span>
                <motion.h3 
                   key={`title-${displayEntry.title}`}
                   initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                   className={`mt-2 font-bold leading-none text-white line-clamp-2 ${
                     slot.level === "International" 
                       ? "text-2xl" 
                       : slot.level === "National" 
                         ? "text-xl" 
                         : "text-sm"
                   }`}
                >
                  {displayEntry.title}
                </motion.h3>
                <p className={`mt-2 text-zinc-400 font-medium ${
                  slot.level === "International" 
                    ? "text-base" 
                    : slot.level === "National" 
                      ? "text-sm" 
                      : "text-xs"
                }`}>
                  {displayEntry.award}
                </p>
                {displayEntry.date && (
                   <span className={`mt-1 block text-zinc-600 ${
                     slot.level === "International" 
                       ? "text-[10px]" 
                       : slot.level === "National" 
                         ? "text-[8px]" 
                         : "text-[8px]"
                   }`}>
                     {displayEntry.date}
                   </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Image Modal */}
      {modalImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setModalImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            <button
              onClick={() => setModalImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <Image
              src={modalImage.url}
              alt={modalImage.title}
              width={1200}
              height={800}
              className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="text-white text-center mt-4 text-lg font-medium">{modalImage.title}</p>
          </div>
        </div>
      )}
    </section>
  );
}