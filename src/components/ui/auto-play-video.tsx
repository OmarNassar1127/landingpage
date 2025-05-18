"use client";

import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from "react";

export interface AutoPlayVideoRef {
  getCurrentTime: () => number;
  setCurrentTime: (time: number) => void;
  pause: () => void;
  play: () => Promise<void>;
  getVideoElement: () => HTMLVideoElement | null;
}

interface AutoPlayVideoProps {
  src: string;
  className?: string;
  containerClassName?: string;
  loop?: boolean;
  priority?: boolean;
  placeholder?: string;
  muted?: boolean;
  onMutedChange?: (muted: boolean) => void;
}

export const AutoPlayVideo = forwardRef<AutoPlayVideoRef, AutoPlayVideoProps>(({
  src,
  className = "",
  containerClassName = "",
  loop = true,
  priority = false,
  placeholder = "",
  muted = true,
  onMutedChange,
}, ref) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Expose methods via ref
  useImperativeHandle(ref, () => ({
    getCurrentTime: () => videoRef.current?.currentTime ?? 0,
    setCurrentTime: (time: number) => {
      if (videoRef.current) {
        videoRef.current.currentTime = time;
      }
    },
    pause: () => {
      videoRef.current?.pause();
    },
    play: () => videoRef.current?.play() ?? Promise.resolve(),
    getVideoElement: () => videoRef.current,
  }), []);

  useEffect(() => {
    const videoElement = videoRef.current;
    
    if (!videoElement) return;

    // Function to play video
    const playVideo = async () => {
      try {
        // Set muted state as passed from props
        videoElement.muted = muted;
        // Set playback rate to normal
        videoElement.playbackRate = 1.0;
        
        // Attempt to play the video
        await videoElement.play();
        setHasPlayedOnce(true);
      } catch (error) {
        console.error("Error playing video:", error);
      }
    };

    // Observe video loading state
    const handleLoaded = () => {
      setIsLoaded(true);
      if (isVisible || priority) {
        playVideo();
      }
    };

    // Check if video is already loaded
    if (videoElement.readyState >= 3) {
      setIsLoaded(true);
      if (isVisible || priority) {
        playVideo();
      }
    } else {
      videoElement.addEventListener("loadeddata", handleLoaded);
    }

    // Setup Intersection Observer to only play when in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
        
        if (entry.isIntersecting && isLoaded && !hasPlayedOnce) {
          playVideo();
        } else if (!entry.isIntersecting && videoElement) {
          // Optionally pause video when not in view to save resources
          // videoElement.pause();
        }
      },
      { threshold: 0.1 }
    );
    
    observer.observe(videoElement);

    // Clean up
    return () => {
      if (videoElement) {
        videoElement.removeEventListener("loadeddata", handleLoaded);
        observer.unobserve(videoElement);
      }
    };
  }, [isLoaded, isVisible, priority, hasPlayedOnce, muted]);

  // Effect to handle muted state changes
  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.muted = muted;
    }
  }, [muted]);

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {/* Loading spinner or placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-background">
          {placeholder ? (
            <div 
              className="w-full h-full bg-cover bg-center" 
              style={{ backgroundImage: `url(${placeholder})` }}
            />
          ) : (
            <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          )}
        </div>
      )}
      
      {/* Video element with optimizations */}
      <video
        ref={videoRef}
        className={`w-full h-full object-cover ${className} ${isLoaded ? "opacity-100" : "opacity-0"}`}
        playsInline
        autoPlay={priority} // Only set autoPlay if priority is true
        muted={muted}
        loop={loop}
        preload={priority ? "auto" : "metadata"} // Use metadata for non-priority videos
        poster={placeholder} // Use placeholder as poster if provided
        controls={false}
        disablePictureInPicture
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Invisible play button for iOS */}
      <button 
        className="absolute inset-0 w-full h-full opacity-0" 
        aria-label="Play video"
        onClick={() => videoRef.current?.play()}
      />
    </div>
  );
});

AutoPlayVideo.displayName = "AutoPlayVideo";
