import type { ReactNode } from 'react'
import { Link, Navigate, useParams } from 'react-router'
import Breadcrumb from '../components/Breadcrumb'
import ProjectImage from '../components/ProjectImage'
import Tag from '../components/Tag'
import { host, projectPath, projects } from '../data'
import { link, metaLabel } from '../styles'

const readmeHeading = 'm-0 scroll-mt-8 border-b border-rule pb-3 font-serif text-2xl font-medium text-ink'
const sidebarHeading = 'm-0 text-[13px] font-medium text-ink'

const tabs = [
    { id: 'przeglad', icon: '☰', label: 'Przegląd' },
    { id: 'funkcje', icon: '✓', label: 'Funkcje' },
    { id: 'technologie', icon: '⟨⟩', label: 'Technologie' },
]

// A project page laid out like a GitHub repository: header with tabs, README-style main column, "about" sidebar.
export default function ProjectDetail() {
    const { slug } = useParams()
    const index = projects.findIndex((p) => p.slug === slug)
    if (index === -1) return <Navigate to="/projects" replace />

    const project = projects[index]
    const { title, summary, about, features, tags, kind, live, stack, integrations = [], url } = project
    const prev = projects[(index - 1 + projects.length) % projects.length]
    const next = projects[(index + 1) % projects.length]
    const topics = [...tags.split(' · '), ...stack]

    return (
        <div className="flex flex-col gap-10 pt-28 pb-[88px]">
            <header className="flex flex-col gap-6">
                <Breadcrumb page={title} parents={[{ label: 'Projekty', to: '/projects' }]} />

                <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-5">
                    <div className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-2">
                        <span className="grid size-10 shrink-0 place-items-center border border-rule font-serif text-xl text-accent">◫</span>
                        <h1 className="m-0 font-serif text-[clamp(28px,4vw,40px)] leading-[1.15] font-medium tracking-[-0.01em] break-words text-ink">
                            {title}
                        </h1>
                        <Tag dot={live ? 'accent' : 'muted'}>{kind}</Tag>
                    </div>
                    {url && (
                        <a
                            href={url}
                            target="_blank"
                            rel="noreferrer"
                            className="border border-accent px-5 py-2.5 text-[13px] uppercase tracking-[0.14em] text-accent no-underline transition-colors duration-200 hover:bg-accent hover:text-on-accent"
                        >
                            Odwiedź ↗
                        </a>
                    )}
                </div>

                <nav className="flex gap-6 overflow-x-auto border-b border-rule text-[13px]">
                    {tabs.map(({ id, icon, label }, i) => (
                        <a
                            key={id}
                            href={`#${id}`}
                            className={`-mb-px border-b pb-3 whitespace-nowrap no-underline transition-colors duration-200 hover:text-accent ${
                                i === 0 ? 'border-accent text-ink' : 'border-transparent text-muted'
                            }`}
                        >
                            <span className="mr-2 text-muted">{icon}</span>
                            {label}
                        </a>
                    ))}
                </nav>
            </header>

            <div className="grid gap-x-12 gap-y-12 lg:grid-cols-[minmax(0,1fr)_280px]">
                <article className="min-w-0 border border-rule">
                    <div className="flex items-center gap-2 border-b border-rule px-5 py-3 text-[13px] text-ink-soft">
                        <span className="text-muted">☰</span> README
                    </div>
                    <div className="flex flex-col gap-10 px-[clamp(20px,4vw,40px)] py-8">
                        <ProjectImage project={project} />

                        <section className="flex flex-col gap-4">
                            <h2 id="przeglad" className={readmeHeading}>
                                O projekcie
                            </h2>
                            <p className="m-0 font-serif text-xl leading-[1.5] text-pretty text-ink-soft">{summary}</p>
                            {about.map((paragraph) => (
                                <p key={paragraph} className="m-0 text-[15px] leading-[1.8] text-pretty text-muted">
                                    {paragraph}
                                </p>
                            ))}
                        </section>

                        <section className="flex flex-col gap-4">
                            <h2 id="funkcje" className={readmeHeading}>
                                Funkcje
                            </h2>
                            <ul className="m-0 flex flex-col gap-2.5 pl-5 text-[15px] leading-[1.7] text-ink-soft marker:text-accent">
                                {features.map((feature) => (
                                    <li key={feature}>{feature}</li>
                                ))}
                            </ul>
                        </section>

                        <section className="flex flex-col gap-4">
                            <h2 id="technologie" className={readmeHeading}>
                                Technologie
                            </h2>
                            {stack.length > 0 ? (
                                <TechRow label="Stack" items={stack} />
                            ) : (
                                <p className="m-0 font-serif text-[15px] text-muted italic">Szczegóły stacku wkrótce.</p>
                            )}
                            {integrations.length > 0 && <TechRow label="Integracje" items={integrations} />}
                        </section>
                    </div>
                </article>

                <aside className="flex flex-col gap-8 text-sm">
                    <section className="flex flex-col gap-4">
                        <h3 className={sidebarHeading}>Informacje</h3>
                        <p className="m-0 leading-[1.7] text-pretty text-muted">{summary}</p>
                        {url && (
                            <a className={`${link} self-start`} href={url} target="_blank" rel="noreferrer">
                                {host(url)} ↗
                            </a>
                        )}
                        <div className="flex flex-wrap gap-1.5">
                            {topics.map((topic) => (
                                <span key={topic} className="bg-accent/10 px-2.5 py-1 text-xs text-accent">
                                    {topic}
                                </span>
                            ))}
                        </div>
                    </section>

                    <section className="flex flex-col gap-3 border-t border-rule pt-6">
                        <SidebarFact icon="◇" label="Rodzaj">
                            {kind}
                        </SidebarFact>
                        <SidebarFact icon={live ? '●' : '○'} label="Status">
                            {live ? 'Działa' : 'Projekt poboczny'}
                        </SidebarFact>
                        {stack.length > 0 && (
                            <SidebarFact icon="⟨⟩" label="Technologie">
                                {stack.length}
                            </SidebarFact>
                        )}
                    </section>

                    <section className="flex flex-col gap-3 border-t border-rule pt-6">
                        <h3 className={sidebarHeading}>Inne projekty</h3>
                        <ul className="m-0 flex list-none flex-col gap-2 p-0">
                            {projects
                                .filter((p) => p.slug !== slug)
                                .map((p) => (
                                    <li key={p.slug}>
                                        <Link to={projectPath(p)} className="text-muted no-underline transition-colors duration-200 hover:text-accent">
                                            {p.title}
                                        </Link>
                                    </li>
                                ))}
                        </ul>
                    </section>
                </aside>
            </div>

            <nav className="grid grid-cols-2 gap-px border border-rule bg-rule">
                <PagerLink to={projectPath(prev)} label="Poprzedni" title={prev.title} />
                <PagerLink to={projectPath(next)} label="Następny" title={next.title} align="right" />
            </nav>
        </div>
    )
}

