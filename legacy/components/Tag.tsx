import type { ReactNode } from 'react'

type TagProps = {
    children: ReactNode
    dot?: 'accent' | 'muted'
}

export default function Tag({ children, dot }: TagProps) {
    return (
        <span className="inline-flex items-center gap-1.5 border border-rule px-2 py-0.5 text-xs tracking-[0.02em] whitespace-nowrap text-ink-soft">
            {dot && <span className={`size-1.5 rounded-full ${dot === 'accent' ? 'bg-accent' : 'bg-timeline'}`} />}
            {children}
        </span>
    )
}
