"use client";

import { testimonials } from "@/data/portfolioData";
import { Quote } from "lucide-react";

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-bg-primary relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-accent-gold font-mono mb-2 block">
            Endorsements
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-white">
            Client Testimonials
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-bg-secondary border border-white/5 p-8 rounded-sm relative flex flex-col justify-between"
            >
              {/* Quote Mark */}
              <div className="absolute top-6 right-6 text-accent-gold/10">
                <Quote size={40} />
              </div>

              {/* Quote Text */}
              <p className="text-text-muted text-sm leading-relaxed italic mb-8 relative z-10">
                "{t.quote}"
              </p>

              {/* Client Info */}
              <div className="flex items-center gap-4">
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="w-10 h-10 object-cover rounded-full border border-accent-gold/20 filter grayscale"
                />
                <div>
                  <h4 className="text-sm font-semibold text-white">
                    {t.author}
                  </h4>
                  <p className="text-[10px] text-accent-gold uppercase font-mono tracking-widest mt-0.5">
                    {t.role}, {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
