import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { useRef, useState } from 'react'
import { host, projects, type Project } from '../data'
import ShapeIcon, { type ShapeKind } from './ShapeIcon'

// Only real, live websites and apps that have a screenshot.
const shown = projects.filter((p) => p.image && p.url)

const ease = [0.22, 1, 0.36, 1] as const

const list: Variants = {
    hidden: {},
    shown: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
}

const rise: Variants = {
    hidden: { opacity: 0, y: 24 },
    shown: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
}

const displayName = (p: Project) => p.name ?? p.title

// Placeholder icons (the hero's shapes) until real ones are in.
const icons: ShapeKind[] = ['circle', 'square', 'pill', 'triangle']

// Hidden by default; peeks out a little under the row on hover and opens fully when the project is clicked.
// The peek fades out at the bottom; when fully open the image is shown whole.
type PreviewState = 'hidden' | 'peek' | 'full'
const previewHeight: Record<PreviewState, string> = { hidden: '0rem', peek: '5rem', full: 'auto' }

function Preview({ project, state }: { project: Project; state: PreviewState }) {
    return (
        <motion.div
            initial={false}
            animate={{ height: previewHeight[state], opacity: state === 'hidden' ? 0 : 1 }}
            transition={{ duration: 0.5, ease }}
            className={`overflow-hidden ${state === 'full' ? '' : '[mask-image:linear-gradient(to_bottom,#000_35%,transparent_100%)]'}`}
        >
            <div className="pt-2 pb-2 sm:pl-[4.75rem]">
                <img src={project.image} alt="" className="block aspect-[16/10] w-full rounded-lg object-cover object-top" />
            </div>
        </motion.div>
    )
}

// Short version only: the full write-up will live on the project's own page.
function Details({ project }: { project: Project }) {
    return (
        <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease }}
            className="overflow-hidden"
        >
            <div className="flex flex-col gap-6 pt-3 pb-6 sm:pl-[4.75rem]">
                <p className="m-0 max-w-[60ch] text-[1rem] leading-relaxed">{project.about[0]}</p>

                {project.url && (
                    <div className="flex flex-wrap items-center gap-4">
                        <a href={project.url} target="_blank" rel="noreferrer" className="btn btn-primary">
                            Zobacz stronę
                        </a>
                        <span className="font-mono text-[0.75rem] text-dim">{host(project.url)}</span>
                    </div>
                )}
            </div>
        </motion.div>
    )
}

export default function Projects() {
    const [hovered, setHovered] = useState<string | null>(null)
    const [open, setOpen] = useState<string | null>(null)
    const hoverTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

    // Small hover intent delay so sweeping the mouse across the list doesn't make every row pop open.
    const hoverIn = (slug: string) => {
        clearTimeout(hoverTimer.current)
        hoverTimer.current = setTimeout(() => setHovered(slug), 140)
    }
    const hoverOut = () => {
        clearTimeout(hoverTimer.current)
        setHovered(null)
    }

    return (
        <section id="projekty" className="relative z-10 bg-bg py-24 sm:py-32">
            <motion.div
                initial="hidden"
                whileInView="shown"
                viewport={{ once: true, amount: 0.15 }}
                variants={list}
                className="mx-auto w-full max-w-[46rem] px-4 sm:px-8"
            >
                <motion.h2
                    variants={rise}
                    className="m-0 text-[clamp(1.75rem,1.4rem+1.4vw,2.5rem)] leading-[1.1] font-normal tracking-[-0.025em]"
                >
                    Projekty
                </motion.h2>
                <motion.p variants={rise} className="mt-4 mb-0 max-w-[44ch] text-[1.0625rem] leading-relaxed text-dim">
                    Własne produkty i strony dla lokalnych firm. Kliknij projekt, żeby zobaczyć szczegóły.
                </motion.p>

                <ul className="m-0 mt-14 flex list-none flex-col border-b border-ink/10 p-0 sm:mt-16" onPointerLeave={hoverOut}>
                    {shown.map((p, index) => {
                        const isOpen = open === p.slug
                        const preview: PreviewState = isOpen ? 'full' : hovered === p.slug ? 'peek' : 'hidden'

                        return (
                            <motion.li key={p.slug} variants={rise} onPointerEnter={() => hoverIn(p.slug)} className="border-t border-ink/10">
                                <button
                                    type="button"
                                    aria-expanded={isOpen}
                                    onClick={() => setOpen(isOpen ? null : p.slug)}
                                    className="group flex w-full cursor-pointer items-center gap-5 bg-transparent py-5 text-left text-ink"
                                >
                                    <span className="flex size-14 shrink-0 items-center justify-center transition-transform duration-200 ease-out group-hover:-translate-y-0.5">
                                        <ShapeIcon shape={icons[index % icons.length]} />
                                    </span>

                                    <span className="min-w-0">
                                        <span className="block text-[1.1875rem] font-normal tracking-[-0.035em]">
                                            {displayName(p)}
                                        </span>
                                        <span className="mt-1 block text-[0.9375rem] leading-snug text-dim">{p.summary}</span>
                                    </span>
                                </button>

                                <Preview project={p} state={preview} />
                                <AnimatePresence initial={false}>{isOpen && <Details project={p} />}</AnimatePresence>
                            </motion.li>
                        )
                    })}
                </ul>
            </motion.div>
        </section>
    )
}
