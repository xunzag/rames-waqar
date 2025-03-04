"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7 // Slow down the video for more cinematic feel
    }
  }, [])

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Video overlay gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0),rgba(0,0,0,0.8)_70%)] z-10" />

      {/* Cinematic letterbox bars */}
      <div className="absolute top-0 left-0 w-full h-[5vh] bg-black z-20" />
      <div className="absolute bottom-0 left-0 w-full h-[5vh] bg-black z-20" />

      {/* Noise texture overlay */}
      <div className="absolute inset-0 z-10 opacity-5 pointer-events-none bg-noise" />

      {/* Actual video */}
      <motion.video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 2 }}
      >
        <source src="/placeholder.svg?height=1080&width=1920" type="video/mp4" />
      </motion.video>

      {/* Cinematic vignette effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] z-10 pointer-events-none" />
    </div>
  )
}

