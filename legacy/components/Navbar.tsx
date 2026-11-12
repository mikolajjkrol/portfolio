import { AnimatePresence, motion } from 'framer-motion'
import { useState, type FocusEvent } from 'react'
import { Link, NavLink } from 'react-router'
import { navLinks, projectPath, projects } from '../data'

// White line that grows out from the centre under a hovered link.
const hoverLine =
    "after:absolute after:inset-x-0 after:bottom-4 after:h-0.5 after:origin-center after:scale-x-0 after:bg-white after:transition-transform after:duration-300 after:ease-out after:content-[''] hover:after:scale-x-100"

const linkClass = (isActive: boolean) =>
    `relative block py-6 text-white no-underline transition-opacity duration-200 ${hoverLine} ${isActive ? 'opacity-100' : 'opacity-75 hover:opacity-100'}`

// Floats over the top of each page with no bar or border: just a centred row of white links.
// The line marking the current page slides to the new link on navigation (shared layoutId).
// "Projekty" opens a plain list of every project.
export default function Navbar() {
    return (
        <header className="absolute inset-x-0 top-0 z-30">
            <nav className="flex flex-wrap items-stretch justify-center gap-x-[clamp(18px,2.5vw,36px)] px-5 type-nav text-[clamp(12px,0.9vw,14px)]">
                {navLinks.map(({ to, label }) =>
                    to === '/projects' ? <ProjectsMenu key={to} to={to} label={label} /> : <NavItem key={to} to={to} label={label} />,
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
                            className="absolute inset-x-0 bottom-4 z-10 h-0.5 bg-white"
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
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.18 }}
                        className="absolute top-full left-1/2 m-0 min-w-64 -translate-x-1/2 list-none bg-black/90 px-0 py-3 backdrop-blur-md"
                    >
                        {projects.map((project) => (
                            <li key={project.slug}>
                                <Link
                                    to={projectPath(project)}
                                    onClick={() => setOpen(false)}
                                    className="block px-5 py-2 whitespace-nowrap text-white no-underline opacity-75 transition-opacity duration-200 hover:opacity-100"
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
