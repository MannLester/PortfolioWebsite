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

      {/* Portfolio Sections - Scrollable */}
      <div className="flex-1 px-4 pb-4 overflow-hidden">
        <div className="text-xs text-white/60 mb-3 px-2">Portfolio Sections</div>
        <div className="space-y-2">
          <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors text-left">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white/60">
              <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" stroke="currentColor" strokeWidth="2"/>
              <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <span className="text-white text-sm">About Me</span>
          </button>

          <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors text-left">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white/60">
              <polygon points="13,2 3,14 12,14 11,22 21,10 12,10" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
            <span className="text-white text-sm">Skillsets</span>
          </button>

          <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors text-left">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white/60">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
              <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" strokeWidth="2"/>
              <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <span className="text-white text-sm">Job Experience</span>
          </button>

          <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors text-left">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white/60">
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 1V3" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 21V23" stroke="currentColor" strokeWidth="2"/>
              <path d="M4.22 4.22L5.64 5.64" stroke="currentColor" strokeWidth="2"/>
              <path d="M18.36 18.36L19.78 19.78" stroke="currentColor" strokeWidth="2"/>
              <path d="M1 12H3" stroke="currentColor" strokeWidth="2"/>
              <path d="M21 12H23" stroke="currentColor" strokeWidth="2"/>
              <path d="M4.22 19.78L5.64 18.36" stroke="currentColor" strokeWidth="2"/>
              <path d="M18.36 5.64L19.78 4.22" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <span className="text-white text-sm">GitHub Projects</span>
          </button>

          <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors text-left">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white/60">
              <path d="M6 9L10 13L18 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 12C21 16.97 16.97 21 12 21C7.03 21 3 16.97 3 12C3 7.03 7.03 3 12 3C13.5 3 14.93 3.36 16.19 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span className="text-white text-sm">Recognitions</span>
          </button>

          <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors text-left">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white/60">
              <path d="M15 7V3C15 2.45 14.55 2 14 2H10C9.45 2 9 2.45 9 3V7" stroke="currentColor" strokeWidth="2"/>
              <rect x="4" y="7" width="16" height="13" rx="1" ry="1" stroke="currentColor" strokeWidth="2"/>
              <line x1="9" y1="11" x2="15" y2="11" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <span className="text-white text-sm">Seminars</span>
          </button>

          <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors text-left">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white/60">
              <path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21" stroke="currentColor" strokeWidth="2"/>
              <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
              <path d="M23 21V19C23 17.1362 21.7252 15.5701 20 15.126" stroke="currentColor" strokeWidth="2"/>
              <path d="M16 3.126C17.7252 3.5701 19 5.1362 19 7C19 8.8638 17.7252 10.4299 16 10.874" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <span className="text-white text-sm">Affiliations</span>
          </button>
        </div>
      </div>

      {/* User Profile - Fixed at bottom */}
      <div className="p-4 border-t border-white/20 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
            M
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium">Mann Lester Magbuhos</div>
            <div className="text-xs text-white/60">Jack of All Trades Developer</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;