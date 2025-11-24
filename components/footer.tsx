
"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, ArrowRight } from "lucide-react"
import { GsapScrollAnimation } from "@/components/gsap-scroll-animation"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    explore: [
      { name: "Menu", href: "#menu" },
      { name: "Reservations", href: "#reservations" },
      { name: "About Us", href: "#about" },
      { name: "Private Events", href: "#events" },
    ],
    legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" },
    ],
  }

  return (
    <footer className="relative bg-slate-950 border-t border-white/5 pt-24 pb-12 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-soft-light pointer-events-none"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-12 sm:mb-20">
          {/* Brand Column */}
          <GsapScrollAnimation animation="fadeUp">
            <div className="space-y-6">
              <h3 className="text-3xl font-serif font-bold text-amber-500 tracking-tight">Luxe</h3>
              <p className="text-slate-400 leading-relaxed max-w-xs">
                Experience the pinnacle of fine dining where culinary artistry meets exceptional service in an atmosphere of refined elegance.
              </p>
              <div className="flex gap-4 pt-2">
                {[Facebook, Instagram, Twitter].map((Icon, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-amber-500 hover:border-amber-500/50 hover:bg-amber-500/10 transition-all duration-300"
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>
          </GsapScrollAnimation>

          {/* Quick Links */}
          <GsapScrollAnimation animation="fadeUp" delay={0.1}>
            <div>
              <h4 className="text-lg font-serif font-bold text-white mb-8 tracking-wide">EXPLORE</h4>
              <ul className="space-y-4">
                {footerLinks.explore.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="group flex items-center text-slate-400 hover:text-amber-500 transition-colors duration-300"
                    >
                      <span className="w-0 group-hover:w-3 h-px bg-amber-500 mr-0 group-hover:mr-3 transition-all duration-300 opacity-0 group-hover:opacity-100"></span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </GsapScrollAnimation>

          {/* Contact Info */}
          <GsapScrollAnimation animation="fadeUp" delay={0.2}>
            <div>
              <h4 className="text-lg font-serif font-bold text-white mb-8 tracking-wide">CONTACT</h4>
              <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/10 transition-colors duration-300">
                    <MapPin size={18} className="text-amber-500" />
                  </div>
                  <div>
                    <p className="text-white font-medium mb-1">Visit Us</p>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      123 Culinary Lane<br />
                      San Francisco, CA 94103
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/10 transition-colors duration-300">
                    <Phone size={18} className="text-amber-500" />
                  </div>
                  <div>
                    <p className="text-white font-medium mb-1">Call Us</p>
                    <p className="text-slate-400 text-sm">+1 (415) 555-0100</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/10 transition-colors duration-300">
                    <Mail size={18} className="text-amber-500" />
                  </div>
                  <div>
                    <p className="text-white font-medium mb-1">Email Us</p>
                    <p className="text-slate-400 text-sm">info@luxedining.com</p>
                  </div>
                </div>
              </div>
            </div>
          </GsapScrollAnimation>

          {/* Newsletter */}
          <GsapScrollAnimation animation="fadeUp" delay={0.3}>
            <div>
              <h4 className="text-lg font-serif font-bold text-white mb-8 tracking-wide">NEWSLETTER</h4>
              <p className="text-slate-400 mb-6 text-sm">
                Subscribe to receive updates on new menu items and special events.
              </p>
              <form className="relative" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-5 pr-12 text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all duration-300"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white hover:bg-amber-600 transition-colors duration-300"
                >
                  <ArrowRight size={18} />
                </button>
              </form>
            </div>
          </GsapScrollAnimation>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            &copy; {currentYear} Luxe Restaurant. All rights reserved.
          </p>
          <div className="flex gap-8">
            {footerLinks.legal.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-slate-500 text-sm hover:text-amber-500 transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
