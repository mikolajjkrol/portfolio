import { useEffect, useRef, useState, type ReactNode } from 'react'

// macOS Safari (light, "separate" tab layout) window chrome that behaves almost like the real thing:
// traffic lights show their glyphs on hover, toolbar buttons get the soft hover/pressed plate,
// the address field expands to the full URL (selected) on click, and reload / Enter plays the load bar.
// Sized in `em` off the window width (container query units), so it scales like a real screenshot.

const icon = 'h-[1.15em] w-auto shrink-0 fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round]'

// Small square button with Safari's hover plate. Disabled ones are dimmed and inert.
function ToolButton({
    label,
    disabled,
    onClick,
    children,
    className = '',
}: {
    label: string
    disabled?: boolean
    onClick?: () => void
    children: ReactNode
    className?: string
}) {
    return (
        <button
            type="button"
            aria-label={label}
            title={label}
            disabled={disabled}
            onClick={onClick}
            className={`flex h-[2.1em] min-w-[2.3em] shrink-0 cursor-default items-center justify-center gap-[0.2em] rounded-[0.45em] px-[0.5em] text-[#6b6b6b] transition-colors duration-100 hover:bg-[rgb(0_0_0/0.06)] active:bg-[rgb(0_0_0/0.12)] active:text-[#3a3a3a] disabled:text-[#6b6b6b]/40 disabled:hover:bg-transparent ${className}`}
        >
            {children}
        </button>
    )
}

function TrafficLights() {
    const light =
        'relative flex size-[0.8em] cursor-default items-center justify-center rounded-full shadow-[inset_0_0_0_0.5px_rgb(0_0_0/0.14)] active:brightness-[0.82]'
    const glyph = 'size-[0.5em] opacity-0 transition-opacity duration-75 group-hover/lights:opacity-100'
    return (
        // Hovering anywhere over the three shows all glyphs, like macOS.
        <div className="group/lights flex shrink-0 gap-[0.55em] py-[0.5em]">
            <button type="button" aria-label="Zamknij" className={`${light} bg-[#ff5f57]`}>
                <svg viewBox="0 0 8 8" className={`${glyph} stroke-[#4d0000]`} strokeWidth="1.1" strokeLinecap="round">
                    <path d="M1.7 1.7l4.6 4.6M6.3 1.7L1.7 6.3" />
                </svg>
            </button>
            <button type="button" aria-label="Minimalizuj" className={`${light} bg-[#febc2e]`}>
                <svg viewBox="0 0 8 8" className={`${glyph} stroke-[#995700]`} strokeWidth="1.2" strokeLinecap="round">
                    <path d="M1.3 4h5.4" />
                </svg>
            </button>
            <button type="button" aria-label="Pełny ekran" className={`${light} bg-[#28c840]`}>
                <svg viewBox="0 0 8 8" className={`${glyph} fill-[#006500]`}>
                    <path d="M1.6 2.3v3.4l3.4-3.4H1.6ZM6.4 5.7V2.3L3 5.7h3.4Z" />
                </svg>
            </button>
        </div>
    )
}

