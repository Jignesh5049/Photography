"use client";

import { processSteps } from "@/data/portfolioData";

export default function Process() {
  return (
    <section id="process" className="py-24 bg-bg-secondary border-t border-border-light relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-accent-gold font-mono mb-2 block">
            Methodology
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-white">
            The Creative Process
          </h2>
        </div>

        {/* Process Steps Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {processSteps.map((step) => (
            <div
              key={step.step}
              className="bg-bg-primary border border-white/5 p-6 rounded-sm flex flex-col justify-between hover:border-accent-gold/40 transition-colors duration-500"
            >
              <div>
                {/* Step Number */}
                <span className="text-5xl md:text-6xl font-serif text-accent-gold/20 font-light block mb-6">
                  {step.step}
                </span>
                
                {/* Title */}
                <h3 className="text-lg font-serif text-white mb-3">
                  {step.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-text-muted text-xs leading-relaxed mt-4">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
