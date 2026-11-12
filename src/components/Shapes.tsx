import { motion, useAnimate, useReducedMotion } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

// Small decorative shapes above the hero heading. Each one is different.
// On hover a shape hops like a soft rubber toy: crouch, jump (stretch), fall, squash on landing, jiggle to rest.
const shapes: ReactNode[] = [
    <div className="size-8 rounded-full bg-pink" />,
    <div className="size-8 rounded-[0.55rem] bg-pink-soft" />,
    <div className="h-8 w-14 rounded-full bg-green" />,
    <svg viewBox="0 0 32 32" className="size-9 overflow-visible">
        <path d="M16 5 L28.5 27 H3.5 Z" className="fill-pink stroke-pink" strokeWidth="5" strokeLinejoin="round" />
    </svg>,
]

function Shape({ children, index }: { children: ReactNode; index: number }) {
    const [scope, animate] = useAnimate<HTMLDivElement>()
    const busy = useRef(false)
    const reduceMotion = useReducedMotion()

    async function hop() {
        if (busy.current || reduceMotion) return
        busy.current = true
        const el = scope.current
        // Crouch
        await animate(el, { scaleX: 1.12, scaleY: 0.86 }, { duration: 0.08, ease: 'easeOut' })
        // Take off: rising, slowing down under gravity
        await animate(el, { y: -22, scaleX: 0.92, scaleY: 1.1 }, { duration: 0.24, ease: [0.2, 0.6, 0.35, 1] })
        // Fall: speeding up, shape relaxing
        await animate(el, { y: 0, scaleX: 0.95, scaleY: 1.05 }, { duration: 0.2, ease: [0.55, 0, 0.85, 0.35] })
        // Impact squash
        await animate(el, { scaleX: 1.2, scaleY: 0.8 }, { duration: 0.06, ease: 'easeOut' })
        // Jiggle back to rest
        await animate(el, { scaleX: 1, scaleY: 1 }, { type: 'spring', stiffness: 600, damping: 11 })
        busy.current = false
    }

    return (
        <motion.div
            initial={reduceMotion ? false : { scale: 0, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 420, damping: 16, delay: 0.1 + index * 0.08 }}
            style={{ originY: 1 }}
        >
            <div ref={scope} onPointerEnter={hop} className="cursor-pointer" style={{ transformOrigin: '50% 100%' }}>
                {children}
            </div>
        </motion.div>
    )
}

export default function Shapes() {
    return (
        <div aria-hidden className="flex items-end gap-2.5">
            {shapes.map((shape, i) => (
                <Shape key={i} index={i}>
                    {shape}
                </Shape>
            ))}
        </div>
    )
}
