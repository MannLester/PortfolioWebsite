"use client";

import { useEffect, useState } from "react";

interface Affiliation {
  _id: string;
  name: string;
  acronym?: string;
  type: string;
  description?: string;
  role?: string;
  status: string;
  join_date?: string;
  end_date?: string;
  activities?: string[];
  achievements?: string[];
  website_url?: string;
  is_featured: boolean;
  order_index: number;
}

const AffiliationsDisplay = () => {
  const [affiliations, setAffiliations] = useState<Affiliation[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAffiliations = async () => {
      try {
        const response = await fetch('/api/affiliations?type=all');
        const data = await response.json();
        
        if (data.success) {
          setAffiliations(data.data);
        }
      } catch (error) {
        console.error('Error fetching affiliations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAffiliations();
  }, []);

  if (loading || affiliations === null) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-white/60">Loading affiliations...</div>
      </div>
    );
  }

  if (affiliations.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-white/60">No affiliations found.</div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Affiliations</h1>
          <div className="text-white/60">
            {affiliations.length} {affiliations.length === 1 ? 'affiliation' : 'affiliations'}
          </div>
        </div>
        
        <div className="space-y-4">
          {affiliations
            .sort((a, b) => a.order_index - b.order_index)
            .map((affiliation) => (
              <div 
                key={affiliation._id}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {affiliation.name}
                      {affiliation.acronym && (
                        <span className="text-white/70 font-normal ml-2">({affiliation.acronym})</span>
                      )}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-white/70 mb-3">
                      <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
                        {affiliation.type}
                      </span>
                      <span className={`px-2 py-1 rounded ${
                        affiliation.status.toLowerCase() === 'active' 
                          ? 'bg-green-500/20 text-green-300'
                          : 'bg-gray-500/20 text-gray-300'
                      }`}>
                        {affiliation.status}
                      </span>
                      {affiliation.role && (
                        <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded">
                          {affiliation.role}
                        </span>
                      )}
                      {affiliation.join_date && (
                        <span>Joined: {affiliation.join_date}</span>
                      )}
                      {affiliation.end_date && (
                        <span>Ended: {affiliation.end_date}</span>
                      )}
                    </div>
                  </div>
                  {affiliation.is_featured && (
                    <div className="ml-4">
                      <span className="bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded text-xs font-medium">
                        Featured
                      </span>
                    </div>
                  )}
                </div>

                {affiliation.description && (
                  <div className="mb-4">
                    <p className="text-white/80 leading-relaxed">
                      {affiliation.description}
                    </p>
                  </div>
                )}

                {affiliation.activities && affiliation.activities.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-white/90 mb-2">Activities:</h4>
                    <ul className="space-y-1 text-white/70">
                      {affiliation.activities.map((activity, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-blue-400 mt-1">•</span>
                          <span>{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {affiliation.achievements && affiliation.achievements.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-white/90 mb-2">Achievements:</h4>
                    <div className="flex flex-wrap gap-2">
                      {affiliation.achievements.map((achievement, index) => (
                        <span 
                          key={index}
                          className="bg-green-500/20 text-green-300 px-2 py-1 rounded-full text-xs"
                        >
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {affiliation.website_url && (
                  <div className="mt-4">
                    <a 
                      href={affiliation.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <span>🌐</span>
                      Visit Website
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

export default AffiliationsDisplay;