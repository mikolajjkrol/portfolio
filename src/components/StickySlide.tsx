import { useScroll } from 'framer-motion'
import { useMemo, useRef, useSyncExternalStore, type CSSProperties, type ReactNode } from 'react'
import { SlideExitContext } from './slideExit'

type StickySlideProps = {
    children: ReactNode
    // Outer wrapper height in vh. Content stays pinned for `vh - 100` vh of scroll; 100 disables pinning.
    vh?: number
    align?: 'center' | 'start' | 'end'
    // Let FadeInOnView / FadeWords inside fade out towards the top as the slide releases.
    // Turn off for the last slide, which never fully scrolls away.
    fadeOut?: boolean
    className?: string
}

const alignClass = {
    center: 'items-center',
    start: 'items-start',
    end: 'items-end',
}

// Must match the `md:motion-safe:` classes below.
const pinQuery = '(min-width: 48rem) and (prefers-reduced-motion: no-preference)'

function subscribe(onChange: () => void) {
    const media = window.matchMedia(pinQuery)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
}

function usePinned() {
    return useSyncExternalStore(subscribe, () => window.matchMedia(pinQuery).matches, () => false)
}

// Pins its content in the viewport for a beat while scrolling, using plain `position: sticky`.
// Only on md+ screens with motion allowed — on phones tall content would overflow the pinned 100vh slot.
export default function StickySlide({ children, vh = 140, align = 'center', fadeOut = true, className = '' }: StickySlideProps) {
    const ref = useRef<HTMLDivElement>(null)
    const pinned = usePinned()

    // 0 when the wrapper's top reaches the viewport top, 1 when its bottom does.
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
    const exit = useMemo(() => ({ progress: scrollYProgress, vh, active: fadeOut && pinned }), [scrollYProgress, vh, fadeOut, pinned])

    return (
        <div ref={ref} className="relative md:motion-safe:h-(--slide-h)" style={{ '--slide-h': `${vh}vh` } as CSSProperties}>
            <div className={`flex md:motion-safe:sticky md:motion-safe:top-0 md:motion-safe:h-screen ${alignClass[align]} ${className}`}>
                <div className="w-full">
                    <SlideExitContext.Provider value={exit}>{children}</SlideExitContext.Provider>
                </div>
            </div>
        </div>
    )
}
