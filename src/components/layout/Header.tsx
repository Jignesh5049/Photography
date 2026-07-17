"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Gallery", href: "/gallery" },
  { label: "Videos", href: "/videos" },
  { label: "About", href: "/about" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const pathname = usePathname();
  const router = useRouter();

  // Scroll detection for transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync theme status
  useEffect(() => {
    if (document.documentElement.classList.contains("light-mode")) {
      setTheme("light");
    }
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, link: NavLink) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    router.push(link.href);
  };

  const isLinkActive = (link: NavLink) => {
    return pathname === link.href;
  };

  // Concentric water-ripple theme toggle wave effect
  const toggleThemeWithRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    
    // Mouse coords
    const x = e.clientX;
    const y = e.clientY;

    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.top = "0";
    container.style.left = "0";
    container.style.width = "100vw";
    container.style.height = "100vh";
    container.style.pointerEvents = "none";
    container.style.zIndex = "99999";
    container.style.overflow = "hidden";
    document.body.appendChild(container);

    const targetBg = nextTheme === "light" ? "#F9F9FB" : "#0A0A0A";
    const maxRadius = Math.max(x, window.innerWidth - x) + Math.max(y, window.innerHeight - y) + 200;

    const circle = document.createElement("div");
    circle.style.position = "absolute";
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
    circle.style.width = "10px";
    circle.style.height = "10px";
    circle.style.borderRadius = "50%";
    circle.style.transform = "translate(-50%, -50%) scale(0)";
    circle.style.transition = "transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)";
    circle.style.pointerEvents = "none";
    circle.style.backgroundColor = targetBg;
    circle.style.opacity = "1";

    container.appendChild(circle);

    // Expanding sequence
    setTimeout(() => {
      const scaleVal = maxRadius / 5;
      circle.style.transform = `translate(-50%, -50%) scale(${scaleVal})`;
    }, 50);

    // Swapping document themes half-way
    setTimeout(() => {
      if (nextTheme === "light") {
        document.documentElement.classList.add("light-mode");
      } else {
        document.documentElement.classList.remove("light-mode");
      }
      setTheme(nextTheme);
    }, 400);

    // Fade out overlay container earlier
    setTimeout(() => {
      container.style.transition = "opacity 0.25s ease";
      container.style.opacity = "0";
      setTimeout(() => {
        if (container.parentNode) {
          document.body.removeChild(container);
        }
      }, 250);
    }, 550);
  };

  return (
    <>
      <header
        className={`fixed z-[999] transition-all duration-500 ease-in-out left-1/2 -translate-x-1/2 flex items-center justify-between bg-[#0A0A0A]/85 backdrop-blur-md ${
          isScrolled 
            ? "w-[90%] max-w-3xl top-4 py-2.5 px-6 rounded-full border border-white/10 shadow-2xl" 
            : "w-full max-w-full top-0 py-6 px-6 md:px-12 rounded-none border-transparent bg-transparent backdrop-blur-none"
        }`}
      >
        <div className="w-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <img 
              src="/logo.png" 
              alt="JP Logo" 
              className="h-8 w-8 object-contain invert transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = isLinkActive(link);
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link)}
                  className="relative text-xs uppercase tracking-widest text-text-muted hover:text-text-light transition-colors duration-300 py-2 group flex items-center gap-1.5"
                >
                  <AnimatePresence>
                    {active && (
                      <motion.span 
                        layoutId="activeDot"
                        className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] shadow-[0_0_8px_rgba(74,222,128,0.6)]"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </AnimatePresence>
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Desktop Actions Block: Theme Toggle */}
          <div className="hidden md:flex items-center gap-4 relative">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleThemeWithRipple}
              className="p-2 text-text-muted hover:text-accent-gold transition-colors duration-300 rounded-full border border-white/10 bg-transparent hover:bg-white/5 flex items-center justify-center cursor-none"
              data-cursor="grow"
              title="Toggle Theme Mode"
              aria-label="Toggle Theme Mode"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white hover:text-accent-gold transition-colors duration-300 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-[998] bg-[#0A0A0A]/98 backdrop-blur-lg flex flex-col justify-center items-center transition-all duration-500 ease-in-out md:hidden ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center gap-8">
          {navLinks.map((link, idx) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link)}
              className="text-2xl font-serif text-white hover:text-accent-gold transition-colors duration-300 py-2 block tracking-wider"
              style={{
                transitionDelay: `${idx * 75}ms`,
                transform: mobileMenuOpen ? "translateY(0)" : "translateY(20px)",
                opacity: mobileMenuOpen ? 1 : 0,
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
