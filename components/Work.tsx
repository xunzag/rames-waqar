"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Play, Award, Clock, ChevronRight, X, ChevronDown, VolumeX, Volume2 } from "lucide-react"
import Header from "@/components/Header"

// Categories with more specific types
const categories = [
  { id: "featured", label: "Featured Projects", featured: true },
  { id: "film", label: "Feature Films" },
  { id: "commercial", label: "Commercials" },
  { id: "music", label: "Music Videos" },
  { id: "documentary", label: "Documentaries" },
  { id: "shortfilm", label: "Short Films" },
  { id: "corporate", label: "Corporate" },
  { id: "experimental", label: "Experimental" },
]

// Update the sample videos to use our local video
const sampleVideos = {
  film1: "/videos/background-loop.mp4",
  film2: "/videos/background-loop.mp4",
  commercial1: "/videos/background-loop.mp4",
  commercial2: "/videos/background-loop.mp4",
  music1: "/videos/background-loop.mp4",
  documentary1: "/videos/background-loop.mp4",
  experimental1: "/videos/background-loop.mp4",
  experimental2: "/videos/background-loop.mp4",
  commercial3: "/videos/background-loop.mp4",
  music2: "/videos/background-loop.mp4"
}

// Enhanced project type
interface Project {
  id: number
  title: string
  category: string
  thumbnail: string
  video: string
  year: string
  duration: string
  director?: string
  client?: string
  awards?: string[]
  description: string
  featured?: boolean
  tags?: string[]
}

// Update the projects data to use the local video and poster
const allProjects: Project[] = [
  {
    id: 1,
    title: "Urban Rhythms",
    category: "film",
    thumbnail: "/thumbnail.jpg",
    video: "/videos/background-loop.mp4",
    year: "2024",
    duration: "2:35",
    director: "Sarah Chen",
    awards: ["Best Editing - NYC Film Festival", "Visual Excellence Award"],
    description: "A pulsating journey through city life and urban culture.",
    featured: true,
    tags: ["Urban", "Documentary"],
  },
  {
    id: 2,
    title: "Night Shift",
    category: "commercial",
    thumbnail: "/thumbnail.jpg",
    video: "/videos/background-loop.mp4",
    year: "2023",
    duration: "0:30",
    client: "TechCorp",
    description: "A dynamic commercial showcasing modern work culture.",
    featured: true,
    tags: ["Commercial", "Corporate"],
  },
  {
    id: 3,
    title: "Electric Dreams",
    category: "music",
    thumbnail: "/thumbnail.jpg",
    video: "/videos/background-loop.mp4",
    year: "2024",
    duration: "3:45",
    client: "Neon Records",
    description: "A vibrant music video capturing the energy of live performance.",
    featured: true,
    tags: ["Music", "Concert"],
  },
  {
    id: 4,
    title: "City Pulse",
    category: "documentary",
    thumbnail: "/thumbnail.jpg",
    video: "/videos/background-loop.mp4",
    year: "2023",
    duration: "45:00",
    director: "Michael Chang",
    description: "A mesmerizing look at urban life after dark.",
    tags: ["Documentary", "Urban"],
  },
  {
    id: 5,
    title: "Flow State",
    category: "experimental",
    thumbnail: "/thumbnail.jpg",
    video: "/videos/background-loop.mp4",
    year: "2024",
    duration: "5:30",
    description: "An abstract journey through color and motion.",
    awards: ["Best Experimental Film - Art Film Festival"],
    tags: ["Experimental", "Abstract"],
  },
  {
    id: 6,
    title: "Mindful Living",
    category: "commercial",
    thumbnail: "/thumbnail.jpg",
    video: "/videos/background-loop.mp4",
    year: "2024",
    duration: "0:30",
    client: "Wellness Co.",
    description: "A serene commercial promoting wellness and mindfulness.",
    tags: ["Commercial", "Lifestyle"],
  },
  {
    id: 7,
    title: "Festival Nights",
    category: "music",
    thumbnail: "/thumbnail.jpg",
    video: "/videos/background-loop.mp4",
    year: "2023",
    duration: "4:15",
    client: "Universal Music",
    description: "High-energy festival performance captured in stunning detail.",
    tags: ["Music", "Live"],
  },
  // Add more projects as needed...
]

