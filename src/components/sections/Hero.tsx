"use client";

import { motion } from "framer-motion";
import MagneticButton from "../ui/MagneticButton";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] as const },
    },
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black select-none">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full object-cover">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-50 scale-105"
          src="/photos/WhatsApp%20Video%202026-07-16%20at%205.59.35%20PM.mp4"
        />
        {/* Dark radial overlay for dramatic light focus */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-[#0A0A0A]/70" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl px-6 flex flex-col items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-4"
        >
          {/* Slogan Top */}
          <motion.span
            variants={itemVariants}
            className="text-xs md:text-sm uppercase tracking-[0.3em] text-accent-gold font-mono font-medium"
          >
            Mobile Photography Hobbyist
          </motion.span>

          {/* Title */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-7xl font-serif font-light text-white tracking-wider uppercase leading-none"
          >
            Jignesh Prajapati
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-sm md:text-lg text-text-muted max-w-xl font-light mt-2 tracking-wide"
          >
            A collection of moments captured with Samsung S21 FE & S24 Ultra.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 mt-8"
          >
            <MagneticButton
              onClick={() => handleScrollTo("gallery")}
              className="px-8 py-3.5 bg-accent-gold text-[#0A0A0A] hover:bg-white transition-colors duration-300 rounded-full text-xs uppercase tracking-widest font-semibold"
            >
              Explore Photos
            </MagneticButton>

            <MagneticButton
              onClick={() => handleScrollTo("videos")}
              className="px-8 py-3.5 border border-white/20 hover:border-accent-gold text-white hover:text-accent-gold rounded-full text-xs uppercase tracking-widest font-semibold transition-all duration-300"
            >
              Watch Videos
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
