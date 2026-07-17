"use client";

import { services } from "@/data/portfolioData";
import { Check } from "lucide-react";
import MagneticButton from "../ui/MagneticButton";

export default function Services() {
  const handleScrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" className="py-24 bg-bg-secondary relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-accent-gold font-mono mb-2 block">
            Offerings
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-white">
            Services & Pricing
          </h2>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-bg-primary border border-white/5 p-8 rounded-sm flex flex-col justify-between gold-glow-hover transition-all duration-500 relative"
            >
              {/* Highlight badge for Website design (our portfolio showcase purpose!) */}
              {service.id === "portfolio-website-design" && (
                <span className="absolute top-4 right-4 bg-accent-gold text-bg-primary text-[9px] uppercase tracking-widest font-extrabold px-2.5 py-1 rounded-full">
                  Popular
                </span>
              )}

              <div>
                {/* Title */}
                <h3 className="text-xl md:text-2xl font-serif text-white mb-4">
                  {service.title}
                </h3>
                
                {/* Description */}
                <p className="text-text-muted text-xs md:text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Price */}
                <div className="mb-8 border-y border-white/5 py-4">
                  <span className="text-[10px] uppercase tracking-widest text-text-muted font-mono block mb-1">
                    Investment Starting At
                  </span>
                  <span className="text-3xl md:text-4xl font-serif text-accent-gold">
                    {service.price}
                  </span>
                </div>

                {/* Features list */}
                <ul className="space-y-3.5 mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex gap-2.5 items-start text-xs md:text-sm text-text-muted">
                      <Check size={16} className="text-accent-gold shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <MagneticButton
                onClick={handleScrollToContact}
                className={`w-full py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold transition-all duration-300 border ${
                  service.id === "portfolio-website-design"
                    ? "bg-accent-gold border-accent-gold text-bg-primary hover:bg-white hover:border-white"
                    : "border-white/20 text-white hover:border-accent-gold hover:text-accent-gold"
                }`}
              >
                Inquire Details
              </MagneticButton>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
