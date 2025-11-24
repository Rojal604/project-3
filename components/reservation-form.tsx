"use client"

import type React from "react"
import { useState, useRef, useMemo } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"
import { User, Mail, Users, Phone, Calendar, Clock, CheckCircle2, Sparkles, Star } from "lucide-react"
import { format } from "date-fns"

import { GsapScrollAnimation } from "@/components/gsap-scroll-animation"
import { DatePicker } from "@/components/ui/date-picker"
import { TimePicker } from "@/components/ui/time-picker"
import { PhoneInput } from "@/components/ui/phone-input"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Stable particle component to avoid hydration errors
function ParticleField({ count, opacity }: { count: number; opacity: number }) {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: (i * 41 + 19) % 100, // Deterministic pseudo-random
      top: (i * 47 + 29) % 100,
      duration: 3 + (i % 3) * 0.7,
      delay: (i * 0.9) % 3,
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
            y: [0, -30, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
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


export function ReservationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: undefined as Date | undefined,
    time: "",
    guests: "2",
  })

  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Magnetic button effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const buttonX = useSpring(0, { stiffness: 150, damping: 15 })
  const buttonY = useSpring(0, { stiffness: 150, damping: 15 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2)

    if (distance < 150) {
      buttonX.set(distanceX * 0.15)
      buttonY.set(distanceY * 0.15)
    } else {
      buttonX.set(0)
      buttonY.set(0)
    }
  }

  const handleMouseLeave = () => {
    buttonX.set(0)
    buttonY.set(0)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleValueChange = (name: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    console.log("Reservation submitted:", {
      ...formData,
      date: formData.date ? format(formData.date, "yyyy-MM-dd") : "",
    })

    setIsSubmitting(false)
    setIsSuccess(true)

    // Reset success message after 5 seconds
    setTimeout(() => {
      setIsSuccess(false)
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: undefined,
        time: "",
        guests: "2",
      })
    }, 5000)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 0.5,
      } as const,
    },
  }

  const headingVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
      } as const,
    },
  }

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 20,
      },
    },
  }

  // Helper to determine if a field is active (focused or has value)
  const isActive = (fieldName: string, value: any) => focusedField === fieldName || (value && value.toString().length > 0)

  const title = "Reserve Your "
  const highlightText = "Experience"

  return (
    <section id="reservations" className="relative py-32 px-4 overflow-hidden">
      {/* Enhanced Background Elements with Parallax */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 z-0" />

      {/* Animated grain texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.07] mix-blend-soft-light pointer-events-none z-0 animate-grain"></div>

      {/* Multi-layer animated orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-40 pointer-events-none">
        <motion.div
          className="absolute top-[-15%] left-[-15%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-amber-500/20 to-orange-600/10 blur-[140px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-[-15%] right-[-15%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-blue-600/15 to-purple-600/10 blur-[140px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute top-[40%] left-[50%] w-[40%] h-[40%] rounded-full bg-gradient-to-br from-amber-400/10 to-yellow-500/5 blur-[100px]"
          animate={{
            x: ["-50%", "-45%", "-50%"],
            y: ["-50%", "-55%", "-50%"],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Floating particles */}
      <ParticleField count={15} opacity={30} />


      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Enhanced Header with Character Animation */}
        <GsapScrollAnimation className="text-center mb-24" animation="fadeUp">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={headingVariants}
          >
            <motion.span
              className="inline-block py-2 px-4 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-[0.25em] mb-8 uppercase shadow-lg shadow-amber-500/10"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(245, 158, 11, 0.3)" }}
            >
              <span className="flex items-center gap-2">
                <Star size={12} className="animate-pulse" />
                Book a Table
                <Star size={12} className="animate-pulse" />
              </span>
            </motion.span>

            <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-8 tracking-tight">
              <motion.span className="inline-block" variants={headingVariants}>
                {title.split("").map((char, index) => (
                  <motion.span
                    key={`title-${index}`}
                    variants={letterVariants}
                    className="inline-block"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.span>
              <br />
              <motion.span
                className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 animate-gradient bg-[length:200%_auto]"
                variants={headingVariants}
              >
                {highlightText.split("").map((char, index) => (
                  <motion.span
                    key={`highlight-${index}`}
                    variants={letterVariants}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.span>
            </h2>

            <motion.p
              className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              Secure your spot for an unforgettable evening of culinary excellence.
              <br />
              <span className="text-amber-400/80 text-sm">We recommend booking at least 24 hours in advance.</span>
            </motion.p>
          </motion.div>
        </GsapScrollAnimation>

        {/* Enhanced Form Container */}
        <GsapScrollAnimation animation="scale" delay={0.2}>
          <motion.div
            className="relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {/* Multi-layer Glassmorphism Card with animated border */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-white/[0.04] to-white/[0.02] backdrop-blur-3xl rounded-[2rem] border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.5)]" />

            {/* Animated gradient border */}
            <div className="absolute inset-0 rounded-[2rem] p-[1px] bg-gradient-to-r from-amber-500/20 via-transparent to-amber-500/20 animate-gradient bg-[length:200%_auto] opacity-50" />

            {/* Inner glow */}
            <div className="absolute inset-0 rounded-[2rem] shadow-[inset_0_0_60px_rgba(245,158,11,0.05)]" />

            <form
              onSubmit={handleSubmit}
              className="relative p-8 md:p-14 overflow-hidden rounded-[2rem]"
            >
              {/* Enhanced decorative elements */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-amber-500/10 to-transparent rounded-tl-[2rem]" />
              <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-amber-500/10 to-transparent rounded-br-[2rem]" />

              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8, rotateX: -15 }}
                    animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                    exit={{ opacity: 0, scale: 0.8, rotateX: 15 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="flex flex-col items-center justify-center py-24 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                      className="relative w-28 h-28 bg-gradient-to-br from-green-500/30 to-emerald-500/20 rounded-full flex items-center justify-center mb-10"
                    >
                      <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
                      <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-transparent rounded-full blur-xl" />
                      <CheckCircle2 className="w-14 h-14 text-green-400 relative z-10" />
                    </motion.div>

                    <motion.h3
                      className="text-4xl md:text-5xl font-serif font-bold text-white mb-5"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      Reservation Confirmed!
                    </motion.h3>

                    <motion.p
                      className="text-slate-300 text-lg max-w-md mx-auto mb-10 leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      We look forward to hosting you on{" "}
                      <span className="text-amber-400 font-semibold">
                        {formData.date ? format(formData.date, "MMMM do") : ""}
                      </span>{" "}
                      at{" "}
                      <span className="text-amber-400 font-semibold">{formData.time}</span>.
                    </motion.p>

                    <motion.button
                      type="button"
                      onClick={() => setIsSuccess(false)}
                      className="group px-10 py-4 bg-white/5 hover:bg-white/10 border border-white/20 rounded-full text-white transition-all duration-300 flex items-center gap-3 hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:scale-105"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Sparkles size={18} className="text-amber-400 group-hover:animate-spin" />
                      Make Another Reservation
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div key="form" className="space-y-6 sm:space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7">
                      {/* Name Field */}
                      <motion.div variants={itemVariants} className="relative group">
                        <motion.div
                          className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 pointer-events-none z-10`}
                          animate={{
                            color: isActive("name", formData.name) ? "#fbbf24" : "#64748b",
                            scale: isActive("name", formData.name) ? 1.1 : 1,
                          }}
                        >
                          <User size={20} />
                        </motion.div>
                        <Input
                          type="text"
                          name="name"
                          placeholder="Full Name"
                          value={formData.name}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedField("name")}
                          onBlur={() => setFocusedField(null)}
                          required
                          className="pl-12 h-16 bg-white/[0.03] border-white/10 hover:border-white/20 focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/20 focus:bg-white/[0.05] text-white placeholder:text-slate-500 transition-all duration-300 rounded-2xl shadow-lg shadow-black/10 hover:shadow-amber-500/5"
                        />
                        {isActive("name", formData.name) && (
                          <motion.div
                            className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-500/10 to-transparent pointer-events-none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          />
                        )}
                      </motion.div>

                      {/* Email Field */}
                      <motion.div variants={itemVariants} className="relative group">
                        <motion.div
                          className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 pointer-events-none z-10`}
                          animate={{
                            color: isActive("email", formData.email) ? "#fbbf24" : "#64748b",
                            scale: isActive("email", formData.email) ? 1.1 : 1,
                          }}
                        >
                          <Mail size={20} />
                        </motion.div>
                        <Input
                          type="email"
                          name="email"
                          placeholder="Email Address"
                          value={formData.email}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedField("email")}
                          onBlur={() => setFocusedField(null)}
                          required
                          className="pl-12 h-16 bg-white/[0.03] border-white/10 hover:border-white/20 focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/20 focus:bg-white/[0.05] text-white placeholder:text-slate-500 transition-all duration-300 rounded-2xl shadow-lg shadow-black/10 hover:shadow-amber-500/5"
                        />
                        {isActive("email", formData.email) && (
                          <motion.div
                            className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-500/10 to-transparent pointer-events-none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          />
                        )}
                      </motion.div>

                      {/* Phone Field */}
                      <motion.div variants={itemVariants} className="relative group">
                        <label className="block text-sm font-semibold text-slate-400 mb-3 transition-colors group-hover:text-amber-400/80">
                          Phone Number
                        </label>
                        <PhoneInput
                          value={formData.phone}
                          onChange={(value) => handleValueChange("phone", value)}
                          className="h-16 [&>input]:bg-white/[0.03] [&>input]:border-white/10 [&>input]:hover:border-white/20 [&>input]:text-white [&>input]:placeholder:text-slate-500 [&>input]:focus:border-amber-500/60 [&>input]:focus:ring-2 [&>input]:focus:ring-amber-500/20 [&>input]:focus:bg-white/[0.05] [&>input]:rounded-2xl [&>input]:transition-all [&>input]:shadow-lg [&>input]:shadow-black/10 [&>button]:bg-white/[0.03] [&>button]:border-white/10 [&>button]:text-slate-300 [&>button]:hover:bg-white/10 [&>button]:rounded-l-2xl [&>button]:transition-all"
                        />
                      </motion.div>

                      {/* Guests Field */}
                      <motion.div variants={itemVariants} className="relative group">
                        <label className="block text-sm font-semibold text-slate-400 mb-3 transition-colors group-hover:text-amber-400/80">
                          Number of Guests
                        </label>
                        <div className="relative">
                          <motion.div
                            className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none transition-all duration-300`}
                            animate={{
                              color: formData.guests ? "#fbbf24" : "#64748b",
                              scale: formData.guests ? 1.1 : 1,
                            }}
                          >
                            <Users size={20} />
                          </motion.div>
                          <Select
                            value={formData.guests}
                            onValueChange={(value) => handleValueChange("guests", value)}
                          >
                            <SelectTrigger
                              className="w-full h-16 bg-white/[0.03] border-white/10 hover:border-white/20 focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/20 text-white pl-12 transition-all duration-300 rounded-2xl shadow-lg shadow-black/10 hover:shadow-amber-500/5"
                            >
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-900/98 backdrop-blur-2xl border-white/20 text-white rounded-2xl shadow-2xl">
                              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                                <SelectItem
                                  key={num}
                                  value={num.toString()}
                                  className="focus:bg-amber-500/20 focus:text-amber-400 cursor-pointer rounded-xl transition-all"
                                >
                                  {num} {num === 1 ? "Guest" : "Guests"}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </motion.div>

                      {/* Date Field */}
                      <motion.div variants={itemVariants} className="relative group">
                        <label className="block text-sm font-semibold text-slate-400 mb-3 transition-colors group-hover:text-amber-400/80">
                          Date
                        </label>
                        <div className="relative">
                          <motion.div
                            className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none transition-colors duration-300`}
                            animate={{
                              color: formData.date ? "#fbbf24" : "#64748b",
                              scale: formData.date ? 1.1 : 1,
                            }}
                          >
                            <Calendar size={20} />
                          </motion.div>
                          <DatePicker
                            date={formData.date}
                            setDate={(date) => handleValueChange("date", date)}
                            className="h-16 pl-12 bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.05] focus:border-amber-500/60 text-white w-full justify-start text-left font-normal rounded-2xl transition-all shadow-lg shadow-black/10 hover:shadow-amber-500/5"
                          />
                        </div>
                      </motion.div>

                      {/* Time Field */}
                      <motion.div variants={itemVariants} className="relative group">
                        <label className="block text-sm font-semibold text-slate-400 mb-3 transition-colors group-hover:text-amber-400/80">
                          Time
                        </label>
                        <div className="relative">
                          <motion.div
                            className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none transition-colors duration-300`}
                            animate={{
                              color: formData.time ? "#fbbf24" : "#64748b",
                              scale: formData.time ? 1.1 : 1,
                            }}
                          >
                            <Clock size={20} />
                          </motion.div>
                          <TimePicker
                            time={formData.time}
                            setTime={(time) => handleValueChange("time", time)}
                            className="h-16 pl-12 bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.05] focus:border-amber-500/60 text-white w-full justify-start text-left font-normal rounded-2xl transition-all shadow-lg shadow-black/10 hover:shadow-amber-500/5"
                          />
                        </div>
                      </motion.div>
                    </div>

                    {/* Enhanced Submit Button with Magnetic Effect */}
                    <motion.div
                      variants={itemVariants}
                      className="flex justify-center pt-10"
                      onMouseMove={handleMouseMove}
                      onMouseLeave={handleMouseLeave}
                    >
                      <motion.button
                        ref={buttonRef}
                        type="submit"
                        disabled={isSubmitting}
                        style={{ x: buttonX, y: buttonY }}
                        className="group relative px-20 py-6 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 bg-[length:200%_auto] text-white rounded-full font-serif font-bold text-xl tracking-wide overflow-hidden transition-all duration-500 hover:shadow-[0_0_60px_rgba(245,158,11,0.7),0_0_100px_rgba(245,158,11,0.4)] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 animate-gradient"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="relative z-10 flex items-center gap-3">
                          {isSubmitting ? (
                            <>
                              <motion.svg
                                className="h-6 w-6 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              >
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </motion.svg>
                              Processing...
                            </>
                          ) : (
                            <>
                              <motion.div
                                animate={{ rotate: [0, 15, -15, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              >
                                <Sparkles size={20} />
                              </motion.div>
                              Confirm Reservation
                            </>
                          )}
                        </span>

                        {/* Enhanced Liquid Animation Effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-amber-600 via-amber-700 to-amber-600 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out"
                          style={{ backgroundSize: "200% auto" }}
                        />

                        {/* Shimmer effect */}
                        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                          <motion.div
                            className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12"
                            animate={{ x: ["-200%", "200%"] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                          />
                        </div>
                      </motion.button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </GsapScrollAnimation>
      </div>
    </section>
  )
}
