import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Hero from '../components/Hero'
import Projects from '../components/Projects'
import Stack from '../components/Stack'
import Services from '../components/Services'
import Cta from '../components/Cta'

export default function Home() {
    const nextRef = useRef<HTMLElement>(null)
    const reduceMotion = useReducedMotion()

    // 0 when the next section's top enters the bottom of the viewport, 1 when it reaches the top.
    const { scrollYProgress } = useScroll({ target: nextRef, offset: ['start end', 'start start'] })

    // The hero stays pinned and gets pulled up and away as the next section slides over it.
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '-14%'])
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.7, 0])

    return (
        <>
            <motion.div
                className={reduceMotion ? undefined : 'sticky top-0'}
                style={reduceMotion ? undefined : { scale, y, opacity, transformOrigin: '50% 0%' }}
            >
                <Hero />
            </motion.div>

            <Stack ref={nextRef} />
            <Projects />
            <Services />
            <Cta />
        </>
    )
}
