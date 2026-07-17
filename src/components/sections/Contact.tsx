"use client";

import { useState } from "react";
import { personalInfo } from "@/data/portfolioData";
import { MapPin, Send, CheckCircle } from "lucide-react";
import MagneticButton from "../ui/MagneticButton";

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setFormState({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 bg-bg-primary border-t border-border-light relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-gold/5 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-accent-gold font-mono mb-2 block">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-text-light">
            Let's Connect
          </h2>
        </div>

        {/* Contact Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Info Details */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-10">
            <div>
              <h3 className="text-3xl font-serif text-text-light mb-6 leading-tight max-w-xs">
                Love photography? Let's chat.
              </h3>
              <p className="text-text-muted text-sm leading-relaxed mb-8">
                I'm always excited to connect with other mobile shooters, exchange tips about Lightroom editing, or talk about the latest phone camera specs. Drop a line below!
              </p>

              {/* Direct Info Row items */}
              <div className="space-y-5 text-sm text-text-muted">
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-accent-gold shrink-0" />
                  <span>{personalInfo.socialLinks.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Block */}
          <div className="lg:col-span-8 bg-bg-secondary p-8 md:p-10 rounded-sm border border-white/5 relative">
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                <CheckCircle size={48} className="text-accent-gold animate-bounce" />
                <h4 className="text-xl font-serif text-text-light">Message Sent</h4>
                <p className="text-text-muted text-xs max-w-xs leading-relaxed">
                  Thank you for reaching out! I'll get back to you as soon as I can. Keep shooting!
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs uppercase tracking-widest text-accent-gold hover:text-text-light transition-colors duration-300 font-mono"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-[10px] uppercase tracking-widest text-text-muted font-mono mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-bg-primary border border-white/5 focus:border-accent-gold text-text-light text-sm p-3.5 outline-none rounded-sm transition-colors duration-300"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-[10px] uppercase tracking-widest text-text-muted font-mono mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full bg-bg-primary border border-white/5 focus:border-accent-gold text-text-light text-sm p-3.5 outline-none rounded-sm transition-colors duration-300"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-[10px] uppercase tracking-widest text-text-muted font-mono mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full bg-bg-primary border border-white/5 focus:border-accent-gold text-text-light text-sm p-3.5 outline-none rounded-sm transition-colors duration-300 resize-none"
                    placeholder="Say hello, share your thoughts, or ask about gear!"
                  />
                </div>

                <MagneticButton
                  type="submit"
                  className="w-full py-4 bg-accent-gold text-bg-primary hover:bg-white transition-colors duration-300 font-semibold text-xs uppercase tracking-widest rounded-full flex items-center justify-center gap-2 cursor-none"
                  data-cursor="grow"
                >
                  <Send size={12} fill="currentColor" />
                  Send Message
                </MagneticButton>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
