import { contactDetails, contactFacts } from '../data'

const links = [
    { label: 'Projekty', href: '/#projekty' },
    { label: 'O mnie', href: '/#o-mnie' },
    { label: 'Kontakt', href: '#kontakt' },
]

const label = 'm-0 text-[0.8125rem] font-medium text-dim'
const link = 'text-[1.0625rem] tracking-[-0.02em] text-ink no-underline transition-colors duration-150 hover:text-dim'

// Sits behind the page: main scrolls up and away to reveal it, mirroring how Stack slides over the hero.
export default function Footer() {
    return (
        <footer className="sticky bottom-0 z-0 overflow-hidden bg-surface">
            <div className="mx-auto grid max-w-[90rem] gap-16 px-4 pt-24 pb-[clamp(8rem,16vw,18rem)] sm:px-8 sm:pt-32 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
                <div className="flex flex-col gap-6">
                    <p className="m-0 max-w-[22ch] text-[clamp(1.5rem,1.25rem+1vw,2rem)] leading-[1.15] tracking-[-0.025em] text-balance">
                        Strony i aplikacje, które pracują na Twoją firmę
                    </p>
                    <dl className="m-0 flex flex-col gap-3">
                        {contactFacts.map(({ label: l, value }) => (
                            <div key={l} className="flex gap-3 text-[0.9375rem]">
                                <dt className="w-24 shrink-0 text-dim">{l}</dt>
                                <dd className="m-0">{value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>

                <nav className="flex flex-col gap-5">
                    <p className={label}>Nawigacja</p>
                    <ul className="m-0 flex list-none flex-col gap-3 p-0">
                        {links.map(({ label: l, href }) => (
                            <li key={href}>
                                <a href={href} className={link}>{l}</a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="flex flex-col gap-5">
                    <p className={label}>Kontakt</p>
                    <ul className="m-0 flex list-none flex-col gap-3 p-0">
                        {contactDetails.map(({ label: l, value, href }) => (
                            <li key={l}>
                                <a
                                    href={href}
                                    {...(href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
                                    className={`${link} break-all`}
                                >
                                    {value}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <p
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 m-0 translate-y-[28%] text-center text-[17.5vw] leading-none font-semibold tracking-[-0.05em] whitespace-nowrap text-ink/[0.05] select-none"
            >
                Mikołaj Król
            </p>
        </footer>
    )
}
