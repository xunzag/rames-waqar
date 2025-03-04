"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import Header from "@/components/Header"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface FormState {
  name: string
  email: string
  projectType: string
  budget: string
  message: string
}

export default function Contact() {
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    projectType: "",
    budget: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Parallax effect for video
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const videoScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.3])
  const videoOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0.2])

  useEffect(() => {
    if (!formRef.current) return

    const formElements = formRef.current.querySelectorAll("input, textarea, button")
    gsap.fromTo(
      formElements,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
        },
      }
    )
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormState(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Add your form submission logic here
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <main ref={containerRef} className="relative min-h-screen bg-black overflow-hidden">
      <Header />

      {/* Background Video */}
      <motion.div 
        className="fixed inset-0 z-0"
        style={{ scale: videoScale, opacity: videoOpacity }}
      >
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          src="/videos/background-loop.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/90" />
      </motion.div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center p-6">
        <motion.div 
          className="text-center space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-7xl md:text-9xl font-bold">
            <span className="text-white">Let's</span>
            <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent"> Create</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Ready to bring your vision to life? Let's collaborate on something extraordinary.
          </p>
        </motion.div>
      </section>

      {/* Process Section - with reduced spacing */}
      <section className="relative py-20">
        <div className="container mx-auto px-6">
          <motion.div 
            className="max-w-4xl mx-auto text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">How We</span>
              <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent"> Work Together</span>
            </h2>
            <p className="text-xl text-gray-400">From concept to delivery, we ensure a smooth and collaborative journey.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Initial Discussion",
                description: "We start with understanding your vision, goals, and requirements through a detailed consultation.",
                icon: "🎯"
              },
              {
                step: "02",
                title: "Creative Planning",
                description: "Together we develop a comprehensive strategy and creative direction for your project.",
                icon: "💡"
              },
              {
                step: "03",
                title: "Execution & Delivery",
                description: "We bring your vision to life with precision, keeping you involved every step of the way.",
                icon: "🚀"
              }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                className="relative p-8 rounded-2xl bg-purple-900/10 border border-purple-500/10 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center text-2xl font-bold">
                  {item.step}
                </div>
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Redesigned */}
      <section className="relative py-20 bg-black/20 backdrop-blur-sm border-t border-purple-500/10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Column - Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  <span className="text-white">Let's Talk</span>
                  <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent"> About Your Project</span>
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  Whether you have a specific project in mind or just want to explore possibilities,
                  I'm here to help bring your vision to life.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                {[
                  {
                    icon: Mail,
                    label: "Email",
                    value: "rameswaqar@gmail.com",
                    link: "mailto:rameswaqar@gmail.com"
                  },
                  {
                    icon: Phone,
                    label: "Phone",
                    value: "+1 (555) 123-4567",
                    link: "tel:+15551234567"
                  },
                  {
                    icon: MapPin,
                    label: "Location",
                    value: "Los Angeles, California",
                    link: "https://maps.google.com"
                  }
                ].map((item, index) => (
                  <motion.a
                    href={item.link}
                    key={item.label}
                    className="flex items-center gap-4 group"
                    whileHover={{ x: 5 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center group-hover:bg-purple-600/20 transition-colors">
                      <item.icon className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">{item.label}</p>
                      <p className="text-white font-medium">{item.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Availability Card */}
              <div className="p-6 rounded-xl bg-gradient-to-br from-purple-900/10 to-purple-900/20 border border-purple-500/10">
                <h3 className="text-xl font-semibold text-white mb-3">Current Availability</h3>
                <p className="text-gray-400">Available for projects starting June 2024</p>
                <div className="mt-4 flex gap-4">
                  <div className="flex-1 p-3 rounded-lg bg-black/20 text-center">
                    <p className="text-sm text-gray-400">Typical Timeline</p>
                    <p className="text-white font-medium">2-3 months</p>
                  </div>
                  <div className="flex-1 p-3 rounded-lg bg-black/20 text-center">
                    <p className="text-sm text-gray-400">Response Time</p>
                    <p className="text-white font-medium">24-48 hours</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Enhanced Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <motion.form
                ref={formRef}
                onSubmit={handleSubmit}
                className="space-y-6 p-8 rounded-xl bg-black/30 border border-purple-500/10 backdrop-blur-sm"
              >
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-black/50 border border-purple-500/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-black/50 border border-purple-500/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="projectType" className="block text-sm font-medium text-gray-400 mb-2">Project Type</label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formState.projectType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-black/50 border border-purple-500/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    >
                      <option value="">Select type</option>
                      <option value="commercial">Commercial</option>
                      <option value="music-video">Music Video</option>
                      <option value="film">Film</option>
                      <option value="corporate">Corporate</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-400 mb-2">Budget Range</label>
                    <select
                      id="budget"
                      name="budget"
                      value={formState.budget}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-black/50 border border-purple-500/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    >
                      <option value="">Select budget</option>
                      <option value="small">$1k - $5k</option>
                      <option value="medium">$5k - $10k</option>
                      <option value="large">$10k - $25k</option>
                      <option value="enterprise">$25k+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Project Details</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-black/50 border border-purple-500/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-purple-400 rounded-lg text-white font-medium flex items-center justify-center gap-2 hover:from-purple-500 hover:to-purple-300 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <motion.div
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </motion.form>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
} 