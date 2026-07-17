"use client";

import { useState, useRef, useMemo } from "react";
import { allVideos, VideoItem } from "@/data/portfolioData";
import { Play, Clock, Monitor } from "lucide-react";
import VideoModal from "../ui/VideoModal";
import Link from "next/link";

export default function Videos() {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  
  // Store refs of video elements to control playback on hover
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  const homepageVideos = useMemo(() => {
    return allVideos.slice(0, 8);
  }, []);

  const handleMouseEnter = (id: string) => {
    const video = videoRefs.current[id];
    if (video) {
      video.play().catch((err) => {
        // Autoplay policy blocker catches
        console.log("Autoplay blocker: ", err);
      });
    }
  };

  const handleMouseLeave = (id: string) => {
    const video = videoRefs.current[id];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  return (
    <section id="videos" className="py-24 bg-bg-secondary relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-accent-gold font-mono mb-2 block">
            Cinematic Reels
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-text-light">
            Video Showcase
          </h2>
        </div>

        {/* Video Grid */}
        <div className="columns-1 md:columns-2 gap-10">
          {homepageVideos.map((video, idx) => {
            const videoId = `video-${idx}`;
            const isPortrait = video.aspectRatio === 'portrait';
            return (
              <div
                key={videoId}
                onMouseEnter={() => handleMouseEnter(videoId)}
                onMouseLeave={() => handleMouseLeave(videoId)}
                onClick={() => setActiveVideo(video)}
                className={`group relative bg-[#0A0A0A] border border-white/5 rounded-sm overflow-hidden cursor-none break-inside-avoid mb-10 ${
                  isPortrait ? 'aspect-[9/16]' : 'aspect-video'
                }`}
                data-cursor="play"
              >
                {/* Autoplay Preview Video */}
                <video
                  ref={(el) => {
                    videoRefs.current[videoId] = el;
                  }}
                  src={video.url}
                  className="absolute inset-0 w-full h-full object-cover opacity-60 transition-opacity duration-500 group-hover:opacity-90"
                  muted
                  loop
                  playsInline
                />

                {/* Ambient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                {/* Details overlays */}
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-black/70 backdrop-blur-md rounded-full border border-white/10 text-[10px] tracking-widest text-white/80 font-mono uppercase">
                    {video.category}
                  </span>
                </div>

                {/* Static Cover Thumbnail when not playing */}
                <div className="absolute bottom-0 left-0 w-full p-6 flex items-end justify-between z-10">
                  <div className="space-y-1.5 max-w-[80%]">
                    <span className="text-[10px] uppercase tracking-widest text-accent-gold font-mono block">
                      {video.category}
                    </span>
                    <h3 className="text-lg md:text-xl font-serif text-white group-hover:text-accent-gold transition-colors duration-300 truncate">
                      {video.title}
                    </h3>
                    
                    <div className="flex items-center gap-4 text-[10px] text-text-muted font-mono">
                      <span className="flex items-center gap-1">
                        <Clock size={10} className="text-accent-gold" />
                        {video.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Monitor size={10} className="text-accent-gold" />
                        {video.resolution}
                      </span>
                      <span className="hidden sm:inline-block text-white/40">
                        {video.url.includes("S24") || (idx % 2 === 0) ? "S24 Ultra" : "S21 FE"}
                      </span>
                    </div>
                  </div>

                  {/* Play Button Indicator */}
                  <div className="p-3 bg-accent-gold text-bg-primary rounded-full scale-90 group-hover:scale-100 group-hover:bg-white transition-all duration-300 shadow-lg shrink-0">
                    <Play size={14} fill="currentColor" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Videos Button */}
        <div className="flex justify-center mt-16">
          <Link
            href="/videos"
            className="px-8 py-3 border border-white/15 hover:border-accent-gold rounded-full text-xs uppercase tracking-widest text-white hover:text-accent-gold transition-all duration-300 flex items-center gap-2 group hover:shadow-[0_0_15px_rgba(212,175,55,0.1)] cursor-none"
            data-cursor="grow"
          >
            View All Videos ({allVideos.length} Videos)
          </Link>
        </div>
      </div>

      {/* Video Fullscreen Player Modal */}
      {activeVideo && (
        <VideoModal
          isOpen={!!activeVideo}
          videoUrl={activeVideo.url}
          title={activeVideo.title}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </section>
  );
}
