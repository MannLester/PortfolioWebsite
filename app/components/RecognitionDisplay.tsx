"use client";

import { useEffect, useState } from "react";

interface Recognition {
  _id: string;
  title: string;
  organization?: string;
  category: string;
  description?: string;
  date_received: string;
  year: number;
  rank_position?: string;
  achievement_type: string;
  skills_related?: string[];
  certificate_url?: string;
  is_featured: boolean;
  order_index: number;
}

interface CategoryCount {
  name: string;
  count: number;
}

const RecognitionDisplay = () => {
  const [recognitions, setRecognitions] = useState<Recognition[] | null>(null);
  const [categories, setCategories] = useState<CategoryCount[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [recognitionsResponse, categoriesResponse] = await Promise.all([
          fetch('/api/recognitions?type=all'),
          fetch('/api/recognitions?type=categories')
        ]);
        
        const recognitionsData = await recognitionsResponse.json();
        const categoriesData = await categoriesResponse.json();
        
        if (recognitionsData.success) {
          setRecognitions(recognitionsData.data);
        }
        if (categoriesData.success) {
          setCategories(categoriesData.data);
        }
      } catch (error) {
        console.error('Error fetching recognitions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading || recognitions === null || categories === null) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-white/60">Loading recognitions...</div>
      </div>
    );
  }

  const filteredRecognitions = selectedCategory === 'all' 
    ? recognitions 
    : recognitions?.filter((rec: Recognition) => rec.category === selectedCategory) || [];

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'certification':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" fill="currentColor"/>
          </svg>
        );
      case 'award':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 15L15.5 18.5L21 12L15.5 6.5L12 9L8.5 6.5L3 12L8.5 18.5L12 15Z" stroke="currentColor" strokeWidth="2" fill="currentColor"/>
          </svg>
        );
      case 'competition':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9H4.5C3.4 9 2.5 9.9 2.5 11V20C2.5 21.1 3.4 22 4.5 22H6V9Z" stroke="currentColor" strokeWidth="2" fill="currentColor"/>
            <path d="M18 9H19.5C20.6 9 21.5 9.9 21.5 11V20C21.5 21.1 20.6 22 19.5 22H18V9Z" stroke="currentColor" strokeWidth="2" fill="currentColor"/>
            <path d="M12 2L6 9V22H18V9L12 2Z" stroke="currentColor" strokeWidth="2" fill="currentColor"/>
          </svg>
        );
      case 'leadership':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 21V19C16 16.7909 14.2091 15 12 15C9.79086 15 8 16.7909 8 19V21" stroke="currentColor" strokeWidth="2"/>
            <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" fill="currentColor"/>
            <path d="M12 14L15 11L12 8L9 11L12 14Z" fill="currentColor"/>
          </svg>
        );
      case 'examination':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" fill="currentColor"/>
            <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2"/>
            <path d="M16 13H8" stroke="white" strokeWidth="2"/>
            <path d="M16 17H8" stroke="white" strokeWidth="2"/>
            <path d="M10 9H8" stroke="white" strokeWidth="2"/>
          </svg>
        );
      default:
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="currentColor"/>
          </svg>
        );
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'certification': return 'from-blue-500 to-blue-600';
      case 'award': return 'from-yellow-500 to-yellow-600';
      case 'competition': return 'from-purple-500 to-purple-600';
      case 'leadership': return 'from-green-500 to-green-600';
      case 'examination': return 'from-red-500 to-red-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getAchievementBadgeColor = (achievementType: string, rankPosition?: string) => {
    if (rankPosition) {
      if (rankPosition.includes('1st') || rankPosition.includes('Winner')) return 'bg-yellow-500';
      if (rankPosition.includes('2nd')) return 'bg-gray-400';
      if (rankPosition.includes('3rd')) return 'bg-orange-600';
      if (rankPosition.includes('Top') || rankPosition.includes('Finalist')) return 'bg-purple-600';
    }
    
    switch (achievementType.toLowerCase()) {
      case 'completer': return 'bg-blue-600';
      case 'award winner': return 'bg-yellow-600';
      case 'winner': return 'bg-green-600';
      case 'passer': return 'bg-emerald-600';
      case 'leadership role': return 'bg-indigo-600';
      default: return 'bg-gray-600';
    }
  };

  const RecognitionCard = ({ recognition }: { recognition: Recognition }) => {
    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short'
      });
    };

    return (
      <div className="bg-[#2f2f2f] border border-white/10 rounded-lg p-6 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${getCategoryColor(recognition.category)} flex items-center justify-center flex-shrink-0`}>
            {getCategoryIcon(recognition.category)}
          </div>
          <div className="flex flex-wrap gap-2 ml-4">
            {recognition.rank_position && (
              <span className={`px-2 py-1 text-white text-xs rounded-full ${getAchievementBadgeColor(recognition.achievement_type, recognition.rank_position)}`}>
                {recognition.rank_position}
              </span>
            )}
            {recognition.is_featured && (
              <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full">
                Featured
              </span>
            )}
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
            {recognition.title}
          </h3>
          
          {recognition.organization && (
            <div className="flex items-center gap-2 text-blue-400 text-sm mb-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {recognition.organization}
            </div>
          )}
          
          <div className="flex items-center gap-2 text-white/60 text-sm mb-3">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
              <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2"/>
              <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2"/>
            </svg>
            {formatDate(recognition.date_received)}
          </div>

          {recognition.description && (
            <p className="text-white/70 text-sm mb-4 line-clamp-2">{recognition.description}</p>
          )}
        </div>

        {recognition.skills_related && recognition.skills_related.length > 0 && (
          <div>
            <h4 className="text-white/60 text-xs font-medium mb-2 uppercase tracking-wide">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {recognition.skills_related.slice(0, 3).map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-white/10 text-white/80 text-xs rounded-md"
                >
                  {skill}
                </span>
              ))}
              {recognition.skills_related.length > 3 && (
                <span className="px-2 py-1 bg-white/5 text-white/60 text-xs rounded-md">
                  +{recognition.skills_related.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  const CategorySection = ({ category, recognitionsList }: { category: string, recognitionsList: Recognition[] }) => {
    if (recognitionsList.length === 0) return null;

    return (
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${getCategoryColor(category)} flex items-center justify-center`}>
            {getCategoryIcon(category)}
          </div>
          <h2 className="text-xl font-semibold text-white">{category}</h2>
          <span className="px-2 py-1 bg-white/10 text-white/60 text-xs rounded-full">
            {recognitionsList.length}
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {recognitionsList.map((recognition) => (
            <RecognitionCard key={recognition._id} recognition={recognition} />
          ))}
        </div>
      </div>
    );
  };

  const totalRecognitions = recognitions?.length || 0;
  const featuredCount = recognitions?.filter((rec: Recognition) => rec.is_featured).length || 0;
  const currentYear = new Date().getFullYear();
  const currentYearCount = recognitions?.filter((rec: Recognition) => rec.year === currentYear).length || 0;

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between p-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-bold text-white">Recognitions & Achievements</h1>
          <p className="text-white/60 mt-1">
            {totalRecognitions} total • {featuredCount} featured • {currentYearCount} this year
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 bg-[#2f2f2f] border border-white/20 text-white rounded-md focus:border-white/40 outline-none"
          >
            <option value="all">All Categories</option>
            {categories.map((category: { name: string; count: number }) => (
              <option key={category.name} value={category.name}>
                {category.name} ({category.count})
              </option>
            ))}
          </select>
        </div>
      </header>

      {/* Recognitions Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {filteredRecognitions && filteredRecognitions.length > 0 ? (
          selectedCategory === 'all' ? (
            // Show all categories grouped
            <div>
              {['Certification', 'Award', 'Competition', 'Leadership', 'Examination'].map((category) => {
                const categoryRecognitions = (recognitions || [])
                  .filter((rec: Recognition) => rec.category === category)
                  .sort((a: Recognition, b: Recognition) => a.order_index - b.order_index);
                return (
                  <CategorySection 
                    key={category} 
                    category={category} 
                    recognitionsList={categoryRecognitions} 
                  />
                );
              })}
            </div>
          ) : (
            // Show filtered category
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredRecognitions
                .sort((a: Recognition, b: Recognition) => a.order_index - b.order_index)
                .map((recognition: Recognition) => (
                  <RecognitionCard key={recognition._id} recognition={recognition} />
                ))}
            </div>
          )
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9L10 13L18 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 12C21 16.97 16.97 21 12 21C7.03 21 3 16.97 3 12C3 7.03 7.03 3 12 3C13.5 3 14.93 3.36 16.19 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No Recognitions Found</h3>
              <p className="text-white/60">
                {selectedCategory === 'all' 
                  ? 'Your achievements and recognitions will appear here once they\'re added.' 
                  : `No recognitions found in the ${selectedCategory} category.`}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecognitionDisplay;