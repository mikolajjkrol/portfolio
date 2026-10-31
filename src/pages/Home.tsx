import { Link } from 'react-router'
import FadeInOnView from '../components/FadeInOnView'
import FadeWords from '../components/FadeWords'
import ProjectImage from '../components/ProjectImage'
import StickySlide from '../components/StickySlide'
import Tag from '../components/Tag'
import { clientSites, host, productProjects, projectPath, type Project } from '../data'
import { link, metaLabel } from '../styles'

// Each section is a scroll "slide": it pins in the viewport for (vh - 100) of scroll, then releases.
// Values are a first pass — taller sections get more hold time.
// `exit` / FadeWords `step` set the order things fade out in as a slide releases: top to bottom, headings word by word.
export default function Home() {
    return (
        <>
            <StickySlide vh={180}>
                <section className="flex flex-col gap-8 pt-32 pb-16 md:motion-safe:py-16">
                    <FadeInOnView delay={0.1} exit={false}>
                        <h1 className="m-0 max-w-[880px] font-serif text-[clamp(36px,6vw,64px)] leading-[1.12] font-medium tracking-[-0.01em] text-balance text-ink">
                            <FadeWords text="Buduję aplikacje i strony, które oszczędzają firmom czas." stagger={0.3} />
                        </h1>
                    </FadeInOnView>
                    <FadeInOnView delay={0.3} exit={3}>
                        <div className="h-0.5 w-14 bg-accent" />
                    </FadeInOnView>
                    <FadeInOnView delay={0.45} exit={3.5}>
                        <p className="m-0 max-w-[560px] text-[17px] leading-[1.75] text-pretty text-muted">
                            Mikołaj Król, niezależny programista full-stack z Lubartowa. Pracuję w React, TypeScript i Supabase, realizuję zlecenia dla firm i rozwijam własne produkty SaaS.
                        </p>
                    </FadeInOnView>
                </section>
            </StickySlide>

            <StickySlide vh={170}>
                <section className="flex flex-col items-center gap-6 py-32 text-center md:motion-safe:py-16">
                    <FadeInOnView exit={false}>
                        <h2 className="m-0 font-serif text-[clamp(48px,11vw,128px)] leading-[1.02] font-medium tracking-[-0.02em] text-ink">
                            <FadeWords text="Moje projekty" stagger={0.6} />
                        </h2>
                    </FadeInOnView>
                    <FadeInOnView delay={0.45} exit={1.5}>
                        <span className="font-serif text-[17px] text-muted italic">Własne produkty, projekty poboczne i strony dla firm</span>
                    </FadeInOnView>
                </section>
            </StickySlide>

            {productProjects.map((project, i) => (
                <StickySlide key={project.slug} vh={220}>
                    <ProjectSlide project={project} flipped={i % 2 === 1} />
                </StickySlide>
            ))}

            <StickySlide vh={200}>
                <section className="flex flex-col gap-10 py-20 md:motion-safe:py-16">
                    <FadeInOnView delay={0.2} exit={false}>
                        <h3 className="m-0 font-serif text-[clamp(40px,6vw,64px)] leading-[1.05] font-medium tracking-[-0.01em] text-ink">
                            <FadeWords text="Strony dla firm" stagger={0.4} />
                        </h3>
                    </FadeInOnView>
                    <ul className="m-0 flex list-none flex-col border-t border-rule p-0">
                        {clientSites.map((site, i) => (
                            <FadeInOnView key={site.slug} delay={0.4 + i * 0.18} exit={1 + i * 0.5}>
                                <li className="grid items-center gap-x-8 gap-y-3 border-b border-rule py-5 sm:grid-cols-[176px_minmax(0,1fr)]">
                                    <Link to={projectPath(site)} className="hidden transition-opacity duration-200 hover:opacity-80 sm:block" tabIndex={-1} aria-hidden>
                                        <ProjectImage project={site} caption={false} />
                                    </Link>
                                    <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
                                        <div className="flex min-w-0 flex-col gap-1.5">
                                            <Link
                                                to={projectPath(site)}
                                                className="font-serif text-[clamp(22px,2.6vw,28px)] break-words text-ink no-underline transition-colors duration-200 hover:text-accent"
                                            >
                                                {site.title}
                                            </Link>
                                            <p className="m-0 max-w-[520px] text-[15px] leading-[1.7] text-pretty text-muted">{site.summary}</p>
                                        </div>
                                        <Link to={projectPath(site)} className={`${link} shrink-0 text-sm`}>
                                            Szczegóły
                                        </Link>
                                    </div>
                                </li>
                            </FadeInOnView>
                        ))}
                    </ul>
                </section>
            </StickySlide>

            <StickySlide vh={120} fadeOut={false}>
                <section className="flex flex-col items-center gap-8 py-32 text-center md:motion-safe:py-16">
                    <FadeInOnView>
                        <p className="m-0 font-serif text-[clamp(32px,5vw,48px)] leading-[1.2] text-balance text-ink">Masz pomysł na projekt? Porozmawiajmy.</p>
                    </FadeInOnView>
                    <FadeInOnView delay={0.35} className="flex flex-wrap justify-center gap-x-8 gap-y-3.5 text-[15px]">
                        <Link className={link} to="/contact">Napisz wiadomość</Link>
                        <Link className={link} to="/projects">Wszystkie projekty</Link>
                    </FadeInOnView>
                </section>
            </StickySlide>
        </>
    )
}

