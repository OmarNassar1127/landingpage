'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface PageTransitionProps {
  children: React.ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    // Simulate page load
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Prevent hydration mismatch
  if (!isMounted) {
    return <div className="min-h-screen bg-white">{children}</div>
  }

  return (
    <>
      {/* Loading Screen */}
      <motion.div
        className="fixed inset-0 z-50 bg-white flex items-center justify-center"
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoading ? 1 : 0 }}
        transition={{ duration: 0.5, delay: isLoading ? 0 : 0.3 }}
        style={{ pointerEvents: isLoading ? 'auto' : 'none' }}
      >
        <div className="text-center">
          {/* Logo Animation */}
          <motion.div
            className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6 mx-auto"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <motion.div
              className="w-6 h-6 bg-white rounded-full"
              animate={{
                scale: [1, 0.8, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            />
          </motion.div>

          {/* Loading Text */}
          <motion.h2
            className="text-2xl font-sans font-semibold text-slate-900 mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Virelio
          </motion.h2>
          
          <motion.p
            className="text-gray-600"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Loading your voice AI experience...
          </motion.p>

          {/* Progress Dots */}
          <div className="flex gap-2 justify-center mt-6">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-blue-600 rounded-full"
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Page Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: isLoading ? 0 : 1,
          y: isLoading ? 20 : 0 
        }}
        transition={{ 
          duration: 0.8,
          delay: isLoading ? 0 : 0.5,
          ease: "easeOut"
        }}
      >
        {children}
      </motion.div>
    </>
  )
}