function AddressBar({ url, path, onLoad, loading }: { url: string; path: string; onLoad: () => void; loading: number }) {
    const [editing, setEditing] = useState(false)
    const input = useRef<HTMLInputElement>(null)
    const full = `https://${url}${path}`
    const [value, setValue] = useState(full)

    // On focus the whole URL is shown and selected, exactly like clicking Safari's address field.
    useEffect(() => {
        if (editing) input.current?.select()
    }, [editing])

    const stop = () => {
        setEditing(false)
        setValue(full)
    }

    return (
        <div
            onClick={() => !editing && setEditing(true)}
            className={`group/address relative flex h-[2.1em] w-[46%] max-w-[38em] min-w-0 cursor-text items-center overflow-hidden rounded-[0.6em] px-[2.3em] transition-[background-color,box-shadow] duration-150 ${
                editing
                    ? 'bg-white shadow-[0_0_0_0.22em_rgb(0_122_255/0.45),0_0_0_0.06em_rgb(0_122_255/0.7)]'
                    : 'bg-[rgb(0_0_0/0.055)] hover:bg-[rgb(0_0_0/0.085)]'
            }`}
        >
            {editing ? (
                <input
                    ref={input}
                    value={value}
                    spellCheck={false}
                    aria-label="Adres strony"
                    onChange={(e) => setValue(e.target.value)}
                    onBlur={stop}
                    onKeyDown={(e) => {
                        if (e.key === 'Escape') e.currentTarget.blur()
                        if (e.key === 'Enter') {
                            e.currentTarget.blur()
                            onLoad()
                        }
                    }}
                    className="absolute inset-0 w-full bg-transparent px-[0.75em] text-[0.95em] text-[#1d1d1f] outline-none selection:bg-[#b3d7ff]"
                />
            ) : (
                <>
                    {/* Page menu: only appears on hover, as in Safari */}
                    <svg
                        viewBox="0 0 18 14"
                        className={`${icon} absolute left-[0.75em] h-[0.95em] text-[#6b6b6b] opacity-0 transition-opacity duration-150 group-hover/address:opacity-100`}
                        strokeWidth="1.3"
                    >
                        <rect x="1" y="1" width="16" height="12" rx="2.5" />
                        <path d="M4.5 5h9M4.5 9h6" />
                    </svg>
                    <span className="mx-auto flex min-w-0 items-center gap-[0.35em] text-[0.95em] text-[#1d1d1f] select-none">
                        <svg viewBox="0 0 12 14" className="h-[0.85em] w-auto shrink-0 fill-[#6b6b6b]">
                            <path d="M3 6V4.3a3 3 0 0 1 6 0V6h.4c.9 0 1.6.7 1.6 1.6v4.8c0 .9-.7 1.6-1.6 1.6H2.6C1.7 14 1 13.3 1 12.4V7.6C1 6.7 1.7 6 2.6 6H3Zm1.4 0h3.2V4.3a1.6 1.6 0 0 0-3.2 0V6Z" />
                        </svg>
                        <span className="truncate">{url}</span>
                    </span>
                    {/* Reload (or stop while loading) */}
                    <button
                        type="button"
                        aria-label={loading ? 'Zatrzymaj' : 'Odśwież stronę'}
                        title={loading ? 'Zatrzymaj' : 'Odśwież stronę'}
                        onClick={(e) => {
                            e.stopPropagation()
                            onLoad()
                        }}
                        className={`absolute right-[0.4em] flex size-[1.6em] cursor-default items-center justify-center rounded-[0.35em] text-[#6b6b6b] transition-opacity duration-150 hover:text-[#1d1d1f] active:bg-[rgb(0_0_0/0.08)] ${
                            loading ? 'opacity-100' : 'opacity-0 group-hover/address:opacity-100'
                        }`}
                    >
                        {loading ? (
                            <svg viewBox="0 0 16 16" className={`${icon} h-[0.85em]`} strokeWidth="1.6">
                                <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" />
                            </svg>
                        ) : (
                            <svg viewBox="0 0 16 16" className={`${icon} h-[0.95em]`} strokeWidth="1.5">
                                <path d="M13.5 8A5.5 5.5 0 1 1 11.8 4" />
                                <path d="M12.5 1.5v3h-3" />
                            </svg>
                        )}
                    </button>
                </>
            )}

            {/* Load progress along the bottom edge of the field */}
            <span
                aria-hidden
                className="pointer-events-none absolute bottom-0 left-0 h-[0.14em] bg-[#007aff]"
                style={{
                    width: `${loading}%`,
                    opacity: loading > 0 && loading < 100 ? 1 : 0,
                    transition: loading === 0 ? 'none' : 'width 0.5s cubic-bezier(0.2,0.7,0.2,1), opacity 0.3s 0.15s',
                }}
            />
        </div>
    )
}

