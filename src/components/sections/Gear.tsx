"use client";

import { personalInfo, GearItem } from "@/data/portfolioData";
import { Camera, Layers, Aperture, Sun, Settings } from "lucide-react";

export default function Gear() {
  // Group gear by category
  const bodies = personalInfo.gear.filter((g) => g.category === "Body");
  const lenses = personalInfo.gear.filter((g) => g.category === "Lens");
  
  // Group remaining items
  const accessories = personalInfo.gear.filter(
    (g) => g.category !== "Body" && g.category !== "Lens"
  );

  const renderCategoryIcon = (category: string) => {
    switch (category) {
      case "Body":
        return <Camera size={16} className="text-accent-gold" />;
      case "Lens":
        return <Aperture size={16} className="text-accent-gold" />;
      default:
        return <Layers size={16} className="text-accent-gold" />;
    }
  };

  return (
    <section id="gear" className="py-24 bg-bg-primary border-t border-border-light relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-accent-gold font-mono mb-2 block">
            The Toolchain
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-text-light">
            Equipment & Gear
          </h2>
        </div>

        {/* Gear Layout Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Column 1: Camera Bodies */}
          <div className="bg-bg-secondary p-8 border border-white/5 rounded-sm relative">
            <h3 className="text-lg font-serif text-text-light mb-6 border-b border-white/5 pb-3 flex items-center gap-2">
              <Camera size={18} className="text-accent-gold" />
              Camera Bodies
            </h3>
            <ul className="space-y-6">
              {bodies.map((item, idx) => (
                <li key={idx} className="group">
                  <h4 className="text-sm font-semibold text-text-light group-hover:text-accent-gold transition-colors duration-300">
                    {item.name}
                  </h4>
                  <p className="text-xs text-text-muted mt-1 leading-normal">
                    {item.spec}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Premium Lenses */}
          <div className="bg-bg-secondary p-8 border border-white/5 rounded-sm relative">
            <h3 className="text-lg font-serif text-text-light mb-6 border-b border-white/5 pb-3 flex items-center gap-2">
              <Aperture size={18} className="text-accent-gold" />
              Optical Glass
            </h3>
            <ul className="space-y-6">
              {lenses.map((item, idx) => (
                <li key={idx} className="group">
                  <h4 className="text-sm font-semibold text-text-light group-hover:text-accent-gold transition-colors duration-300">
                    {item.name}
                  </h4>
                  <p className="text-xs text-text-muted mt-1 leading-normal">
                    {item.spec}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Lighting & Drone */}
          <div className="bg-bg-secondary p-8 border border-white/5 rounded-sm relative">
            <h3 className="text-lg font-serif text-text-light mb-6 border-b border-white/5 pb-3 flex items-center gap-2">
              <Settings size={18} className="text-accent-gold" />
              Lighting & Aerial
            </h3>
            <ul className="space-y-6">
              {accessories.map((item, idx) => (
                <li key={idx} className="group">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] uppercase tracking-widest text-accent-gold font-mono px-1.5 py-0.5 bg-black/45 border border-white/5 rounded-sm">
                      {item.category}
                    </span>
                    <h4 className="text-sm font-semibold text-text-light group-hover:text-accent-gold transition-colors duration-300">
                      {item.name}
                    </h4>
                  </div>
                  <p className="text-xs text-text-muted mt-1 leading-normal pl-0">
                    {item.spec}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Dynamic Philosophy footnote */}
        <div className="mt-12 text-center text-xs text-text-muted/50 font-mono">
          * Utilizing only professional high-resolution mediums. Backups synchronized locally and to the cloud on set.
        </div>
      </div>
    </section>
  );
}
