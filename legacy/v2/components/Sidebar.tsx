import { Link, NavLink } from 'react-router'
import { contactDetails } from '../data'

const pages = [
    { to: '/', label: 'O mnie', end: true },
    { to: '/projects', label: 'Projekty', end: false },
]

const elsewhere = contactDetails.filter((c) => c.label === 'GitHub' || c.label === 'LinkedIn' || c.label === 'E-mail')

export default function Sidebar() {
    return (
        <aside className="px-6 pt-10 sm:px-10 lg:sticky lg:top-0 lg:flex lg:h-dvh lg:flex-col lg:px-10 lg:pt-24 lg:pb-10">
            <Link to="/" className="link-quiet block text-ink">
                <span className="block text-base font-medium tracking-[-0.01em]">Mikołaj Król</span>
                <span className="t-meta mt-1 block text-faint">programista, Lubartów</span>
            </Link>

            <nav className="mt-8 lg:mt-14">
                <ul className="m-0 flex list-none gap-6 p-0 lg:flex-col lg:gap-2">
                    {pages.map(({ to, label, end }) => (
                        <li key={to}>
                            <NavLink
                                to={to}
                                end={end}
                                className={({ isActive }) => `t-ui link-quiet ${isActive ? 'text-ink' : 'text-faint'}`}
                            >
                                {label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <ul className="m-0 hidden list-none flex-col gap-2 p-0 lg:mt-auto lg:flex">
                {elsewhere.map(({ label, href }) => (
                    <li key={label}>
                        <a
                            href={href}
                            target={href.startsWith('http') ? '_blank' : undefined}
                            rel="noreferrer"
                            className="t-meta link-quiet text-faint"
                        >
                            {label}
                        </a>
                    </li>
                ))}
            </ul>
        </aside>
    )
}
