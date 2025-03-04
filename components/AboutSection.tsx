"use client"

import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import CountUp from "react-countup"
import { Film, Award, Users, Clock, ArrowRight, Play, Download } from "lucide-react"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Stats data
const stats = [
  { icon: Film, value: 150, label: "Projects", sublabel: "Completed" },
  { icon: Award, value: 12, label: "Awards", sublabel: "Received" },
  { icon: Users, value: 78, label: "Clients", sublabel: "Worldwide" },
  { icon: Clock, value: 10, label: "Years", sublabel: "Experience" },
]

const skills = [
  { name: "Video Editing", level: 95 },
  { name: "Color Grading", level: 90 },
  { name: "Motion Graphics", level: 85 },
  { name: "Sound Design", level: 80 },
  { name: "Visual Effects", level: 88 },
]

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  useEffect(() => {
    // Animate skills bars
    if (skillsRef.current) {
      const bars = skillsRef.current.querySelectorAll(".skill-bar")
      gsap.fromTo(
        bars,
        { width: "0%" },
        {
          width: "var(--skill-level)",
          duration: 1.5,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 80%",
          },
        }
      )
    }
  }, [])

  return (
    <motion.section
      id="about"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
      style={{ opacity }}
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black to-black" />
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content Column */}
          <div className="space-y-12">
            {/* Section Header */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 mb-6"
              >
                <div className="h-px w-8 bg-purple-400/70" />
                <span className="text-purple-400/70 uppercase tracking-wider text-sm font-medium">About Me</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold"
              >
                <span className="text-white">Crafting Visual</span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                  Narratives
                </span>
              </motion.h2>
            </div>

            {/* Bio Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="space-y-6 text-gray-300"
            >
              <p className="text-lg leading-relaxed">
                With over a decade of experience in video editing and post-production, I've had the privilege of working
                with diverse clients across multiple industries, from major film studios to independent creators.
              </p>
              <p className="text-lg leading-relaxed">
                My approach combines technical precision with creative storytelling, ensuring each project not only meets
                but exceeds expectations. I specialize in turning complex ideas into compelling visual narratives that
                resonate with audiences.
              </p>
            </motion.div>

            {/* Skills Section */}
            <motion.div
              ref={skillsRef}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {skills.map((skill, index) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white font-medium">{skill.name}</span>
                    <span className="text-purple-400">{skill.level}%</span>
                  </div>
                  <div className="h-1 bg-purple-900/20 rounded-full overflow-hidden">
                    <div
                      className="skill-bar h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full"
                      style={{ "--skill-level": `${skill.level}%` } as any}
                    />
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                className="px-8 py-4 bg-purple-600 hover:bg-purple-500 rounded-full text-white font-medium flex items-center gap-2 transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.3)] group"
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(168,85,247,0.5)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
              </motion.button>

              <motion.button
                className="px-8 py-4 border border-purple-500/30 hover:border-purple-500/60 rounded-full text-white font-medium flex items-center gap-2 transition-all duration-300 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="w-4 h-4" />
                <span>Watch Reel</span>
              </motion.button>
            </motion.div>
          </div>

          {/* Visual Column */}
          <div className="relative">
            {/* Profile Image/Video Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="relative aspect-[4/5] rounded-2xl overflow-hidden"
            >
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                poster="/profile-poster.jpg"
              >
                <source src="/videos/background-loop.mp4" type="video/mp4" />
              </video>
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

              {/* Stats Grid */}
              <div className="absolute inset-0 grid grid-cols-2 gap-4 p-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center text-center group hover:border-purple-500/30 transition-colors duration-300"
                  >
                    <stat.icon className="w-6 h-6 text-purple-400 mb-2" />
                    <div className="text-2xl font-bold text-white mb-1">
                      <CountUp end={stat.value} duration={2} enableScrollSpy scrollSpyOnce />
                    </div>
                    <div className="text-xs uppercase tracking-wider">
                      <span className="text-purple-400">{stat.label}</span>
                      <br />
                      <span className="text-gray-400">{stat.sublabel}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-600/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-600/20 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </motion.section>
  )
}

