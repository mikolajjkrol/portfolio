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
                        {v}
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
                <div className="grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-x-8 gap-y-12">
                    {projects.map((project) => (
                        <Link key={project.slug} to={projectPath(project)} className="group flex flex-col gap-4 no-underline">
                            <ProjectImage project={project} caption={false} plain />
                            <div className="flex flex-col gap-1">
                                <h3 className="m-0 font-serif text-xl font-medium break-words text-ink transition-colors duration-200 group-hover:text-accent">
                                    {project.title}
                                </h3>
                                <span className="text-sm text-muted">{project.kind}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </section>
    )
}
