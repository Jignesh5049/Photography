"use client";

import { useState } from "react";
import Preloader from "@/components/sections/Preloader";
import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import Gallery from "@/components/sections/Gallery";
import Videos from "@/components/sections/Videos";
import About from "@/components/sections/About";
import Footer from "@/components/layout/Footer";
import { personalInfo } from "@/data/portfolioData";
import { motion, useScroll } from "framer-motion";

// Custom inline SVG icons for brands
const InstagramIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const YoutubeIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.56 49.56 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" />
  </svg>
);

export default function Home() {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const { scrollYProgress } = useScroll();

  return (
    <>
      {/* 1. Cinematic Loading Screen */}
      <Preloader onComplete={() => setLoadingComplete(true)} />

      {loadingComplete && (
        <div className="flex flex-col min-h-screen bg-bg-primary text-text-light relative">
          
          {/* Reading progress bar */}
          <motion.div
            style={{ scaleX: scrollYProgress }}
            className="fixed top-0 left-0 right-0 h-[3px] bg-accent-gold origin-left z-[1000] pointer-events-none"
          />

          {/* Global Header */}
          <Header />

          {/* 2. Floating Social Bar (Desktop only) */}
          <div className="fixed left-6 bottom-12 z-50 hidden xl:flex flex-col items-center gap-6">
            <div className="flex flex-col gap-4 text-text-muted">
              <a
                href={personalInfo.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent-gold transition-colors duration-300 hover:scale-110"
                aria-label="Instagram Link"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href={personalInfo.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent-gold transition-colors duration-300 hover:scale-110"
                aria-label="YouTube Link"
              >
                <YoutubeIcon size={18} />
              </a>
            </div>
            {/* Elegant vertical line anchor */}
            <div className="w-[1px] h-20 bg-white/20 mt-2" />
          </div>

          {/* Main Content Sections */}
          <main className="flex-1">
            <Hero />
            <Gallery />
            <Videos />
            <About />
          </main>
          <Footer />

        </div>
      )}
    </>
  );
}
