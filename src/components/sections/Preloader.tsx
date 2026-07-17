"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [count, setCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const blades = Array.from({ length: 6 });

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = "hidden";

    // Simulate progress counting (to maintain the slide-out timing)
    const duration = 1500; // 1.5s loader
    const interval = 15;
    const step = 100 / (duration / interval);

    const timer = setInterval(() => {
      setCount((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          setIsLoaded(true);
          // Wait slightly after 100% before triggering exit animation
          setTimeout(() => {
            document.body.style.overflow = "auto";
            onComplete();
          }, 600);
          return 100;
        }
        return Math.floor(next);
      });
    }, interval);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = "auto";
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} // Luxury cinematic slide out
          className="fixed inset-0 bg-[#0A0A0A] z-[99999] flex flex-col justify-between p-8 md:p-16 select-none"
        >
          {/* Top tagline */}
          <div className="flex justify-between items-center text-xs tracking-[0.2em] font-mono text-white/40 uppercase">
            <span>Jignesh Prajapati</span>
            <span>Hobbyist Portfolio</span>
          </div>

          {/* Middle camera shutter loading animation */}
          <div className="flex-1 flex items-center justify-center">
            <div className="relative flex flex-col items-center gap-4">
              <div className="relative flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-20 h-20 md:w-28 md:h-28 text-accent-gold fill-none" strokeWidth="1">
                  {blades.map((_, i) => (
                    <g key={i} transform={`rotate(${i * 60} 50 50)`}>
                      <motion.path
                        d="M 50 10 A 40 40 0 0 1 84.64 30 L 50 42 Z"
                        className="fill-accent-gold/10 stroke-accent-gold"
                        animate={{ 
                          scale: [0.7, 0.7, 1.25, 0.7, 0.7],
                          rotate: [0, 0, 35, 0, 0]
                        }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 2.0, 
                          times: [0, 0.85, 0.9, 0.95, 1], 
                          ease: "easeInOut" 
                        }}
                        style={{ transformOrigin: '50px 50px' }}
                      />
                    </g>
                  ))}
                  <circle cx="50" cy="50" r="42" className="stroke-accent-gold/20 fill-none" strokeWidth="1.5" />
                </svg>
              </div>
              
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 2.0, ease: "easeInOut" }}
                className="text-[9px] tracking-[0.25em] font-mono text-accent-gold/80 uppercase"
              >
                Capturing moments...
              </motion.span>
            </div>
          </div>

          {/* Bottom container */}
          <div className="flex justify-between items-end w-full">
            <div className="text-xs uppercase tracking-widest text-text-muted font-mono max-w-[200px] leading-relaxed hidden md:block">
              Focusing lens... Loading dynamic portfolios
            </div>
            
            {/* Shaping Emotion Text in Bottom Right */}
            <div className="flex flex-col items-end text-right">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="overflow-hidden"
              >
                <h1 className="text-xl md:text-3xl font-serif text-white leading-tight font-light uppercase tracking-wider">
                  SHAPING EMOTION
                </h1>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="overflow-hidden"
              >
                <h1 className="text-xl md:text-3xl font-serif text-white/50 leading-tight font-light uppercase tracking-wider">
                  THROUGH LIGHT
                </h1>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
