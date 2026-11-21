import type { ReactNode } from 'react'

export const shapes: ReactNode[] = [
    <div className="size-8 rounded-full bg-pink" />,
    <div className="size-8 rounded-[0.55rem] bg-pink-soft" />,
    <div className="h-8 w-14 rounded-full bg-green" />,
    <svg viewBox="0 0 32 32" className="size-9 overflow-visible">
        <path d="M16 5 L28.5 27 H3.5 Z" className="fill-pink stroke-pink" strokeWidth="5" strokeLinejoin="round" />
    </svg>,
]
