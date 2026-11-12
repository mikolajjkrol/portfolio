import { motion, useReducedMotion } from 'framer-motion'
import heroBg from '../assets/hero-bg.jpg'
import appShot from '../assets/app1.png'
import SafariWindow from './SafariWindow'

// One Safari window with the app inside, sitting a little below the panel's top and running off its bottom.
export default function Showcase() {
    const reduceMotion = useReducedMotion()

    return (
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg bg-surface sm:aspect-[16/9] lg:aspect-auto lg:h-full">
            <img
                src={heroBg}
                alt=""
                aria-hidden
                draggable={false}
                className="pointer-events-none absolute inset-0 size-full object-cover opacity-60 select-none"
            />

            <motion.div
                className="absolute top-6 left-1/2 w-[88%] -translate-x-1/2 sm:top-12 sm:w-[78%] lg:top-16 lg:w-[68%]"
                initial={reduceMotion ? false : { y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 120, damping: 22, delay: 0.7 }}
            >
                <SafariWindow url="calendify.pl" path="/app">
                    <img
                        src={appShot}
                        alt="Panel aplikacji Calendify"
                        draggable={false}
                        className="block aspect-[2914/1740] w-full object-cover object-top select-none"
                    />
                </SafariWindow>
            </motion.div>
        </div>
    )
}
