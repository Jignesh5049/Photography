"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { personalInfo } from "@/data/portfolioData";
import { ArrowUp, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-bg-secondary border-t border-border-light pt-16 pb-8 relative overflow-hidden">
      {/* Decorative ambient background highlight */}
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-accent-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Links Grid - Direct Footer Starts Here */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 mb-16">
          {/* Column 1: Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/logo.png" 
                alt="JP Logo" 
                className="h-8 w-8 object-contain invert"
              />
            </div>
            <p className="text-text-muted text-sm max-w-sm mb-6 leading-relaxed">
              Hobbyist mobile photographer highlighting scenery, cities, and moments shot with Samsung S21 FE and S24 Ultra.
            </p>
            <div className="flex items-center gap-4 text-text-muted">
              <a
                href={personalInfo.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent-gold transition-colors duration-300"
                aria-label="Instagram"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href={personalInfo.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent-gold transition-colors duration-300"
                aria-label="YouTube"
              >
                <YoutubeIcon size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-text-light font-mono mb-4 border-l-2 border-accent-gold pl-3">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-text-muted">
              <li>
                <Link href="/gallery" className="hover:text-text-light transition-colors duration-300">
                  Featured Gallery
                </Link>
              </li>
              <li>
                <Link href="/videos" className="hover:text-text-light transition-colors duration-300">
                  Video Showcase
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-text-light transition-colors duration-300">
                  About Me
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-text-light font-mono mb-4 border-l-2 border-accent-gold pl-3">
              Location
            </h4>
            <ul className="space-y-3.5 text-sm text-text-muted">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-accent-gold shrink-0 mt-0.5" />
                <span>{personalInfo.socialLinks.location}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-text-muted font-mono">
          <div>
            © {new Date().getFullYear()} Jignesh Prajapati. All Rights Reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-white transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="/" className="hover:text-white transition-colors duration-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 p-3 bg-bg-secondary border border-border-light hover:border-accent-gold text-text-light hover:text-accent-gold rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center cursor-none"
            data-cursor="grow"
            aria-label="Back to Top"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
