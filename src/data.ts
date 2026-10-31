import anetamisiakImg from './assets/projects/anetamisiak.jpg'
import autokosparczewImg from './assets/projects/autokosparczew.jpg'
import calendifyImg from './assets/projects/calendify.jpg'
import ehdsolarImg from './assets/projects/ehdsolar.jpg'
import mbudgetImg from './assets/projects/mbudget-planner.jpg'
import {
    siCisco,
    siCss,
    siGooglecalendar,
    siHtml5,
    siMaplibre,
    siNetlify,
    siPostgresql,
    siPython,
    siReact,
    siRedux,
    siSupabase,
    siTailwindcss,
    siTypescript,
    siVercel,
    type SimpleIcon,
} from 'simple-icons'

export const navLinks = [
    { to: '/', label: 'Start' },
    { to: '/projects', label: 'Projekty' },
    { to: '/skills', label: 'Umiejętności i doświadczenie' },
    { to: '/education', label: 'Edukacja' },
    { to: '/contact', label: 'Kontakt' },
]

export type Project = {
    slug: string
    title: string
    // Name shown in the navbar menu when the title is a domain.
    name?: string
    summary: string
    about: string[]
    features: string[]
    tags: string
    kind: 'Główny produkt' | 'Projekt poboczny' | 'Zlecenie'
    live?: boolean
    stack: string[]
    integrations?: string[]
    url?: string
    image?: string
    // Flat brand-ish colour used behind the project's image.
    color: string
}

