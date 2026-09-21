import { useEffect, useRef, useState } from 'react'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import './App.css'

type Theme = 'light' | 'dark' | 'system'

const experiences = [
  {
    company: 'Company 1',
    logo: '',
    position: 'Software Engineer',
    dates: 'Jan 2024 – Present',
    description: 'Worked on building scalable web applications and improving developer tooling.',
  },
  {
    company: 'Company 2',
    logo: '',
    position: 'Frontend Developer',
    dates: 'Jun 2022 – Dec 2023',
    description: 'Developed responsive user interfaces and integrated REST APIs.',
  },
]

const projects = [
  { title: 'Project 1', description: 'A brief description of what this project does.', link: 'https://github.com' },
  { title: 'Project 2', description: 'A brief description of what this project does.', link: 'https://github.com' },
  { title: 'Project 3', description: 'A brief description of what this project does.', link: 'https://github.com' },
]

function getInitialTheme(): Theme {
  try {
    const saved = localStorage.getItem('theme') as Theme | null
    if (saved === 'light' || saved === 'dark') return saved
  } catch {}
  return 'system'
}

function applyTheme(theme: Theme) {
  const root = document.documentElement
  if (theme === 'system') {
    root.removeAttribute('data-theme')
  } else {
    root.setAttribute('data-theme', theme)
  }
}

function resolvedTheme(theme: Theme): 'light' | 'dark' {
  if (theme !== 'system') return theme
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); observer.unobserve(el) } },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return ref
}

function FadeIn({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useFadeIn()
  return <div ref={ref} className={`fade-in ${className}`}>{children}</div>
}

function ProfilePage() {
  return (
    <section className="profile">
      <FadeIn className="profile-layout">
        <div className="profile-image">
          <span className="profile-initials">YN</span>
        </div>
        <div className="profile-info">
          <h1>Your Name</h1>
          <p className="tagline">Software Developer</p>
          <p className="bio">
            A short bio about yourself. What you do, what you're passionate about, and what drives you.
          </p>
          <div className="social-links">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="mailto:your@email.com">Email</a>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">Resume</a>
          </div>
        </div>
      </FadeIn>
    </section>
  )
}

function ExperiencePage() {
  return (
    <section>
      <FadeIn>
        <h2 className="section-title">Experience</h2>
      </FadeIn>
      {experiences.map((exp, i) => (
        <FadeIn key={i}>
          <div className="card exp-card">
            <div className="exp-logo">
              {exp.logo ? <img src={exp.logo} alt={exp.company} /> : exp.company[0]}
            </div>
            <div className="exp-info">
              <h3>{exp.company}</h3>
              <div className="position">{exp.position}</div>
              <div className="dates">{exp.dates}</div>
              <p className="description">{exp.description}</p>
            </div>
          </div>
        </FadeIn>
      ))}
    </section>
  )
}

function ProjectsPage() {
  return (
    <section>
      <FadeIn>
        <h2 className="section-title">Projects</h2>
      </FadeIn>
      {projects.map((proj, i) => (
        <FadeIn key={i}>
          <a href={proj.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="card project-card">
              <h3>{proj.title} <span className="arrow">→</span></h3>
              <p>{proj.description}</p>
            </div>
          </a>
        </FadeIn>
      ))}
    </section>
  )
}

function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)
  const [resolved, setResolved] = useState<'light' | 'dark'>(() => resolvedTheme(getInitialTheme()))

  useEffect(() => {
    applyTheme(theme)
    setResolved(resolvedTheme(theme))
    try { localStorage.setItem('theme', theme) } catch {}

    if (theme === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)')
      const handler = () => setResolved(mq.matches ? 'dark' : 'light')
      mq.addEventListener('change', handler)
      return () => mq.removeEventListener('change', handler)
    }
  }, [theme])

  const cycleTheme = () => {
    setTheme(prev => prev === 'system' ? 'light' : prev === 'light' ? 'dark' : 'system')
  }

  const themeIcon = resolved === 'dark' ? '☼' : <span style={{ display: 'inline-block', transform: 'scaleX(-1) rotate(-45deg)' }}>☾</span>

  return (
    <BrowserRouter>
      <nav>
        <div className="container">
          <NavLink to="/" className="name">Your Name</NavLink>
          <div className="nav-links">
            <NavLink to="/experience">Experience</NavLink>
            <NavLink to="/projects">Projects</NavLink>
            <button className="theme-toggle" onClick={cycleTheme} aria-label="Toggle theme">
              {themeIcon}
            </button>
          </div>
        </div>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<ProfilePage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>

        <footer>
          <p>© {new Date().getFullYear()} Your Name</p>
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App
