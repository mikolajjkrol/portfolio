import { motion, useReducedMotion, type Variants } from 'framer-motion'
import heroBg from '../assets/hero-bg.jpg'

const ease = [0.2, 0.7, 0.2, 1] as const

const rise: Variants = {
    hidden: { opacity: 0, y: 16 },
    shown: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
}

// The photo panel with the action fills the left of the row; the line sits on the page at the right.
export default function Cta() {
    const reduceMotion = useReducedMotion()

    return (
        <section id="kontakt" className="relative z-10 px-4 pt-8 pb-4 sm:px-8 sm:pb-8">
            <motion.div
                initial={reduceMotion ? false : 'hidden'}
                whileInView="shown"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ staggerChildren: 0.12 }}
                className="mx-auto flex max-w-[90rem] flex-col gap-6 md:flex-row-reverse md:items-stretch md:gap-10"
            >
                <motion.h2
                    variants={rise}
                    className="m-0 max-w-[16ch] shrink-0 self-start text-[clamp(1.5rem,1.2rem+1.2vw,2.25rem)] leading-[1.1] font-normal tracking-[-0.025em] text-balance text-ink md:self-center md:text-right"
                >
                    Masz pomysł? Porozmawiajmy o nim.
                </motion.h2>

                <motion.div
                    variants={rise}
                    className="relative flex min-h-36 flex-1 items-center justify-start overflow-hidden px-6 sm:px-10 rounded-lg bg-surface sm:min-h-44"
                >
                    <img
                        src={heroBg}
                        alt=""
                        aria-hidden
                        draggable={false}
                        className="pointer-events-none absolute inset-0 size-full object-cover opacity-60 select-none"
                    />
                    <a
                        href="mailto:mikolajkock@gmail.com"
                        className="btn relative h-12 bg-white px-7 text-ink shadow-[0_10px_30px_-10px_rgb(17_17_17/0.25)] hover:bg-bg"
                    >
                        Skontaktuj się
                    </a>
                </motion.div>
            </motion.div>
        </section>
    )
}
