import type { CSSProperties } from 'react'
import Shapes from './Shapes'
import Showcase from './Showcase'

const heading = 'Strony i aplikacje, które pracują na Twoją firmę'
const words = heading.split(' ')
const delay = (ms: number) => ({ '--delay': `${ms}ms` }) as CSSProperties

// On large screens it fits exactly in the first screen (under the navbar) so it can stay pinned
// while the next section scrolls over.
export default function Hero() {
    return (
        <section>
            <div className="mx-auto flex w-full max-w-[90rem] flex-col gap-10 px-4 pt-14 sm:gap-14 sm:px-8 sm:pt-20 lg:pt-24 lg:h-[calc(100dvh-5rem)] lg:min-h-[34rem]">
                <div className="flex flex-col gap-8">
                    <Shapes />

                    <h1
                        aria-label={heading}
                        className="m-0 max-w-[20ch] text-[clamp(2rem,1.5rem+2vw,3.25rem)] leading-[1.08] font-normal tracking-[-0.025em] text-balance"
                    >
                        {words.map((word, i) => (
                            <span key={i} aria-hidden>
                                <span className="reveal">
                                    <span className="slide-up inline-block" style={delay(150 + i * 45)}>
                                        {word}
                                    </span>
                                </span>{' '}
                            </span>
                        ))}
                    </h1>

                    <div className="flex shrink-0 flex-wrap gap-3">
                        <div className="overflow-hidden rounded-lg">
                            <a href="#projekty" className="btn btn-primary slide-up" style={delay(600)}>
                                Zobacz projekty
                            </a>
                        </div>
                        <div className="overflow-hidden rounded-lg">
                            <a href="#o-mnie" className="btn btn-secondary slide-up" style={delay(680)}>
                                O mnie
                            </a>
                        </div>
                    </div>
                </div>

                <div className="slide-up min-h-0 lg:flex-1" style={delay(400)}>
                    <Showcase />
                </div>
            </div>
        </section>
    )
}
