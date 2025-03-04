"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ChevronDown, Play, X, Award, Film, Clock, Users, Video, Clapperboard, Star, Sparkles } from "lucide-react"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function HeroSection() {
  const [isShowreelPlaying, setIsShowreelPlaying] = useState(false)
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [autoplayBlocked, setAutoplayBlocked] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const showreelRef = useRef<HTMLVideoElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  // Check for reduced motion preference and mobile devices
  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setIsReducedMotion(mediaQuery.matches)

    const handleReducedMotionChange = () => {
      setIsReducedMotion(mediaQuery.matches)
    }

    mediaQuery.addEventListener("change", handleReducedMotionChange)

    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      mediaQuery.removeEventListener("change", handleReducedMotionChange)
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Initialize videos with performance optimizations
  useEffect(() => {
    // Initialize background video with performance optimizations
    if (videoRef.current) {
      videoRef.current.muted = true
      videoRef.current.playsInline = true

      // Lower quality for mobile
      if (isMobile) {
        videoRef.current.setAttribute("playbackQuality", "low")
      }

      const playPromise = videoRef.current.play()

      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("Video play failed:", error)
        })
      }
    }

    // Lazy load the showreel video
    if (showreelRef.current) {
      showreelRef.current.preload = isMobile ? "none" : "metadata"
    }
  }, [isMobile])

  // Text animations with performance considerations
  useEffect(() => {
    // Skip complex animations for reduced motion or mobile
    if (isReducedMotion || isMobile) {
      if (titleRef.current) titleRef.current.style.opacity = "1"
      if (subtitleRef.current) subtitleRef.current.style.opacity = "1"
      return
    }

    // Title animation with GSAP (without SplitText)
    if (typeof window !== "undefined" && titleRef.current && subtitleRef.current) {
      const tl = gsap.timeline({ delay: 0.5 })

      // Create a simpler animation for the title
      if (titleRef.current) {
        // Clear any existing content
        const originalText = titleRef.current.textContent || ""
        titleRef.current.innerHTML = ""

        // Create spans for each character but limit for performance
        const chars = originalText.split("")
        const batchSize = 3 // Group characters for better performance

        for (let i = 0; i < chars.length; i += batchSize) {
          const charSpan = document.createElement("span")
          charSpan.textContent = chars.slice(i, i + batchSize).join("")
          charSpan.style.display = "inline-block"
          charSpan.style.opacity = "0"
          charSpan.style.transform = "translateY(20px)"
          charSpan.className = "char-span"
          titleRef.current?.appendChild(charSpan)
        }

        // Animate each character span with fewer stagger steps
        const charSpans = titleRef.current.querySelectorAll(".char-span")
        tl.to(charSpans, {
          opacity: 1,
          y: 0,
          stagger: 0.03, // Reduced stagger time
          duration: 0.8, // Shorter duration
          ease: "power2.out", // Simpler easing
        })
      }

      // Simpler animation for subtitle
      if (subtitleRef.current) {
        tl.to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power1.out",
          },
          "-=0.3",
        )
      }
    }

    // Optimize floating elements animation
    const floatingElements = document.querySelectorAll(".floating-element")

    // Limit the number of animated elements on mobile
    const elementsToAnimate = isMobile ? Array.from(floatingElements).slice(0, 2) : floatingElements

    elementsToAnimate.forEach((el, index) => {
      gsap.to(el, {
        y: `${index % 2 === 0 ? "-" : ""}10`, // Reduced movement
        x: `${index % 3 === 0 ? "-" : ""}5`, // Reduced movement
        rotation: index % 2 === 0 ? 2 : -2, // Reduced rotation
        duration: 4 + index, // Slower animation
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.2,
      })
    })

    // Simpler scroll indicator animation
    gsap.to(".scroll-indicator", {
      y: 5, // Reduced movement
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: "sine.inOut", // Simpler easing
    })

    // Simpler stats animation
    if (statsRef.current) {
      gsap.to(statsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
          toggleActions: "play none none none", // Simplified trigger
        },
      })
    }
  }, [isReducedMotion, isMobile])

  // Memoized play showreel function to prevent unnecessary re-renders
  const playShowreel = useCallback(() => {
    setIsShowreelPlaying(true)

    if (showreelRef.current) {
      showreelRef.current.preload = "auto"
      showreelRef.current.load()
      
      // Try to play with better error handling and fallback
      const playPromise = showreelRef.current.play()
      
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("Showreel play failed:", error)
          setAutoplayBlocked(true)
          
          // Show fallback UI
          if (showreelRef.current) {
            // Add a click event listener to play on user interaction
            showreelRef.current.addEventListener('click', () => {
              showreelRef.current?.play()
              setAutoplayBlocked(false)
            }, { once: true })
          }
        })
      }
    }

    // Use transform for better performance
    if (contentRef.current) {
      // Use simpler animation for reduced motion
      if (isReducedMotion) {
        gsap.to(contentRef.current, {
          opacity: 0,
          duration: 0.3,
        })
      } else {
        gsap.to(contentRef.current, {
          x: "-100%",
          opacity: 0,
          duration: 0.8,
          ease: "power3.inOut",
          force3D: true, // Force GPU acceleration
        })
      }
    }
  }, [isReducedMotion])

  // Memoized stop showreel function
  const stopShowreel = useCallback(() => {
    // Only pause the video if it's actually playing
    if (showreelRef.current && !showreelRef.current.paused) {
      try {
        showreelRef.current.pause()
      } catch (error) {
        console.error("Error pausing showreel:", error)
      }
    }

    // Use transform for better performance
    if (contentRef.current) {
      // Use simpler animation for reduced motion
      if (isReducedMotion) {
        gsap.to(contentRef.current, {
          opacity: 1,
          duration: 0.3,
        })
      } else {
        gsap.to(contentRef.current, {
          x: "0%",
          opacity: 1,
          duration: 0.8,
          ease: "power3.inOut",
          force3D: true, // Force GPU acceleration
        })
      }
    }

    // Set state after animation starts
    setTimeout(() => {
      setIsShowreelPlaying(false)
    }, 300)
  }, [isReducedMotion])

  return (
    <motion.section ref={sectionRef} className="relative h-screen w-full overflow-hidden" id="work" style={{ opacity }}>
      {/* Background video with enhanced overlay effects */}
      <motion.div className="absolute inset-0 w-full h-full z-0" style={{ y }}>
        {/* Enhanced gradient overlays for more cinematic look */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.8)_100%)] z-10" />
        
        {/* Film grain overlay */}
        <div 
          className="absolute inset-0 z-20 pointer-events-none opacity-[0.15] mix-blend-overlay"
          style={{
            background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 2056 2056' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />

        {/* Existing video code ... */}
        {(!isMobile || !isReducedMotion) && (
          <video
            ref={videoRef}
            className={`w-full h-full object-cover scale-105 transition-all duration-[2s] ${
              isShowreelPlaying ? "opacity-0" : "opacity-100"
            }`}
            autoPlay
            loop
            muted
            playsInline
            poster="/videos/background-poster.jpg" // Optional: Add a poster image
          >
            <source src="/videos/background-loop.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        {/* Fallback background for mobile or reduced motion */}
        {(isMobile || isReducedMotion) && !isShowreelPlaying && (
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-black"></div>
        )}

        {/* Showreel video - only load when needed */}
        <AnimatePresence>
          {isShowreelPlaying && (
            <motion.div
              className="absolute inset-0 z-20"
              initial={isReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
              animate={isReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
              exit={isReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: isReducedMotion ? 0.3 : 0.5 }}
            >
              <div className="relative w-full h-full">
                <video
                  ref={showreelRef}
                  className="w-full h-full object-cover"
                  playsInline
                  controls
                  preload="metadata"
                  autoPlay
                  poster="/videos/showreel-poster.jpg"
                >
                  <source src="/videos/background-loop.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Fallback UI for blocked autoplay */}
                <AnimatePresence>
                  {autoplayBlocked && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm"
                    >
                      <motion.button
                        onClick={() => showreelRef.current?.play()}
                        className="group px-8 py-4 bg-purple-600/90 hover:bg-purple-500 rounded-full flex items-center gap-3 text-white transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Play className="w-6 h-6" />
                        <span className="font-medium">Click to Play Showreel</span>
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Enhanced floating elements */}
      {!isReducedMotion && (
        <div className={`absolute inset-0 z-10 overflow-hidden pointer-events-none ${
          isShowreelPlaying ? "opacity-0" : "opacity-100"
        } transition-opacity duration-500`}>
          {/* Cinematic lens flares */}
          <div className="floating-element absolute top-[10%] right-[20%] w-64 h-64 rounded-full bg-purple-500/10 blur-[100px]"></div>
          <div className="floating-element absolute top-[40%] left-[10%] w-96 h-96 rounded-full bg-blue-500/10 blur-[120px]"></div>
          
          {/* Film reel decorative elements */}
          <div className="floating-element absolute top-[5%] left-[5%] opacity-20">
            <Video className="w-16 h-16 text-purple-400" />
          </div>
          <div className="floating-element absolute bottom-[15%] right-[10%] opacity-20">
            <Clapperboard className="w-20 h-20 text-purple-400" />
          </div>

          {/* Animated particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="floating-element absolute w-1 h-1 bg-purple-400/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float ${5 + Math.random() * 5}s infinite`
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Main content with enhanced styling */}
      <div ref={contentRef} className="relative z-20 h-full flex flex-col justify-end items-start container mx-auto px-6 pb-24 md:pb-32">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="w-full max-w-4xl"
        >
          {/* Minimalist title section */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-[1px] w-10 bg-purple-400/70"></div>
              <span className="text-sm text-purple-400/70 font-medium tracking-[0.2em] uppercase">
                Film Editor & Visual Artist
              </span>
            </div>

            <h1
              ref={titleRef}
              className="text-6xl md:text-8xl font-bold tracking-tighter"
            >
              <span className="block text-white/90">RAMES</span>
              <span className="block bg-gradient-to-r from-purple-400 via-purple-300 to-purple-500 bg-clip-text text-transparent">
                WAQAR
              </span>
            </h1>
          </div>

          {/* Minimalist action buttons */}
          <div className="flex flex-wrap gap-4">
            <motion.button
              onClick={playShowreel}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
              className="group px-6 md:px-8 py-2 md:py-3 bg-purple-700/80 hover:bg-purple-600 rounded-full text-white/90 text-sm md:text-base font-medium transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.3)] flex items-center gap-3"
              whileHover={isReducedMotion ? {} : { scale: 1.05, boxShadow: "0 0 25px rgba(168,85,247,0.5)" }}
              whileTap={isReducedMotion ? {} : { scale: 0.98 }}
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
              </span>
              Watch Showreel
            </motion.button>

            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="px-6 md:px-8 py-2 md:py-3 bg-transparent border border-white/10 hover:border-white/20 rounded-full text-white/70 hover:text-white/90 text-sm md:text-base font-medium transition-all duration-300"
              whileHover={isReducedMotion ? {} : { scale: 1.05 }}
              whileTap={isReducedMotion ? {} : { scale: 0.98 }}
            >
              Get in Touch
            </motion.a>
          </div>

          {/* Minimal stats as a footer */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.7 }}
            className="absolute bottom-8 left-6 flex items-center gap-6 text-sm text-white/50"
          >
            <span>150+ Projects</span>
            <span className="w-1 h-1 rounded-full bg-purple-400/50"></span>
            <span>12 Awards</span>
            <span className="w-1 h-1 rounded-full bg-purple-400/50"></span>
            <span>10 Years</span>
          </motion.div>
        </motion.div>

        {/* Minimal scroll indicator */}
        {!isReducedMotion && (
          <motion.div
            className={`absolute bottom-8 right-6 flex items-center gap-2 ${
              isShowreelPlaying ? "opacity-0" : "opacity-100"
            } transition-opacity duration-500`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
          >
            <span className="text-sm text-white/50 tracking-wide">Scroll</span>
            <ChevronDown className="w-4 h-4 text-purple-400/70 animate-bounce" />
          </motion.div>
        )}
      </div>

      {/* Close button for showreel - simplified animation for reduced motion */}
      <AnimatePresence>
        {isShowreelPlaying && (
          <motion.button
            onClick={stopShowreel}
            className="absolute top-4 md:top-6 right-4 md:right-6 z-50 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-purple-900/80 transition-colors duration-300 border border-purple-500/30"
            aria-label="Close showreel"
            initial={isReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.5, rotate: -90 }}
            animate={isReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, rotate: 0 }}
            exit={isReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.5, rotate: 90 }}
            transition={{ duration: isReducedMotion ? 0.3 : 0.5 }}
          >
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Cinematic letterbox bars - simplified animation for reduced motion */}
      {!isReducedMotion && (
        <>
          <motion.div
            className="absolute top-0 left-0 w-full h-[5vh] bg-black z-30"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isShowreelPlaying ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-full h-[5vh] bg-black z-30"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isShowreelPlaying ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          />
        </>
      )}
    </motion.section>
  )
}

