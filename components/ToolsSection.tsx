"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Code2, Palette, Film, Music, ArrowRight, Plus } from "lucide-react"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Tools data
const tools = [
  {
    icon: Film,
    category: "Editing Software",
    description: "Professional video editing tools for crafting compelling narratives",
    items: [
      { name: "Adobe Premiere Pro", level: 95, years: 8, certified: true },
      { name: "DaVinci Resolve", level: 90, years: 6, certified: true },
      { name: "Final Cut Pro", level: 85, years: 5, certified: false },
      { name: "Avid Media Composer", level: 80, years: 4, certified: true },
    ],
  },
  {
    icon: Code2,
    category: "Visual Effects",
    description: "Advanced VFX tools for creating stunning visual experiences",
    items: [
      { name: "Adobe After Effects", level: 90, years: 7, certified: true },
      { name: "Nuke", level: 75, years: 3, certified: false },
      { name: "Fusion", level: 80, years: 4, certified: true },
      { name: "Blender", level: 70, years: 2, certified: false },
    ],
  },
  {
    icon: Palette,
    category: "Color Grading",
    description: "Professional color grading and correction tools",
    items: [
      { name: "DaVinci Resolve Color", level: 95, years: 6, certified: true },
      { name: "Lumetri Color", level: 85, years: 5, certified: true },
      { name: "FilmConvert", level: 80, years: 4, certified: false },
      { name: "LUTs Development", level: 90, years: 5, certified: true },
    ],
  },
  {
    icon: Music,
    category: "Audio",
    description: "Professional audio editing and mixing software",
    items: [
      { name: "Adobe Audition", level: 85, years: 5, certified: true },
      { name: "Pro Tools", level: 75, years: 3, certified: false },
      { name: "Logic Pro", level: 70, years: 2, certified: false },
      { name: "Sound Design", level: 80, years: 4, certified: true },
    ],
  },
]

export default function ToolsSection() {
  const [activeCategory, setActiveCategory] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const toolsRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [100, 0, 0, 100])

  useEffect(() => {
    if (!toolsRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".tool-bar",
        { width: 0 },
        {
          width: "var(--progress-width)",
          duration: 1.5,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: toolsRef.current,
            start: "top 70%",
          },
        }
      )
    }, toolsRef)

    return () => ctx.revert()
  }, [activeCategory])

  return (
    <motion.section 
      ref={sectionRef} 
      className="relative py-32 overflow-hidden bg-black"
      style={{ opacity }}
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/10 to-black" />
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3] 
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <div className="h-px w-8 bg-purple-400/70" />
            <span className="text-purple-400/70 uppercase tracking-wider text-sm font-medium">Tools & Technologies</span>
            <div className="h-px w-8 bg-purple-400/70" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            <span className="text-white">Professional</span>
            <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent"> Arsenal</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-gray-400 text-lg"
          >
            Leveraging industry-leading tools and technologies to bring your vision to life
          </motion.p>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {tools.map((category, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveCategory(index)}
              className={`px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-300 ${
                activeCategory === index
                  ? "bg-purple-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                  : "bg-purple-900/20 text-gray-400 hover:text-white"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <category.icon className="w-4 h-4" />
              <span>{category.category}</span>
            </motion.button>
          ))}
        </div>

        {/* Tools Display */}
        <div ref={toolsRef} className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {tools[activeCategory].items.map((tool, index) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-purple-900/10 backdrop-blur-sm border border-purple-500/10 rounded-xl p-6 hover:border-purple-500/30 transition-colors duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">{tool.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>{tool.years} Years</span>
                        {tool.certified && (
                          <span className="flex items-center gap-1 text-purple-400">
                            <Plus className="w-3 h-3" />
                            Certified
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="text-2xl font-bold text-purple-400">{tool.level}%</span>
                  </div>

                  <div className="h-2 bg-purple-900/20 rounded-full overflow-hidden">
                    <motion.div
                      className="tool-bar h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full"
                      style={{ "--progress-width": `${tool.level}%` } as any}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Software Logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 pt-10 border-t border-purple-500/10"
        >
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 hover:opacity-100 transition-opacity duration-300">
            {[
              "Adobe",
              "DaVinci Resolve",
              "Final Cut Pro",
              "Avid",
              "After Effects",
              "Nuke",
              "Pro Tools",
              "Cinema 4D",
            ].map((software, index) => (
              <motion.span
                key={index}
                className="text-gray-400 text-lg font-medium"
                whileHover={{ scale: 1.1, color: "#a855f7" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                {software}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

