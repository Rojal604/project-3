"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { ShoppingCart, Sparkles } from "lucide-react"
import { GsapScrollAnimation } from "@/components/gsap-scroll-animation"
import { getImagePath } from "@/lib/utils"

const menuItems = [
  {
    id: 1,
    name: "Pan-Seared Scallops",
    description: "Succulent scallops with seasonal vegetables and champagne beurre blanc",
    price: "$38",
    image: getImagePath("/pan-seared-scallops-seafood-dish.jpg"),
  },
  {
    id: 2,
    name: "Wagyu Ribeye",
    description: "Premium Japanese Wagyu with truffle mashed potatoes and red wine reduction",
    price: "$52",
    image: getImagePath("/wagyu-ribeye-steak-premium-beef.jpg"),
  },
  {
    id: 3,
    name: "Lobster Thermidor",
    description: "Classic French lobster with creamy sauce, caviar, and asparagus",
    price: "$45",
    image: getImagePath("/lobster-thermidor-elegant-seafood.jpg"),
  },
  {
    id: 4,
    name: "Duck Confit",
    description: "Slow-cooked duck leg with cherry gastrique and wild mushrooms",
    price: "$42",
    image: getImagePath("/duck-confit-french-cuisine.jpg"),
  },
]

export function FeaturedMenu() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: "easeOut" as const },
    },
  }

  return (
    <section id="menu" className="py-24 px-4 bg-gradient-to-b from-background via-background to-secondary/20 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header with Enhanced Animation */}
        <GsapScrollAnimation className="text-center mb-20" animation="fadeUp">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Decorative Line */}
            <motion.div
              className="flex items-center justify-center gap-4 mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary"></div>
              <Sparkles className="text-primary" size={24} />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary"></div>
            </motion.div>

            <motion.h2
              className="text-5xl md:text-7xl font-serif font-bold text-white mb-6"
              style={{
                textShadow: '0 0 40px rgba(212, 175, 55, 0.6), 0 0 80px rgba(212, 175, 55, 0.3)'
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Featured Menu
            </motion.h2>

            <motion.p
              className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Discover our signature dishes crafted by our award-winning chefs
            </motion.p>
          </motion.div>
        </GsapScrollAnimation>

        {/* Menu Grid with Stagger Animation */}
        <GsapScrollAnimation animation="fadeUp" stagger={0.1}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
          >
            {menuItems.map((item, index) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                whileHover={{ y: -12, scale: 1.03 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="group relative cursor-pointer"
              >
                {/* Card with Enhanced Design */}
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-card/80 to-card/60 backdrop-blur-sm border border-primary/20 hover:border-primary/50 transition-all duration-500 h-full">
                  {/* Image Container */}
                  <div className="relative h-56 overflow-hidden">
                    <motion.img
                      src={item.image || getImagePath("/placeholder.svg")}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.15 }}
                      transition={{ duration: 0.6 }}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                    {/* Price Badge */}
                    <motion.div
                      className="absolute top-4 right-4 bg-primary text-black px-4 py-2 rounded-full font-bold text-lg shadow-lg"
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 + 0.3, type: "spring" }}
                    >
                      {item.price}
                    </motion.div>

                    {/* Hover Overlay with Order Button */}
                    <motion.div
                      className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={false}
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link
                          href="#reservations"
                          className="flex items-center gap-2 px-6 py-3 bg-primary text-black rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <ShoppingCart size={20} />
                          Order Now
                        </Link>
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <motion.h3
                      className="text-2xl font-serif font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300"
                      style={{
                        textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                      }}
                    >
                      {item.name}
                    </motion.h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom Accent Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </GsapScrollAnimation>

        {/* View Full Menu CTA */}
        <GsapScrollAnimation animation="scale" delay={0.4}>
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="#menu"
                className="inline-block px-10 py-4 border-2 border-primary text-primary rounded-full font-semibold text-lg hover:bg-primary/10 transition-all duration-300"
                style={{
                  boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)'
                }}
              >
                View Full Menu
              </Link>
            </motion.div>
          </motion.div>
        </GsapScrollAnimation>
      </div>
    </section>
  )
}
