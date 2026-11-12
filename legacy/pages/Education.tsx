import { certificates, educationDetails } from '../data'
import { metaLabel } from '../styles'

const blockHeading = 'm-0 font-serif text-2xl font-medium text-ink'

export default function Education() {
    return (
        <>
            <div className="mx-auto flex max-w-[760px] flex-col gap-14 pt-32 pb-[88px]">
                <aside className="flex gap-4 border border-rule bg-card p-5">
                    <span className="font-serif text-lg text-accent">✦</span>
                    <p className="m-0 text-[15px] leading-[1.7] text-ink-soft">
                        Oba egzaminy zawodowe, INF.02 i INF.03, zdane.
                    </p>
                </aside>

                <section className="flex flex-col gap-4">
                    <h2 className={blockHeading}>Przebieg</h2>
                    <div className="flex flex-col">
                        {educationDetails.map(({ status, title, detail, notes }) => (
                            <details key={title} className="group border-b border-rule" open={title === educationDetails[0].title}>
                                <summary className="-mx-2 flex cursor-pointer list-none items-baseline gap-3 px-2 py-4 transition-colors duration-200 hover:bg-card [&::-webkit-details-marker]:hidden">
                                    <span className="text-[10px] text-muted transition-transform duration-200 group-open:rotate-90">▶</span>
                                    <span className="font-serif text-lg text-ink">{title}</span>
                                    <span className="ml-auto pl-4 font-serif text-sm whitespace-nowrap text-muted italic">{status}</span>
                                </summary>
                                <div className="flex flex-col gap-3 pb-6 pl-[22px]">
                                    <p className="m-0 text-[15px] text-ink-soft">{detail}</p>
                                    {notes && <p className="m-0 text-sm leading-[1.7] text-pretty text-muted">{notes}</p>}
                                </div>
                            </details>
                        ))}
                    </div>
                </section>

                <section className="flex flex-col gap-4">
                    <h2 className={blockHeading}>Certyfikaty i egzaminy</h2>
                    <div className="flex flex-col text-sm">
                        <div className={`grid grid-cols-[72px_minmax(0,1fr)_88px] gap-4 border-b border-rule pb-3 sm:grid-cols-[72px_minmax(0,1fr)_200px_88px] ${metaLabel}`}>
                            <span>Kod</span>
                            <span>Nazwa</span>
                            <span className="hidden sm:block">Wydawca</span>
                            <span>Wynik</span>
                        </div>
                        {certificates.map(({ code, title, issuer, status }) => (
                            <div
                                key={code}
                                className="grid grid-cols-[72px_minmax(0,1fr)_88px] gap-4 border-b border-rule py-3.5 sm:grid-cols-[72px_minmax(0,1fr)_200px_88px]"
                            >
                                <span className="text-accent">{code}</span>
                                <span className="text-ink-soft">{title}</span>
                                <span className="hidden text-muted sm:block">{issuer}</span>
                                <span className="font-serif text-muted italic">{status}</span>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </>
    )
}
