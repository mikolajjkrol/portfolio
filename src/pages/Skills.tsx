import { useState, type CSSProperties } from 'react'
import { technologies } from '../data'
import { link, metaLabel, sectionLabel } from '../styles'

const face = 'absolute inset-0 flex flex-col justify-between p-5 backface-hidden'
const reveal = 'opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100'

// A full viewport-width grid of technology logos. Logos sit muted and take on their brand colour on hover;
// clicking a card flips it over to a short description.
export default function Skills() {
    const [flipped, setFlipped] = useState<Set<string>>(new Set())

    function toggle(name: string) {
        setFlipped((prev) => {
            const next = new Set(prev)
            if (next.has(name)) next.delete(name)
            else next.add(name)
            return next
        })
    }

    return (
        <section className="flex flex-col gap-10 pt-28 pb-[88px]">
            <p className={`m-0 text-center ${metaLabel}`}>Stack, którego używam</p>

            {/* Breaks out of the centred content column to span the whole viewport. */}
            <ul className="m-0 ml-[calc(50%-50vw)] grid w-screen list-none grid-cols-2 border-t border-rule p-0 sm:grid-cols-3 lg:grid-cols-5">
                {technologies.map(({ name, category, icon, color, description }) => {
                    const isFlipped = flipped.has(name)
                    return (
                        <li key={name} className="aspect-square border-r border-b border-rule perspective-[1200px] lg:aspect-[5/4]">
                            <button
                                type="button"
                                aria-pressed={isFlipped}
                                aria-label={`${name}: ${isFlipped ? 'ukryj opis' : 'pokaż opis'}`}
                                onClick={() => toggle(name)}
                                style={{ '--brand': color } as CSSProperties}
                                className={`group relative block size-full cursor-pointer border-0 bg-transparent p-0 text-left font-sans transition-transform duration-700 ease-[cubic-bezier(0.3,0.7,0.2,1)] transform-3d motion-reduce:duration-0 ${
                                    isFlipped ? 'rotate-y-180' : ''
                                }`}
                            >
                                {/* Category and name stay hidden on the front until hover / keyboard focus. */}
                                <span className={`${face} transition-colors duration-300 group-hover:bg-card`}>
                                    <span className={`${metaLabel} ${reveal}`}>{category}</span>
                                    <span className="flex justify-center text-muted transition-colors duration-300 group-hover:text-(--brand)">
                                        {icon ? (
                                            <svg role="img" viewBox="0 0 24 24" aria-hidden className="size-[clamp(40px,5vw,56px)] fill-current">
                                                <path d={icon.path} />
                                            </svg>
                                        ) : (
                                            <span className="font-serif text-[clamp(28px,3.5vw,40px)] leading-none">{name}</span>
                                        )}
                                    </span>
                                    <span className={`text-sm text-ink-soft ${reveal}`}>{name}</span>
                                </span>

                                <span className={`${face} rotate-y-180 bg-card`}>
                                    <span className={metaLabel}>{category}</span>
                                    <span className="font-serif text-[clamp(15px,1.4vw,19px)] leading-[1.45] text-pretty text-ink">{description}</span>
                                    <span className="text-sm text-ink-soft">{name}</span>
                                </span>
                            </button>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}
