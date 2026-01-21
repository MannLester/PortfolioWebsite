"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

export function RecognitionSection() {
  // 1. Fetch live data from Convex
  const groupedData = useQuery(api.queries.recognitionsQueries.getGroupedByLevel);
  const [currentIntl, setCurrentIntl] = useState(0);

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

  // 3. Auto-swiper logic for the International Slot
  useEffect(() => {
    const intlCount = groupedData?.international?.length || 0;
    if (intlCount <= 1) return;

    const timer = setInterval(() => {
      setCurrentIntl((prev) => (prev + 1) % intlCount);
    }, 5000);
    return () => clearInterval(timer);
  }, [groupedData?.international]);

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

          const isInternational = slot.level === "International";
          const displayEntry = isInternational ? slot.data[currentIntl] : slot.data[0];
          const isCarousel = isInternational && slot.data.length > 1;

          return (
            <motion.div 
              key={`${slot.level}-${index}`} 
              layout
              className={`${slot.area} group relative flex flex-col overflow-hidden rounded-[3rem] bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-sm transition-colors hover:border-zinc-700`}
            >
              {/* RADIAL GLOW */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ background: `radial-gradient(circle at 50% 50%, ${slot.glowColor} 0%, transparent 80%)` }} />

              {/* IMAGE SECTION */}
              <div className="relative w-full flex-1 overflow-hidden">
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
                      key={currentIntl}
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 5, ease: "linear" }}
                      className="h-full bg-blue-500"
                    />
                  </div>
                )}

                <div className="absolute top-6 left-6 z-20 flex items-center gap-3">
                  <span className="px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-xl border border-white/10 text-[10px] font-black tracking-widest uppercase">
                    {displayEntry.level}
                  </span>
                </div>
              </div>

              {/* TEXT SECTION */}
              <div className="relative z-10 p-8 bg-gradient-to-t from-zinc-950 to-zinc-900/90 border-t border-white/5">
                <motion.span 
                  key={`org-${displayEntry.organization}`}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.2em]"
                >
                  {displayEntry.organization}
                </motion.span>
                <motion.h3 
                   key={`title-${displayEntry.title}`}
                   initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                   className="mt-2 text-2xl font-bold leading-none text-white line-clamp-2"
                >
                  {displayEntry.title}
                </motion.h3>
                <p className="mt-2 text-zinc-400 font-medium">{displayEntry.award}</p>
                {displayEntry.date && (
                   <span className="mt-1 block text-[10px] text-zinc-600">{displayEntry.date}</span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}