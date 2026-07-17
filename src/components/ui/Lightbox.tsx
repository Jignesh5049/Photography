"use client";

import { useEffect, useState, useRef, WheelEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Camera, Settings, MapPin, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";

interface LightboxProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
  title?: string;
  location?: string;
  camera?: string;
  lens?: string;
  settings?: {
    shutter: string;
    aperture: string;
    iso: string;
  };
}

export default function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
  title,
  location,
  camera,
  lens,
  settings,
}: LightboxProps) {
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Reset zoom when image changes or lightbox opens/closes
  useEffect(() => {
    setScale(1);
  }, [currentIndex, isOpen]);

  // Handle keyboard navigations
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex, images.length]);

  const handlePrev = () => {
    setScale(1);
    onNavigate((currentIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setScale(1);
    onNavigate((currentIndex + 1) % images.length);
  };

  const zoomIn = () => setScale(prev => Math.min(prev + 0.5, 4));
  const zoomOut = () => setScale(prev => Math.max(prev - 0.5, 1));
  const resetZoom = () => setScale(1);
  const handleDoubleClick = () => {
    setScale(prev => prev > 1 ? 1 : 2.5);
  };

  const handleWheel = (e: WheelEvent<HTMLDivElement>) => {
    const zoomStep = 0.25;
    const direction = e.deltaY < 0 ? 1 : -1;
    setScale(prev => {
      const next = prev + direction * zoomStep;
      return Math.max(1, Math.min(next, 4));
    });
  };


  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[99999] bg-[#0A0A0A]/98 backdrop-blur-md flex flex-col justify-between p-4 md:p-8 select-none"
        data-cursor="hide" // Hides custom cursor for native experience in modal
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between w-full border-b border-white/5 pb-4">
          <div>
            {title && (
              <h3 className="text-white text-lg md:text-xl font-serif tracking-wide">
                {title}
              </h3>
            )}
            {location && (
              <p className="text-text-muted text-xs md:text-sm flex items-center gap-1.5 mt-0.5">
                <MapPin size={12} className="text-accent-gold" /> {location}
              </p>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {/* Zoom Controls */}
            <div className="flex items-center gap-1 bg-white/5 rounded-full border border-white/10 p-0.5 mr-2">
              <button
                onClick={zoomOut}
                disabled={scale <= 1}
                className="p-1.5 text-white hover:text-accent-gold disabled:opacity-30 disabled:hover:text-white transition-colors duration-300 rounded-full"
                title="Zoom Out"
              >
                <ZoomOut size={16} />
              </button>
              <span className="text-[10px] text-white/60 font-mono px-1 min-w-[36px] text-center select-none">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={zoomIn}
                disabled={scale >= 4}
                className="p-1.5 text-white hover:text-accent-gold disabled:opacity-30 disabled:hover:text-white transition-colors duration-300 rounded-full"
                title="Zoom In"
              >
                <ZoomIn size={16} />
              </button>
              {scale > 1 && (
                <button
                  onClick={resetZoom}
                  className="p-1.5 text-accent-gold hover:text-white transition-colors duration-300 rounded-full border-l border-white/10"
                  title="Reset Zoom"
                >
                  <Maximize2 size={16} />
                </button>
              )}
            </div>

            <button
              onClick={onClose}
              className="p-2 text-white hover:text-accent-gold transition-colors duration-300 rounded-full bg-white/5 hover:bg-white/10"
              aria-label="Close Lightbox"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Center Container */}
        <div 
          ref={containerRef} 
          onWheel={handleWheel}
          className="relative flex-1 flex items-center justify-center py-4 overflow-hidden w-full h-full"
        >
          {/* Prev Button */}
          {scale === 1 && (
            <button
              onClick={handlePrev}
              className="absolute left-0 md:left-4 z-10 p-3 text-white hover:text-accent-gold transition-colors duration-300 rounded-full bg-white/5 hover:bg-white/10"
              aria-label="Previous Image"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {/* Main Image */}
          <div className="relative max-w-full max-h-[70vh] flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={images[currentIndex]}
                alt={`Lightbox image ${currentIndex + 1}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: scale }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                drag={scale > 1}
                dragConstraints={containerRef}
                dragElastic={0.1}
                onDoubleClick={handleDoubleClick}
                className={`max-w-[85vw] max-h-[70vh] object-contain select-none shadow-2xl border border-white/10 ${
                  scale > 1 ? "cursor-grab active:cursor-grabbing touch-none z-10" : "cursor-zoom-in"
                }`}
              />
            </AnimatePresence>
          </div>

          {/* Next Button */}
          {scale === 1 && (
            <button
              onClick={handleNext}
              className="absolute right-0 md:right-4 z-10 p-3 text-white hover:text-accent-gold transition-colors duration-300 rounded-full bg-white/5 hover:bg-white/10"
              aria-label="Next Image"
            >
              <ChevronRight size={24} />
            </button>
          )}

          {/* Visual Gestures Helper Tip */}
          <div className="absolute bottom-2 bg-black/70 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/5 text-[9px] md:text-[10px] text-white/50 tracking-wider font-mono z-20 pointer-events-none select-none">
            {scale > 1 
              ? "Drag to Pan • Scroll or Double-click to Reset" 
              : "Scroll or Double-click Image to Zoom"
            }
          </div>
        </div>

        {/* Bottom Metadata Bar */}
        <div className="w-full border-t border-white/5 pt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs md:text-sm text-text-muted">
            {camera && (
              <span className="flex items-center gap-1.5">
                <Camera size={14} className="text-accent-gold" />
                {camera}
              </span>
            )}
            {lens && (
              <span className="text-white/40 border-l border-white/10 pl-6 hidden md:inline">
                {lens}
              </span>
            )}
            {settings && (
              <span className="flex items-center gap-1.5 md:border-l md:border-white/10 md:pl-6">
                <Settings size={14} className="text-accent-gold" />
                {settings.aperture} • {settings.shutter} • ISO {settings.iso}
              </span>
            )}
          </div>

          {/* Counter */}
          <div className="text-xs md:text-sm tracking-widest text-text-muted font-mono self-end md:self-auto">
            {String(currentIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
