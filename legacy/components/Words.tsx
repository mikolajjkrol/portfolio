import type { CSSProperties } from 'react'

// Every word animates on its own, driven by the nearest `group` ancestor's data-state:
// "before" → hidden below, "in" → visible, "out" → hidden above. --i (the word's index) sets its delay.
const wordClass = `
    inline-block opacity-0 translate-y-[0.4em]
    transition-[opacity,translate] duration-[650ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] delay-[calc(0.2s+var(--i)*0.07s)]
    group-data-[state=in]:opacity-100 group-data-[state=in]:translate-y-0
    group-data-[state=out]:opacity-0 group-data-[state=out]:-translate-y-[0.4em]
    motion-reduce:opacity-100! motion-reduce:translate-y-0! motion-reduce:transition-none
`

// `start` shifts every word's index, so text can begin animating after the heading above it.
export default function Words({ text, start = 0 }: { text: string; start?: number }) {
    const words = text.trim().split(/\s+/)
    return words.map((word, i) => (
        <span key={i}>
            <span className={wordClass} style={{ '--i': start + i } as CSSProperties}>
                {word}
            </span>
            {i < words.length - 1 && ' '}
        </span>
    ))
}
