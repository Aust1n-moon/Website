import { useEffect, useRef, useState } from 'react'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import './App.css'

const internships = [
  { company: 'Spyder Controls Corp.', logo: '/logos/spyder_controls_corp_logo.jpg', position: 'Mechatronics Lab Technician', dates: 'Aug 2025 - Dec 2025', description: 'Building and wiring test jigs and testing chambers, troubleshooting circuits, testing sensors along with ics and new products, collaboration with integration team to resolve firmware malfunction' },
  { company: 'University of Waterloo', logo: '/logos/uwaterloo_logo.jpg', position: 'Mechanical Engineer', dates: 'Jan 2025 - Apr 2025', description: 'Laser cutter, Water jet and 3D printer operations' },
]

const designTeams = [
  // { company: 'Club 1', logo: '', position: 'President', dates: 'Jan 2019 – May 2019', description: 'Organized workshops and events for design-focused student community.' },
  { company: 'WAT.ai', logo: '/logos/wat_ai_logo.jpg', position: 'Machine Learning Engineer', dates: 'Sep 2026 - Present', description: '' },
  { company: 'UW Association of Korean-Canadian Scientist and Engineers', logo: '/logos/association_of_korean_canadian_scientists__engineers_logo.jpg', position: 'Tech Exececutive', dates: 'Sep 2026 - Present', description: '' },
  { company: 'Waterloo Aerial Robotics Group', logo: '/logos/waterloo_aerial_robotics_group_logo.jpg', position: 'Embedded Software Developer', dates: 'May 2025 - Aug 2026', description: 'Enhancing and integrating ZeroPilot Firmware for competition drones' },
  { company: 'UW Orbital', logo: '/logos/uw_orbital_logo.jpg', position: 'Mechanical Engineer', dates: 'Feb 2025 - Nov 2025', description: 'Designing parts for the 3U CubeSat' },
]

const projects = [
  { title: 'NFL Defensive Coverage Predictor', tag: 'AI/ML', description: 'End-to-end pipeline of predicting defensive coverages from video clips', link: 'https://github.com/Aust1n-moon/coverage-predictor' },
  { title: 'NBA Predictor', tag: 'AI/ML', description: 'Predicting game outcomes, spread, team totals, O/U', link: 'https://github.com/Aust1n-moon/NBA-Predictor' },
  { title: 'Ghelper Clone', tag: 'Linux', description: 'Tray app for system hardware control panel for Linux on ASUS', link: 'https://github.com/Aust1n-moon/Ghelper-clone' },
  { title: 'Quadcopter Drone', tag: 'Robotics', description: 'Arduino Quadcopter Drone', link: 'https://github.com/Aust1n-moon/Quadcopter-Drone-Firmware' },
  { title: 'Firefighter Bot', tag: 'Robotics', description: 'Autonomous robot for map navigation and fire detection/termination', link: 'https://github.com/Aust1n-moon/Firefighter-Bot-Firmware' },
]


function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight) { el.classList.add('visible'); return }
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

function ScrollBar() {
  const thumbRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<number>(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const el = thumbRef.current
      if (!el) return
      const scrollH = document.documentElement.scrollHeight - window.innerHeight
      if (scrollH <= 0) { setVisible(false); return }
      const pct = window.scrollY / scrollH
      const thumbH = Math.max(window.innerHeight * (window.innerHeight / document.documentElement.scrollHeight), 30)
      el.style.height = `${thumbH}px`
      el.style.top = `${pct * (window.innerHeight - thumbH)}px`
      setVisible(true)
      clearTimeout(timeoutRef.current)
      timeoutRef.current = window.setTimeout(() => setVisible(false), 1200)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={`custom-scrollbar ${visible ? 'show' : ''}`}>
      <div ref={thumbRef} className="custom-scrollbar-thumb" />
    </div>
  )
}

