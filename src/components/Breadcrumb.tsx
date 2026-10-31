import { Fragment } from 'react'
import { Link } from 'react-router'

type BreadcrumbProps = {
    page: string
    // Levels between "Portfolio" and the current page.
    parents?: { label: string; to: string }[]
}

export default function Breadcrumb({ page, parents = [] }: BreadcrumbProps) {
    return (
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
            {[{ label: 'Portfolio', to: '/' }, ...parents].map(({ label, to }) => (
                <Fragment key={to}>
                    <Link to={to} className="text-muted no-underline transition-colors duration-200 hover:text-accent">
                        {label}
                    </Link>
                    <span className="text-timeline">/</span>
                </Fragment>
            ))}
            <span className="text-ink-soft">{page}</span>
        </div>
    )
}
