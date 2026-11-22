import { useEffect, useRef, useState, type CSSProperties, type RefObject } from 'react'
import { Analytics } from '@vercel/analytics/react'
import './App.css'

const internships = [
  { company: 'Linamar - Innovation Hub', logo: '/logos/linamar_innovation_hub_logo.jpg', position: 'Robotics Applications Intern', dates: 'Incoming Winter 2027', description: '', color: '#00a8e0' },
  { company: 'Spyder Controls Corporation', logo: '/logos/spyder_controls_corp_logo.jpg', position: 'Mechatronics Lab Technician', dates: 'Aug 2025 - Dec 2025', description: 'Building test fixtures for PCBA validation and environmental testing' },
  { company: 'University of Waterloo', logo: '/logos/uwaterloo_logo.jpg', position: 'Mechanical Engineer', dates: 'Jan 2025 - Apr 2025', description: 'Laser cutter, Water jet and 3D printer operations', color: '#f0c048' },
]

const designTeams = [
  // { company: 'Club 1', logo: '', position: 'President', dates: 'Jan 2019 – May 2019', description: 'Organized workshops and events for design-focused student community.' },
  { company: 'WAT.ai', logo: '/logos/wat_ai_logo.jpg', position: 'Machine Learning Engineer', dates: 'Sep 2026 - Present', description: 'Quantifying off ball attacking movement of soccer players', color: '#f0c018' },
  { company: 'UW Association of Korean-Canadian Scientist and Engineers', logo: '/logos/uw_akcse_logo.png', position: 'Tech Exececutive', dates: 'Sep 2026 - Present', description: 'Developing AI and fullstack tools for AKCSE community', color: '#78c6db' },
  { company: 'Waterloo Aerial Robotics Group', logo: '/logos/waterloo_aerial_robotics_group_logo.jpg', position: 'Embedded Software Developer', dates: 'May 2025 - Aug 2026', description: 'Enhancing and integrating ZeroPilot Firmware for drones' },
  { company: 'UW Orbital', logo: '/logos/uw_orbital_logo.jpg', position: 'Mechanical Engineer', dates: 'Feb 2025 - Nov 2025', description: 'Designing parts for 3U CubeSat', color: '#e8384a' },
]

// Projects light up in their category's color
const tagColors: Record<string, string> = {
  'AI/ML': '#a78bfa',
  Robotics: '#ff9a4d',
  Linux: '#3fc8c0',
}

const projects = [
  { title: 'NFL Defensive Coverage Predictor', tag: 'AI/ML', description: 'End-to-end pipeline of predicting defensive coverages from video clips', link: 'https://github.com/Aust1n-moon/coverage-predictor' },
  { title: 'Ghelper Clone', tag: 'Linux', description: 'Tray app for system hardware control panel for Linux on ASUS', link: 'https://github.com/Aust1n-moon/Ghelper-clone' },
  { title: 'Flipper Bot', tag: 'Robotics', description: 'Autonomous switch-flipping robot with PID control, odometry-based boundary tracking, and evasive maneuvers', link: 'https://github.com/Aust1n-moon/Flipper-Bot' },
  { title: 'NBA Predictor', tag: 'AI/ML', description: 'Predicting NBA game outcomes, spread, team totals, O/U', link: 'https://github.com/Aust1n-moon/NBA-Predictor' },
  { title: 'Firefighter Bot', tag: 'Robotics', description: 'Autonomous robot for map navigation and fire detection/termination', link: 'https://github.com/Aust1n-moon/Firefighter-Bot-Firmware' },
  { title: 'Sumo Bot', tag: 'Robotics', description: 'Battlebot with 3 custom PCBs, IR edge detection and a front ultrasonic sensor', link: 'https://github.com/Aust1n-moon/Sumo-Bot' },
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

// Random gaps and positions so shooting stars don't repeat in a visible pattern
function useShootingStars(sky: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let timer = 0
    const spawn = () => {
      // Mostly long streaks that cross the whole screen, sometimes short ones
      const long = Math.random() < 0.7
      const dist = long ? window.innerWidth * (1.1 + Math.random() * 0.3) : 200 + Math.random() * 300
      const star = document.createElement('span')
      star.className = 'shooting-star'
      star.style.left = `${long ? 70 + Math.random() * 30 : 20 + Math.random() * 80}%`
      star.style.top = `${long ? Math.random() * 40 : Math.random() * 60}%`
      star.style.setProperty('--dist', `${-dist}px`)
      star.style.animationDuration = `${Math.max(0.4, dist / 1500)}s`
      star.addEventListener('animationend', () => star.remove())
      sky.current?.append(star)
      timer = window.setTimeout(spawn, 2000 + Math.random() * 4000)
    }
    timer = window.setTimeout(spawn, 1500)
    return () => clearTimeout(timer)
  }, [sky])
}