export default function SafariWindow({
    url,
    path = '/',
    children,
}: {
    url: string
    path?: string
    children: ReactNode
}) {
    // 0 = idle, then a few fake progress steps up to 100 and back to 0.
    const [loading, setLoading] = useState(0)
    const timers = useRef<ReturnType<typeof setTimeout>[]>([])

    useEffect(() => () => timers.current.forEach(clearTimeout), [])

    const load = () => {
        timers.current.forEach(clearTimeout)
        if (loading) {
            // Stop
            setLoading(0)
            return
        }
        const steps: [number, number][] = [
            [12, 20],
            [38, 260],
            [64, 620],
            [82, 900],
            [100, 1250],
            [0, 1750],
        ]
        timers.current = steps.map(([value, at]) => setTimeout(() => setLoading(value), at))
    }

    // While loading the page dims slightly, then settles, like a real reload.
    const reloading = loading > 0 && loading < 100

    return (
        <div className="@container">
            <div className="overflow-hidden rounded-[0.75cqw] bg-white text-[clamp(9px,1.05cqw,14px)] shadow-[0_0_0_0.5px_rgb(0_0_0/0.18),0_2px_6px_rgb(0_0_0/0.06),0_24px_70px_-12px_rgb(0_0_0/0.28)]">
                <div className="flex h-[3.6em] items-center gap-[1.6em] bg-[#f6f6f6] px-[1.4em] shadow-[inset_0_-0.5px_0_rgb(0_0_0/0.16)] select-none">
                    <TrafficLights />
                    <div className="flex flex-1 items-center gap-[0.4em] @max-md:hidden">
                        <ToolButton label="Pokaż pasek boczny">
                            <svg viewBox="0 0 20 16" className={icon} strokeWidth="1.4">
                                <rect x="1" y="1" width="18" height="14" rx="3" />
                                <path d="M7 1v14" />
                                <path d="M3 4.5h2M3 7h2M3 9.5h2" />
                            </svg>
                            <svg viewBox="0 0 10 6" className="h-[0.42em] w-auto fill-none stroke-current" strokeWidth="1.4">
                                <path d="M1 1l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </ToolButton>
                        <ToolButton label="Wstecz" onClick={load} className="ml-[0.8em]">
                            <svg viewBox="0 0 10 16" className={icon} strokeWidth="1.6">
                                <path d="M8 1.5L2 8l6 6.5" />
                            </svg>
                        </ToolButton>
                        <ToolButton label="Dalej" disabled>
                            <svg viewBox="0 0 10 16" className={icon} strokeWidth="1.6">
                                <path d="M2 1.5L8 8l-6 6.5" />
                            </svg>
                        </ToolButton>
                    </div>
                    <AddressBar url={url} path={path} onLoad={load} loading={loading} />
                    <div className="flex flex-1 justify-end gap-[0.4em] @max-md:hidden">
                        <ToolButton label="Udostępnij">
                            <svg viewBox="0 0 14 18" className={icon} strokeWidth="1.4">
                                <path d="M4.5 7H3a1.5 1.5 0 0 0-1.5 1.5v7A1.5 1.5 0 0 0 3 17h8a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 11 7H9.5" />
                                <path d="M7 11V1.5M4 4.3 7 1.3l3 3" />
                            </svg>
                        </ToolButton>
                        <ToolButton label="Nowa karta">
                            <svg viewBox="0 0 14 14" className={icon} strokeWidth="1.5">
                                <path d="M7 1.5v11M1.5 7h11" />
                            </svg>
                        </ToolButton>
                        <ToolButton label="Pokaż wszystkie karty">
                            <svg viewBox="0 0 18 16" className={icon} strokeWidth="1.4">
                                <rect x="1" y="4" width="12" height="11" rx="2" />
                                <path d="M5 1h9a3 3 0 0 1 3 3v8" />
                            </svg>
                        </ToolButton>
                    </div>
                </div>
                <div className={`transition-opacity duration-300 ${reloading ? 'opacity-60' : 'opacity-100'}`}>{children}</div>
            </div>
        </div>
    )
}
