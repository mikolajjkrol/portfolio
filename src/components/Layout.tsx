import { Outlet } from 'react-router'
import Navbar from './Navbar'

export default function Layout() {
    return (
        <div className="min-h-dvh overflow-x-clip">
            <Navbar />
            <main>
                <Outlet />
            </main>
        </div>
    )
}