// First, add this new component at the top of the file
const WorkHero = () => {
  return (
    <div className="relative h-full overflow-hidden">
      {/* Animated background grid - optimized with will-change */}
      <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-8 opacity-30">
        {allProjects.slice(0, 8).map((project, index) => (
          <motion.div
            key={project.id}
            className="relative aspect-video rounded-lg overflow-hidden will-change-transform"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.7,
              delay: index * 0.1,
              ease: [0.21, 0.47, 0.32, 0.98] 
            }}
          >
            <video
              className="absolute inset-0 w-full h-full object-cover"
              loop
              muted
              playsInline
              autoPlay
              src={project.video}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black/60" />
          </motion.div>
        ))}
      </div>

      {/* Enhanced gradient overlays */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent"
          animate={{ 
            opacity: [0.5, 0.3, 0.5],
            scale: [1, 1.1, 1] 
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "linear" 
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative h-full flex flex-col items-center justify-center px-6">
        <div className="space-y-12">
          {/* Animated title */}
          <motion.div
            className="text-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <motion.h1 
              className="text-7xl md:text-9xl font-bold tracking-tight"
              initial={{ clipPath: 'inset(0 50% 0 50%)' }}
              animate={{ clipPath: 'inset(0 0% 0 0%)' }}
              transition={{ duration: 1, delay: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <span className="text-white">Our</span>
              <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent"> Work</span>
            </motion.h1>
            
            {/* Animated line */}
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-purple-500 to-purple-600 mx-auto rounded-full"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ duration: 1, delay: 0.8 }}
            />
          </motion.div>

          {/* Stats with counter animation */}
          <motion.div 
            className="flex items-center justify-center gap-12 text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <StatsCounter value={allProjects.length} label="Projects" />
            <div className="h-12 w-px bg-gradient-to-b from-transparent via-purple-500/20 to-transparent" />
            <StatsCounter value={categories.length} label="Categories" />
            <div className="h-12 w-px bg-gradient-to-b from-transparent via-purple-500/20 to-transparent" />
            <StatsCounter value={allProjects.filter(p => p.awards?.length).length} label="Awards" />
          </motion.div>

          {/* Tagline with typing effect */}
          <motion.div 
            className="flex items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
            <TypeWriter text="Crafting Visual Stories" />
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
          </motion.div>
        </div>

        {/* Optimized ambient lights */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div 
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full will-change-transform"
            style={{
              background: "radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 70%)",
              filter: "blur(100px)"
            }}
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3] 
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full will-change-transform"
            style={{
              background: "radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)",
              filter: "blur(100px)"
            }}
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3] 
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>
    </div>
  )
}

// Add these helper components
const StatsCounter = ({ value, label }: { value: number, label: string }) => {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    const duration = 1500
    const steps = 60
    const increment = value / steps
    let current = 0
    
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    
    return () => clearInterval(timer)
  }, [value])

  return (
    <div className="text-center">
      <div className="text-3xl font-bold text-white">{count}</div>
      <div className="text-sm uppercase tracking-wider">{label}</div>
    </div>
  )
}

const TypeWriter = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState('')
  
  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      setDisplayText(text.substring(0, index))
      index++
      if (index > text.length) clearInterval(timer)
    }, 50)
    
    return () => clearInterval(timer)
  }, [text])

  return (
    <p className="text-gray-400 text-lg font-light">
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      >|</motion.span>
    </p>
  )
}

