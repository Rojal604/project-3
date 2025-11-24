"use client"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { useRef } from "react"
import { GsapScrollAnimation } from "@/components/gsap-scroll-animation"
import { ScrollAnimation } from "@/components/scroll-animation"
import { LightRays } from "@/components/ui/light-rays"

export function Hero() {
  const words = "Taste the Extraordinary".split(" ")

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background with Multiple Layers */}
      <div className="absolute inset-0 z-0 bg-black">
        <LightRays
          raysOrigin="top-center"
          raysColor="#FFD700"
          raysSpeed={0.2}
          lightSpread={0.5}
          rayLength={1.5}
          fadeDistance={1.0}
          followMouse={true}
          mouseInfluence={0.5}
          className="opacity-40"
        />
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/70 via-primary/5 to-background/80 animate-gradient"></div>

        {/* Radial Gradient Accent */}
        <div className="absolute inset-0 gradient-radial opacity-50"></div>
      </div>

      {/* Floating Decorative Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-primary/10 blur-3xl"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-primary/10 blur-3xl"
      />

      {/* Content */}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <GsapScrollAnimation animation="fadeUp" stagger={0.2}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6 sm:mb-8"
          >
            <span className="inline-block py-1.5 sm:py-2 px-3 sm:px-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 text-[10px] sm:text-sm font-medium tracking-widest uppercase mb-4 sm:mb-6">
              Est. 2024
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-serif font-bold text-white mb-4 sm:mb-6 tracking-tight leading-tight">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-amber-200 animate-gradient bg-[length:200%_auto]">
                Culinary
              </span>
              <span className="block text-amber-500 font-script mt-[-5px] sm:mt-[-20px] transform -rotate-6">
                Excellence
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-slate-300 text-sm sm:text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed mb-8 sm:mb-12 px-4"
          >
            Experience a symphony of flavors where traditional techniques meet modern innovation.
            Every dish tells a story of passion, heritage, and artistry.
          </motion.p>

          {/* CTA Buttons with Premium Effects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center w-full sm:w-auto px-4 sm:px-0"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <Link
                href="#menu"
                className="group relative w-full sm:w-auto block text-center px-8 sm:px-10 py-3 sm:py-4 border-2 border-primary text-primary rounded-full font-semibold overflow-hidden transition-all duration-300 text-sm sm:text-lg hover:bg-primary/10"
                style={{
                  boxShadow: '0 0 20px rgba(212, 175, 55, 0.2)'
                }}
              >
                <span className="relative z-10">View Menu</span>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <Link
                href="#reservations"
                className="relative w-full sm:w-auto block text-center px-8 sm:px-10 py-3 sm:py-4 bg-primary text-primary-foreground rounded-full font-semibold overflow-hidden group shadow-glow hover:shadow-glow-strong transition-all duration-300 text-sm sm:text-lg"
              >
                <span className="relative z-10">Book Now</span>
              </Link>
            </motion.div>
          </motion.div>
        </GsapScrollAnimation>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 sm:gap-3"
      >
        <span className="text-white/50 text-[10px] sm:text-xs uppercase tracking-[0.2em]">Scroll</span>
        <div className="w-[1px] h-12 sm:h-16 bg-gradient-to-b from-amber-500/0 via-amber-500/50 to-amber-500/0 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-1/2 bg-amber-500"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  )
}
