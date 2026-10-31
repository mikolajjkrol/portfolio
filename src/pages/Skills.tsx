import type { CSSProperties } from 'react'
import { technologies } from '../data'
import { metaLabel } from '../styles'

// A full viewport-width grid of technology logos. Logos sit muted and take on their brand colour on hover.
export default function Skills() {
    return (
        <section className="flex flex-col gap-10 pt-28 pb-[88px]">
            <p className={`m-0 text-center ${metaLabel}`}>Technologie, z którymi pracuję</p>

            {/* Breaks out of the centred content column to span the whole viewport. */}
            <ul className="m-0 ml-[calc(50%-50vw)] grid w-screen list-none grid-cols-2 border-t border-rule p-0 sm:grid-cols-3 lg:grid-cols-5">
                {technologies.map(({ name, category, icon, color }) => (
                    <li
                        key={name}
                        style={{ '--brand': color } as CSSProperties}
                        className="group flex aspect-square flex-col justify-between border-r border-b border-rule p-5 transition-colors duration-300 hover:bg-card lg:aspect-[5/4]"
                    >
                        <span className={metaLabel}>{category}</span>

                        <span className="flex justify-center text-muted transition-colors duration-300 group-hover:text-(--brand)">
                            {icon ? (
                                <svg role="img" viewBox="0 0 24 24" aria-hidden className="size-[clamp(40px,5vw,56px)] fill-current">
                                    <path d={icon.path} />
                                </svg>
                            ) : (
                                <span className="font-serif text-[clamp(28px,3.5vw,40px)] leading-none">{name}</span>
                            )}
                        </span>

                        <span className="text-sm text-ink-soft">{name}</span>
                    </li>
                ))}
            </ul>
        </section>
    )
}
