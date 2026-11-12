import { contactDetails, contactFacts } from '../data'
import { metaLabel } from '../styles'

export default function Contact() {
    return (
        <div className="mx-auto flex max-w-[680px] flex-col gap-14 pt-32 pb-[88px]">
            <section className="flex flex-col gap-5">
                <h1 className="m-0 font-serif text-[clamp(36px,5vw,48px)] leading-[1.15] font-medium tracking-[-0.01em] text-ink">Skontaktuj się ze mną</h1>
                <p className="m-0 text-[17px] leading-[1.75] text-pretty text-muted">
                    Niezależny programista full-stack z Lubartowa. Tworzę strony i aplikacje webowe w React, TypeScript i Supabase, realizuję zlecenia dla firm i rozwijam własne produkty. Chętnie porozmawiam o Twoim projekcie.
                </p>
            </section>

            <section className="flex flex-col gap-6">
                <h2 className={`m-0 ${metaLabel}`}>Kontakt</h2>
                <ul className="m-0 flex list-none flex-col gap-4 p-0">
                    {contactDetails.map(({ label, value, href }) => (
                        <li key={label}>
                            <a
                                href={href}
                                target={href.startsWith('http') ? '_blank' : undefined}
                                rel="noreferrer"
                                className="group flex items-baseline gap-3 no-underline"
                            >
                                <span className="text-[15px] text-ink-soft">{label}</span>
                                <span className="mb-1 min-w-6 flex-1 border-b border-dotted border-timeline" />
                                <span className="truncate text-[15px] text-ink transition-colors duration-200 group-hover:text-accent">{value}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </section>

            <dl className="m-0 flex flex-col border-t border-rule">
                {contactFacts.map(({ label, value }) => (
                    <div key={label} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-rule py-4 text-[15px]">
                        <dt className="text-muted">{label}</dt>
                        <dd className="m-0 text-ink-soft">{value}</dd>
                    </div>
                ))}
            </dl>
        </div>
    )
}
