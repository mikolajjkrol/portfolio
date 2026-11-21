import { Outlet } from 'react-router'
import Footer from './Footer'
import Navbar from './Navbar'

export default function Layout() {
    return (
        <div className="min-h-dvh overflow-x-clip">
            <Navbar />
            <main className="relative z-10 [clip-path:inset(0_0_-8rem_0)] rounded-b-2xl bg-bg shadow-[0_24px_60px_-12px_rgb(17_17_17/0.18),0_2px_8px_-2px_rgb(17_17_17/0.06)]">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}