// Roams the screen at a capped speed like zero gravity, heading for the mouse while it moves
function useAstronaut(el: RefObject<HTMLImageElement | null>, hoseEl: RefObject<SVGPathElement | null>) {
  useEffect(() => {
    const a = el.current
    const hose = hoseEl.current
    if (!a || !hose || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const SPEED = 35 // px per second, however fast the cursor moves
    let x = innerWidth * 0.6
    let y = innerHeight * 0.3
    let vx = 0
    let vy = 0
    let tilt = 0
    let tx = x
    let ty = y
    let lastMouse = -Infinity
    let last = performance.now()
    let frame = 0
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      tx = e.clientX
      ty = e.clientY
      lastMouse = performance.now()
    }
    const tick = (t: number) => {
      // Measured in 60 Hz frames, so motion is the same at any refresh rate
      const frames = Math.min(t - last, 100) / 16.7
      last = t
      const w = a.offsetWidth
      const h = a.offsetHeight
      const dx = tx - w / 2 - x
      const dy = ty - h / 2 - y
      const dist = Math.hypot(dx, dy) || 1
      // Picks a new spot on arrival, unless the mouse moved in the last 3s
      if (dist < 60 && performance.now() - lastMouse > 3000) {
        tx = Math.random() * innerWidth
        ty = Math.random() * innerHeight
      }
      // Full speed when far, slowing over the last 100px so it settles instead of stopping dead
      const speed = (SPEED / 60) * Math.min(1, dist / 100)
      // Velocity eases toward the target velocity, so starts and turns are gradual
      const ease = 1 - 0.98 ** frames
      vx += ((dx / dist) * speed - vx) * ease
      vy += ((dy / dist) * speed - vy) * ease
      x = Math.min(Math.max(x + vx * frames, 0), innerWidth - w)
      y = Math.min(Math.max(y + vy * frames, 0), innerHeight - h)
      tilt += (Math.min(Math.max(vx * 20, -20), 20) - tilt) * ease
      const bobY = y + Math.sin(t / 1600) * 6
      // Sways between upright and 30 degrees either way; two uneven waves keep it from looking like a pendulum
      const sway = 22 * Math.sin(t / 8000) + 6 * Math.sin(t / 3100 + 1.3)
      const turn = Math.min(Math.max(sway + tilt * 0.25, -30), 30)
      a.style.translate = `${x}px ${bobY}px`
      a.style.rotate = `${turn}deg`
      // Appears once the moon has faded, without needing the page to be any longer
      const shown = scrollY > innerHeight * 0.95 ? '1' : '0'
      a.style.opacity = shown
      hose.style.opacity = shown
      hose.setAttribute('d', hosePath(x + w / 2, bobY + h / 2, w, h, turn, t))
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
    }
  }, [el, hoseEl])
}

// Oxygen hose from off-screen on the upper left to the backpack; inner points sway on their own slow waves so it never runs straight
function hosePath(cx: number, cy: number, w: number, h: number, turnDeg: number, t: number) {
  // Backpack sits at about (62%, 25%) of the image, rotated with the astronaut
  const r = (turnDeg * Math.PI) / 180
  const ox = 0.12 * w
  const oy = -0.25 * h
  const ex = cx + ox * Math.cos(r) - oy * Math.sin(r)
  const ey = cy + ox * Math.sin(r) + oy * Math.cos(r)
  const sx = -10
  const sy = innerHeight * 0.15
  const len = Math.hypot(ex - sx, ey - sy) || 1
  const nx = -(ey - sy) / len
  const ny = (ex - sx) / len
  // More slack, so bigger curves, when the astronaut is close to the anchor
  const amp = Math.max(50, 150 - len * 0.08)
  const pts: [number, number][] = [[sx, sy]]
  for (let i = 1; i <= 4; i++) {
    const f = i / 5
    const off = amp * Math.sin(t / (1700 + i * 430) + i * 1.9)
    pts.push([sx + (ex - sx) * f + nx * off, sy + (ey - sy) * f + ny * off])
  }
  pts.push([ex, ey])
  // Catmull-Rom through the points, as cubic Beziers
  let d = `M${sx} ${sy}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(i - 1, 0)]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[Math.min(i + 2, pts.length - 1)]
    d += `C${p1[0] + (p2[0] - p0[0]) / 6} ${p1[1] + (p2[1] - p0[1]) / 6} ${p2[0] - (p3[0] - p1[0]) / 6} ${p2[1] - (p3[1] - p1[1]) / 6} ${p2[0]} ${p2[1]}`
  }
  return d
}

function SocialLinks() {
  return (
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
    </div>
  )
}

function Roles({ items }: { items: typeof internships }) {
  return (
    <ul className="list">
      {items.map(exp => (
        <li key={exp.company + exp.position} className="row role-row" tabIndex={0} style={{ '--row-accent': exp.color } as CSSProperties}>
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
  const skyRef = useRef<HTMLDivElement>(null)
  useShootingStars(skyRef)
  const astronautRef = useRef<HTMLImageElement>(null)
  const hoseRef = useRef<SVGPathElement>(null)
  useAstronaut(astronautRef, hoseRef)

  return (
    <>
      <div className="sky" aria-hidden="true" ref={skyRef} />
      <svg className="hose" aria-hidden="true"><path ref={hoseRef} /></svg>
      <img className="astronaut" ref={astronautRef} src="/astronaut.png" alt="" />
      <nav className={navHidden ? 'nav-hidden' : ''}>
        <a href="#top" className="name">Austin Moon</a>
        <SocialLinks />
      </nav>

      <header className="hero" id="top">
        <img src="/hero.webp" alt="" />
        <h1>Austin Moon</h1>
        <p className="bio">Mechatronics + AI @ UWaterloo. Building across AI/ML and Robotics</p>
      </header>

      <main>

        <section>
          <h2>Co-op</h2>
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
              <li key={p.title} className="row project-row" tabIndex={0} style={{ '--row-accent': tagColors[p.tag] } as CSSProperties}>
                <div className="grow">
                  <a href={p.link} target="_blank" rel="noopener noreferrer">
                    <span className="link">{p.title}</span> <span className="arrow" aria-hidden="true">↗</span>
                  </a>
                  <div className="role">
                    <div>
                      <p className="desc">{p.description}</p>
                    </div>
                  </div>
                </div>
                <span className="muted end">{p.tag}</span>
              </li>
            ))}
          </ul>
        </section>

        <footer>
          <p>© {new Date().getFullYear()} Austin Moon</p>
          <SocialLinks />
        </footer>
      </main>
      <Analytics />
    </>
  )
}

export default App
