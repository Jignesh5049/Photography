"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [hoverType, setHoverType] = useState<"default" | "grow" | "view" | "play" | "hidden">("default");
  const [isVisible, setIsVisible] = useState(false);

  // Motion values for instant coordinates (inner dot)
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  // Spring values for lagging coordinates (outer ring)
  const ringX = useSpring(dotX, { damping: 30, stiffness: 250, mass: 0.5 });
  const ringY = useSpring(dotY, { damping: 30, stiffness: 250, mass: 0.5 });

  useEffect(() => {
    // Check if device supports hover (exclude touch devices)
    const hasHover = window.matchMedia("(hover: hover)").matches;
    if (!hasHover) return;

    setIsVisible(true);
    document.body.classList.add("custom-cursor-active");

    const moveCursor = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Find closest interactive element or elements with custom cursor tags
      const interactiveEl = target.closest("a, button, [role='button'], input, textarea");
      const cursorViewEl = target.closest("[data-cursor='view']");
      const cursorPlayEl = target.closest("[data-cursor='play']");
      const cursorHideEl = target.closest("[data-cursor='hide']");

      if (cursorHideEl) {
        setHoverType("hidden");
      } else if (cursorPlayEl) {
        setHoverType("play");
      } else if (cursorViewEl) {
        setHoverType("view");
      } else if (interactiveEl) {
        setHoverType("grow");
      } else {
        setHoverType("default");
      }
    };

    const handleMouseLeaveDoc = () => {
      setIsVisible(false);
    };

    const handleMouseEnterDoc = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeaveDoc);
    document.addEventListener("mouseenter", handleMouseEnterDoc);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeaveDoc);
      document.removeEventListener("mouseenter", handleMouseEnterDoc);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [dotX, dotY]);

  if (!isVisible || hoverType === "hidden") return null;

  // Custom styling attributes for outer ring based on state
  const ringVariants = {
    default: {
      width: 40,
      height: 40,
      border: "1px solid rgba(255, 255, 255, 0.3)",
      backgroundColor: "rgba(255, 255, 255, 0.0)",
    },
    grow: {
      width: 60,
      height: 60,
      border: "1px solid #D4AF37",
      backgroundColor: "rgba(212, 175, 55, 0.05)",
      boxShadow: "0 0 15px rgba(212, 175, 55, 0.2)",
    },
    view: {
      width: 80,
      height: 80,
      border: "1px solid #D4AF37",
      backgroundColor: "#D4AF37",
    },
    play: {
      width: 80,
      height: 80,
      border: "1px solid #D4AF37",
      backgroundColor: "#D4AF37",
    },
  };

  return (
    <>
      {/* Outer Spring Ring */}
      <motion.div
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none z-[9999] hidden lg:flex items-center justify-center overflow-hidden"
        style={{ x: ringX, y: ringY }}
        animate={hoverType}
        variants={ringVariants}
        transition={{ type: "tween", ease: "backOut", duration: 0.3 }}
      >
        {hoverType === "view" && (
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#0A0A0A]">
            View
          </span>
        )}
        {hoverType === "play" && (
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#0A0A0A]">
            Play
          </span>
        )}
      </motion.div>

      {/* Inner Dot */}
      <motion.div
        className="fixed w-2 h-2 bg-[#D4AF37] rounded-full top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[10000] hidden lg:block"
        style={{ x: dotX, y: dotY }}
        animate={{
          scale: hoverType === "grow" || hoverType === "view" || hoverType === "play" ? 0.5 : 1,
        }}
        transition={{ type: "tween", duration: 0.2 }}
      />
    </>
  );
}
