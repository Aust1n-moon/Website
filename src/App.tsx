import { useEffect, useState } from 'react'
import { Analytics } from '@vercel/analytics/react'
import './App.css'

const internships = [
  { company: 'Linamar - Innovation Hub', logo: '/logos/linamar_innovation_hub_logo.jpg', position: 'Robotics Applications Intern', dates: 'Incoming Winter 2027', description: '' },
  { company: 'Spyder Controls Corp.', logo: '/logos/spyder_controls_corp_logo.jpg', position: 'Mechatronics Lab Technician', dates: 'Aug 2025 - Dec 2025', description: 'Building test fixtures for PCBA validation and environmental testing' },
  { company: 'University of Waterloo', logo: '/logos/uwaterloo_logo.jpg', position: 'Mechanical Engineer', dates: 'Jan 2025 - Apr 2025', description: 'Laser cutter, Water jet and 3D printer operations' },
]

const designTeams = [
  // { company: 'Club 1', logo: '', position: 'President', dates: 'Jan 2019 – May 2019', description: 'Organized workshops and events for design-focused student community.' },
  { company: 'WAT.ai', logo: '/logos/wat_ai_logo.jpg', position: 'Machine Learning Engineer', dates: 'Sep 2026 - Present', description: 'Quantifying off ball attacking movement of soccer players' },
  { company: 'UW Association of Korean-Canadian Scientist and Engineers', logo: '/logos/association_of_korean_canadian_scientists__engineers_logo.jpg', position: 'Tech Exececutive', dates: 'Sep 2026 - Present', description: 'Developing AI and fullstack tools for AKCSE community' },
  { company: 'Waterloo Aerial Robotics Group', logo: '/logos/waterloo_aerial_robotics_group_logo.jpg', position: 'Embedded Software Developer', dates: 'May 2025 - Aug 2026', description: 'Enhancing and integrating ZeroPilot Firmware for drones' },
  { company: 'UW Orbital', logo: '/logos/uw_orbital_logo.jpg', position: 'Mechanical Engineer', dates: 'Feb 2025 - Nov 2025', description: 'Designing parts for 3U CubeSat' },
]

const projects = [
  { title: 'NFL Defensive Coverage Predictor', tag: 'AI/ML', description: 'End-to-end pipeline of predicting defensive coverages from video clips', link: 'https://github.com/Aust1n-moon/coverage-predictor' },
  { title: 'NBA Predictor', tag: 'AI/ML', description: 'Predicting game outcomes, spread, team totals, O/U', link: 'https://github.com/Aust1n-moon/NBA-Predictor' },
  { title: 'Ghelper Clone', tag: 'Linux', description: 'Tray app for system hardware control panel for Linux on ASUS', link: 'https://github.com/Aust1n-moon/Ghelper-clone' },
  { title: 'Firefighter Bot', tag: 'Robotics', description: 'Autonomous robot for map navigation and fire detection/termination', link: 'https://github.com/Aust1n-moon/Firefighter-Bot-Firmware' },
  { title: 'Flipper Bot', tag: 'Robotics', description: 'Autonomous switch-flipping robot with PID control, odometry-based boundary tracking, and evasive maneuvers', link: 'https://github.com/Aust1n-moon/Flipper-Bot' },
  { title: 'Sumo Bot', tag: 'Robotics', description: 'Battlebot with 3 custom PCBs, IR edge detection and a front opponent sensor; reached the semi-finals out of 10+ bots', link: 'https://github.com/Aust1n-moon/Sumo-Bot' },
]

function useHideNavOnScroll() {
  const [hidden, setHidden] = useState(false)
  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      setHidden(window.scrollY > lastY && window.scrollY > 50)
      lastY = window.scrollY
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return hidden
}

function toggleTheme() {
  const root = document.documentElement
  const dark = root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches
  root.dataset.theme = dark ? 'light' : 'dark'
  localStorage.setItem('theme', root.dataset.theme)
}

function Roles({ items }: { items: typeof internships }) {
  return (
    <ul className="list">
      {items.map(exp => (
        <li key={exp.company + exp.position} className="row role-row" tabIndex={0}>
          <img className="logo" src={exp.logo} alt="" />
          <div className="grow">
            <p>{exp.company}</p>
            <div className="role">
              <div>
                <p className="muted">{exp.position}</p>
                {exp.description && <p className="desc">{exp.description}</p>}
              </div>
            </div>
          </div>
          <span className="muted end">{exp.dates}</span>
        </li>
      ))}
    </ul>
  )
}

function App() {
  const navHidden = useHideNavOnScroll()

  return (
    <>
      <nav className={navHidden ? 'nav-hidden' : ''}>
        <a href="#top" className="name">Austin Moon</a>
        <div className="nav-links">
          <a href="https://github.com/Aust1n-moon" target="_blank" rel="noopener noreferrer" className="nav-icon" title="GitHub" aria-label="GitHub">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          </a>
          <a href="https://www.linkedin.com/in/austinmoon/" target="_blank" rel="noopener noreferrer" className="nav-icon" title="LinkedIn" aria-label="LinkedIn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
          <a href="mailto:jeonghyeon076@gmail.com" className="nav-icon" title="Email" aria-label="Email">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4L12 13 2 4"/></svg>
          </a>
          <details className="resume-menu">
            <summary className="nav-icon" title="Resume" aria-label="Resume">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            </summary>
            <div className="resume-dropdown">
              <a href="/Resume-ext.pdf" target="_blank" rel="noopener noreferrer">AI/ML resume</a>
              <a href="/Resume%20robotics.pdf" target="_blank" rel="noopener noreferrer">Robotics resume</a>
            </div>
          </details>
          <button className="nav-icon theme-toggle" title="Toggle theme" aria-label="Toggle light or dark mode" onClick={toggleTheme}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 010 18z" fill="currentColor"/></svg>
          </button>
        </div>
      </nav>

      <main id="top">
        <header>
          <h1>Austin Moon</h1>
          <p className="bio">Mechatronics @ UWaterloo, building across AI/ML, embedded, and robotics.</p>
        </header>

        <section>
          <h2>Internships</h2>
          <Roles items={internships} />
        </section>

        <section>
          <h2>Design teams and clubs</h2>
          <Roles items={designTeams} />
        </section>

        <section>
          <h2>Projects</h2>
          <ul className="list">
            {projects.map(p => (
              <li key={p.title} className="row">
                <a className="grow" href={p.link} target="_blank" rel="noopener noreferrer">
                  <span className="link">{p.title}</span> <span aria-hidden="true">↗</span>
                </a>
                <span className="muted end">{p.tag}</span>
              </li>
            ))}
          </ul>
        </section>

        <footer>© {new Date().getFullYear()} Austin Moon</footer>
      </main>
      <Analytics />
    </>
  )
}

export default App
