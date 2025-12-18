"use client";
//Winner
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import ProjectsDisplay from "./components/ProjectsDisplay";
import ExperienceDisplay from "./components/ExperienceDisplay";
import RecognitionDisplay from "./components/RecognitionDisplay";
import SeminarsDisplay from "./components/SeminarsDisplay";
import AffiliationsDisplay from "./components/AffiliationsDisplay";
import AboutDisplay from "./components/AboutDisplay";
import ContactDisplay from "./components/ContactDisplay";
import SkillsDisplay from "./components/SkillsDisplay";

type ActiveView = 'home' | 'about' | 'skillsets' | 'experience' | 'projects' | 'recognitions' | 'seminars' | 'affiliations' | 'contact' | 'resume' | 'goals';

export default function Home() {
  const [activeView, setActiveView] = useState<ActiveView>('home');

  return (
    <div className="flex h-screen bg-[#212121] text-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {activeView === 'projects' ? (
          <ProjectsDisplay />
        ) : activeView === 'experience' ? (
          <ExperienceDisplay />
        ) : activeView === 'recognitions' ? (
          <RecognitionDisplay />
        ) : activeView === 'seminars' ? (
          <SeminarsDisplay />
        ) : activeView === 'affiliations' ? (
          <AffiliationsDisplay />
        ) : activeView === 'skillsets' ? (
          <SkillsDisplay />
        ) : activeView === 'about' ? (
          <AboutDisplay />
        ) : activeView === 'contact' ? (
          <ContactDisplay />
        ) : (
          <>
            {/* Header */}
            <header className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
                <h1 className="text-lg font-semibold">MannGPT</h1>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </header>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col items-center justify-center px-4">
              <div className="w-full max-w-3xl">
                <h1 className="text-5xl font-medium text-center mb-4 text-white">
                  Portfolio Website
                </h1>
                <h1 className="text-xl font-medium text-center mb-8 text-white/80">
                  Full Stack Developer. Master of None, Can Always Get It Done.
                </h1>

                {/* Input Area */}
                <div className="relative">
                  <div className="flex items-center bg-[#2f2f2f] border border-white/20 rounded-full p-4 focus-within:border-white/40 transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-4 text-white/60">
                      <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <input
                      type="text"
                      placeholder="Ask MannGPT a question about my projects, skills, or experience..."
                      className="flex-1 bg-transparent text-white placeholder-white/60 outline-none"
                    />
                    <div className="flex items-center gap-2 ml-4">
                      <button className="p-2 hover:bg-white/10 rounded-full transition-colors" title="Voice input">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 1C12 1 8 1 8 5V12C8 16 12 16 12 16C12 16 16 16 16 12V5C16 1 12 1 12 1Z" stroke="currentColor" strokeWidth="2"/>
                          <path d="M19 10V12C19 15.866 15.866 19 12 19C8.13401 19 5 15.866 5 12V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 19V23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          <path d="M8 23H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </button>
                      <button className="p-2 hover:bg-white/10 rounded-full transition-colors" title="Send message">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
