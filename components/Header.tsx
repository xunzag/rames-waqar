"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Volume2, VolumeX } from "lucide-react"
import Link from "next/link"

export default function Header() {
  const [isMuted, setIsMuted] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()

  const headerOpacity = useTransform(scrollY, [0, 100], [0, 1])
  const headerBlur = useTransform(scrollY, [0, 100], [0, 8])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMute = () => {
    setIsMuted(!isMuted)
    // This will be connected to the video element in HeroSection
    const video = document.getElementById("hero-video") as HTMLVideoElement
    if (video) {
      video.muted = !video.muted
    }
  }

  return (
    <motion.header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? "py-4" : "py-6"}`}
      style={{
        opacity: headerOpacity,
        backdropFilter: `blur(${headerBlur.get()}px)`,
        backgroundColor: isScrolled ? "rgba(0, 0, 0, 0.8)" : "transparent",
      }}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center"
        >
          <Link href="/" className="group">
            <span className="text-xl font-bold">
              <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">Rames</span>
              <span className="text-white"> Waqar</span>
            </span>
          </Link>
        </motion.div>

        <div className="flex items-center space-x-8">
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="hidden md:block"
          >
            <ul className="flex space-x-8">
              {[
                { name: "Home", href: "/" },
                { name: "Work", href: "/work" },
                { name: "About", href: "/#about" },
                { name: "Contact", href: "/contact" },
              ].map((item, index) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-sm uppercase tracking-wider hover:text-purple-400 transition-colors duration-300 relative group"
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>

          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
            onClick={toggleMute}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-900/30 hover:bg-purple-800/50 transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-purple-300" />
            ) : (
              <Volume2 className="w-5 h-5 text-purple-300" />
            )}
          </motion.button>
        </div>
      </div>
    </motion.header>
  )
}

