import type { CSSProperties } from 'react'

const links = [
    { label: 'Projekty', href: '#projekty' },
    { label: 'Usługi', href: '#uslugi' },
    { label: 'Proces', href: '#proces' },
    { label: 'O mnie', href: '#o-mnie' },
]

const delay = (ms: number) => ({ '--delay': `${ms}ms` }) as CSSProperties

export default function Navbar() {
    return (
        <header className="relative z-10">
            <nav className="mx-auto flex h-20 max-w-[90rem] items-center justify-end px-4 sm:px-8 md:grid md:grid-cols-[1fr_auto_1fr]">
                <span aria-hidden className="hidden md:block" />

                <ul className="m-0 hidden list-none items-center gap-10 p-0 md:flex">
                    {links.map(({ label, href }, i) => (
                        <li key={href} className="slide-down" style={delay(i * 60)}>
                            <a
                                href={href}
                                className="text-[0.9375rem] font-medium tracking-[-0.025em] text-dim no-underline transition-colors duration-150 hover:text-ink"
                            >
                                {label}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="flex justify-end">
                    <a href="#kontakt" className="btn btn-primary slide-down" style={delay(200)}>
                        Kontakt
                    </a>
                </div>
            </nav>
        </header>
    )
}
