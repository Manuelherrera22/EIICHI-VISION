'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface YouTubeVideoProps {
  videoId?: string;
  videoUrl?: string;
  className?: string;
}

const YouTubeVideo: React.FC<YouTubeVideoProps> = ({ 
  videoId, 
  videoUrl, 
  className = '' 
}) => {
  const [isMuted, setIsMuted] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Extraer video ID de URL de YouTube
  const extractVideoId = (url: string): string => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : '';
  };

  const getVideoId = (): string => {
    if (videoId) return videoId;
    if (videoUrl) return extractVideoId(videoUrl);
    return '';
  };

  const currentVideoId = getVideoId();

  // URL directa del video de YouTube (sin player)
  const getDirectVideoUrl = (id: string): string => {
    return `https://www.youtube.com/watch?v=${id}`;
  };

  // URL para embed (iframe) - Simplificada para mejor estabilidad
  const getEmbedUrl = (id: string): string => {
    return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&showinfo=0&rel=0&modestbranding=1&fs=0&cc_load_policy=0&iv_load_policy=3`;
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  if (!currentVideoId) {
    return (
      <div className={`relative bg-black rounded-2xl overflow-hidden ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
          <div className="text-center text-white">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" className="mx-auto mb-4 opacity-50">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            <p className="text-lg font-semibold mb-2">Video de YouTube</p>
            <p className="text-sm opacity-75">Proporciona un enlace de YouTube para mostrar el video</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* YouTube Video Container - Optimizado para HD */}
      <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-black">
        {!hasError ? (
          <iframe
            src={getEmbedUrl(currentVideoId)}
            className="w-full h-full object-cover"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Gunma Heritage Video"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center'
            }}
            onError={() => setHasError(true)}
            onLoad={() => console.log('YouTube video loaded successfully')}
            loading="lazy"
          />
        ) : (
          /* Fallback cuando el iframe falla */
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')"
            }}
          />
        )}
        
        {/* Overlay Cinematográfico Mejorado */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/20 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/10 pointer-events-none"></div>
        
        {/* Efecto de Vignette */}
        <div className="absolute inset-0 rounded-2xl shadow-inner pointer-events-none" 
             style={{
               boxShadow: 'inset 0 0 100px rgba(0,0,0,0.3), inset 0 0 200px rgba(0,0,0,0.1)'
             }}>
        </div>
      </div>

      {/* Controles Minimalistas */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={toggleMute}
          className="group p-4 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/30"
        >
          {isMuted ? <VolumeX size={22} className="text-white group-hover:scale-110 transition-transform duration-200" /> : <Volume2 size={22} className="text-white group-hover:scale-110 transition-transform duration-200" />}
        </button>
      </div>


    </div>
  );
};

export default YouTubeVideo;
