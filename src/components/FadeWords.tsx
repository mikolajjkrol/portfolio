import { motion } from 'framer-motion'
import { useSlideExit } from './slideExit'

type FadeWordsProps = {
    text: string
    // Exit step of the first word.
    step?: number
    // Extra exit steps added per word, so a heading peels away word by word.
    stagger?: number
}

// Splits text into words that fade out one after another when their StickySlide releases.
// Only handles the exit — wrap in FadeInOnView with exit={false} for the fade-in.
export default function FadeWords({ text, step = 0, stagger = 0.3 }: FadeWordsProps) {
    const words = text.split(' ')
    return words.map((word, i) => (
        <span key={i}>
            <Word step={step + i * stagger}>{word}</Word>
            {i < words.length - 1 && ' '}
        </span>
    ))
}

function Word({ step, children }: { step: number; children: string }) {
    const { opacity, y } = useSlideExit(step)
    return (
        <motion.span className="inline-block" style={{ opacity, y }}>
            {children}
        </motion.span>
    )
}