function ProjectSlide({ project, flipped }: { project: Project; flipped: boolean }) {
    const { title, summary, about, kind, live, stack, url } = project
    const facts = [{ label: 'Rodzaj', value: kind }, ...(live ? [{ label: 'Status', value: 'Działa' }] : [])]

    return (
        <section className="flex flex-wrap items-center gap-x-16 gap-y-10 py-20 md:motion-safe:py-16">
            <div className={`flex min-w-0 flex-[1_1_340px] flex-col gap-6 ${flipped ? 'md:order-2' : ''}`}>
                <FadeInOnView delay={0.2} exit={false}>
                    <h3 className="m-0 font-serif text-[clamp(40px,6vw,64px)] leading-[1.05] font-medium tracking-[-0.01em] text-balance text-ink">
                        <FadeWords text={title} stagger={0.4} />
                    </h3>
                </FadeInOnView>
                <FadeInOnView delay={0.4} exit={1.5} className="flex flex-col gap-4">
                    <p className="m-0 font-serif text-xl leading-[1.5] text-pretty text-ink-soft">{summary}</p>
                    <p className="m-0 max-w-[520px] text-[15px] leading-[1.8] text-pretty text-muted">{about[0]}</p>
                </FadeInOnView>
                <FadeInOnView delay={0.55} exit={2.5} className="flex flex-col gap-6">
                    {stack.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                            {stack.map((tech) => (
                                <Tag key={tech}>{tech}</Tag>
                            ))}
                        </div>
                    )}
                    <dl className="m-0 flex flex-wrap gap-x-10 gap-y-4">
                        {facts.map(({ label, value }) => (
                            <div key={label} className="flex flex-col gap-1.5">
                                <dt className={metaLabel}>{label}</dt>
                                <dd className="m-0 font-serif text-[15px] text-ink">{value}</dd>
                            </div>
                        ))}
                        {url && (
                            <div className="flex flex-col gap-1.5">
                                <dt className={metaLabel}>Link</dt>
                                <dd className="m-0 font-serif text-[15px] text-ink">{host(url)}</dd>
                            </div>
                        )}
                    </dl>
                    <Link to={projectPath(project)} className={`${link} self-start text-[15px]`}>
                        Zobacz projekt →
                    </Link>
                </FadeInOnView>
            </div>

            <FadeInOnView delay={0.1} y={0} exit={1} className="min-w-0 flex-[1_1_340px]">
                <Link to={projectPath(project)} aria-label={`Zobacz projekt ${title}`} className="block no-underline">
                    <ProjectImage project={project} />
                </Link>
            </FadeInOnView>
        </section>
    )
}
