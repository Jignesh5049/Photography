"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  videoUrl: string;
  title: string;
  onClose: () => void;
}

export default function VideoModal({
  isOpen,
  videoUrl,
  title,
  onClose,
}: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Close on escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[99999] bg-[#0A0A0A]/95 backdrop-blur-md flex flex-col justify-center items-center p-4 md:p-12 select-none"
        data-cursor="hide" // Hides custom cursor for native experience in player
      >
        {/* Header container */}
        <div className="absolute top-4 left-4 right-4 md:top-8 md:left-8 md:right-8 flex items-center justify-between border-b border-white/5 pb-4 z-10">
          <h3 className="text-white text-lg md:text-xl font-serif tracking-wide">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-white hover:text-accent-gold transition-colors duration-300 rounded-full bg-white/5 hover:bg-white/10"
            aria-label="Close Player"
          >
            <X size={20} />
          </button>
        </div>

        {/* Video Wrapper */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="relative bg-black/60 shadow-2xl border border-white/10 rounded-sm overflow-hidden flex items-center justify-center max-w-[90vw] md:max-w-5xl max-h-[75vh]"
        >
          <video
            ref={videoRef}
            src={videoUrl}
            className="max-w-full max-h-[75vh] w-auto h-auto object-contain block"
            controls
            autoPlay
            playsInline
            loop
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
