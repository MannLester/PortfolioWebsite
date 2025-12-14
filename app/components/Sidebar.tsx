import React from 'react';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-[#171717] text-white flex flex-col">
      {/* Header - Fixed */}
      <div className="p-4 flex-shrink-0">
        <button className="w-full flex items-center gap-3 p-3 rounded-lg border border-white/20 hover:bg-white/10 transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          New chat
        </button>
      </div>

      {/* Navigation - Fixed */}
      <div className="px-4 pb-4 flex-shrink-0">
        <nav className="space-y-2">
          <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors text-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
              <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Search chats
          </button>
          
          <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors text-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5V19.5Z" stroke="currentColor" strokeWidth="2"/>
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Library
          </button>
          
          <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors text-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Projects
          </button>
        </nav>
      </div>

      {/* Chat History - Scrollable */}
      <div className="flex-1 px-4 pb-4 overflow-hidden">
        <div className="text-xs text-white/60 mb-3 px-2">Your chats</div>
        <div className="h-full overflow-y-auto space-y-1 pr-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20 hover:scrollbar-thumb-white/30">
          {[
            "Mobile ML model metrics",
            "API link differences", 
            "Disk scheduling comparison",
            "Contractor ranking system",
            "Publish Android App Guide",
            "Fix TS error",
            "Simulating website activity",
            "Upgrade Next.js correctly",
            "Data integration challenges",
            "Research gap synthesis",
            "HMM for stroke prediction",
            "GitHub push error fix",
            "Machine learning pipeline",
            "Database optimization",
            "React component design",
            "API authentication",
            "Performance monitoring",
            "Security audit results",
            "Code review process",
            "DevOps automation"
          ].map((chat, index) => (
            <button
              key={index}
              className="w-full text-left p-2 rounded-lg hover:bg-white/10 transition-colors text-sm text-white/80 truncate"
            >
              {chat}
            </button>
          ))}
        </div>
      </div>

      {/* User Profile - Fixed at bottom */}
      <div className="p-4 border-t border-white/20 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
            M
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium">Mann Lester ...</div>
            <div className="text-xs text-white/60">Free</div>
          </div>
          <button className="text-xs px-2 py-1 border border-white/20 rounded hover:bg-white/10 transition-colors">
            Upgrade
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;