"use client";

import React, { useState, use } from "react";
import { projects, Project } from "@/data/portfolioData";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Lightbox from "@/components/ui/Lightbox";
import VideoModal from "@/components/ui/VideoModal";
import Link from "next/link";
import { Camera, MapPin, Settings, Calendar, ArrowLeft, ArrowRight, Play, Eye } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProjectPage({ params }: ProjectPageProps) {
  // Unwrap params using React's use hook
  const { slug } = use(params);

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const project = projects[currentIndex];

  // Next Project for continuous loop navigation
  const nextProject = projects[(currentIndex + 1) % projects.length];

  // Lightbox State
  const [lightbox, setLightbox] = useState<{
    isOpen: boolean;
    images: string[];
    currentIndex: number;
  }>({
    isOpen: false,
    images: [],
    currentIndex: 0,
  });

  // Video State
  const [activeVideo, setActiveVideo] = useState<{
    url: string;
    title: string;
  } | null>(null);

  if (!project) {
    return (
      <div className="min-h-screen bg-bg-primary flex flex-col justify-center items-center text-white">
        <h1 className="text-3xl font-serif mb-4">Project Not Found</h1>
        <Link href="/" className="text-accent-gold hover:underline flex items-center gap-2">
          <ArrowLeft size={16} /> Return to Home
        </Link>
      </div>
    );
  }

  const openLightbox = (imageIndex: number) => {
    setLightbox({
      isOpen: true,
      images: project.images,
      currentIndex: imageIndex,
    });
  };

  const handleLightboxNavigate = (index: number) => {
    setLightbox((prev) => ({ ...prev, currentIndex: index }));
  };

  return (
    <div className="min-h-screen bg-bg-primary text-white flex flex-col justify-between">
      <Header />

      {/* Hero Cover */}
      <section className="relative h-[80vh] w-full flex items-end overflow-hidden bg-black select-none">
        {/* Cover Video loop if available, else Image */}
        {project.videoUrl ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-50"
            src={project.videoUrl}
          />
        ) : (
          <img
            src={project.coverImage}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover opacity-55 scale-105"
          />
        )}

        {/* Ambient Overlay Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/20 to-bg-primary/60" />

        {/* Hero text */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pb-16">
          <Link
            href="/#gallery"
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-accent-gold hover:text-white transition-colors duration-300 mb-6 font-mono w-max"
          >
            <ArrowLeft size={14} /> Back to Gallery
          </Link>
          
          <span className="text-xs uppercase tracking-[0.25em] text-accent-gold font-mono mb-2 block">
            {project.category} / {project.year}
          </span>
          <h1 className="text-4xl md:text-7xl font-serif text-white uppercase tracking-wide leading-none max-w-3xl">
            {project.title}
          </h1>
          <p className="text-sm md:text-lg text-text-muted mt-4 font-light tracking-wide max-w-xl">
            {project.subtitle}
          </p>
        </div>
      </section>

      {/* Metadata & Narrative Info Block */}
      <section className="py-20 max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 border-b border-white/5">
        {/* Description Column: Col Span 7 */}
        <div className="lg:col-span-7">
          <span className="text-[10px] uppercase tracking-widest text-accent-gold font-mono mb-3 block">
            Project Narrative
          </span>
          <p className="text-text-muted text-sm md:text-base leading-relaxed font-light">
            {project.description}
          </p>
        </div>

        {/* Camera Spec Column: Col Span 5 */}
        <div className="lg:col-span-5 bg-bg-secondary border border-white/5 p-6 rounded-sm space-y-6">
          <span className="text-[10px] uppercase tracking-widest text-accent-gold font-mono block border-b border-white/5 pb-2">
            Technical Details
          </span>
          
          <div className="grid grid-cols-2 gap-y-6 gap-x-4 text-xs md:text-sm text-text-muted">
            <div className="space-y-1">
              <span className="text-[9px] uppercase tracking-widest text-text-muted/50 font-mono block">
                Location
              </span>
              <span className="flex items-center gap-1 text-white">
                <MapPin size={12} className="text-accent-gold" />
                {project.location}
              </span>
            </div>
            
            <div className="space-y-1">
              <span className="text-[9px] uppercase tracking-widest text-text-muted/50 font-mono block">
                Camera Body
              </span>
              <span className="flex items-center gap-1 text-white">
                <Camera size={12} className="text-accent-gold" />
                {project.camera}
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[9px] uppercase tracking-widest text-text-muted/50 font-mono block">
                Optical Glass
              </span>
              <span className="text-white block truncate">
                {project.lens}
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[9px] uppercase tracking-widest text-text-muted/50 font-mono block">
                Settings Configuration
              </span>
              <span className="flex items-center gap-1 text-white">
                <Settings size={12} className="text-accent-gold" />
                {project.settings.aperture} • {project.settings.shutter} • ISO {project.settings.iso}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Multi-grid Gallery */}
      <section className="py-20 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <span className="text-[10px] uppercase tracking-widest text-accent-gold font-mono mb-8 block">
          Editorial Gallery
        </span>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {project.images.map((image, index) => {
            // Editorial layout sizes
            const isFullWidth = index === 0 || index === project.images.length - 1;
            const sizeClass = isFullWidth ? "md:col-span-2 aspect-[16/9]" : "aspect-[3/4] md:aspect-square";
            
            return (
              <div
                key={index}
                onClick={() => openLightbox(index)}
                className={`group relative rounded-sm overflow-hidden border border-white/5 bg-bg-secondary ${sizeClass} cursor-none`}
                data-cursor="view"
              >
                <img
                  src={image}
                  alt={`${project.title} detail ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-103"
                  loading="lazy"
                />
                
                {/* Overlay hover */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                
                {/* Float button */}
                <div className="absolute top-4 right-4 p-2.5 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Eye size={16} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Video Content Block (If available) */}
      {project.videos && project.videos.length > 0 && (
        <section className="py-20 bg-bg-secondary border-t border-b border-white/5 w-full">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <span className="text-[10px] uppercase tracking-widest text-accent-gold font-mono mb-8 block">
              Cinematic Film Clips
            </span>
            
            <div className="columns-1 md:columns-2 gap-10">
              {project.videos.map((vid, index) => {
                const isPortrait = vid.aspectRatio === 'portrait';
                return (
                  <div
                    key={index}
                    onClick={() => setActiveVideo({ url: vid.url, title: vid.title })}
                    className={`group relative bg-[#0A0A0A] border border-white/5 rounded-sm overflow-hidden cursor-none break-inside-avoid mb-10 ${
                      isPortrait ? 'aspect-[9/16]' : 'aspect-video'
                    }`}
                    data-cursor="play"
                  >
                    <img
                      src={vid.thumbnail}
                      alt={vid.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-103 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                    
                    <div className="absolute bottom-0 left-0 w-full p-6 flex items-end justify-between z-10">
                      <div>
                        <h4 className="text-lg font-serif text-white group-hover:text-accent-gold transition-colors duration-300">
                          {vid.title}
                        </h4>
                        <span className="text-xs text-text-muted">
                          {vid.duration} • {vid.resolution}
                        </span>
                      </div>

                      <div className="p-3 bg-accent-gold text-bg-primary rounded-full">
                        <Play size={16} fill="currentColor" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Next Project Footer Anchor Banner */}
      <section className="relative h-[45vh] w-full flex items-center justify-center overflow-hidden bg-black select-none border-t border-white/5">
        <img
          src={nextProject.coverImage}
          alt={nextProject.title}
          className="absolute inset-0 w-full h-full object-cover opacity-30 scale-105"
        />
        <div className="absolute inset-0 bg-bg-primary/80" />
        
        <div className="relative z-10 text-center max-w-xl px-6 flex flex-col items-center">
          <span className="text-[10px] uppercase tracking-[0.3em] text-accent-gold font-mono mb-2 block">
            Continue Journey
          </span>
          <Link href={`/project/${nextProject.slug}`} className="group block">
            <h2 className="text-3xl md:text-5xl font-serif text-white group-hover:text-accent-gold transition-colors duration-500 uppercase tracking-widest leading-none mb-6">
              Next Project
            </h2>
            <p className="text-text-muted text-xs uppercase tracking-widest flex items-center justify-center gap-1.5 hover:text-white transition-colors">
              Explore {nextProject.title} <ArrowRight size={14} />
            </p>
          </Link>
        </div>
      </section>

      <Footer />

      {/* Lightbox Module */}
      <Lightbox
        isOpen={lightbox.isOpen}
        images={lightbox.images}
        currentIndex={lightbox.currentIndex}
        onClose={() => setLightbox((prev) => ({ ...prev, isOpen: false }))}
        onNavigate={handleLightboxNavigate}
        title={project.title}
        location={project.location}
        camera={project.camera}
        lens={project.lens}
        settings={project.settings}
      />

      {/* Video Modal Player */}
      {activeVideo && (
        <VideoModal
          isOpen={!!activeVideo}
          videoUrl={activeVideo.url}
          title={activeVideo.title}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </div>
  );
}
