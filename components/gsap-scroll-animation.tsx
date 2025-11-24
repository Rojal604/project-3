"use client"

import { useEffect, useRef, ReactNode } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

interface GsapScrollAnimationProps {
    children: ReactNode
    animation?: "fadeUp" | "fadeIn" | "slideLeft" | "slideRight" | "scale" | "custom"
    duration?: number
    delay?: number
    stagger?: number
    className?: string
    toggleActions?: string
    customAnimation?: gsap.TweenVars
}

export function GsapScrollAnimation({
    children,
    animation = "fadeUp",
    duration = 1,
    delay = 0,
    stagger = 0,
    className = "",
    toggleActions = "play reverse play reverse", // play on enter, reverse on leave, play on enter back, reverse on leave back
    customAnimation,
}: GsapScrollAnimationProps) {
    const elementRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!elementRef.current) return

        const element = elementRef.current
        const children = element.children

        // Define animation presets
        const animations: Record<string, { from: gsap.TweenVars; to: gsap.TweenVars }> = {
            fadeUp: {
                from: { opacity: 0, y: 60 },
                to: { opacity: 1, y: 0 },
            },
            fadeIn: {
                from: { opacity: 0 },
                to: { opacity: 1 },
            },
            slideLeft: {
                from: { opacity: 0, x: 100 },
                to: { opacity: 1, x: 0 },
            },
            slideRight: {
                from: { opacity: 0, x: -100 },
                to: { opacity: 1, x: 0 },
            },
            scale: {
                from: { opacity: 0, scale: 0.8 },
                to: { opacity: 1, scale: 1 },
            },
        }

        const selectedAnimation = customAnimation
            ? { from: customAnimation, to: {} }
            : animations[animation] || animations.fadeUp

        // Set initial state
        gsap.set(children.length > 0 ? children : element, selectedAnimation.from)

        // Create scroll trigger animation
        const ctx = gsap.context(() => {
            gsap.to(children.length > 0 ? children : element, {
                ...selectedAnimation.to,
                duration,
                delay,
                stagger,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%", // Animation starts when element is 85% from top of viewport
                    end: "bottom 15%", // Animation reverses when element is 15% from bottom
                    toggleActions, // "play none none reverse" means: onEnter onLeave onEnterBack onLeaveBack
                    // markers: true, // Uncomment for debugging
                },
            })
        }, elementRef)

        return () => {
            ctx.revert() // Cleanup
        }
    }, [animation, duration, delay, stagger, toggleActions, customAnimation])

    return (
        <div ref={elementRef} className={className}>
            {children}
        </div>
    )
}
