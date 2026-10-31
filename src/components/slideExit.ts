import { useMotionValue, useTransform, type MotionValue } from 'framer-motion'
import { createContext, useContext } from 'react'

// Provided by StickySlide so elements inside it can fade out as the slide releases.
export const SlideExitContext = createContext<{ progress: MotionValue<number>; vh: number; active: boolean } | null>(null)

// Exit timing, in vh of scroll measured from the moment the slide releases.
const exitStart = -10 // first element starts fading just before the release, while still pinned
const exitStagger = 8 // each step later starts this much further down the scroll
const exitLength = 30 // how long a single element takes to fade
const exitRise = 60 // px each element drifts up while fading

// Opacity and y offset for an element that fades out `step` steps after the first one.
// Outside a slide, or when the slide doesn't animate, the element stays fully visible.
export function useSlideExit(step: number | false) {
    const slide = useContext(SlideExitContext)
    const idle = useMotionValue(0)
    const vh = slide?.vh ?? 100
    const release = (vh - 100) / vh
    const start = exitStart + (step || 0) * exitStagger
    const range = [Math.max(0, release + start / vh), release + (start + exitLength) / vh]

    const progress = slide?.active && step !== false ? slide.progress : idle
    const opacity = useTransform(progress, range, [1, 0], { clamp: true })
    const y = useTransform(progress, range, [0, -exitRise], { clamp: true })

    // `idle` stays at 0, which sits at or before the start of the range → fully visible, no offset.
    return { opacity, y }
}
