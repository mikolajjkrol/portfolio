import { AnimatePresence, motion } from 'framer-motion'
import { useState, type FocusEvent } from 'react'
import { Link, NavLink } from 'react-router'
import { navLinks, projectPath, projects } from '../data'

// Faint line that grows out from the centre under a hovered link.
const hoverLine =
    "after:absolute after:inset-x-0 after:-bottom-px after:h-px after:origin-center after:scale-x-0 after:bg-muted/50 after:transition-transform after:duration-300 after:content-[''] hover:after:scale-x-100"

const linkClass = (isActive: boolean) =>
    `relative block py-4 no-underline transition-colors duration-200 hover:text-accent ${hoverLine} ${isActive ? 'text-accent' : 'text-muted'}`

// Sits over the top of each page. The accent line marking the current page rests on the bar's bottom border
// and slides to the new link on navigation (shared layoutId). "Projekty" opens a plain list of every project.
export default function Navbar() {
    return (
        <header className="absolute inset-x-0 top-0 z-30 border-b border-rule">
            <nav className="flex flex-wrap items-stretch justify-center gap-x-[clamp(20px,4vw,48px)] px-5 text-[13px] tracking-[0.02em]">
                {navLinks.map(({ to, label }) =>
                    to === '/projects' ? (
                        <ProjectsMenu key={to} to={to} label={label} />
                    ) : (
                        <NavItem key={to} to={to} label={label} />
                    ),
                )}
            </nav>
        </header>
    )
}

function NavItem({ to, label }: { to: string; label: string }) {
    return (
        <NavLink to={to} end className={({ isActive }) => linkClass(isActive)}>
            {({ isActive }) => (
                <>
                    {label}
                    {isActive && (
                        <motion.span
                            layoutId="nav-active"
                            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                            className="absolute inset-x-0 -bottom-px z-10 h-px bg-accent"
                        />
                    )}
                </>
            )}
        </NavLink>
    )
}

function ProjectsMenu({ to, label }: { to: string; label: string }) {
    const [open, setOpen] = useState(false)

    // Keep the menu open while focus moves between its links; close once focus leaves it entirely.
    function handleBlur(e: FocusEvent<HTMLDivElement>) {
        if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false)
    }

    return (
        <div
            className="relative"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            onBlur={handleBlur}
            onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
        >
            <NavItem to={to} label={label} />

            <AnimatePresence>
                {open && (
                    <motion.ul
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-1/2 m-0 min-w-56 -translate-x-1/2 list-none border border-rule bg-page px-0 py-2 tracking-normal"
                    >
                        {projects.map((project) => (
                            <li key={project.slug}>
                                <Link
                                    to={projectPath(project)}
                                    onClick={() => setOpen(false)}
                                    className="block px-5 py-2 whitespace-nowrap text-muted no-underline transition-colors duration-200 hover:text-accent"
                                >
                                    {project.name ?? project.title}
                                </Link>
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    )
}
