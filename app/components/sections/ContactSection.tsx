"use client"

import { Container } from '@/app/components/layout/Container';
import { Button } from '@/app/components/ui/Button';
import { Card, CardContent } from '@/app/components/ui/Card';
import { portfolioData } from '@/app/data/portfolio';
import Image from 'next/image';

export function ContactSection() {
  const { personalInfo, socialLinks } = portfolioData;
  
  return (
    <section className="py-20 bg-muted/50" id="contact">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">Let&apos;s build something together.</h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-8 md:mb-12 max-w-2xl mx-auto">
            I&apos;m always interested in new opportunities and interesting projects. 
            Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
          </p>
          
          <div className="grid grid-cols-2 gap-4 md:gap-6 mb-6">
            {/* Location */}
            <Card>
              <CardContent className="p-4 md:p-6 text-center">
                <div className="text-xl md:text-2xl mb-2 md:mb-3">📍</div>
                <h3 className="text-sm md:text-base font-semibold mb-2">Location</h3>
                <p className="text-xs md:text-sm text-muted-foreground">{personalInfo.location}</p>
              </CardContent>
            </Card>
            
            {/* Phone */}
            <Card>
              <CardContent className="p-4 md:p-6 text-center">
                <div className="text-xl md:text-2xl mb-2 md:mb-3">📱</div>
                <h3 className="text-sm md:text-base font-semibold mb-2">Phone</h3>
                <a 
                  href={`tel:${personalInfo.phone}`}
                  className="text-xs md:text-sm text-primary hover:underline"
                >
                  {personalInfo.phone}
                </a>
              </CardContent>
            </Card>
          </div>
          
          {/* Email - Full width below */}
          <div className="max-w-md mx-auto mb-8 md:mb-12">
            <Card>
              <CardContent className="p-4 md:p-6 text-center">
                <div className="text-xl md:text-2xl mb-2 md:mb-3">📧</div>
                <h3 className="text-sm md:text-base font-semibold mb-2">Email</h3>
                <a 
                  href={`mailto:${personalInfo.email}`}
                  className="text-xs md:text-sm text-primary hover:underline"
                >
                  {personalInfo.email}
                </a>
              </CardContent>
            </Card>
          </div>
          
          {/* CTA Button */}
          <div className="mb-8">
            <Button size="lg">
              <a href={`mailto:${personalInfo.email}`}>Get In Touch</a>
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
        </div>
      </Container>
    </section>
  );
}