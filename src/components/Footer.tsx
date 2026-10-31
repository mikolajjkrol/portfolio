import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router'
import { contactDetails, navLinks } from '../data'
import { metaLabel } from '../styles'

const container = 'mx-auto box-border max-w-[1200px] px-[clamp(20px,5vw,64px)]'

// A "reveal" footer: it sits fixed underneath the page, and an empty spacer of the same height at the end
// of the document lets the page scroll up off it, so it only shows once the reader reaches the end.
// If the footer is too tall for the viewport (small phones), it falls back to a normal footer in the flow.
export default function Footer() {
    const footerRef = useRef<HTMLElement>(null)
    const spacerRef = useRef<HTMLDivElement>(null)
    const [height, setHeight] = useState(0)
    const [fits, setFits] = useState(true)
    const reduceMotion = useReducedMotion()

    useEffect(() => {
        const footer = footerRef.current
        if (!footer) return
        const measure = () => {
            setHeight(footer.offsetHeight)
            setFits(footer.offsetHeight < window.innerHeight * 0.85)
        }
        measure()
        const observer = new ResizeObserver(measure)
        observer.observe(footer)
        window.addEventListener('resize', measure)
        return () => {
            observer.disconnect()
            window.removeEventListener('resize', measure)
        }
    }, [])

    // 0 when the spacer starts entering the viewport, 1 when the page has fully lifted off the footer.
    const { scrollYProgress } = useScroll({ target: spacerRef, offset: ['start end', 'end end'] })
    const y = useTransform(scrollYProgress, [0, 1], [80, 0])
    const opacity = useTransform(scrollYProgress, [0.1, 0.9], [0, 1])
    const scale = useTransform(scrollYProgress, [0, 1], [0.96, 1])
    const popOut = fits && !reduceMotion

    return (
        <>
            {fits && <div ref={spacerRef} aria-hidden style={{ height }} />}

            <footer ref={footerRef} className={`${fits ? 'fixed inset-x-0 bottom-0 z-0' : 'relative'} bg-card`}>
                <motion.div
                    style={popOut ? { y, opacity, scale } : undefined}
                    className={`${container} grid origin-bottom gap-x-12 gap-y-10 pt-16 pb-14 sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)]`}
                >
                    <div className="flex flex-col items-start gap-4">
                        <span className="font-serif text-[clamp(24px,3vw,32px)] leading-tight text-ink">Mikołaj Król</span>
                        <p className="m-0 max-w-[360px] text-sm leading-[1.7] text-pretty text-muted">
                            Niezależny programista full-stack. Strony i aplikacje webowe w React, TypeScript i Supabase.
                        </p>
                        <span className="text-xs tracking-[0.06em] text-accent">Dostępny do zleceń</span>
                    </div>

                    <div className="flex flex-col gap-4">
                        <span className={metaLabel}>Kontakt</span>
                        <ul className="m-0 flex list-none flex-col gap-3 p-0 text-sm">
                            {contactDetails.map(({ label, value, href }) => (
                                <li key={label} className="flex flex-col gap-0.5">
                                    <span className="text-xs text-muted">{label}</span>
                                    <a
                                        href={href}
                                        target={href.startsWith('http') ? '_blank' : undefined}
                                        rel="noreferrer"
                                        className="break-all text-ink-soft no-underline transition-colors duration-200 hover:text-accent"
                                    >
                                        {value}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <nav className="flex flex-col gap-4">
                        <span className={metaLabel}>Nawigacja</span>
                        <ul className="m-0 flex list-none flex-col gap-2.5 p-0 text-sm">
                            {navLinks.map(({ to, label }) => (
                                <li key={to}>
                                    <NavLink
                                        to={to}
                                        end
                                        className={({ isActive }) =>
                                            `no-underline transition-colors duration-200 hover:text-accent ${isActive ? 'text-accent' : 'text-ink-soft'}`
                                        }
                                    >
                                        {label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </motion.div>

                {/* Uncovered first, so on its own it reads like an ordinary footer until the reader scrolls further. */}
                <div className={`${container} flex flex-wrap justify-between gap-x-6 gap-y-1 py-8 text-xs text-muted`}>
                    <span>© 2026 Mikołaj Król</span>
                    <span>Lubartów, Polska</span>
                </div>
            </footer>
        </>
    )
}
