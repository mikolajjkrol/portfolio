import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router'
import heroBg from '../assets/hero-bg.jpg'
import Cta from '../components/Cta'
import SafariWindow from '../components/SafariWindow'
import { host, projectPath, projects } from '../data'

const ease = [0.22, 1, 0.36, 1] as const

const list: Variants = {
    hidden: {},
    shown: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

const rise: Variants = {
    hidden: { opacity: 0, y: 20 },
    shown: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
}

const label = 'm-0 text-[0.8125rem] font-medium text-dim'

export default function ProjectPage() {
    const { slug } = useParams()
    const reduceMotion = useReducedMotion()
    const index = projects.findIndex((p) => p.slug === slug)

    // Start each project at the top, not wherever the previous page was scrolled to.
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [slug])

    if (index === -1) return <Navigate to="/" replace />

    const project = projects[index]
    const next = projects[(index + 1) % projects.length]
    const tech = [...project.stack, ...(project.integrations ?? [])]
    const initial = reduceMotion ? false : 'hidden'

    return (
        <>
            <motion.article
                key={project.slug}
                initial={initial}
                animate="shown"
                variants={list}
                className="mx-auto w-full max-w-[90rem] px-4 pt-6 pb-20 sm:px-8 sm:pt-10 sm:pb-28"
            >
                <motion.a
                    variants={rise}
                    href="/#projekty"
                    className="inline-flex text-[0.9375rem] font-medium tracking-[-0.02em] text-dim no-underline transition-colors hover:text-ink"
                >
                    ← Wszystkie projekty
                </motion.a>

                {/* Title left, the action on the right, like the hero row. */}
                <header className="mt-10 flex flex-col gap-8 sm:mt-14 md:flex-row md:items-end md:justify-between">
                    <div>
                        <motion.p variants={rise} className={label}>
                            {project.kind} · {project.tags}
                        </motion.p>
                        <motion.h1
                            variants={rise}
                            className="mt-3 mb-0 max-w-[20ch] text-[clamp(2.25rem,1.6rem+2.6vw,4rem)] leading-[1.02] font-normal tracking-[-0.035em] text-balance"
                        >
                            {project.name ?? project.title}
                        </motion.h1>
                        <motion.p variants={rise} className="mt-5 mb-0 max-w-[48ch] text-[1.125rem] leading-relaxed text-dim">
                            {project.summary}
                        </motion.p>
                    </div>

                    {project.url && (
                        <motion.div variants={rise} className="shrink-0">
                            <a href={project.url} target="_blank" rel="noreferrer" className="btn btn-primary">
                                Zobacz stronę
                            </a>
                        </motion.div>
                    )}
                </header>

                {project.image && (
                    <motion.div
                        variants={rise}
                        className="relative mt-12 aspect-[4/3] overflow-hidden rounded-lg bg-surface sm:mt-16 sm:aspect-[16/8]"
                    >
                        <img
                            src={heroBg}
                            alt=""
                            aria-hidden
                            draggable={false}
                            className="pointer-events-none absolute inset-0 size-full object-cover opacity-60 select-none"
                        />
                        <div className="absolute top-6 left-1/2 w-[88%] -translate-x-1/2 sm:top-12 sm:w-[76%] lg:top-16 lg:w-[66%]">
                            <SafariWindow url={project.url ? host(project.url) : project.slug}>
                                <img
                                    src={project.image}
                                    alt={`Zrzut ekranu: ${project.name ?? project.title}`}
                                    draggable={false}
                                    className="block aspect-[16/10] w-full object-cover object-top select-none"
                                />
                            </SafariWindow>
                        </div>
                    </motion.div>
                )}

                <div className="mt-16 grid gap-14 sm:mt-24 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-24">
                    <motion.div variants={rise}>
                        <h2 className="m-0 text-[clamp(1.5rem,1.3rem+0.8vw,2rem)] leading-[1.1] font-normal tracking-[-0.025em]">
                            O projekcie
                        </h2>
                        {project.about.map((paragraph) => (
                            <p key={paragraph} className="mt-5 mb-0 max-w-[60ch] text-[1.0625rem] leading-relaxed">
                                {paragraph}
                            </p>
                        ))}
                    </motion.div>

                    <motion.dl variants={rise} className="m-0 flex flex-col gap-10">
                        <div>
                            <dt className={label}>Funkcje</dt>
                            <dd className="m-0 mt-4">
                                <ul className="m-0 flex list-none flex-col gap-3 p-0">
                                    {project.features.map((f) => (
                                        <li key={f} className="flex gap-3 text-[0.9375rem] leading-snug">
                                            <span aria-hidden className="mt-[0.45em] h-0.5 w-3 shrink-0 bg-ink" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </dd>
                        </div>

                        {tech.length > 0 && (
                            <div>
                                <dt className={label}>Technologie</dt>
                                <dd className="m-0 mt-4 flex flex-wrap gap-2">
                                    {tech.map((t) => (
                                        <span
                                            key={t}
                                            className="inline-flex h-9 items-center rounded-md bg-surface px-3.5 text-[0.875rem] font-medium"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </dd>
                            </div>
                        )}

                        {project.url && (
                            <div>
                                <dt className={label}>Adres</dt>
                                <dd className="m-0 mt-3">
                                    <a
                                        href={project.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="font-mono text-[0.875rem] text-ink underline decoration-ink/25 underline-offset-4 transition-colors hover:decoration-ink"
                                    >
                                        {host(project.url)}
                                    </a>
                                </dd>
                            </div>
                        )}
                    </motion.dl>
                </div>

                {/* Next project: one big black row, so browsing projects doesn't need the home page. */}
                <motion.div variants={rise} className="mt-20 sm:mt-28">
                    <Link
                        to={projectPath(next)}
                        className="group flex items-center justify-between gap-6 rounded-2xl bg-ink px-6 py-10 text-bg no-underline sm:px-10 sm:py-14"
                    >
                        <span>
                            <span className="block text-[0.8125rem] font-medium text-bg/60">Następny projekt</span>
                            <span className="mt-2 block text-[clamp(1.5rem,1.2rem+1.4vw,2.5rem)] leading-[1.1] tracking-[-0.03em]">
                                {next.name ?? next.title}
                            </span>
                        </span>
                        <span
                            aria-hidden
                            className="text-[clamp(1.5rem,1.2rem+1.4vw,2.5rem)] transition-transform duration-200 group-hover:translate-x-1.5"
                        >
                            →
                        </span>
                    </Link>
                </motion.div>
            </motion.article>

            <Cta />
        </>
    )
}
