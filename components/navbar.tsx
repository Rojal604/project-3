"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const links = ["Home", "Menu", "About", "Reservations"]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
        ? "glass-strong shadow-premium py-2"
        : "bg-transparent py-4"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo with Gradient */}
          <Link href="/" className="text-2xl font-serif font-bold gradient-text hover:scale-105 transition-transform">
            Luxe
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="group relative text-foreground hover:text-primary transition-colors duration-300 font-medium text-sm"
              >
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary/50 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>

          {/* Book a Table Button with Glow */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="#reservations"
              className="hidden md:block px-6 py-2 bg-primary text-primary-foreground rounded-full font-medium shadow-glow hover:shadow-glow-strong transition-all duration-300"
            >
              Book a Table
            </Link>
          </motion.div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground hover:text-primary transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation - Full Screen Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            >
              {/* Glassmorphism Background */}
              <div className="absolute inset-0 glass-strong" />

              {/* Close Button */}
              <motion.button
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                onClick={() => setIsOpen(false)}
                className="absolute top-8 right-8 z-50 p-3 rounded-full glass hover:bg-primary/20 transition-all duration-300 hover:scale-110"
              >
                <X size={28} className="text-foreground hover:text-primary transition-colors" />
              </motion.button>

              {/* Menu Content */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="relative h-full flex flex-col items-center justify-center space-y-8 px-8"
                onClick={(e) => e.stopPropagation()}
              >
                {links.map((link, index) => (
                  <motion.a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="text-3xl font-serif text-foreground hover:text-primary transition-all duration-300 hover:scale-110"
                    onClick={() => setIsOpen(false)}
                  >
                    {link}
                  </motion.a>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + links.length * 0.1 }}
                  className="pt-4"
                >
                  <Link
                    href="#reservations"
                    className="block px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium text-lg shadow-glow hover:shadow-glow-strong transition-all duration-300 hover:scale-105"
                    onClick={() => setIsOpen(false)}
                  >
                    Book a Table
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
