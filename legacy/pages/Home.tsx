import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import bg from '../assets/bg.jpg'
import ProjectStack from '../components/ProjectStack'
import Words from '../components/Words'
import { clientSites, host, productProjects, projectPath } from '../data'

// Full-bleed: breaks out of Layout's centred column.
const bleed = 'ml-[calc(50%-50vw)] w-screen'

export default function Home() {
    const heroRef = useRef<HTMLElement>(null)
    const statementRef = useRef<HTMLElement>(null)
    const stackRef = useRef<HTMLDivElement>(null)
    const sitesRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const hero = heroRef.current
        // Pinned text sections that reveal their words while they hold the screen
        const pinned = [statementRef.current, sitesRef.current].filter((el) => el !== null)
        const stack = stackRef.current
        if (!hero) return

        // Writes data-state straight to the DOM, so scrolling never re-renders React.
        function update() {
            if (!hero) return
            const screen = window.innerHeight

            // The hero text leaves as soon as the user starts scrolling
            hero.dataset.state = window.scrollY > screen * 0.12 ? 'out' : 'in'

            // Words appear once black covers most of the screen,
            // and leave before the section runs out of pinned scroll
            for (const section of pinned) {
                const box = section.getBoundingClientRect()
                if (box.top > screen * 0.3) section.dataset.state = 'before'
                else if (box.bottom < screen * 1.5) section.dataset.state = 'out'
                else section.dataset.state = 'in'
            }

            // The projects intro stays until the first card slides over it, so it never needs to leave
            if (stack) stack.dataset.state = stack.getBoundingClientRect().top > screen * 0.3 ? 'before' : 'in'
        }

        window.addEventListener('scroll', update, { passive: true })
        window.addEventListener('resize', update)
        // Wait for the first paint so the hero text animates in on load
        let frame = requestAnimationFrame(() => (frame = requestAnimationFrame(update)))

        return () => {
            window.removeEventListener('scroll', update)
            window.removeEventListener('resize', update)
            cancelAnimationFrame(frame)
        }
    }, [])

    return (
        <div className={`${bleed} bg-black text-white`}>
            {/* Stays pinned for the whole page, so the next section slides over it */}
            <section
                ref={heroRef}
                data-state="before"
                className="group sticky top-0 z-0 flex h-dvh flex-col justify-end overflow-hidden bg-black"
            >
                {/* Background on its own layer (add -scale-x-100 to mirror it without flipping the text); the gradient darkens it */}
                <div
                    aria-hidden
                    className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `linear-gradient(rgb(0 0 0 / 0.55), rgb(0 0 0 / 0.55)), url(${bg})` }}
                />
                <h1 className="pb-5 m-0 pl-[1.8vw] type-headline text-[length:min(14vw,70dvh)] text-zinc-200">
                    <Words text="Portfolio" />
                </h1>
                {/* <p className="m-0 pt-5 pb-[5dvh] pl-[1.8vw] type-subtext text-sm text-zinc-400 sm:text-lg">
                    <Words text="Mikołaj Król • Lubartów • programista full-stack" />
                </p> */}
            </section>

            {/* h-[300dvh] is how long the statement stays pinned,
                mt-[50dvh] is how long the hero holds before this section starts coming up */}
            <section ref={statementRef} data-state="before" className="group relative z-10 mt-[50dvh] h-[300dvh] bg-black">
                <div className="sticky top-0 flex h-dvh items-center justify-center px-6">
                    <p className="m-0 max-w-[22em] text-center type-body text-[length:clamp(1.75rem,4vw,4rem)] text-balance">
                        <Words text="Tworzę strony i aplikacje webowe dla firm, a po godzinach rozwijam własne produkty, z których ludzie korzystają każdego dnia." />
                    </p>
                </div>
            </section>

            {/* The intro is the stack's base layer: it holds the screen, then Calendify slides in over it */}
            <ProjectStack ref={stackRef} projects={productProjects}>
                <div className="flex h-full flex-col justify-center gap-[clamp(24px,5dvh,56px)] px-[max(1.8vw,20px)]">
                    <p className="m-0 max-w-[22em] text-center type-body text-[length:clamp(1.75rem,5vw,4rem)] text-balance">
                        <Words
                            text="Własne produkty, narzędzia, z których korzystam na co dzień, i strony dla lokalnych firm. Każdy z nich zaczął się od konkretnego problemu do rozwiązania."
                        />
                    </p>
                </div>
            </ProjectStack>

            {/* Client websites: one pinned section, kept out of the project tabs */}
            <section ref={sitesRef} data-state="before" className="group relative z-10 h-[250dvh] bg-black">
                <div className="sticky top-0 flex h-dvh flex-col items-center justify-center gap-[clamp(32px,7dvh,72px)] px-6 text-center">
                    <p className="m-0 type-subtext text-[clamp(1rem,1.4vw,1.25rem)] text-zinc-400">
                        <Words text="Strony dla firm" />
                    </p>
                    <ul className="m-0 flex list-none flex-col gap-[clamp(24px,5dvh,48px)] p-0">
                        {clientSites.map((site, i) => (
                            <li key={site.slug}>
                                <Link to={projectPath(site)} className="flex flex-col items-center gap-2 text-white no-underline transition-opacity duration-200 hover:opacity-70">
                                    <span className="type-body text-[length:clamp(1.75rem,4vw,3.75rem)] text-balance">
                                        <Words text={site.name ?? site.title} start={3 + i * 4} />
                                    </span>
                                    {site.url && (
                                        <span className="type-subtext text-[clamp(0.95rem,1.2vw,1.1rem)] text-zinc-400">
                                            <Words text={host(site.url)} start={5 + i * 4} />
                                        </span>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </div>
    )
}
