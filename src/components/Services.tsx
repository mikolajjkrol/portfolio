import { AnimatePresence, motion, useReducedMotion, type Variants } from 'framer-motion'
import { useState } from 'react'
import { services, type Service } from '../data'

const ease = [0.22, 1, 0.36, 1] as const

const list: Variants = {
    hidden: {},
    shown: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

const rise: Variants = {
    hidden: { opacity: 0, y: 24 },
    shown: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
}

// Same shapes as in the hero, blown up as the panel's decoration.
const bigShape: Record<Service['shape'], string> = {
    circle: 'size-40 rounded-full bg-pink sm:size-72',
    square: 'size-36 rounded-[2rem] bg-pink-soft sm:size-64 sm:rounded-[2.5rem]',
    pill: 'h-28 w-56 rounded-full bg-green sm:h-48 sm:w-[26rem]',
}

function Panel({ service }: { service: Service }) {
    const calm = useReducedMotion()

    return (
        <div className="relative isolate h-full min-h-[22rem] overflow-hidden rounded-lg bg-[#1c1c1c] p-6 sm:min-h-[26rem] sm:p-10">
            <motion.div
                aria-hidden
                initial={calm ? false : { scale: 0.6, rotate: -12, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                className={`absolute -right-12 -bottom-12 -z-10 sm:-right-16 sm:-bottom-16 ${bigShape[service.shape]}`}
            />

            <motion.div
                initial={calm ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease }}
            >
                <p className="m-0 max-w-[46ch] text-[1.1875rem] leading-relaxed tracking-[-0.015em] text-bg">{service.lead}</p>

                <ul className="m-0 mt-8 grid max-w-[34rem] list-none gap-x-8 gap-y-3 p-0 sm:grid-cols-2">
                    {service.includes.map((item) => (
                        <li key={item} className="flex gap-3 text-[0.9375rem] leading-snug text-bg/75">
                            <span aria-hidden className="mt-[0.45em] h-0.5 w-3 shrink-0 bg-bg/75" />
                            {item}
                        </li>
                    ))}
                </ul>
            </motion.div>
        </div>
    )
}

// The page's one dark block: an inset black card, so it breaks up the run of light sections.
export default function Services() {
    const [active, setActive] = useState(services[0].id)
    const current = services.find((s) => s.id === active) ?? services[0]

    return (
        <section id="uslugi" className="relative z-10 bg-bg px-4 py-8 sm:px-8">
            <motion.div
                initial="hidden"
                whileInView="shown"
                viewport={{ once: true, amount: 0.2 }}
                variants={list}
                className="mx-auto max-w-[90rem] rounded-2xl bg-ink px-4 py-16 text-bg sm:px-10 sm:py-24 lg:px-14"
            >
                {/* Heading at the left edge, intro pushed to the right, like the hero row. */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
                    <motion.h2
                        variants={rise}
                        className="m-0 text-[clamp(2.25rem,1.6rem+2.6vw,4rem)] leading-[1] font-normal tracking-[-0.035em]"
                    >
                        Usługi
                    </motion.h2>
                    <motion.p
                        variants={rise}
                        className="m-0 max-w-[32ch] text-[1.0625rem] leading-relaxed text-bg/60 sm:text-right"
                    >
                        W czym mogę pomóc Twojej firmie.
                    </motion.p>
                </div>

                <div className="mt-12 grid gap-10 sm:mt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-14">
                    <ul className="m-0 flex list-none flex-col gap-1 p-0">
                        {services.map((s) => {
                            const on = s.id === active
                            return (
                                <motion.li key={s.id} variants={rise}>
                                    <button
                                        type="button"
                                        aria-expanded={on}
                                        onClick={() => setActive(s.id)}
                                        className={`flex w-full cursor-pointer rounded-lg px-5 py-5 text-left transition-colors duration-200 ${
                                            on ? 'bg-bg text-ink' : 'bg-transparent text-bg/70 hover:bg-white/[0.06] hover:text-bg'
                                        }`}
                                    >
                                        <span className="text-[clamp(1.25rem,1.1rem+0.6vw,1.625rem)] leading-tight tracking-[-0.03em]">{s.title}</span>
                                    </button>

                                    {/* Small screens: the panel opens right under its row. */}
                                    <AnimatePresence initial={false}>
                                        {on && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.45, ease }}
                                                className="overflow-hidden lg:hidden"
                                            >
                                                <div className="pt-2 pb-4">
                                                    <Panel service={s} />
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.li>
                            )
                        })}
                    </ul>

                    <motion.div variants={rise} className="hidden lg:block">
                        <Panel key={current.id} service={current} />
                    </motion.div>
                </div>
            </motion.div>
        </section>
    )
}
