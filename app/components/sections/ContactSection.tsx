import React from 'react';
import { Container } from '@/app/components/layout/Container';
import { Button } from '@/app/components/ui/Button';
import { Card, CardContent } from '@/app/components/ui/Card';
import { portfolioData } from '@/app/data/portfolio';

export function ContactSection() {
  const { personalInfo, socialLinks } = portfolioData;
  
  return (
    <section className="py-20 bg-muted/50" id="contact">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Let&apos;s build something together.</h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            I&apos;m always interested in new opportunities and interesting projects. 
            Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* Email */}
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl mb-3">📧</div>
                <h3 className="font-semibold mb-2">Email</h3>
                <a 
                  href={`mailto:${personalInfo.email}`}
                  className="text-primary hover:underline"
                >
                  {personalInfo.email}
                </a>
              </CardContent>
            </Card>
            
            {/* Location */}
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl mb-3">📍</div>
                <h3 className="font-semibold mb-2">Location</h3>
                <p className="text-muted-foreground">{personalInfo.location}</p>
              </CardContent>
            </Card>
            
            {/* Phone */}
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl mb-3">📱</div>
                <h3 className="font-semibold mb-2">Phone</h3>
                <a 
                  href={`tel:${personalInfo.phone}`}
                  className="text-primary hover:underline"
                >
                  {personalInfo.phone}
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
          <div className="flex justify-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg border border-border hover:bg-accent transition-colors"
                aria-label={link.name}
              >
                {/* Placeholder icons - replace with actual icons */}
                <div className="w-6 h-6 bg-muted-foreground rounded" />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}