function TechRow({ label, items }: { label: string; items: string[] }) {
    return (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className={`w-24 ${metaLabel}`}>{label}</span>
            <span className="flex flex-wrap gap-1.5">
                {items.map((item) => (
                    <Tag key={item}>{item}</Tag>
                ))}
            </span>
        </div>
    )
}

function SidebarFact({ icon, label, children }: { icon: string; label: string; children: ReactNode }) {
    return (
        <div className="flex items-baseline gap-3 text-muted">
            <span className="w-5 shrink-0 text-center text-xs text-accent">{icon}</span>
            <span>{label}</span>
            <span className="ml-auto text-right text-ink-soft">{children}</span>
        </div>
    )
}

function PagerLink({ to, label, title, align = 'left' }: { to: string; label: string; title: string; align?: 'left' | 'right' }) {
    return (
        <Link
            to={to}
            className={`flex min-w-0 flex-col gap-1.5 bg-page px-6 py-5 no-underline transition-colors duration-200 hover:bg-card-hover ${
                align === 'right' ? 'items-end text-right' : ''
            }`}
        >
            <span className={metaLabel}>{align === 'right' ? `${label} →` : `← ${label}`}</span>
            <span className="max-w-full truncate font-serif text-lg text-ink">{title}</span>
        </Link>
    )
}
