"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/app/components/ui/Button';
import { Container } from '@/app/components/layout/Container';
import { portfolioData } from '@/app/data/portfolio';
import Image from 'next/image';

const roles = [
  {
    title: "Full-Stack Developer",
    color: "#00e5ff", // Electric Cyan
    theme: "cyan"
  },
  {
    title: "Data Scientist", 
    color: "#10b981", // Emerald Green
    theme: "emerald"
  },
  {
    title: "AI/ML Engineer",
    color: "#8b5cf6", // Purple/Violet
    theme: "purple"
  },
  {
    title: "Mobile Developer",
    color: "#f97316", // Sunset Orange
    theme: "orange"
  },
  {
    title: "Database Management",
    color: "#64748b", // Liquid Chrome
    theme: "chrome"
  }
];

export function HeroSection() {
  const { personalInfo, socialLinks } = portfolioData;
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [,setIsTransitioning] = useState(false);
  
  const currentRole = roles[currentRoleIndex];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        setIsTransitioning(false);
      }, 300); // Half transition duration
    }, 3000); // Change every 3 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Enhanced Dynamic background glow effects */}
      {/* Main radial glow */}
      <div 
        className="absolute inset-0 opacity-20 blur-3xl transition-all duration-1000 ease-in-out"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${currentRole.color} 0%, ${currentRole.color}80 30%, transparent 70%)`,
          transition: 'all 1000ms cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      />
      
      {/* Secondary glow for depth */}
      <div 
        className="absolute inset-0 opacity-15 blur-2xl transition-all duration-1000 ease-in-out"
        style={{
          background: `radial-gradient(circle at 30% 70%, ${currentRole.color}60 0%, transparent 60%)`,
          transition: 'all 1000ms cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      />
      
      {/* Tertiary glow for ambiance */}
      <div 
        className="absolute inset-0 opacity-10 blur-xl transition-all duration-1000 ease-in-out"
        style={{
          background: `radial-gradient(circle at 70% 30%, ${currentRole.color}40 0%, transparent 50%)`,
          transition: 'all 1000ms cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      />
      
      {/* Digital Fabric - Dot Grid that only appears in glow areas */}
      <div 
        className="absolute inset-0 opacity-70 transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${currentRole.color}40 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
          transition: 'all 1000ms cubic-bezier(0.4, 0, 0.2, 1)',
          maskImage: `radial-gradient(circle at 50% 50%, black 20%, transparent 60%), 
                     radial-gradient(circle at 30% 70%, black 15%, transparent 50%),
                     radial-gradient(circle at 70% 30%, black 10%, transparent 40%)`,
          maskComposite: 'add',
          WebkitMaskImage: `radial-gradient(circle at 50% 50%, black 20%, transparent 60%), 
                           radial-gradient(circle at 30% 70%, black 15%, transparent 50%),
                           radial-gradient(circle at 70% 30%, black 10%, transparent 40%)`,
          WebkitMaskComposite: 'source-over'
        }}
      />
      
      <Container className="text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Greeting */}
          <div className="mb-6">
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              Hi, I&apos;m{' '}
              <span 
                className="transition-all duration-1000 ease-in-out"
                style={{ 
                  color: currentRole.color,
                  transition: 'all 1000ms cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                Mann
              </span>{' '}
              👋
            </h1>
            
            {/* Dynamic rotating subtitle - All roles visible */}
            <div className="text-2xl md:text-3xl font-semibold mb-2 transition-all duration-500">
              {roles.map((role, index) => (
                <span key={role.title}>
                  <span 
                    className={`transition-all duration-1000 ease-in-out ${
                      index === currentRoleIndex 
                        ? 'opacity-100' 
                        : 'opacity-60'
                    }`}
                    style={{ 
                      color: index === currentRoleIndex ? currentRole.color : '#a3a3a3',
                      textShadow: index === currentRoleIndex ? `0 0 20px ${currentRole.color}40` : 'none',
                      transition: 'all 1000ms cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    {role.title}
                  </span>
                  {index < roles.length - 1 && (
                    <span className="text-muted-foreground mx-2 opacity-40">|</span>
                  )}
                </span>
              ))}
            </div>
          </div>
          
          {/* Bio */}
          <p className="text-lg text-slate-30 max-w-3xl mx-auto mb-8 leading-relaxed">
            {personalInfo.bio}
          </p>
          
          {/* Call-to-Action Buttons with dynamic colors */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="min-w-40 transition-all duration-1000 ease-in-out border-0"
              style={{
                backgroundColor: currentRole.color,
                color: '#ffffff',
                boxShadow: `0 4px 20px ${currentRole.color}40`,
                transition: 'all 1000ms cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              View Projects
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="min-w-40 transition-all duration-1000 ease-in-out"
              style={{
                borderColor: currentRole.color,
                color: currentRole.color,
                transition: 'all 1000ms cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              Download Resume
            </Button>
          </div>
          
          {/* Social Links */}
          <div className="flex justify-center gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-accent transition-all duration-300"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = currentRole.color;
                  e.currentTarget.style.boxShadow = `0 0 10px ${currentRole.color}20`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                aria-label={link.name}
              >
                <Image 
                  src={link.icon}
                  alt={link.name}
                  width={24}
                  height={24}
                />
              </a>
            ))}
          </div>
          
          {/* Role indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {roles.map((role, index) => (
              <button
                key={role.title}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentRoleIndex ? 'w-6' : 'opacity-30'
                }`}
                style={{
                  backgroundColor: index === currentRoleIndex ? currentRole.color : '#64748b'
                }}
                onClick={() => setCurrentRoleIndex(index)}
                aria-label={`Switch to ${role.title}`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}