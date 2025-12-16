"use client";

import { useEffect, useState } from "react";

interface Seminar {
  _id: string;
  title: string;
  type: string;
  organization?: string;
  description?: string;
  date_attended: string;
  year: number;
  duration?: string;
  location?: string;
  topics?: string[];
  skills_gained?: string[];
  certificate_url?: string;
  is_featured: boolean;
  order_index: number;
}

const SeminarsDisplay = () => {
  const [seminars, setSeminars] = useState<Seminar[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeminars = async () => {
      try {
        const response = await fetch('/api/seminars?type=all');
        const data = await response.json();
        
        if (data.success) {
          setSeminars(data.data);
        }
      } catch (error) {
        console.error('Error fetching seminars:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeminars();
  }, []);

  if (loading || seminars === null) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-white/60">Loading seminars...</div>
      </div>
    );
  }

  if (seminars.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-white/60">No seminars found.</div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Seminars & Conferences</h1>
          <div className="text-white/60">
            {seminars.length} {seminars.length === 1 ? 'seminar' : 'seminars'}
          </div>
        </div>
        
        <div className="space-y-4">
          {seminars
            .sort((a, b) => a.order_index - b.order_index)
            .map((seminar) => (
              <div 
                key={seminar._id}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {seminar.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-white/70 mb-3">
                      <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
                        {seminar.type}
                      </span>
                      {seminar.organization && (
                        <span>{seminar.organization}</span>
                      )}
                      <span>{seminar.date_attended}</span>
                      {seminar.duration && (
                        <span>({seminar.duration})</span>
                      )}
                      {seminar.location && (
                        <span>📍 {seminar.location}</span>
                      )}
                    </div>
                  </div>
                  {seminar.is_featured && (
                    <div className="ml-4">
                      <span className="bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded text-xs font-medium">
                        Featured
                      </span>
                    </div>
                  )}
                </div>

                {seminar.description && (
                  <div className="mb-4">
                    <p className="text-white/80 leading-relaxed">
                      {seminar.description}
                    </p>
                  </div>
                )}

                {seminar.topics && seminar.topics.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-white/90 mb-2">Topics Covered:</h4>
                    <div className="flex flex-wrap gap-2">
                      {seminar.topics.map((topic, index) => (
                        <span 
                          key={index}
                          className="bg-green-500/20 text-green-300 px-2 py-1 rounded-full text-xs"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {seminar.skills_gained && seminar.skills_gained.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-white/90 mb-2">Skills Gained:</h4>
                    <div className="flex flex-wrap gap-2">
                      {seminar.skills_gained.map((skill, index) => (
                        <span 
                          key={index}
                          className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {seminar.certificate_url && (
                  <div className="mt-4">
                    <a 
                      href={seminar.certificate_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <span>📜</span>
                      View Certificate
                    </a>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SeminarsDisplay;