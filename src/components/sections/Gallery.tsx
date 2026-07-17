"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { localImages, MediaImage } from "@/data/mediaData";
import { Camera, Eye, Smartphone } from "lucide-react";
import Lightbox from "../ui/Lightbox";
import Link from "next/link";

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Lightbox State
  const [lightbox, setLightbox] = useState<{
    isOpen: boolean;
    currentIndex: number;
    imagesList: MediaImage[];
  }>({
    isOpen: false,
    currentIndex: 0,
    imagesList: [],
  });

  // Extract unique categories from mediaData
  const categories = ["all", "Nature", "Cityscape", "Everyday Life", "Low Light"];

  // Filter images based on selected category
  const filteredImages = useMemo(() => {
    return localImages.filter((img) => {
      return selectedCategory === "all" || img.category === selectedCategory;
    });
  }, [selectedCategory]);

  // Get currently visible images - limited to 50 for homepage showcase
  const visibleImages = useMemo(() => {
    return filteredImages.slice(0, 50);
  }, [filteredImages]);

  const openLightbox = (index: number) => {
    setLightbox({
      isOpen: true,
      currentIndex: index,
      imagesList: visibleImages,
    });
  };

  const handleLightboxNavigate = (index: number) => {
    setLightbox((prev) => ({ ...prev, currentIndex: index }));
  };

  // Helper to estimate settings based on device for metadata display
  const getPhotoMetadata = (img: MediaImage) => {
    if (img.device.includes("S24 Ultra")) {
      return {
        lens: "24mm (Main Wide)",
        settings: { aperture: "f/1.7", shutter: "1/250s", iso: "50" },
      };
    } else {
      return {
        lens: "26mm (Main)",
        settings: { aperture: "f/1.8", shutter: "1/125s", iso: "100" },
      };
    }
  };

  const currentLightboxImg = lightbox.isOpen ? lightbox.imagesList[lightbox.currentIndex] : null;
  const currentLightboxMeta = currentLightboxImg ? getPhotoMetadata(currentLightboxImg) : null;

  return (
    <section id="gallery" className="py-24 bg-bg-primary relative">
      {/* Ambient glow */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-accent-gold/2 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-accent-gold font-mono mb-2 block">
              Redesigned Gallery
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-text-light mb-2">
              Captured Moments
            </h2>
            <p className="text-xs md:text-sm text-text-muted max-w-md font-light">
              Browsing {filteredImages.length} of {localImages.length} total mobile captures.
            </p>
          </div>

          {/* Filtering System */}
          <div className="flex flex-col sm:flex-row gap-4 lg:self-end">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-1.5 bg-[#0D0D0D] border border-white/5 p-1 rounded-full">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                  }}
                  className={`px-4 py-1.5 rounded-full text-[10px] md:text-xs uppercase tracking-widest transition-all duration-300 font-semibold ${
                    selectedCategory === cat
                      ? "bg-accent-gold text-bg-primary"
                      : "text-text-muted hover:text-white"
                  }`}
                >
                  {cat === "all" ? "All Tags" : cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Masonry Styled Grid */}
        <motion.div
          layout
          className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {visibleImages.map((img, index) => {
              return (
                <motion.div
                  key={img.src}
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  onClick={() => openLightbox(index)}
                  className="group relative rounded-sm overflow-hidden border border-white/5 bg-bg-secondary cursor-none break-inside-avoid mb-6 w-full"
                  data-cursor="view"
                >
                  {/* Photo element */}
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full h-auto block transition-transform duration-[1.2s] ease-out group-hover:scale-105 filter brightness-[0.95] group-hover:brightness-100"
                    loading="lazy"
                  />

                  {/* Elegant Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 opacity-30 group-hover:opacity-60 transition-opacity duration-500" />

                  {/* Floating Device and Action Icons */}
                  <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
                    <span className="p-1.5 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-white">
                      <Eye size={12} />
                    </span>
                  </div>

                  {/* Details Overlay on Hover */}
                  <div className="absolute bottom-0 left-0 w-full p-4 flex flex-col justify-end translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="text-[9px] tracking-widest text-accent-gold uppercase font-mono mb-1">
                      {img.category}
                    </span>
                    <h3 className="text-sm font-medium text-white mb-2 truncate">
                      {img.title}
                    </h3>
                    
                    <div className="flex items-center gap-1.5 text-[10px] text-text-muted font-mono border-t border-white/5 pt-2">
                      <Camera size={10} className="text-accent-gold" />
                      <span className="truncate">{img.device.split("Samsung ").pop()}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* View Full Gallery Link */}
        <div className="flex justify-center mt-16">
          <Link
            href="/gallery"
            className="px-8 py-3 border border-white/15 hover:border-accent-gold rounded-full text-xs uppercase tracking-widest text-white hover:text-accent-gold transition-all duration-300 flex items-center gap-2 group hover:shadow-[0_0_15px_rgba(212,175,55,0.1)] cursor-none"
            data-cursor="grow"
          >
            View Full Gallery ({localImages.length} Photos)
          </Link>
        </div>
      </div>

      {/* Lightbox Module */}
      <Lightbox
        isOpen={lightbox.isOpen}
        images={lightbox.imagesList.map((img) => img.src)}
        currentIndex={lightbox.currentIndex}
        onClose={() => setLightbox((prev) => ({ ...prev, isOpen: false }))}
        onNavigate={handleLightboxNavigate}
        title={currentLightboxImg?.title}
        location="Gujarat, India"
        camera={currentLightboxImg?.device}
        lens={currentLightboxMeta?.lens}
        settings={currentLightboxMeta?.settings}
      />
    </section>
  );
}
