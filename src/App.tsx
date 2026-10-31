import { BrowserRouter, Route, Routes } from 'react-router'
import Layout from './components/Layout'
import Contact from './pages/Contact'
import Education from './pages/Education'
import Home from './pages/Home'
import ProjectDetail from './pages/ProjectDetail'
import Projects from './pages/Projects'
import Skills from './pages/Skills'

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="projects" element={<Projects />} />
                    <Route path="projects/:slug" element={<ProjectDetail />} />
                    <Route path="skills" element={<Skills />} />
                    <Route path="education" element={<Education />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="*" element={<Home />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