export const projects: Project[] = [
    {
        slug: 'calendify',
        color: '#e07a3f',
        title: 'Calendify',
        summary: 'Platforma rezerwacji i zarządzania klientami dla lokalnych firm usługowych.',
        about: [
            'Calendify to mój najważniejszy produkt: działająca platforma, dzięki której salony, warsztaty i siłownie przyjmują rezerwacje online całą dobę, bez telefonów i papierowych kalendarzy.',
            'Właściciel firmy zarządza wszystkim z jednego panelu, a jego klienci rezerwują wizyty na własnej stronie rezerwacji. Wizyty trafiają do Google Calendar, a klienci dostają przypomnienia SMS, więc rzadziej zapominają o terminie.',
        ],
        features: [
            'Panel właściciela z harmonogramem w widokach dnia, 5 dni, tygodnia i miesiąca',
            'Własna strona rezerwacji dla klientów każdej firmy',
            'Statusy rezerwacji (potwierdzona, oczekująca, anulowana) i filtrowanie po pracownikach',
            'Synchronizacja z Google Calendar',
            'Automatyczne przypomnienia SMS',
            'REST API i formularze rezerwacji do osadzenia na stronie firmy',
        ],
        tags: 'SaaS · Rezerwacje',
        kind: 'Główny produkt',
        live: true,
        stack: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase'],
        integrations: ['Google Calendar API', 'SMSAPI'],
        url: 'https://calendify.pl/dla-firm',
        image: calendifyImg,
    },
    {
        slug: 'parser-matur',
        color: '#5fa596',
        title: 'Parser matur z matematyki',
        summary: 'Arkusze maturalne z matematyki z lat 2004–2026 zamienione w uporządkowaną bazę zadań.',
        about: [
            'Narzędzie w Pythonie, które przetwarza arkusze maturalne z matematyki z ponad dwudziestu lat i zapisuje każde zadanie jako osobny rekord w bazie.',
            'Zadania są klasyfikowane według oficjalnych kodów wymagań CKE. Dzięki temu kategoryzacja jest dokładna i nie wymaga kosztownych zapytań do modeli AI.',
        ],
        features: [
            'Przetwarzanie arkuszy z lat 2004–2026',
            'Eksport bazy zadań do SQL, JSON i CSV',
            'Klasyfikacja zadań według oficjalnych kodów wymagań CKE',
            'Kategoryzacja bez zapytań do modeli AI',
        ],
        tags: 'Narzędzie · Dane',
        kind: 'Projekt poboczny',
        stack: ['Python', 'SQL', 'JSON', 'CSV'],
    },
    {
        slug: 'algorytmy-prestashop',
        color: '#c9668c',
        title: 'Algorytmy dla PrestaShop',
        summary: 'Zestaw algorytmów automatyzujących pracę ze sklepami PrestaShop.',
        about: [
            'Prowadzenie sklepu internetowego to dużo powtarzalnej pracy z plikami, opisami i kategoriami. Ten zestaw algorytmów przejmuje ją od właściciela sklepu.',
        ],
        features: ['Generowanie plików dla sklepu', 'Tłumaczenie treści', 'Automatyczna kategoryzacja produktów'],
        tags: 'Automatyzacja · E-commerce',
        kind: 'Projekt poboczny',
        stack: ['PrestaShop'],
    },
    {
        slug: 'mbudget-planner',
        color: '#6f8fbf',
        title: 'Budget Planner App',
        summary: 'Aplikacja do planowania budżetu i śledzenia finansów osobistych.',
        about: ['Aplikacja webowa, która pomaga zaplanować budżet i sprawdzić, dokąd naprawdę idą pieniądze.'],
        features: [
            'Saldo gotówki i konta bankowego w jednym miejscu',
            'Wykres salda i porównanie przychodów z wydatkami miesiąc do miesiąca',
            'Wydatki według kategorii',
            'Historia transakcji',
            'Szybkie dodawanie przychodów i wydatków',
        ],
        tags: 'Aplikacja · Finanse',
        kind: 'Projekt poboczny',
        live: true,
        stack: ['Netlify'],
        url: 'https://mbudget-planner.netlify.app',
        image: mbudgetImg,
    },
    {
        slug: 'autokosparczew',
        color: '#d9534a',
        title: 'autokosparczew.pl',
        name: 'Auto Kosmetyka Andrzejewski',
        summary: 'Strona studia detailingu samochodowego Auto Kosmetyka Andrzejewski.',
        about: [
            'Strona dla studia auto kosmetyki i detailingu, które oferuje m.in. montaż folii ochronnych PPF i powłok ceramicznych.',
            'Najważniejsze było, żeby klient mógł jak najszybciej się skontaktować, dlatego WhatsApp i telefon są zawsze pod ręką, a kalkulator od razu podaje orientacyjną wycenę.',
        ],
        features: ['Karuzela opinii klientów', 'Kalkulator wyceny', 'Szybki kontakt przez WhatsApp lub telefon', 'Sekcje oferty, galerii i cennika'],
        tags: 'Strona internetowa · Motoryzacja',
        kind: 'Zlecenie',
        live: true,
        stack: ['React'],
        url: 'https://autokosparczew.pl',
        image: autokosparczewImg,
    },
    {
        slug: 'aneta-misiak',
        color: '#7fa38a',
        title: 'terapeuta-anetamisiak.pl',
        name: 'Centrum Terapeutyczne Aneta Misiak',
        summary: 'Strona Centrum Psychologiczno-Terapeutycznego Anety Misiak w Lubartowie.',
        about: [
            'Strona gabinetu, który oferuje psychoterapię, poradnictwo psychologiczne, rehabilitację i warsztaty psychoedukacyjne.',
            'Zbudowana w statycznym HTML, zoptymalizowana pod szybkość i prostotę, ze spokojnym designem pasującym do charakteru gabinetu.',
        ],
        features: ['Sekcje oferty, zespołu, cennika i FAQ', 'Umawianie wizyty', 'Szybkie ładowanie dzięki statycznemu HTML'],
        tags: 'Strona internetowa · Terapia',
        kind: 'Zlecenie',
        live: true,
        stack: ['HTML', 'CSS'],
        url: 'https://terapeuta-anetamisiak.pl',
        image: anetamisiakImg,
    },
    {
        slug: 'ehdsolar',
        color: '#e8a840',
        title: 'ehdsolar.pl',
        name: 'HD Solar',
        summary: 'Strona firmy fotowoltaicznej HD Solar z Ostrowa Wielkopolskiego.',
        about: ['Strona firmy, która projektuje i montuje instalacje fotowoltaiczne. Prowadzi odwiedzającego od oferty do bezpłatnej wyceny.'],
        features: ['Sekcje oferty, realizacji i opinii', 'Bezpłatna wycena', 'Najważniejsze liczby firmy w nagłówku'],
        tags: 'Strona internetowa · Fotowoltaika',
        kind: 'Zlecenie',
        live: true,
        stack: [],
        url: 'https://ehdsolar.pl',
        image: ehdsolarImg,
    },
]

