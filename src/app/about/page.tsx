"use client";

import { useMemo } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { personalInfo } from "@/data/portfolioData";
import { ArrowLeft, Smartphone, Camera, Aperture, Settings, Layers } from "lucide-react";
import Link from "next/link";
import Contact from "@/components/sections/Contact";

export default function AboutPage() {
  // Group gear by category dynamically from portfolio data
  const bodies = useMemo(() => personalInfo.gear.filter((g) => g.category === "Body"), []);
  const lenses = useMemo(() => personalInfo.gear.filter((g) => g.category === "Lens"), []);
  const accessories = useMemo(() => personalInfo.gear.filter(
    (g) => g.category !== "Body" && g.category !== "Lens"
  ), []);

  return (
    <div className="flex flex-col min-h-screen bg-bg-primary text-text-light relative">
      <Header />

      <main className="flex-1 py-32 relative z-10">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-accent-gold/2 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-accent-gold/1 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          
          {/* Breadcrumb Back Button */}
          <div className="mb-8">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-text-muted hover:text-accent-gold transition-colors duration-300 group cursor-none"
              data-cursor="grow"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-300" />
              Back to Home
            </Link>
          </div>

          {/* Section 1: Detailed Bio & Image */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
            {/* Image Column */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[360px] aspect-[3/4] overflow-hidden rounded-sm border border-border-light shadow-2xl bg-bg-secondary">
                <img
                  src={personalInfo.profileImage}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-[1.2s] ease-out scale-100 hover:scale-103"
                />
              </div>
            </div>

            {/* Profile Intro Column */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-[0.2em] text-accent-gold font-mono mb-2 block">
                The Photographer
              </span>
              <h1 className="text-4xl md:text-6xl font-serif text-text-light mb-6">
                About {personalInfo.name.split(" ").shift()}
              </h1>
              <p className="text-text-muted text-base leading-relaxed mb-6 font-light">
                {personalInfo.bio}
              </p>
              
              <div className="border-t border-border-light pt-6">
                <h3 className="text-xs uppercase tracking-widest text-accent-gold font-mono mb-3">
                  Creative Philosophy
                </h3>
                <p className="text-text-muted text-sm leading-relaxed font-light italic">
                  "{personalInfo.creativePhilosophy}"
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Stats Counter Block */}
          <div className="border-t border-b border-border-light py-10 mb-24">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {personalInfo.stats.map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-4xl md:text-5xl font-serif text-accent-gold font-light">
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="text-[10px] md:text-xs uppercase tracking-widest text-text-muted font-mono">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Mobile Shooting Gear detailed list */}
          <div className="mb-24">
            <div className="mb-12">
              <span className="text-xs uppercase tracking-[0.2em] text-accent-gold font-mono mb-2 block">
                The Medium
              </span>
              <h2 className="text-3xl md:text-4xl font-serif text-text-light">
                Mobile Camera Specs
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Gear Card 1: S24 Ultra */}
              <div className="bg-bg-secondary border border-border-light p-6 md:p-8 rounded-sm hover:border-accent-gold/20 transition-all duration-300">
                <div className="flex items-center gap-2.5 mb-4 text-text-light">
                  <Smartphone size={18} className="text-accent-gold" />
                  <h4 className="font-serif text-lg font-semibold">Galaxy S24 Ultra</h4>
                </div>
                <ul className="text-xs md:text-sm text-text-muted space-y-2.5 list-disc list-inside leading-relaxed font-light">
                  <li>200 MP main camera for high-detail captures</li>
                  <li>5x & 10x optical zoom for distant architecture</li>
                  <li>Nightography processing for low-light noise control</li>
                  <li>Cinematic 4K video recording up to 120fps</li>
                </ul>
              </div>

              {/* Gear Card 2: S21 FE */}
              <div className="bg-bg-secondary border border-border-light p-6 md:p-8 rounded-sm hover:border-accent-gold/20 transition-all duration-300">
                <div className="flex items-center gap-2.5 mb-4 text-text-light">
                  <Smartphone size={18} className="text-accent-gold" />
                  <h4 className="font-serif text-lg font-semibold">Galaxy S21 FE</h4>
                </div>
                <ul className="text-xs md:text-sm text-text-muted space-y-2.5 list-disc list-inside leading-relaxed font-light">
                  <li>12 MP dual-pixel main lens for fast focusing</li>
                  <li>3x optical telephoto zoom for portraits</li>
                  <li>Vibrant color rendering on daylight shots</li>
                  <li>Lightweight design, perfect for quick candid shots</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 4: Full Equipment list (Toolkit) */}
          <div>
            <div className="mb-12">
              <span className="text-xs uppercase tracking-[0.2em] text-accent-gold font-mono mb-2 block">
                The Toolchain
              </span>
              <h2 className="text-3xl md:text-4xl font-serif text-text-light">
                Equipment & Toolchain
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Column 1: Bodies */}
              <div className="bg-bg-secondary p-8 border border-border-light rounded-sm relative">
                <h3 className="text-lg font-serif text-text-light mb-6 border-b border-border-light pb-3 flex items-center gap-2">
                  <Camera size={18} className="text-accent-gold" />
                  Camera Bodies
                </h3>
                <ul className="space-y-6">
                  {bodies.map((item, idx) => (
                    <li key={idx} className="group">
                      <h4 className="text-sm font-semibold text-text-light group-hover:text-accent-gold transition-colors duration-300">
                        {item.name}
                      </h4>
                      <p className="text-xs text-text-muted mt-1 leading-normal font-light">
                        {item.spec}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 2: Optics */}
              <div className="bg-bg-secondary p-8 border border-border-light rounded-sm relative">
                <h3 className="text-lg font-serif text-text-light mb-6 border-b border-border-light pb-3 flex items-center gap-2">
                  <Aperture size={18} className="text-accent-gold" />
                  Optical Glass
                </h3>
                <ul className="space-y-6">
                  {lenses.map((item, idx) => (
                    <li key={idx} className="group">
                      <h4 className="text-sm font-semibold text-text-light group-hover:text-accent-gold transition-colors duration-300">
                        {item.name}
                      </h4>
                      <p className="text-xs text-text-muted mt-1 leading-normal font-light">
                        {item.spec}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3: Lighting & Accessories */}
              <div className="bg-bg-secondary p-8 border border-border-light rounded-sm relative">
                <h3 className="text-lg font-serif text-text-light mb-6 border-b border-border-light pb-3 flex items-center gap-2">
                  <Settings size={18} className="text-accent-gold" />
                  Lighting & Aerial
                </h3>
                <ul className="space-y-6">
                  {accessories.map((item, idx) => (
                    <li key={idx} className="group">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] uppercase tracking-widest text-accent-gold font-mono px-1.5 py-0.5 bg-black/45 border border-border-light rounded-sm">
                          {item.category}
                        </span>
                        <h4 className="text-sm font-semibold text-text-light group-hover:text-accent-gold transition-colors duration-300">
                          {item.name}
                        </h4>
                      </div>
                      <p className="text-xs text-text-muted mt-1 leading-normal font-light pl-0">
                        {item.spec}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Let's Connect Contact Form */}
          <div className="mt-24">
            <Contact />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
