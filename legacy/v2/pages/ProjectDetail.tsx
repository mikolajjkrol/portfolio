import { Link, Navigate, useParams } from 'react-router'
import { host, projectPath, projects } from '../data'

export default function ProjectDetail() {
    const { slug } = useParams()
    const index = projects.findIndex((p) => p.slug === slug)
    if (index === -1) return <Navigate to="/projects" replace />

    const project = projects[index]
    const next = projects[(index + 1) % projects.length]
    const tools = [...project.stack, ...(project.integrations ?? [])]

    return (
        <article>
            <Link to="/projects" className="t-meta link-quiet text-faint">
                ← Projekty
            </Link>

            <p className="t-meta m-0 mt-16 text-faint">
                {project.kind} · {project.tags}
            </p>
            <h1 className="t-display m-0 mt-3">{project.name ?? project.title}</h1>
            <p className="t-lede mt-8 text-dim">{project.summary}</p>

            {project.url && (
                <p className="t-ui mt-8">
                    <a href={project.url} target="_blank" rel="noreferrer" className="link">
                        {host(project.url)} ↗
                    </a>
                </p>
            )}

            {project.image && (
                <figure className="m-0 mt-16 lg:-mr-16 xl:-mr-40">
                    <img
                        src={project.image}
                        alt={`Zrzut ekranu: ${project.name ?? project.title}`}
                        className="block h-auto w-full"
                    />
                </figure>
            )}

            <div className="prose t-body mt-16">
                {project.about.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                ))}
            </div>

            <section className="mt-20">
                <h2 className="t-title m-0">Co potrafi</h2>
                <div className="prose t-body mt-6">
                    <ul className="m-0">
                        {project.features.map((f) => (
                            <li key={f}>{f}</li>
                        ))}
                    </ul>
                </div>
            </section>

            {tools.length > 0 && (
                <section className="mt-20">
                    <h2 className="t-title m-0">Technologie</h2>
                    <p className="t-body mt-6 text-dim">{tools.join(', ')}</p>
                </section>
            )}

            <nav className="mt-32">
                <Link to={projectPath(next)} className="group block text-ink no-underline">
                    <span className="t-meta block text-faint">Następny projekt</span>
                    <span className="t-entry mt-1 block transition-colors duration-150 group-hover:text-accent">
                        {next.name ?? next.title} →
                    </span>
                </Link>
            </nav>
        </article>
    )
}
