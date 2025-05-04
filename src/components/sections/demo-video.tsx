"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { AutoPlayVideo } from "@/components/ui/auto-play-video";
import { useLanguage } from "@/lib/i18n/language-context";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Expand } from "lucide-react";
import { scrollToSection } from "@/lib/scroll-utils";
import { VideoModal } from "@/components/ui/video-modal";
import JsonLd from "@/components/seo/json-ld";
import { videoSchema } from "@/lib/schema";

export default function DemoVideo() {
  const { t } = useLanguage();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const controls = useAnimation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Screen size detection for mobile/desktop
  const [isMobile, setIsMobile] = useState(false);

  // Handle animation when in view
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

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

  // Handle video click based on device type
  const handleVideoClick = (e: React.MouseEvent) => {
    if (isMobile) {
      setIsModalOpen(true);
    }
    // On desktop, do nothing (or could add play/pause functionality here)
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
      className="py-20 bg-gradient-to-b from-background/80 to-background relative overflow-hidden"
      aria-labelledby="demo-title"
    >
      {/* Add Schema.org structured data */}
      <JsonLd data={videoSchema()} />
      
      {/* Background pattern for visual interest */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-30" />
      
      <div className="container px-4 mx-auto" style={{ maxWidth: "1200px" }}>
        {/* Hidden description for screen readers and SEO */}
        <div className="sr-only">
          <h2>AI Agent Demo Video</h2>
          <p>Watch our AI agent in action. This demonstration shows our intelligent AI solution that can be customized for your specific business needs and industry.</p>
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="flex flex-col items-center space-y-10"
        >
          <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto">
            <h2 id="demo-title" className="text-3xl md:text-4xl font-bold mb-4">
              {t.demoVideo.title}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t.demoVideo.subtitle}
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="w-full overflow-hidden rounded-xl shadow-2xl"
          >
            <div 
              className={`relative aspect-video bg-background/10 backdrop-blur rounded-lg overflow-hidden border border-primary/10 shadow-xl group ${isMobile ? 'cursor-pointer' : ''}`} 
              onClick={handleVideoClick}
            >
              <AutoPlayVideo
                src="/demo-vid.mp4"
                containerClassName="w-full h-full"
                className="w-full h-full object-cover"
                loop={true}
                priority={true}
              />
              
              {/* Controls Overlay */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-70 group-hover:opacity-100 transition-opacity">
                <div className="px-4 py-2 bg-background/80 backdrop-blur-sm rounded-full shadow-lg flex items-center gap-3">
                  <span className="text-xs font-medium">AI Agent Demo</span>
                </div>
              </div>
              
              {/* Expand button overlay - only show on mobile */}
              {isMobile && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors">
                  <div className="p-3 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity transform scale-90 group-hover:scale-100">
                    <Expand className="w-6 h-6 text-white" />
                  </div>
                </div>
              )}
            </div>
            
            {/* Video Modal */}
            <VideoModal 
              isOpen={isModalOpen} 
              onClose={() => setIsModalOpen(false)} 
              videoSrc="/demo-vid.mp4" 
            />
          </motion.div>

          <motion.div variants={itemVariants} className="w-full bg-background/50 backdrop-blur-sm rounded-xl shadow-lg p-8 sm:p-10 border border-primary/20 text-center">
            <p className="mb-6 sm:mb-8 text-base sm:text-lg max-w-4xl mx-auto leading-relaxed">{t.demoVideo.description}</p>
            <Button 
              size="lg" 
              className="mx-auto inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-md text-white bg-primary shadow-sm hover:bg-primary/90 transition-colors dark:text-black dark:bg-primary dark:hover:bg-primary/90" 
              asChild
            >
              <a 
                href="#book-meeting" 
                className="inline-flex items-center justify-center gap-2" 
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("book-meeting");
                }}
              >
                {t.bookMeeting.ctaButton}
                <ArrowRight className="h-4 w-4 ml-1" />
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
