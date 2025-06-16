"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { AutoPlayVideo, AutoPlayVideoRef } from "@/components/ui/auto-play-video";
import { useLanguage } from "@/lib/i18n/language-context";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Expand, Volume2, VolumeX } from "lucide-react";
import { scrollToSection } from "@/lib/scroll-utils";
import { VideoModal } from "@/components/ui/video-modal";
import JsonLd from "@/components/seo/json-ld";
import { videoSchema } from "@/lib/schema";

export default function DemoVideo() {
  const { t } = useLanguage();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const controls = useAnimation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Default to muted for autoplay compatibility
  const [currentTime, setCurrentTime] = useState(0); // Track video position
  const videoRef = useRef<AutoPlayVideoRef>(null);
  
  // Screen size detection for mobile/desktop
  const [isMobile, setIsMobile] = useState(false);

  // Handle animation when in view
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  // Handle automatic scroll to section on page load with hash
  useEffect(() => {
    // Check if there's a hash in the URL that matches this section
    const hash = window.location.hash;
    if (hash === '#demo') {
      // Small delay to ensure the page is fully loaded and rendered
      const timer = setTimeout(() => {
        scrollToSection('demo');
      }, 500); // 500ms delay should be enough for the page to fully load
      
      return () => clearTimeout(timer);
    }
  }, []); // Empty dependency array means this runs only once on component mount

  // Check if device is mobile on component mount and window resize
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkIsMobile = () => {
        setIsMobile(window.innerWidth < 768); // Consider devices with width < 768px as mobile
      };
      
      // Check on mount
      checkIsMobile();
      
      // Check on resize
      window.addEventListener('resize', checkIsMobile);
      
      // Cleanup
      return () => window.removeEventListener('resize', checkIsMobile);
    }
  }, []);

  // Handle video click - allow expansion for both mobile and desktop
  const handleVideoClick = (e: React.MouseEvent) => {
    // Get current time from main video before opening modal
    const mainVideoCurrentTime = videoRef.current?.getCurrentTime() ?? 0;
    setCurrentTime(mainVideoCurrentTime);
    
    // Pause the main video
    videoRef.current?.pause();
    
    // Open modal
    setIsModalOpen(true);
  };

  // Handle audio toggle
  const handleAudioToggle = () => {
    setIsMuted(!isMuted);
  };

  // Handle modal close - resume main video from where modal left off
  const handleModalClose = () => {
    setIsModalOpen(false);
    // Resume main video after a short delay to ensure modal is closed
    setTimeout(() => {
      if (videoRef.current && currentTime > 0) {
        videoRef.current.setCurrentTime(currentTime);
        videoRef.current.play();
      }
    }, 100);
  };

  // Handle time updates from modal video
  const handleModalTimeUpdate = (time: number) => {
    setCurrentTime(time);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section
      id="demo"
      ref={ref}
      className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-background/40 to-background/50 relative overflow-hidden"
      aria-labelledby="demo-title"
    >
      {/* Add Schema.org structured data */}
      <JsonLd data={videoSchema()} />
      
      {/* Background pattern for visual interest */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-30" />
      
      <div className="container px-2 sm:px-4 mx-auto" style={{ maxWidth: "1200px" }}>
        {/* Hidden description for screen readers and SEO */}
        <div className="sr-only">
          <h2>AI Agent Demo Video</h2>
          <p>Watch our AI agent in action. This demonstration shows our intelligent AI solution that can be customized for your specific business needs and industry.</p>
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="flex flex-col items-center space-y-8 sm:space-y-10"
        >
          <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto px-2 sm:px-0">
            <h2 id="demo-title" className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              {t.demoVideo.title}
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              {t.demoVideo.subtitle}
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="w-full overflow-hidden rounded-xl shadow-2xl"
          >
            <div 
              className={`relative aspect-video bg-background/10 backdrop-blur rounded-lg overflow-hidden border border-primary/10 shadow-xl group cursor-pointer`} 
              onClick={handleVideoClick}
            >
              <AutoPlayVideo
                ref={videoRef}
                src="/demo-vid.mp4"
                containerClassName="w-full h-full"
                className="w-full h-full object-cover"
                loop={true}
                priority={true}
                muted={isMuted}
              />
              
              {/* Controls Overlay */}
              <div className="absolute bottom-2 sm:bottom-4 left-0 right-0 flex justify-center opacity-70 group-hover:opacity-100 transition-opacity">
                <div className="px-3 sm:px-4 py-2 sm:py-3 bg-background/80 backdrop-blur-sm rounded-full shadow-lg flex items-center gap-3">
                  <span className="text-xs sm:text-sm font-medium">AI Agent Demo</span>
                </div>
              </div>
              
              {/* Audio Toggle Button - floating at top right */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAudioToggle();
                }}
                className="absolute top-2 sm:top-4 right-2 sm:right-4 p-2 sm:p-3 rounded-full bg-black/60 hover:bg-black/80 transition-all duration-200 backdrop-blur-sm border border-white/20 group-hover:opacity-100 z-10 touch-manipulation"
                aria-label={isMuted ? "Unmute video" : "Mute video"}
                style={{ minWidth: '44px', minHeight: '44px' }} // Ensures touch-friendly size
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                ) : (
                  <Volume2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                )}
              </button>

              {/* Expand button overlay - now visible for both mobile and desktop */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors">
                <div className="p-3 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity transform scale-90 group-hover:scale-100">
                  <Expand className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            
            {/* Video Modal */}
            <VideoModal 
              isOpen={isModalOpen} 
              onClose={handleModalClose}
              videoSrc="/demo-vid.mp4"
              startTime={currentTime}
              muted={isMuted}
              onTimeUpdate={handleModalTimeUpdate}
            />
          </motion.div>

          <motion.div variants={itemVariants} className="w-full bg-background/50 backdrop-blur-sm rounded-xl shadow-lg p-6 sm:p-8 md:p-10 border border-primary/20 text-center">
            <p className="mb-6 sm:mb-8 text-base sm:text-lg max-w-4xl mx-auto leading-relaxed">{t.demoVideo.description}</p>
            <div className="flex justify-center">
              <Button 
                size="mobile" 
                className="bg-primary hover:bg-primary/90 text-white dark:text-black shadow-lg hover:shadow-xl transition-all duration-300" 
                asChild
              >
                <a 
                  href="#book-meeting" 
                  className="inline-flex items-center justify-center gap-3" 
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("book-meeting");
                  }}
                  aria-label={t.bookMeeting.ctaButton}
                >
                  {t.bookMeeting.ctaButton}
                  <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
