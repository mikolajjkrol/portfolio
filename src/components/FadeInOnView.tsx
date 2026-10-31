import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from 'framer-motion'
import { useEffect, useRef, type ReactNode } from 'react'
import { useSlideExit } from './slideExit'

// Gentle ease-out: quick start, soft landing.
const ease = [0.25, 0.46, 0.45, 0.94] as const

type FadeInOnViewProps = {
    children: ReactNode
    delay?: number
    duration?: number
    // Starting vertical offset in px; animates to 0.
    y?: number
    className?: string
    once?: boolean
    // useInView root margin — how far into the viewport before it triggers.
    margin?: `${number}px`
    // Order in which this fades out when its StickySlide releases (0 = first). false = never.
    exit?: number | false
}

export default function FadeInOnView({
    children,
    delay = 0.2,
    duration = 0.65,
    y = 22,
    className = '',
    once = true,
    margin = '-72px',
    exit = 0,
}: FadeInOnViewProps) {
    const ref = useRef(null)
    const inView = useInView(ref, { once, margin })
    const reduceMotion = useReducedMotion()

    // Fade-in runs on a timer once in view; fade-out follows scroll. Both drive one element,
    // so they're combined into a single opacity / y instead of fighting over the same style.
    const enter = useMotionValue(reduceMotion ? 1 : 0)
    const leave = useSlideExit(exit)
    const opacity = useTransform([enter, leave.opacity], ([e, l]: number[]) => e * l)
    const offset = useTransform([enter, leave.y], ([e, l]: number[]) => (1 - e) * y + l)

    useEffect(() => {
        if (!inView || reduceMotion) return
        const controls = animate(enter, 1, { duration, ease, delay })
        return () => controls.stop()
    }, [inView, reduceMotion, enter, duration, delay])

    return (
        <motion.div ref={ref} className={className} style={{ opacity, y: offset }}>
            {children}
        </motion.div>
    )
}
