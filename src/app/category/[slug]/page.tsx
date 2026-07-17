"use client";

import React, { useState, useEffect, use } from "react";
import { categories, projects, Project } from "@/data/portfolioData";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Lightbox from "@/components/ui/Lightbox";
import Link from "next/link";
import { Camera, MapPin, Eye, ArrowLeft } from "lucide-react";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  // Unwrap params using React's use hook
  const { slug } = use(params);

  const category = categories.find((c) => c.slug === slug);
  const categoryProjects = projects.filter((p) => p.category === slug);

  // Lightbox State
  const [lightbox, setLightbox] = useState<{
    isOpen: boolean;
    images: string[];
    currentIndex: number;
    project?: Project;
  }>({
    isOpen: false,
    images: [],
    currentIndex: 0,
  });

  const openLightbox = (project: Project, imageIndex: number) => {
    setLightbox({
      isOpen: true,
      images: project.images,
      currentIndex: imageIndex,
      project: project,
    });
  };

  const handleLightboxNavigate = (index: number) => {
    setLightbox((prev) => ({ ...prev, currentIndex: index }));
  };

  if (!category) {
    return (
      <div className="min-h-screen bg-bg-primary flex flex-col justify-center items-center text-white">
        <h1 className="text-3xl font-serif mb-4">Category Not Found</h1>
        <Link href="/" className="text-accent-gold hover:underline flex items-center gap-2">
          <ArrowLeft size={16} /> Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary text-white flex flex-col justify-between">
      <Header />

      {/* Category Header Hero */}
      <section className="relative h-[55vh] flex items-center justify-center overflow-hidden bg-black">
        <img
          src={category.coverImage}
          alt={category.name}
          className="absolute inset-0 w-full h-full object-cover opacity-45 scale-105"
        />
        {/* Editorial vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/30 to-bg-primary/60" />

        <div className="relative z-10 text-center max-w-2xl px-6 pt-16 flex flex-col items-center">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-accent-gold hover:text-white transition-colors duration-300 mb-6 font-mono"
          >
            <ArrowLeft size={14} /> Back to Portfolio
          </Link>
          
          <span className="text-[10px] tracking-[0.25em] text-accent-gold uppercase font-mono mb-2">
            Collection View
          </span>
          <h1 className="text-4xl md:text-6xl font-serif text-white uppercase tracking-wider mb-4 leading-none">
            {category.name}
          </h1>
          <p className="text-sm text-text-muted leading-relaxed max-w-lg font-light">
            {category.description}
          </p>
        </div>
      </section>

      {/* Projects Grid Container */}
      <section className="py-20 max-w-7xl mx-auto px-6 md:px-12 w-full">
        {categoryProjects.length === 0 ? (
          <div className="text-center py-16 text-text-muted">
            <p className="text-sm font-mono">No projects found in this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryProjects.map((project, index) => {
              // Alternate heights for masonry design
              const heightClass =
                index % 3 === 0
                  ? "h-[450px]"
                  : index % 3 === 1
                  ? "h-[320px]"
                  : "h-[380px]";

              return (
                <div
                  key={project.slug}
                  className={`group relative rounded-sm overflow-hidden border border-white/5 bg-bg-secondary ${heightClass} cursor-none`}
                  data-cursor="view"
                >
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/10 opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                  {/* Actions */}
                  <div className="absolute top-4 right-4 flex gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <button
                      onClick={() => openLightbox(project, 0)}
                      className="p-2.5 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-white hover:text-accent-gold transition-colors"
                      title="Open Lightbox"
                    >
                      <Eye size={16} />
                    </button>
                    <Link
                      href={`/project/${project.slug}`}
                      className="p-2.5 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-white hover:text-accent-gold transition-colors"
                      title="View Details"
                    >
                      <span className="font-mono text-xs font-bold leading-none">→</span>
                    </Link>
                  </div>

                  {/* Meta Details */}
                  <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end">
                    <h3 className="text-xl md:text-2xl font-serif text-white mb-2 leading-tight">
                      {project.title}
                    </h3>
                    
                    <div className="max-h-0 opacity-0 group-hover:max-h-20 group-hover:opacity-100 overflow-hidden transition-all duration-500 ease-out space-y-2">
                      <div className="flex items-center gap-3 text-xs text-text-muted">
                        <span className="flex items-center gap-1">
                          <MapPin size={12} className="text-accent-gold" />
                          {project.location}
                        </span>
                        <span className="border-l border-white/10 pl-3">
                          {project.year}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-text-muted/70">
                        <Camera size={12} className="text-accent-gold" />
                        <span>{project.camera} • {project.lens.split(" ")[1]}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <Footer />

      {/* Lightbox Module */}
      <Lightbox
        isOpen={lightbox.isOpen}
        images={lightbox.images}
        currentIndex={lightbox.currentIndex}
        onClose={() => setLightbox((prev) => ({ ...prev, isOpen: false }))}
        onNavigate={handleLightboxNavigate}
        title={lightbox.project?.title}
        location={lightbox.project?.location}
        camera={lightbox.project?.camera}
        lens={lightbox.project?.lens}
        settings={lightbox.project?.settings}
      />
    </div>
  );
}
