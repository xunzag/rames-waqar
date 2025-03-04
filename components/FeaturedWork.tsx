"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Play, Award, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

// Enhanced project data with better descriptions
const projects = [
  {
    id: 1,
    title: "Cinematic Trailer",
    category: "Film",
    thumbnail: "/thumbnail.jpg",
    video: "/videos/background-loop.mp4",
    description: "A cinematic trailer for an upcoming feature film, showcasing dramatic scenes and emotional storytelling.",
    stats: {
      duration: "2:35",
      awards: 2,
      year: "2024"
    }
  },
  {
    id: 2,
    title: "Brand Commercial",
    category: "Advertising",
    thumbnail: "/thumbnail.jpg",
    video: "/videos/background-loop.mp4",
    description: "High-energy commercial for a major sports brand featuring professional athletes in action.",
    stats: {
      duration: "0:30",
      views: "1.2M",
      year: "2024"
    }
  },
  {
    id: 3,
    title: "Music Video",
    category: "Music",
    thumbnail: "/thumbnail.jpg",
    video: "/videos/background-loop.mp4",
    description: "Visually stunning music video with synchronized visual effects and color grading.",
    stats: {
      duration: "4:15",
      awards: 1,
      year: "2024"
    }
  }
]

export default function FeaturedWork() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement }>({})
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [100, 0, 0, 100])

  return (
    <motion.section 
      ref={containerRef} 
      className="relative py-32 overflow-hidden bg-black"
      style={{ opacity, y }}
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/10 to-black" />
        
        {/* Animated radial gradient */}
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3] 
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-800/10 rounded-full blur-3xl" />
        
        {/* Subtle grid overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(to right, rgb(139, 92, 246, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(139, 92, 246, 0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
        
        {/* Vignette effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.8)_100%)]" />
      </div>

      {/* Optional: Add floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/30 rounded-full"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
            }}
            animate={{
              y: ["-10%", "110%"],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="relative mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            <span className="text-white">Featured</span>
            <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent"> Work</span>
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex items-center justify-between"
          >
            <p className="text-xl text-gray-400 max-w-2xl">
              Explore a selection of our most impactful projects across various genres and styles.
            </p>
            <Link href="/work">
              <motion.button
                className="hidden md:flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 rounded-full text-white font-medium transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.3)] group"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 0 30px rgba(168,85,247,0.5)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Explore Full Portfolio</span>
                <ArrowRight className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" />
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Featured Projects Showcase */}
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Project Preview */}
          <div className="relative aspect-video rounded-lg overflow-hidden group"
            onMouseEnter={() => {
              setIsHovering(true)
              // Play video on hover
              const video = videoRefs.current[projects[activeIndex].id]
              if (video) {
                video.play()
              }
            }}
            onMouseLeave={() => {
              setIsHovering(false)
              // Pause and reset video when mouse leaves
              const video = videoRefs.current[projects[activeIndex].id]
              if (video) {
                video.pause()
                video.currentTime = 0
              }
            }}
          >
            <AnimatePresence mode="wait">
              {projects.map((project, index) => (
                index === activeIndex && (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0"
                  >
                    {/* Thumbnail Image */}
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    
                    {/* Video that only shows when hovering */}
                    <video
                      ref={el => el && (videoRefs.current[project.id] = el)}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                        isHovering ? 'opacity-100' : 'opacity-0'
                      }`}
                      loop
                      muted
                      playsInline
                      src={project.video}
                    />
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60" />
                    
                    {/* Project Info Overlay */}
                    <div className="absolute bottom-0 left-0 w-full p-8">
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className="flex items-center gap-4 mb-4">
                          <span className="px-3 py-1 bg-purple-600/80 backdrop-blur-sm rounded-full text-sm text-white">
                            {project.category}
                          </span>
                          <div className="flex items-center gap-2 text-gray-400">
                            <Clock className="w-4 h-4" />
                            <span>{project.stats.duration}</span>
                          </div>
                          {project.stats.awards && (
                            <div className="flex items-center gap-2 text-gray-400">
                              <Award className="w-4 h-4" />
                              <span>{project.stats.awards}</span>
                            </div>
                          )}
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-2">
                          {project.title}
                        </h3>
                        <p className="text-gray-300 max-w-xl">
                          {project.description}
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>

          {/* Project Thumbnails */}
          <div className="space-y-6">
            {projects.map((project, index) => (
              <motion.button
                key={project.id}
                className={`w-full p-6 rounded-lg border transition-all duration-300 text-left ${
                  index === activeIndex
                    ? "bg-purple-900/20 border-purple-500/50"
                    : "bg-black/20 border-white/5 hover:border-purple-500/30"
                }`}
                onClick={() => setActiveIndex(index)}
                whileHover={{ x: 10 }}
              >
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400">{project.description}</p>
                <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                  <span>{project.category}</span>
                  <span>•</span>
                  <span>{project.stats.duration}</span>
                  {project.stats.awards && (
                    <>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        <span>{project.stats.awards}</span>
                      </div>
                    </>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}

