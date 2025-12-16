"use client";

import { useEffect, useState } from "react";

interface About {
  _id: string;
  title: string;
  description: string;
  highlights: string[];
  personality_traits: string[];
  career_focus: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const AboutDisplay = () => {
  const [about, setAbout] = useState<About | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await fetch('/api/about?type=active');
        const data = await response.json();
        
        if (data.success && data.data) {
          setAbout(data.data);
        }
      } catch (error) {
        console.error('Error fetching about information:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-white/60">Loading about information...</div>
      </div>
    );
  }

  if (!about) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-white/60">No about information found.</div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">{about.title}</h1>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </div>

        {/* Main Description */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8">
          <p className="text-white/90 text-lg leading-relaxed text-center">
            {about.description}
          </p>
        </div>

        {/* Career Focus */}
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-white/10 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-3 text-center">Career Focus</h3>
          <p className="text-white/80 text-center italic">
            {about.career_focus}
          </p>
        </div>

        {/* Two-Column Layout */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Key Highlights */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span>🌟</span>
              Key Highlights
            </h3>
            <ul className="space-y-3">
              {about.highlights.map((highlight, index) => (
                <li key={index} className="text-white/80 flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span className="flex-1">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Personality Traits */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span>🧠</span>
              Key Traits
            </h3>
            <div className="space-y-2">
              {about.personality_traits.map((trait, index) => (
                <div 
                  key={index}
                  className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm text-center"
                >
                  {trait}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutDisplay;