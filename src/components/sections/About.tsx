"use client";

import { personalInfo } from "@/data/portfolioData";

export default function About() {
  return (
    <section id="about" className="py-24 bg-bg-secondary relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-accent-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Photo */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[360px] aspect-[3/4] overflow-hidden rounded-sm border border-border-light shadow-2xl bg-bg-primary">
              <img
                src={personalInfo.profileImage}
                alt={personalInfo.name}
                className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-[1.2s] ease-out scale-100 hover:scale-103"
              />
            </div>
          </div>

          {/* Right Column: Bio Paragraph */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <span className="text-xs uppercase tracking-[0.2em] text-accent-gold font-mono mb-2 block">
              The Photographer
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-text-light mb-6">
              About {personalInfo.name}
            </h2>
            <p className="text-text-muted text-base leading-relaxed font-light">
              {personalInfo.bio}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
