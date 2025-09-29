'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import YouTubeVideo from './YouTubeVideo';
import { useLanguage } from '@/contexts/LanguageContext';

const VideoBackground = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [useYouTube, setUseYouTube] = useState(true); // Restaurado a true para usar YouTube
  const [youtubeUrl, setYoutubeUrl] = useState('https://www.youtube.com/watch?v=05SfPsxR1SY');
  const videoRef = useRef<HTMLVideoElement>(null);
  const { t } = useLanguage();

  const videoSources = [
    {
      src: "/videos/hero-video.mp4",
      type: "video/mp4",
      label: t('video.localVideo')
    },
    {
      src: "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=165&oauth2_token_id=57447761",
      type: "video/mp4",
      label: t('video.professionalVideo')
    },
    {
      src: "https://drive.google.com/uc?id=188GYOWXfcdok2Xwh_U2TIoaJ6il2S1o0",
      type: "video/mp4", 
      label: t('video.googleDriveVideo')
    }
  ];

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoError = () => {
    console.log('Video failed to load, using fallback image');
    setVideoError(true);
  };

  const handleVideoLoad = () => {
    console.log('Video loaded successfully');
    setVideoError(false);
  };

  return (
    <div className="relative w-full h-full">
      {/* YouTube Video o Video Normal */}
      {useYouTube && youtubeUrl ? (
        <YouTubeVideo 
          videoUrl={youtubeUrl} 
          className="w-full h-full"
        />
      ) : (
        !videoError ? (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            muted={isMuted}
            loop
            playsInline
            poster="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            onError={handleVideoError}
            onLoadedData={handleVideoLoad}
            onCanPlay={handleVideoLoad}
          >
            {videoSources.map((source, index) => (
              <source key={index} src={source.src} type={source.type} />
            ))}
          </video>
        ) : (
          /* Fallback image cuando el video falla */
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')"
            }}
          />
        )
      )}

      {/* Video Status Indicator */}
      {videoError && (
        <div className="absolute top-4 left-4 bg-red-500/90 text-white px-3 py-1 rounded-full text-sm">
          Video no disponible - usando imagen de respaldo
        </div>
      )}

      {/* Video Controls */}
      <div className="absolute top-6 right-6 z-20 flex space-x-2">
        <button
          onClick={toggleMute}
          className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300"
        >
          {isMuted ? <VolumeX size={20} className="text-white" /> : <Volume2 size={20} className="text-white" />}
        </button>
      </div>


      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/30"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
    </div>
  );
};

export default VideoBackground;