function FlowGraphic() {
  return (
    <svg className="flow-lines" aria-hidden="true" viewBox="0 0 1000 600" preserveAspectRatio="none">
      <path className="flow flow-1" d="M0,520 Q150,500 300,460 T600,300 T1000,80" />
      <path className="flow flow-2" d="M0,540 Q200,520 350,480 T650,340 T1000,150" />
      <path className="flow flow-3" d="M0,530 Q170,510 310,470 T610,320 T1000,120" />
      <path className="flow flow-4 flow-dashed" d="M0,550 Q160,530 340,490 T640,350 T1000,170" />
      <path className="flow flow-5" d="M0,560 Q180,540 320,500 T620,360 T1000,200" />
      <path className="flow flow-6" d="M0,570 Q200,555 360,510 T660,380 T1000,240" />
      <path className="flow flow-7" d="M0,565 Q210,548 370,505 T650,370 T1000,220" />
      <path className="flow flow-8 flow-dashed" d="M0,575 Q190,560 345,515 T655,395 T1000,270" />
      <path className="flow flow-9" d="M0,580 Q220,570 380,540 T680,420 T1000,300" />
      <path className="flow flow-10" d="M0,585 Q240,578 395,555 T695,445 T1000,330" />
      <path className="flow flow-11" d="M0,590 Q250,585 400,560 T700,460 T1000,360" />
      <path className="flow flow-12 flow-dashed" d="M0,593 Q235,590 390,568 T692,470 T1000,385" />
      <path className="flow flow-13" d="M0,595 Q260,594 410,575 T710,490 T1000,410" />
      <path className="flow flow-14" d="M0,598 Q270,596 430,585 T730,510 T1000,440" />
      <path className="flow flow-15" d="M0,600 Q280,600 440,590 T740,540 T1000,470" />
      <path className="flow flow-16" d="M0,600 Q290,600 450,595 T745,555 T1000,500" />
      <path className="flow flow-17 flow-dashed" d="M0,600 Q300,600 460,598 T755,570 T1000,530" />
      <path className="flow flow-18" d="M0,600 Q310,600 470,600 T765,580 T1000,555" />
      <path className="flow flow-19" d="M0,600 Q330,600 490,600 T780,590 T1000,575" />
      <path className="flow flow-20" d="M0,600 Q350,600 510,600 T800,598 T1000,592" />
      <path className="flow flow-x1" d="M0,590 Q200,570 350,530 T600,400 T1000,250" />
      <path className="flow flow-x2" d="M0,600 Q180,585 320,550 T580,430 T1000,310" />
      <path className="flow flow-x3 flow-dashed" d="M0,600 Q250,595 420,570 T700,480 T1000,370" />
      <circle className="flow-dot dot-1" r="3" cx="0" cy="0"><animateMotion dur="8s" repeatCount="indefinite" path="M0,520 Q150,500 300,460 T600,300 T1000,80" /></circle>
      <circle className="flow-dot dot-2" r="2.5" cx="0" cy="0"><animateMotion dur="10s" repeatCount="indefinite" path="M0,540 Q200,520 350,480 T650,340 T1000,150" /></circle>
      <circle className="flow-dot dot-3" r="2" cx="0" cy="0"><animateMotion dur="9s" repeatCount="indefinite" path="M0,565 Q210,548 370,505 T650,370 T1000,220" /></circle>
      <circle className="flow-dot dot-4" r="3" cx="0" cy="0"><animateMotion dur="7s" repeatCount="indefinite" path="M0,570 Q200,555 360,510 T660,380 T1000,240" /></circle>
      <circle className="flow-dot dot-5" r="2" cx="0" cy="0"><animateMotion dur="11s" repeatCount="indefinite" path="M0,550 Q160,530 340,490 T640,350 T1000,170" /></circle>
      <circle className="flow-dot dot-6" r="2.5" cx="0" cy="0"><animateMotion dur="9.5s" repeatCount="indefinite" path="M0,590 Q250,585 400,560 T700,460 T1000,360" /></circle>
      <circle className="flow-dot dot-7" r="2" cx="0" cy="0"><animateMotion dur="12s" repeatCount="indefinite" path="M0,600 Q260,598 420,580 T720,500 T1000,440" /></circle>
      <circle className="flow-dot dot-8" r="2.5" cx="0" cy="0"><animateMotion dur="8.5s" repeatCount="indefinite" path="M0,600 Q280,600 440,590 T740,540 T1000,470" /></circle>
      <circle className="flow-dot dot-9" r="2" cx="0" cy="0"><animateMotion dur="10.5s" repeatCount="indefinite" path="M0,590 Q200,570 350,530 T600,400 T1000,250" /></circle>
    </svg>
  )
}

