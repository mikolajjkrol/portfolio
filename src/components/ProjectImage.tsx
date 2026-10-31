import type { CSSProperties } from 'react'
import { host, type Project } from '../data'

// Flat, blur-free block of the project's colour offset behind the image; on hover the image
// steps up and to the left so more of the colour shows.
const flat =
    'shadow-[10px_10px_0_0_var(--project)] transition-[translate,box-shadow] duration-300 ease-out group-hover:-translate-x-1.5 group-hover:-translate-y-1.5 group-hover:shadow-[16px_16px_0_0_var(--project)]'

type ProjectImageProps = {
    project: Project
    // The project's domain under the image, when it has one.
    caption?: boolean
    // Just the image, without the colour block.
    plain?: boolean
    className?: string
}

// A flat project screenshot sitting on an offset block of the project's colour.
export default function ProjectImage({ project, caption = true, plain = false, className = '' }: ProjectImageProps) {
    const { title, url, image, color } = project
    const frame = plain ? '' : flat

    return (
        <figure className={`group m-0 flex flex-col gap-5 ${plain ? '' : 'pr-4 pb-4'} ${className}`} style={{ '--project': color } as CSSProperties}>
            {image ? (
                <img src={image} alt={`Zrzut ekranu: ${title}`} loading="lazy" className={`block aspect-[16/10] w-full object-cover object-top ${frame}`} />
            ) : (
                <div className={`flex aspect-[16/10] flex-col items-center justify-center gap-4 bg-card px-[10%] text-center ${frame}`}>
                    <span className="font-serif text-[clamp(24px,3vw,36px)] leading-tight text-ink">{title}</span>
                    <span className={`h-0.5 w-10 ${plain ? 'bg-rule' : 'bg-(--project)'}`} />
                </div>
            )}
            {caption && url && (
                <figcaption className="flex items-center gap-2 text-xs tracking-[0.04em] text-muted">
                    {!plain && <span className="size-2 bg-(--project)" />}
                    {host(url)}
                </figcaption>
            )}
        </figure>
    )
}
