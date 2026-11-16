import { Analytics } from '@vercel/analytics/react'
import './App.css'

const internships = [
  { company: 'Linamar - Innovation Hub', logo: '/logos/linamar_innovation_hub_logo.jpg', position: 'Robotics Applications Intern', dates: 'Incoming Winter 2027', description: '' },
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
  { title: 'Firefighter Bot', tag: 'Robotics', description: 'Autonomous robot for map navigation and fire detection/termination', link: 'https://github.com/Aust1n-moon/Firefighter-Bot-Firmware' },
  { title: 'Flipper Bot', tag: 'Robotics', description: 'Autonomous switch-flipping robot with PID control, odometry-based boundary tracking, and evasive maneuvers', link: 'https://github.com/Aust1n-moon/Flipper-Bot' },
  { title: 'Sumo Bot', tag: 'Robotics', description: 'Battlebot with 3 custom PCBs, IR edge detection and a front opponent sensor; reached the semi-finals out of 10+ bots', link: 'https://github.com/Aust1n-moon/Sumo-Bot' },
]

const contacts = [
  { label: 'GitHub', href: 'https://github.com/Aust1n-moon' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/austinmoon/' },
  { label: 'Email', href: 'mailto:jeonghyeon076@gmail.com' },
  { label: 'AI/ML resume', href: '/Resume-ext.pdf' },
  { label: 'Robotics resume', href: '/Resume%20robotics.pdf' },
]

function Timeline({ items }: { items: typeof internships }) {
  return (
    <ol className="trace">
      {items.map(exp => (
        <li key={exp.company + exp.position}>
          <img className="logo" src={exp.logo} alt="" />
          <div>
            <div className="row">
              <h3>{exp.company}</h3>
              <span className="dates">{exp.dates}</span>
            </div>
            <p className="position">{exp.position}</p>
            {exp.description && <p className="desc">{exp.description}</p>}
          </div>
        </li>
      ))}
    </ol>
  )
}

function App() {
  return (
    <main>
      <header className="hero">
        <h1>Austin Moon</h1>
        <p className="tagline">Mechatronics + AI @UWaterloo</p>
        <nav className="contacts" aria-label="Contact">
          {contacts.map(c => (
            <a key={c.label} href={c.href} target={c.href.startsWith('mailto:') ? undefined : '_blank'} rel="noopener noreferrer">{c.label}</a>
          ))}
        </nav>
      </header>

      <section id="experience">
        <h2>Experience</h2>
        <h3 className="group">Internships</h3>
        <Timeline items={internships} />
        <h3 className="group">Design teams and clubs</h3>
        <Timeline items={designTeams} />
      </section>

      <section id="projects">
        <h2>Projects</h2>
        <ul className="projects">
          {projects.map(p => (
            <li key={p.title}>
              <a href={p.link} target="_blank" rel="noopener noreferrer">
                <div className="row">
                  <h3>{p.title}</h3>
                  <span className="tag">{p.tag}</span>
                </div>
                <p className="desc">{p.description}</p>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <footer>© {new Date().getFullYear()} Austin Moon</footer>
      <Analytics />
    </main>
  )
}

export default App
