import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import Footer from './Footer'
import Navbar from './Navbar'

export default function Layout() {
    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' })
    }, [pathname])

    return (
        <div className="relative box-border min-h-screen w-full bg-page font-sans text-ink-soft">
            {/* The page itself: an opaque layer above the fixed footer, lifting off it at the end of the scroll. */}
            <div className="relative z-10 min-h-screen overflow-x-clip bg-page shadow-[0_16px_32px_-16px_rgba(0,0,0,0.45)]">
                <Navbar />

                <div className="mx-auto box-border max-w-[1200px] px-[clamp(20px,5vw,64px)]">
                    <main>
                        <Outlet />
                    </main>
                </div>
            </div>

            <Footer />
        </div>
    )
}
