"use client"
import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { GsapScrollAnimation } from "@/components/gsap-scroll-animation"

const testimonials = [
  {
    id: 1,
    name: "Elizabeth Carter",
    role: "Food Critic",
    content: "An exceptional dining experience from start to finish. The attention to detail is remarkable.",
    rating: 5,
    image: "/avatars/elizabeth.png",
  },
  {
    id: 2,
    name: "James Mitchell",
    role: "Regular Guest",
    content: "Every visit to Luxe is a celebration. The ambiance, service, and food are simply perfection.",
    rating: 5,
    image: "/avatars/james.png",
  },
  {
    id: 3,
    name: "Marie Dubois",
    role: "Food Blogger",
    content: "The flavor combinations are innovative yet respectful of tradition. A culinary masterpiece.",
    rating: 5,
    image: "/avatars/marie.png",
  },
  {
    id: 4,
    name: "David Wong",
    role: "Wine Enthusiast",
    content: "The wine pairings are expertly curated. This restaurant truly understands the art of fine dining.",
    rating: 5,
    image: "/avatars/david.png",
  },
]

export function Testimonials() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: "easeOut" as const },
    },
  }

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-secondary/20 via-background to-background relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header with Enhanced Design */}
        <GsapScrollAnimation className="text-center mb-20" animation="fadeUp">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Decorative Quote Icon */}
            <motion.div
              className="flex items-center justify-center mb-6"
              initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              <div className="relative">
                <Quote className="text-primary" size={48} />
                <div className="absolute inset-0 blur-xl bg-primary/30"></div>
              </div>
            </motion.div>

            <motion.h2
              className="text-5xl md:text-7xl font-serif font-bold text-white mb-6"
              style={{
                textShadow: '0 0 40px rgba(212, 175, 55, 0.6), 0 0 80px rgba(212, 175, 55, 0.3)'
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Guest Reviews
            </motion.h2>

            <motion.p
              className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Hear from our cherished guests
            </motion.p>
          </motion.div>
        </GsapScrollAnimation>

        {/* Testimonials Grid with Enhanced Cards */}
        <GsapScrollAnimation animation="fadeUp" stagger={0.1}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="group relative"
              >
                {/* Premium Card Design */}
                <div className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-sm border border-primary/20 hover:border-primary/50 transition-all duration-500 h-full overflow-hidden">
                  {/* Glow Effect on Hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5"></div>
                  </div>

                  {/* Large Decorative Quote Mark */}
                  <motion.div
                    className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                    initial={{ scale: 0, rotate: -45 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Quote size={80} className="text-primary" />
                  </motion.div>

                  {/* Animated Stars */}
                  <div className="flex gap-1 mb-6 relative z-10">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0, rotate: -180 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: index * 0.1 + i * 0.1,
                          type: "spring",
                          stiffness: 200
                        }}
                      >
                        <Star
                          size={24}
                          className="fill-primary text-primary drop-shadow-lg"
                          style={{
                            filter: 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.6))'
                          }}
                        />
                      </motion.div>
                    ))}
                  </div>

                  {/* Quote Text with Better Typography */}
                  <motion.p
                    className="text-gray-200 text-lg md:text-xl mb-8 italic leading-relaxed relative z-10"
                    style={{
                      textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                    }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                  >
                    <span className="text-primary text-3xl font-serif">"</span>
                    {testimonial.content}
                    <span className="text-primary text-3xl font-serif">"</span>
                  </motion.p>

                  {/* Author Info with Enhanced Design */}
                  <motion.div
                    className="flex items-center gap-4 relative z-10"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.5 }}
                  >
                    <div className="relative">
                      <img
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-primary/30 group-hover:border-primary/60 transition-all duration-300"
                      />
                      <div className="absolute inset-0 rounded-full bg-primary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div>
                      <p className="font-serif font-bold text-white text-lg group-hover:text-primary transition-colors duration-300">
                        {testimonial.name}
                      </p>
                      <p className="text-gray-400 text-sm">{testimonial.role}</p>
                    </div>
                  </motion.div>

                  {/* Bottom Accent Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </GsapScrollAnimation>
      </div>
    </section>
  )
}