export const productProjects = projects.filter((p) => p.kind !== 'Zlecenie')
export const clientSites = projects.filter((p) => p.kind === 'Zlecenie')

export const projectPath = (p: Project) => `/projects/${p.slug}`
export const host = (url: string) => new URL(url).host

// Logos come from simple-icons; `color` is the brand colour shown on hover (lightened where the brand is too dark for the page).
export const technologies: { name: string; category: string; icon?: SimpleIcon; color: string }[] = [
    { name: 'React', category: 'Frontend', icon: siReact, color: '#61dafb' },
    { name: 'TypeScript', category: 'Frontend', icon: siTypescript, color: '#3178c6' },
    { name: 'Tailwind CSS', category: 'Frontend', icon: siTailwindcss, color: '#06b6d4' },
    { name: 'Redux', category: 'Frontend', icon: siRedux, color: '#9b74d8' },
    { name: 'HTML', category: 'Frontend', icon: siHtml5, color: '#e34f26' },
    { name: 'CSS', category: 'Frontend', icon: siCss, color: '#8a5cc7' },
    { name: 'Supabase', category: 'Backend i dane', icon: siSupabase, color: '#3fcf8e' },
    { name: 'PostgreSQL', category: 'Backend i dane', icon: siPostgresql, color: '#5b84e8' },
    { name: 'Python', category: 'Backend i dane', icon: siPython, color: '#4b8bbe' },
    { name: 'Vercel', category: 'Wdrożenia', icon: siVercel, color: '#ecebe8' },
    { name: 'Netlify', category: 'Wdrożenia', icon: siNetlify, color: '#00c7b7' },
    { name: 'Google Calendar API', category: 'Integracje', icon: siGooglecalendar, color: '#4285f4' },
    { name: 'SMSAPI', category: 'Integracje', color: '#d8c3a5' },
    { name: 'MapLibre GL JS', category: 'Integracje', icon: siMaplibre, color: '#5b8ad6' },
    { name: 'Cisco CCNAv7', category: 'Sieci', icon: siCisco, color: '#1ba0d7' },
]

export const educationDetails: { status: string; title: string; detail: string; notes?: string }[] = [
    {
        status: 'W trakcie',
        title: 'Technik informatyk',
        detail: 'Technikum Informatyczne nr 2 w Lubartowie',
        notes: 'Ostatnia klasa technikum, równolegle z pracą jako niezależny programista.',
    },
    {
        status: 'Zdany',
        title: 'Egzamin zawodowy INF.02 (EE.08)',
        detail: 'Administracja i eksploatacja systemów komputerowych, urządzeń peryferyjnych i lokalnych sieci komputerowych',
    },
    {
        status: 'Zdany',
        title: 'Egzamin zawodowy INF.03 (EE.09)',
        detail: 'Tworzenie i administrowanie stronami i aplikacjami internetowymi oraz bazami danych',
    },
    {
        status: 'Ukończony',
        title: 'Cisco CCNAv7',
        detail: 'Introduction to Networks',
    },
]

export const certificates = [
    { code: 'INF.02', title: 'Egzamin zawodowy (EE.08)', issuer: 'CKE', status: 'Zdany' },
    { code: 'INF.03', title: 'Egzamin zawodowy (EE.09)', issuer: 'CKE', status: 'Zdany' },
    { code: 'CCNAv7', title: 'Introduction to Networks', issuer: 'Cisco Networking Academy', status: 'Ukończony' },
]

export const contactDetails = [
    { label: 'E-mail', value: 'mikolajkock@gmail.com', href: 'mailto:mikolajkock@gmail.com' },
    { label: 'Telefon', value: '+48 502 776 877', href: 'tel:+48502776877' },
    { label: 'GitHub', value: 'github.com/mikolajjkrol', href: 'https://github.com/mikolajjkrol' },
    { label: 'LinkedIn', value: 'linkedin.com/in/mikołaj-król', href: 'https://www.linkedin.com/in/miko%C5%82aj-kr%C3%B3l-44494b330/' },
]

export const contactFacts = [
    { label: 'Status', value: 'Dostępny do zleceń freelance' },
    { label: 'Lokalizacja', value: 'Lubartów, Polska' },
    { label: 'Języki', value: 'polski, angielski (B2/C1)' },
]
