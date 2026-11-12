import ProjectEntry from '../components/ProjectEntry'
import { clientSites, productProjects } from '../data'

const groups = [
    { title: 'Produkty i narzędzia', items: productProjects },
    { title: 'Strony dla firm', items: clientSites },
]

export default function Projects() {
    return (
        <article>
            <h1 className="t-display m-0">Projekty</h1>
            <p className="t-lede mt-10 text-dim">
                Własne produkty, narzędzia, z których korzystam na co dzień, i strony dla lokalnych firm. Każdy zaczął
                się od konkretnego problemu do rozwiązania.
            </p>

            {groups.map(({ title, items }) => (
                <section key={title} className="mt-24">
                    <h2 className="t-ui m-0 text-faint">{title}</h2>
                    <ul className="m-0 mt-10 flex list-none flex-col gap-14 p-0">
                        {items.map((p) => (
                            <ProjectEntry key={p.slug} project={p} />
                        ))}
                    </ul>
                </section>
            ))}
        </article>
    )
}