function ProfilePage() {
  return (
    <div className="profile-wrapper">
      <FlowGraphic />
      <section className="profile-hero">
        <FadeIn className="profile-info">
          <h1>Austin Moon</h1>
          <p className="tagline">AI/ML, Embedded, Robotics</p>
        </FadeIn>
        <div className="scroll-indicator">
          <span>Scroll</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
        </div>
      </section>
      <section className="profile-about">
        <div className="profile-bottom">
          <FadeIn className="profile-bio">
            <h3>About Me</h3>
            <div className="bio">
              <p>Hi! My name is Austin Moon, currently studying Mechatronics Engineering at the University of Waterloo.</p>
              <p>I am passionate about working with AI/ML, embedded systems, and robotics as well as building cool projects and learning new skills.</p>
              <p>Outside of school and engineering new things, I like staying active by lifting weights, playing basketball and football, and also watching sports! Some of my favourite sports teams are the Houston Texans, Minnesota Timberwolves, Toronto Raptors, and Toronto Blue Jays.</p>
            </div>
          </FadeIn>
          <FadeIn className="profile-stack">
            <h3>Tech Stack</h3>
            <div className="stack-tags">
              {['Python', 'C++', 'C', 'TypeScript', 'Bash', 'React', 'FastAPI', 'TensorFlow', 'PyTorch', 'OpenCV', 'NumPy', 'Pandas', 'Scikit-Learn', 'Matplotlib', 'Arduino', 'STM32', 'Git', 'GitHub'].map(t => (
                <span key={t} className="stack-tag">{t}</span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}

function ExperienceCard({ exp }: { exp: typeof internships[0] }) {
  return (
    <div className="card exp-card">
      <div className="exp-logo">
        {exp.logo ? <img src={exp.logo} alt={exp.company} /> : exp.company[0]}
      </div>
      <div className="exp-info">
        <div className="exp-header">
          <h3>{exp.company}</h3>
          <div className="dates">{exp.dates}</div>
        </div>
        <div className="position">{exp.position}</div>
        <p className="description">{exp.description}</p>
      </div>
    </div>
  )
}

function ExperiencePage() {
  return (
    <section className="page-section">
      <FlowGraphic />
      <div className="container page-content">
        <FadeIn>
          <h2 className="section-title">Experience</h2>
        </FadeIn>
        <FadeIn>
          <h3 className="section-subtitle">Internships</h3>
        </FadeIn>
        {internships.map((exp, i) => (
          <FadeIn key={`intern-${i}`}>
            <ExperienceCard exp={exp} />
          </FadeIn>
        ))}
        <FadeIn>
          <h3 className="section-subtitle">Design Teams & Clubs</h3>
        </FadeIn>
        {designTeams.map((exp, i) => (
          <FadeIn key={`team-${i}`}>
            <ExperienceCard exp={exp} />
          </FadeIn>
        ))}
        <footer><p>© {new Date().getFullYear()} Austin Moon</p></footer>
      </div>
    </section>
  )
}

function ProjectsPage() {
  return (
    <section className="page-section">
      <FlowGraphic />
      <div className="container page-content">
        <FadeIn>
          <h2 className="section-title">Projects</h2>
        </FadeIn>
        {projects.map((proj, i) => (
          <FadeIn key={i}>
            <a href={proj.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="card project-card">
                <div className="project-header">
                  <h3>{proj.title} <span className="arrow">→</span></h3>
                  {proj.tag && <span className="project-tag">{proj.tag}</span>}
                </div>
                <p>{proj.description}</p>
              </div>
            </a>
          </FadeIn>
        ))}
        <footer><p>© {new Date().getFullYear()} Austin Moon</p></footer>
      </div>
    </section>
  )
}

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

function App() {
  const navHidden = useHideNavOnScroll()

  return (
    <BrowserRouter>
      <nav className={navHidden ? 'nav-hidden' : ''}>
        <div className="container">
          <NavLink to="/" className="name">Austin Moon</NavLink>
          <div className="nav-links">
            <NavLink to="/experience">Experience</NavLink>
            <NavLink to="/projects">Projects</NavLink>
            <a href="https://github.com/Aust1n-moon" target="_blank" rel="noopener noreferrer" className="nav-icon" title="GitHub">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/austinmoon/" target="_blank" rel="noopener noreferrer" className="nav-icon" title="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="mailto:jeonghyeon076@gmail.com" className="nav-icon" title="Email">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4L12 13 2 4"/></svg>
            </a>
            <a href="/Resume.pdf" target="_blank" rel="noopener noreferrer" className="nav-icon" title="Resume">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            </a>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<ProfilePage />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
      <ScrollBar />
    </BrowserRouter>
  )
}

export default App
