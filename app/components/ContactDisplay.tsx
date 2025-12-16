"use client";

import { useEffect, useState } from "react";

interface Contact {
  _id: string;
  contact_type: string; // "link", "email", "number"
  contact_name: string; // "GitHub", "Contact Number", "Facebook", etc.
  contact_link: string; // actual URL/email/phone number
  is_active: boolean;
}

const ContactDisplay = () => {
  const [contacts, setContacts] = useState<Contact[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch('/api/contacts?type=active');
        const data = await response.json();
        
        if (data.success) {
          setContacts(data.data);
        }
      } catch (error) {
        console.error('Error fetching contacts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const getContactIcon = (type: string) => {
    switch (type) {
      case 'email':
        return '✉️';
      case 'number':
        return '📞';
      case 'link':
        return '🔗';
      default:
        return '📄';
    }
  };

  const getContactHref = (type: string, link: string) => {
    switch (type) {
      case 'email':
        return `mailto:${link}`;
      case 'number':
        return `tel:${link}`;
      case 'link':
        return link.startsWith('http') ? link : `https://${link}`;
      default:
        return link;
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-white/60">Loading contact information...</div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">Contact Me</h1>
          <p className="text-white/70 text-lg">
            Let's connect! Feel free to reach out for collaborations, opportunities, or just to say hello.
          </p>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </div>

        {/* Contact Form */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">Send me a message</h2>
          
          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-300">
              Thank you for your message! I'll get back to you soon.
            </div>
          )}
          
          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300">
              Sorry, there was an error sending your message. Please try again.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-white/90 font-medium mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-white/90 font-medium mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-white/90 font-medium mb-2">
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                placeholder="What's this about?"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-white/90 font-medium mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
                placeholder="Tell me about your project, idea, or just say hello..."
              />
            </div>
            
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-3 rounded-lg font-medium transition-all ${
                  isSubmitting
                    ? 'bg-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900'
                } text-white`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>

        {/* Contact Information */}
        {contacts && contacts.length > 0 && (
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-white mb-6 text-center">Other ways to reach me</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {contacts.map((contact) => (
                <a
                  key={contact._id}
                  href={getContactHref(contact.contact_type, contact.contact_link)}
                  target={contact.contact_type === 'link' ? '_blank' : '_self'}
                  rel={contact.contact_type === 'link' ? 'noopener noreferrer' : ''}
                  className="flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-300 group"
                >
                  <div className="text-2xl">{getContactIcon(contact.contact_type)}</div>
                  <div className="flex-1">
                    <h3 className="text-white font-medium group-hover:text-blue-300 transition-colors">
                      {contact.contact_name}
                    </h3>
                    <p className="text-white/70 text-sm break-all">
                      {contact.contact_link}
                    </p>
                  </div>
                  <div className="text-white/40 group-hover:text-white/60 transition-colors">
                    →
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Footer Message */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-2">
              Ready to work together?
            </h3>
            <p className="text-white/90">
              I'm always excited to discuss new projects and opportunities. Let's build something amazing together!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDisplay;