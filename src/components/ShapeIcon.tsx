// Placeholder project icons styled like Apple app icons: a rounded-square tile with a soft
// top-to-bottom gradient, a faint top sheen and a hairline edge, with the hero shape as the glyph.
// Swap for real icons later.

export type ShapeKind = 'circle' | 'square' | 'pill' | 'triangle'

type Style = {
    tile: string // tile background
    glyph: string // glyph fill (CSS background)
    glyphShadow: string
}

const styles: Record<ShapeKind, Style> = {
    circle: {
        tile: 'linear-gradient(180deg, #ff8fbb 0%, #f4548e 100%)',
        glyph: 'linear-gradient(180deg, #ffffff 0%, #fff0f6 100%)',
        glyphShadow: '0 2px 4px rgb(160 20 70 / 0.35)',
    },
    square: {
        tile: 'linear-gradient(180deg, #ffffff 0%, #eeeeee 100%)',
        glyph: 'linear-gradient(180deg, #ffb6d5 0%, #fa699e 100%)',
        glyphShadow: '0 2px 4px rgb(250 105 158 / 0.4)',
    },
    pill: {
        tile: 'linear-gradient(180deg, #6fe89c 0%, #2fc56b 100%)',
        glyph: 'linear-gradient(180deg, #ffffff 0%, #effdf4 100%)',
        glyphShadow: '0 2px 4px rgb(20 120 60 / 0.35)',
    },
    triangle: {
        tile: 'linear-gradient(180deg, #ffc2dc 0%, #ff8dbb 100%)',
        glyph: 'linear-gradient(180deg, #ffffff 0%, #fff3f8 100%)',
        glyphShadow: '0 2px 4px rgb(200 60 110 / 0.35)',
    },
}

const glyphForm: Record<Exclude<ShapeKind, 'triangle'>, string> = {
    circle: 'size-[44%] rounded-full',
    square: 'size-[42%] rounded-[24%]',
    pill: 'h-[28%] w-[60%] rounded-full',
}

export default function ShapeIcon({ shape }: { shape: ShapeKind }) {
    const s = styles[shape]

    return (
        <span
            aria-hidden
            className="relative flex size-[3.25rem] items-center justify-center overflow-hidden rounded-[23%]"
            style={{
                background: s.tile,
                boxShadow: [
                    '0 0 0 0.5px rgb(0 0 0 / 0.08)',
                    '0 1px 2px rgb(0 0 0 / 0.08)',
                    '0 6px 14px -6px rgb(0 0 0 / 0.25)',
                ].join(', '),
            }}
        >
            {/* Top sheen */}
            <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-[linear-gradient(180deg,rgb(255_255_255/0.28),rgb(255_255_255/0))]" />
            {/* Inner edge highlight */}
            <span className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-1px_0_rgb(0_0_0/0.06)]" />

            {shape === 'triangle' ? (
                <span className="relative size-[50%]" style={{ filter: `drop-shadow(${s.glyphShadow})` }}>
                    <svg viewBox="0 0 27 25" className="block size-full">
                        <defs>
                            <linearGradient id="shape-icon-tri" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0" stopColor="#ffffff" />
                                <stop offset="1" stopColor="#fff3f8" />
                            </linearGradient>
                        </defs>
                        <path
                            d="M11.5 2.6c.7-1.2 2.3-1.2 3 0l10.9 19.2c.7 1.2-.2 2.6-1.5 2.6H2.1C.8 24.4-.1 23 .6 21.8L11.5 2.6Z"
                            fill="url(#shape-icon-tri)"
                        />
                    </svg>
                </span>
            ) : (
                <span
                    className={`relative block ${glyphForm[shape]}`}
                    style={{ background: s.glyph, boxShadow: s.glyphShadow }}
                />
            )}
        </span>
    )
}
