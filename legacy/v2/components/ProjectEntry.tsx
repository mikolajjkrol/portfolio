import { Link } from 'react-router'
import { projectPath, type Project } from '../data'

// One project in a list, styled like a post in a blog index.
export default function ProjectEntry({ project }: { project: Project }) {
    return (
        <li>
            <Link to={projectPath(project)} className="group block text-ink no-underline">
                <span className="t-meta block text-faint">
                    {project.kind} · {project.tags}
                </span>
                <span className="t-entry mt-1 block transition-colors duration-150 group-hover:text-accent">
                    {project.name ?? project.title}
                </span>
                <span className="t-body mt-2 block text-dim">{project.summary}</span>
            </Link>
        </li>
    )
}
