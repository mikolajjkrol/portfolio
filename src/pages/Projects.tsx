import { useState } from 'react'
import { Link } from 'react-router'
import ProjectImage from '../components/ProjectImage'
import { host, projectPath, projects } from '../data'
import { metaLabel } from '../styles'

const views = ['Tabela', 'Galeria'] as const
type View = (typeof views)[number]

const columns = 'grid-cols-[minmax(0,1fr)_auto] sm:grid-cols-[minmax(0,1fr)_160px_200px]'

export default function Projects() {
    const [view, setView] = useState<View>('Tabela')

    return (
        <section className="mx-auto flex max-w-[960px] flex-col gap-8 pt-32 pb-[88px]">
            <div className="flex justify-center gap-8 text-[13px]" role="tablist">
                {views.map((v) => (
                    <button
                        key={v}
                        type="button"
                        role="tab"
                        aria-selected={view === v}
                        onClick={() => setView(v)}
                        className={`cursor-pointer border-0 bg-transparent p-0 font-sans transition-colors duration-200 hover:text-accent ${
                            view === v ? 'text-ink' : 'text-muted'
                        }`}
                    >
                        {v === 'Tabela' ? '☰' : '▦'}&nbsp;&nbsp;{v}
                    </button>
                ))}
            </div>

            {view === 'Tabela' ? (
                <div className="flex flex-col">
                    <div className={`grid gap-4 border-b border-rule pb-3 ${columns} ${metaLabel}`}>
                        <span>Nazwa</span>
                        <span>Rodzaj</span>
                        <span className="hidden sm:block">Link</span>
                    </div>
                    {projects.map((project) => (
                        <Link
                            key={project.slug}
                            to={projectPath(project)}
                            className={`group grid items-baseline gap-4 border-b border-rule py-4 text-sm no-underline ${columns}`}
                        >
                            <span className="truncate font-serif text-lg text-ink transition-colors duration-200 group-hover:text-accent">{project.title}</span>
                            <span className="truncate text-muted">{project.kind}</span>
                            <span className="hidden truncate text-muted sm:block">{project.url ? host(project.url) : '—'}</span>
                        </Link>
                    ))}
                </div>
            ) : (
                // Ruled grid like the one on the Skills page, kept to the content column.
                <ul className="m-0 grid list-none grid-cols-1 border-t border-l border-rule p-0 sm:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                        <li key={project.slug} className="border-r border-b border-rule">
                            <Link to={projectPath(project)} aria-label={project.title} className="group relative block no-underline">
                                <ProjectImage project={project} caption={false} plain />
                                {/* Name and description show over the image on hover / keyboard focus. */}
                                <div className="absolute inset-0 flex flex-col justify-end gap-2 bg-page/90 p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                                    <h3 className="m-0 translate-y-2 font-serif text-xl font-medium text-ink transition-transform duration-300 group-hover:translate-y-0 group-focus-visible:translate-y-0">
                                        {project.title}
                                    </h3>
                                    <p className="m-0 translate-y-2 text-sm leading-[1.6] text-pretty text-muted transition-transform delay-75 duration-300 group-hover:translate-y-0 group-focus-visible:translate-y-0">
                                        {project.summary}
                                    </p>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    )
}
