"use client"
import { motion } from "framer-motion"
import { GsapScrollAnimation } from "@/components/gsap-scroll-animation"
import { Quote, Sparkles } from "lucide-react"
import { useMemo } from "react"
import { getImagePath } from "@/lib/utils"

// Stable particle component to avoid hydration errors
function ParticleField({ count, opacity }: { count: number; opacity: number }) {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: (i * 37 + 23) % 100, // Deterministic pseudo-random
      top: (i * 53 + 17) % 100,
      duration: 4 + (i % 3),
      delay: (i * 1.3) % 4,
    }))
  }, [count])

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute w-1 h-1 bg-amber-400/${opacity} rounded-full`}
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0, 0.8, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}


export function About() {
  // Text content split into words for animation
  const paragraph1 = "Founded in 2008, Luxe has been a beacon of culinary excellence and refined dining for over a decade. Our journey began with a simple vision: to create a sanctuary where exceptional food meets impeccable service."
  const paragraph2 = "Each dish tells a story of passion, tradition, and innovation. Our chefs source only the finest ingredients, working closely with local farmers and artisans to bring you an unforgettable experience."
  const paragraph3 = "Whether you're celebrating a special occasion or seeking an intimate evening, Luxe provides the perfect backdrop for life's most cherished moments."

  const words1 = paragraph1.split(" ")
  const words2 = paragraph2.split(" ")
  const words3 = paragraph3.split(" ")

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.015,
        delayChildren: 0.1,
      },
    },
  }

  const wordVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: custom * 0.1,
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    }),
  }

  return (
    <section id="about" className="relative py-32 px-4 overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 z-0" />

      {/* Animated grain texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.07] mix-blend-soft-light pointer-events-none z-0 animate-grain"></div>

      {/* Multi-layer animated orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-30 pointer-events-none">
        <motion.div
          className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-amber-500/15 to-orange-600/10 blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-[20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-blue-600/10 to-purple-600/10 blur-[120px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.15, 0.3],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>


      {/* Floating particles */}
      <ParticleField count={12} opacity={20} />


      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Enhanced Text Content */}
          <GsapScrollAnimation animation="slideLeft">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Decorative quote mark */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="absolute -top-6 -left-4 text-amber-500/20"
              >
                <Quote size={80} fill="currentColor" />
              </motion.div>

              {/* Heading with enhanced styling */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="mb-8 sm:mb-10 relative"
              >
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-4 relative">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 animate-gradient bg-[length:200%_auto]">
                    Our Story
                  </span>
                </h2>

                {/* Decorative underline */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "120px" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="h-1 bg-gradient-to-r from-amber-500 to-transparent rounded-full"
                />
              </motion.div>

              {/* Paragraph 1 with word-by-word animation */}
              <motion.p
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-slate-300 text-base sm:text-lg md:text-xl leading-relaxed mb-6"
              >
                {words1.map((word, index) => (
                  <motion.span
                    key={`p1-${index}`}
                    variants={wordVariants}
                    className="inline-block mr-[0.3em]"
                  >
                    {word === "Luxe" ? (
                      <span className="text-amber-400 font-bold">{word}</span>
                    ) : (
                      word
                    )}
                  </motion.span>
                ))}
              </motion.p>

              {/* Paragraph 2 with word-by-word animation */}
              <motion.p
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-slate-300 text-base sm:text-lg md:text-xl leading-relaxed mb-6"
              >
                {words2.map((word, index) => (
                  <motion.span
                    key={`p2-${index}`}
                    variants={wordVariants}
                    className="inline-block mr-[0.3em]"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.p>

              {/* Paragraph 3 with word-by-word animation */}
              <motion.p
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-slate-300 text-base sm:text-lg md:text-xl leading-relaxed"
              >
                {words3.map((word, index) => (
                  <motion.span
                    key={`p3-${index}`}
                    variants={wordVariants}
                    className="inline-block mr-[0.3em]"
                  >
                    {word === "Luxe" ? (
                      <span className="text-amber-400 font-bold">{word}</span>
                    ) : (
                      word
                    )}
                  </motion.span>
                ))}
              </motion.p>

              {/* Decorative sparkles */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex gap-2 mt-8"
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      rotate: [0, 180, 360],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  >
                    <Sparkles size={16} className="text-amber-400/60" />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </GsapScrollAnimation>

          {/* Right: Enhanced Bento Grid Image Gallery */}
          <GsapScrollAnimation animation="scale" delay={0.2}>
            <div className="grid grid-cols-2 gap-2 sm:gap-4 relative">
              {/* Top Left - Restaurant Interior */}
              <motion.div
                custom={0}
                variants={imageVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, rotate: 2, z: 50 }}
                transition={{ duration: 0.4 }}
                className="relative col-span-1 row-span-1 rounded-2xl overflow-hidden h-56 group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                <div className="absolute inset-0 border-2 border-amber-500/0 group-hover:border-amber-500/40 rounded-2xl transition-all duration-500 z-10" />
                <motion.img
                  src={getImagePath("/restaurant-interior-elegant-dining.jpg")}
                  alt="Restaurant interior"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
              </motion.div>

              {/* Top Right - Chef */}
              <motion.div
                custom={1}
                variants={imageVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, rotate: -2, z: 50 }}
                transition={{ duration: 0.4 }}
                className="relative col-span-1 row-span-1 rounded-2xl overflow-hidden h-56 group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-bl from-amber-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                <div className="absolute inset-0 border-2 border-amber-500/0 group-hover:border-amber-500/40 rounded-2xl transition-all duration-500 z-10" />
                <motion.img
                  src={getImagePath("/chef-cooking-kitchen-professional.jpg")}
                  alt="Chef at work"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
              </motion.div>

              {/* Bottom - Large Dish Image */}
              <motion.div
                custom={2}
                variants={imageVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ scale: 1.03, z: 50 }}
                transition={{ duration: 0.4 }}
                className="relative col-span-2 row-span-1 rounded-2xl overflow-hidden h-64 group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-amber-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                <div className="absolute inset-0 border-2 border-amber-500/0 group-hover:border-amber-500/40 rounded-2xl transition-all duration-500 z-10" />
                <motion.img
                  src={getImagePath("/fine-dining-plated-dish-gourmet.jpg")}
                  alt="Fine dining dish"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                {/* Overlay text on hover */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute bottom-0 left-0 right-0 p-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                >
                  <p className="text-white text-sm font-light">Exquisite culinary artistry</p>
                </motion.div>
              </motion.div>

              {/* Decorative corner accents */}
              <div className="absolute -top-3 -left-3 w-20 h-20 border-l-2 border-t-2 border-amber-500/30 rounded-tl-2xl pointer-events-none" />
              <div className="absolute -bottom-3 -right-3 w-20 h-20 border-r-2 border-b-2 border-amber-500/30 rounded-br-2xl pointer-events-none" />
            </div>
          </GsapScrollAnimation>
        </div>
      </div>
    </section>
  )
}