export default function Work() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [activeCategory, setActiveCategory] = useState("featured")
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const rowRefs = useRef<{ [key: string]: HTMLDivElement }>({})
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement }>({})
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  // Scroll animations
  const { scrollY } = useScroll()
  const headerOpacity = useTransform(scrollY, [0, 100], [1, selectedProject ? 0 : 1])

  // Filter projects by category
  const projectsByCategory = categories.reduce((acc, category) => {
    acc[category.id] = allProjects.filter(project => {
      if (category.id === "featured") return project.featured
      return project.category === category.id
    })
    return acc
  }, {} as { [key: string]: Project[] })

  // Handle row scroll
  const handleRowScroll = (categoryId: string, direction: "left" | "right") => {
    const row = rowRefs.current[categoryId]
    if (!row) return

    const scrollAmount = direction === "left" ? -row.clientWidth : row.clientWidth
    row.scrollBy({ left: scrollAmount, behavior: "smooth" })
  }

  // Enhanced video preview handling
  useEffect(() => {
    if (hoveredProject !== null && videoRefs.current[hoveredProject]) {
      const video = videoRefs.current[hoveredProject]
      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise.catch(error => console.log("Video play failed:", error))
      }
    }
  }, [hoveredProject])

  // Add these new states
  const [isGridView, setIsGridView] = useState(false)
  const [activeFilter, setActiveFilter] = useState<string[]>([])
  const [showModal, setShowModal] = useState(false)

  // First, add this state for video control
  const [isShowreelPlaying, setIsShowreelPlaying] = useState(false)

  // First, update the state and refs
  const [currentVideo, setCurrentVideo] = useState<HTMLVideoElement | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const fullscreenVideoRef = useRef<HTMLVideoElement>(null)

  // Add this state for sound control
  const [isMuted, setIsMuted] = useState(true)

  // Smooth scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  // Add this function to handle video hover
  const handleVideoHover = (videoRef: HTMLVideoElement) => {
    // Pause any currently playing video
    if (currentVideo && currentVideo !== videoRef) {
      currentVideo.pause()
    }
    
    // Play the hovered video
    videoRef.play()
    setCurrentVideo(videoRef)
  }

  // Update video click handler
  const handleVideoClick = (project: Project) => {
    setSelectedProject(project)
    scrollToTop()
  }

  // Update the play function
  const playVideo = () => {
    if (selectedProject) {
      const video = document.querySelector<HTMLVideoElement>('#featured-video')
      if (video) {
        setIsVideoPlaying(true)
        video.muted = false
        video.play()
      }
    }
  }

  // Add sound toggle function
  const toggleSound = () => {
    setIsMuted(!isMuted)
    const video = document.querySelector<HTMLVideoElement>('#featured-video')
    if (video) {
      video.muted = !isMuted
    }
  }

  return (
    <>
      <motion.div 
        style={{ opacity: headerOpacity }}
        className="fixed top-0 left-0 w-full z-50"
      >
        <Header />
      </motion.div>

      <div className="min-h-screen bg-black/95">
        <motion.div 
          className="relative h-screen"
        >
          {selectedProject ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              <video
                id="featured-video"
                className="w-full h-full object-cover"
                autoPlay
                muted={isMuted}
                loop
                playsInline
                src={selectedProject.video}
              />
              
              {/* Premium overlay with gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent">
                <div className="absolute inset-0 mix-blend-overlay bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10" />
              </div>

              {/* Content overlay */}
              <div className="absolute inset-0 flex flex-col justify-between p-12">
                {/* Top section with back button */}
                <motion.button
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="self-start px-4 py-2 text-white/80 hover:text-white flex items-center gap-2 group"
                  onClick={() => setSelectedProject(null)}
                >
                  <ChevronDown className="w-5 h-5 rotate-90 transform group-hover:-translate-x-1 transition-transform" />
                  Back to Browse
                </motion.button>

                {/* Bottom section with info and controls */}
                <div className="space-y-6">
                  <motion.h1 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-6xl md:text-8xl font-bold text-white"
                  >
                    {selectedProject.title}
                  </motion.h1>
                  
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-6 text-gray-300"
                  >
                    <span>{selectedProject.year}</span>
                    <span>•</span>
                    <span>{selectedProject.duration}</span>
                    {selectedProject.director && (
                      <>
                        <span>•</span>
                        <span>Dir. {selectedProject.director}</span>
                      </>
                    )}
                  </motion.div>

                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="max-w-xl text-lg text-gray-300"
                  >
                    {selectedProject.description}
                  </motion.p>
                </div>

                {/* Sound control button */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute bottom-12 right-12 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  onClick={toggleSound}
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </motion.button>
              </div>
            </motion.div>
          ) : (
            // Then update the hero section in the main component:
            <motion.div 
              className="relative h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <WorkHero />
            </motion.div>
          )}
          
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <span className="text-sm text-gray-400">Scroll to explore</span>
            <ChevronDown className="w-6 h-6 text-purple-400" />
          </motion.div>
        </motion.div>

        <motion.nav
          className="sticky top-20 z-30 backdrop-blur-xl border-y border-purple-500/10"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/5 via-black/95 to-purple-900/5" />
          
          <div className="container mx-auto px-6 py-4 relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`
                      relative px-6 py-2.5 rounded-full transition-all duration-300 whitespace-nowrap
                      ${activeCategory === category.id 
                        ? "text-white" 
                        : "text-gray-400 hover:text-purple-300"
                      }
                    `}
                  >
                    {/* Background and effects */}
                    <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
                      activeCategory === category.id
                        ? "bg-gradient-to-r from-purple-600/20 to-purple-800/20 border border-purple-500/50"
                        : "border border-white/5 hover:border-purple-500/30"
                    }`} />
                    
                    {/* Glow effect for active state */}
                    {activeCategory === category.id && (
                      <div className="absolute inset-0 rounded-full bg-purple-500/10 blur-sm" />
                    )}

                    {/* Label */}
                    <span className="relative z-10">{category.label}</span>
                  </button>
                ))}
              </div>

             
            </div>
          </div>
        </motion.nav>

        <div className="relative z-10 py-20 bg-gradient-to-b from-black/95 via-black/90 to-black/95">
          {/* Add ambient lighting */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5" />
          
          {categories.map(category => {
            const projects = projectsByCategory[category.id]
            if (!projects?.length) return null

            return (
              <div key={category.id} className="mb-12 relative">
                {/* Add subtle glow to category headers */}
                <div className="container mx-auto px-6 mb-4">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2 text-glow">
                    {category.label}
                    {category.featured && (
                      <span className="px-2 py-1 bg-purple-600/80 text-xs rounded-full">
                        Featured
                      </span>
                    )}
                  </h2>
                </div>

                <div className="relative group">
                  {/* Update project cards with better visibility */}
                  <div
                    ref={el => {
                      if (el) rowRefs.current[category.id] = el
                      return null
                    }}
                    className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory px-6 pb-4" // Added padding bottom for shadow
                  >
                    {projects.map(project => (
                      <motion.div
                        key={project.id}
                        className="relative flex-none w-[400px] aspect-video rounded-lg overflow-hidden mx-2 group/item cursor-pointer"
                        onHoverStart={() => {
                          const video = videoRefs.current[project.id]
                          if (video) handleVideoHover(video)
                        }}
                        onHoverEnd={() => {
                          const video = videoRefs.current[project.id]
                          if (video) {
                            video.pause()
                            video.currentTime = 0
                          }
                        }}
                        onClick={() => handleVideoClick(project)}
                      >
                        <video
                          ref={el => {
                            if (el) {
                              videoRefs.current[project.id] = el
                              el.preload = "metadata"
                            }
                            return null
                          }}
                          className="absolute inset-0 w-full h-full object-cover"
                          loop
                          muted
                          playsInline
                          poster={project.thumbnail}
                        >
                          <source src={project.video} type="video/mp4" />
                        </video>

                        {/* Brighter hover overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover/item:opacity-100 transition-all duration-300">
                          <div className="absolute bottom-0 left-0 w-full p-6">
                            <h3 className="text-xl font-bold text-white mb-2 transform translate-y-4 group-hover/item:translate-y-0 transition-transform duration-300">
                              {project.title}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-gray-300 transform translate-y-4 group-hover/item:translate-y-0 transition-transform duration-300 delay-75">
                              <span>{project.duration}</span>
                              {project.awards && (
                                <div className="flex items-center gap-1">
                                  <Award className="w-4 h-4 text-purple-400" />
                                  <span>{project.awards.length}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <AnimatePresence>
          {isFullscreen && selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black"
            >
              <button
                onClick={() => {
                  setIsFullscreen(false)
                  setSelectedProject(null)
                  if (fullscreenVideoRef.current) {
                    fullscreenVideoRef.current.pause()
                  }
                }}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              <video
                ref={fullscreenVideoRef}
                className="w-full h-full object-contain"
                controls
                autoPlay
                src={selectedProject.video}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
} 