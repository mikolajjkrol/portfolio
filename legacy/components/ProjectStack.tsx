import { easeInOut, motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef, type CSSProperties, type ReactNode, type RefObject } from 'react'
import { Link } from 'react-router'
import { host, projectPath, type Project } from '../data'

// Card backgrounds, cycled through in order. `light` flips the text to black.
const themes = [
    { bg: 'bg-night', light: false },
    { bg: 'bg-grape', light: false },
    { bg: 'bg-plum', light: false },
    { bg: 'bg-white', light: true },
    { bg: 'bg-black', light: false },
]

// Scroll timeline, in screen heights. The stack pins for the whole timeline: the base layer (the intro text)
// holds alone for `holdStart`, then each card slides in over `move` and rests for the rest of its `step`.
const holdStart = 0.8
const step = 1
const move = 0.75
const holdEnd = 0.4

type ProjectStackProps = {
    projects: Project[]
    // Shown on its own first; the first card then slides in on top of it.
    children?: ReactNode
    // The pinned stack. Home reads its position to drive the intro's word reveal.
    ref?: RefObject<HTMLDivElement | null>
}

// Full-screen project cards that slide in from the right on top of each other. Every card stops one tab width
// further right than the one before, so the earlier cards stay visible down the left edge like notebook tabs.
// Clicking a tab scrolls back to that project.
export default function ProjectStack({ projects, children, ref: outerRef }: ProjectStackProps) {
    const innerRef = useRef<HTMLDivElement>(null)
    const ref = outerRef ?? innerRef
    const reduceMotion = useReducedMotion()
    const units = holdStart + (projects.length - 1) * step + move + holdEnd

    // 0 when the stack's top reaches the top of the screen, 1 when its bottom reaches the bottom.
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

    // When card i starts and finishes sliding in, as fractions of the timeline.
    const range = (i: number): [number, number] => [(holdStart + i * step) / units, (holdStart + i * step + move) / units]

    function goTo(i: number) {
        const el = ref.current
        if (!el) return
        const top = el.getBoundingClientRect().top + window.scrollY
        const length = el.offsetHeight - window.innerHeight
        window.scrollTo({ top: top + range(i)[1] * length, behavior: reduceMotion ? 'instant' : 'smooth' })
    }

    // Without motion: the intro, then plain full-screen cards one after another.
    if (reduceMotion) {
        return (
            <div ref={ref} data-state="in" className="group relative z-10 bg-black">
                {children && <div className="relative h-dvh">{children}</div>}
                {projects.map((project, i) => (
                    <ProjectCard key={project.slug} project={project} index={i} total={projects.length} className="relative min-h-dvh" />
                ))}
            </div>
        )
    }

    return (
        <div
            ref={ref}
            data-state="before"
            className="group relative z-10 bg-black [--tab:clamp(20px,3.5vw,56px)]"
            style={{ height: `${(1 + units) * 100}dvh` }}
        >
            <div className="sticky top-0 h-dvh overflow-hidden">
                {children && <div className="absolute inset-0">{children}</div>}
                {projects.map((project, i) => (
                    <SlidingCard
                        key={project.slug}
                        project={project}
                        index={i}
                        total={projects.length}
                        progress={scrollYProgress}
                        range={range(i)}
                        onTab={() => goTo(i)}
                    />
                ))}
            </div>
        </div>
    )
}

type CardProps = {
    project: Project
    index: number
    total: number
    onTab?: () => void
    className?: string
    style?: CSSProperties
}

function SlidingCard({ progress, range, ...card }: CardProps & { progress: MotionValue<number>; range: [number, number] }) {
    // Starts past 100% so the card's left shadow is off-screen too while it waits
    const x = useTransform(progress, range, ['125%', '0%'], { ease: easeInOut })
    return (
        <motion.div className="absolute inset-y-0 right-0" style={{ x, left: `calc(var(--tab) * ${card.index})` }}>
            <ProjectCard {...card} className="h-full shadow-[-24px_0_48px_-12px_rgb(0_0_0/0.5)]" />
        </motion.div>
    )
}

function ProjectCard({ project, index, total, onTab, className = '' }: CardProps) {
    const { title, name, summary, kind, stack, url, image, features } = project
    const theme = themes[index % themes.length]
    const number = String(index + 1).padStart(2, '0')
    const heading = name ?? title
    const ink = theme.light ? 'text-black' : 'text-white'
    const soft = theme.light ? 'text-black/60' : 'text-white/65'
    const line = theme.light ? 'border-black/15' : 'border-white/20'

    return (
        <article className={`flex ${theme.bg} ${ink} ${className}`}>
            {/* The tab: the strip that stays visible once later cards cover the rest */}
            <button
                type="button"
                onClick={onTab}
                aria-label={`Przejdź do projektu ${heading}`}
                className={`flex w-(--tab) shrink-0 cursor-pointer items-start justify-center pt-[clamp(24px,7dvh,80px)] ${soft} transition-colors duration-200 ${theme.light ? 'hover:text-black' : 'hover:text-white'}`}
            >
                <span className="rotate-180 type-nav text-[11px] whitespace-nowrap [writing-mode:vertical-rl] sm:text-xs">
                    {number} · {heading}
                </span>
            </button>

            <div className="flex min-w-0 flex-1 flex-col justify-between gap-8 py-[clamp(24px,7dvh,80px)] pr-[clamp(20px,4vw,72px)] pl-[clamp(8px,2vw,40px)]">
                <div className={`flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b pb-4 type-nav text-xs sm:text-sm ${line} ${soft}`}>
                    <span>
                        {number} / {String(total).padStart(2, '0')}
                    </span>
                    <span>{kind}</span>
                </div>

                <div className="grid items-center gap-x-[clamp(32px,5vw,96px)] gap-y-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
                    <div className="flex min-w-0 flex-col gap-6">
                        <h3 className="m-0 type-headline text-[clamp(2.25rem,5vw,5.5rem)] text-balance wrap-break-word">{heading}</h3>
                        <p className={`m-0 max-w-[30em] font-serif text-[clamp(1.05rem,1.5vw,1.4rem)] leading-normal text-pretty ${soft}`}>{summary}</p>
                        {stack.length > 0 && (
                            <ul className={`m-0 flex list-none flex-wrap gap-x-4 gap-y-1 p-0 type-subtext text-sm ${soft}`}>
                                {stack.map((tech) => (
                                    <li key={tech}>{tech}</li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="hidden min-w-0 md:block">
                        {image ? (
                            <img
                                src={image}
                                alt={`Zrzut ekranu: ${title}`}
                                loading="lazy"
                                className="block aspect-16/10 max-h-[52dvh] w-full object-cover object-top shadow-[0_24px_64px_-16px_rgb(0_0_0/0.55)]"
                            />
                        ) : (
                            <ul className="m-0 flex list-none flex-col p-0 type-subtext text-[clamp(0.95rem,1.2vw,1.1rem)]">
                                {features.map((feature) => (
                                    <li key={feature} className={`border-t py-3 ${line}`}>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 type-nav text-sm">
                    <Link to={projectPath(project)} className={`border-b pb-1 no-underline ${ink} ${theme.light ? 'border-black' : 'border-white'} transition-opacity duration-200 hover:opacity-70`}>
                        Zobacz projekt →
                    </Link>
                    {url && <span className={soft}>{host(url)}</span>}
                </div>
            </div>
        </article>
    )
}
