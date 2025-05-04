"use client";

import React, { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
}

export function VideoModal({ isOpen, onClose, videoSrc }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // When modal opens, play the video
  useEffect(() => {
    if (isOpen && videoRef.current) {
      // Slight delay to ensure modal transition completes
      const timer = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play().then(() => {
            setIsPlaying(true);
          }).catch(error => {
            console.error("Error playing video:", error);
          });
        }
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // When modal closes, reset video
  useEffect(() => {
    if (!isOpen && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  }, [isOpen]);

  // Handle fullscreen toggle
  const toggleFullScreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(err => {
          console.error("Error exiting fullscreen:", err);
        });
      } else {
        videoRef.current.requestFullscreen().catch(err => {
          console.error("Error requesting fullscreen:", err);
        });
      }
    }
  };

  // Set up key handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen) {
        // Escape key (redundant but good to have)
        if (e.key === "Escape") {
          onClose();
        }
        // Space bar to play/pause
        if (e.key === " " && videoRef.current) {
          e.preventDefault();
          if (videoRef.current.paused) {
            videoRef.current.play().then(() => setIsPlaying(true));
          } else {
            videoRef.current.pause();
            setIsPlaying(false);
          }
        }
        // F key for fullscreen
        if (e.key === "f" || e.key === "F") {
          toggleFullScreen();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Handle play/pause toggle
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().then(() => setIsPlaying(true));
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[90vw] max-h-[90vh] p-0 overflow-hidden bg-black border-none">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        
        {/* Video container */}
        <div className="relative w-full h-full max-h-[80vh] aspect-video flex items-center justify-center">
          <video
            ref={videoRef}
            className="w-full h-auto max-h-[80vh] object-contain"
            src={videoSrc}
            muted
            playsInline
            onClick={togglePlayPause}
            controlsList="nodownload"
            onDoubleClick={toggleFullScreen}
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Video controls */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent flex justify-between items-center opacity-0 hover:opacity-100 transition-opacity">
            <button 
              onClick={togglePlayPause}
              className="text-white p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              )}
            </button>
            
            <button 
              onClick={toggleFullScreen}
              className="text-white p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
              aria-label="Fullscreen"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>
            </button>
          </div>
          
          {/* Play overlay when paused */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer" onClick={togglePlayPause}>
              <div className="rounded-full bg-white/20 p-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
