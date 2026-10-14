import React, { useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';

export const FullPageVideoBackground: React.FC = () => {
  const { config } = useApp();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.log('Video continuous background autoplay:', err);
        });
      }
    }
  }, [config.heroVideoUrl]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 w-full h-full -z-50 overflow-hidden pointer-events-none select-none bg-neutral-950"
    >
      {/* High-Resolution Continuous Video Stream (Full Page Background, No Pause, No Music) */}
      <video
        ref={videoRef}
        key={config.heroVideoUrl}
        src={config.heroVideoUrl}
        poster={config.heroVideoPoster}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover scale-105 filter brightness-90 contrast-105 transition-opacity duration-700"
      />

      {/* Dynamic Darkness Scrim Overlay (Controlled via Admin, default subtle 35%) */}
      <div
        className="absolute inset-0 bg-neutral-950 transition-opacity duration-300"
        style={{
          opacity: (config.videoOverlayDarkness !== undefined ? config.videoOverlayDarkness : 35) / 100,
        }}
      />

      {/* Subtle Vignette for Optimal Text Legibility Across All Sections */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/60 via-transparent to-neutral-950/70" />
    </div>
  );
};
