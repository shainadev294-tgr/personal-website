import { useEffect, useState } from 'react'
import './App.css'

const projects = [
  { title: 'AI-Powered Analytics Dashboard', kind: 'Full Stack', tags: ['React', 'TypeScript', 'Python', 'FastAPI', 'PostgreSQL', 'D3.js'], art: 'analytics' },
  { title: 'Neural Network Optimization', kind: 'Machine Learning', tags: ['PyTorch', 'TensorFlow', 'NumPy', 'CUDA', 'OpenCV'], art: 'network' },
  { title: 'Real-Time Collaboration Platform', kind: 'Web Development', tags: ['Next.js', 'WebSockets', 'MongoDB', 'Redis', 'Docker'], art: 'code' },
]

const jobs = [
  { title: 'AI Research Intern', company: 'Tech Innovation Labs', date: 'May 2024', end: 'Aug 2024', place: 'San Francisco, CA', description: 'Developed machine learning models for natural language processing, conducted research on transformer architectures, and published findings in peer-reviewed journals.' },
  { title: 'Full Stack Developer', company: 'Digital Solutions Inc', date: 'Aug 2023', end: 'May 2024', place: 'Remote', description: 'Built scalable web applications using React and Node.js, optimized database queries, and mentored junior developers on best practices.' },
  { title: 'Software Engineering Intern', company: 'StartupXYZ', date: 'May 2023', end: 'Aug 2023', place: 'Palo Alto, CA', description: 'Contributed to core product features, fixed critical bugs, and improved application performance by 40% through code optimization.' },
]

const awards = [
  ['National Science Foundation Scholar', 'Recognized for outstanding contributions to computer science research and innovation.', 'National Science Foundation', '2024'],
  ['Young Innovator Award', 'Awarded for developing cutting-edge solutions in artificial intelligence and machine learning.', 'Tech Excellence Foundation', '2024'],
  ["Dean’s List", 'Maintained 4.0 GPA and demonstrated academic excellence across all semesters.', 'Amador Valley High School', '2023'],
]

function Icon({ name, size = 24 }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: name === 'moon' ? 1.45 : 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }
  const paths = {
    moon: <><path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z" /></>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></>,
    code: <><path d="m8 17-5-5 5-5M16 7l5 5-5 5M14 4l-4 16" /></>,
    briefcase: <><rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M12 12v3"/></>,
    flask: <><path d="M9 3h6M10 3v6l-6 10a1.5 1.5 0 0 0 1.3 2.2h13.4A1.5 1.5 0 0 0 20 19L14 9V3M8 15h8"/></>,
    award: <><circle cx="12" cy="8" r="6"/><path d="m8.2 13-1 8 4.8-2.7 4.8 2.7-1-8"/></>,
    book: <><path d="M12 7v14M3 5.5A2.5 2.5 0 0 1 5.5 3H12v18H5.5A2.5 2.5 0 0 0 3 23zM21 5.5A2.5 2.5 0 0 0 18.5 3H12v18h6.5a2.5 2.5 0 0 1 2.5 2z"/></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
    arrow: <><path d="M7 17 17 7M7 7h10v10"/></>,
    message: <><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8A8.5 8.5 0 0 1 8.7 3.9a8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z"/></>,
    cpu: <><rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9" y="9" width="6" height="6" rx="1"/><path d="M9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4"/></>,
    github: <><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 6v-3.9a3.4 3.4 0 0 0-.9-2.7c3-.3 6.2-1.5 6.2-6.8A5.3 5.3 0 0 0 19 5a4.9 4.9 0 0 0-.1-3S17.7 1.7 15 3.5a13.5 13.5 0 0 0-7 0C5.3 1.7 4.1 2 4.1 2A4.9 4.9 0 0 0 4 5a5.3 5.3 0 0 0-1.3 3.7c0 5.3 3.2 6.5 6.2 6.8A3.4 3.4 0 0 0 8 18.2V22"/></>,
    linkedin: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6ZM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></>,
  }
  return <svg {...common}>{paths[name] || paths.arrow}</svg>
}

function ProjectArt({ kind }) {
  return <div className={`project-art art-${kind}`} aria-hidden="true"><div className="art-window"><div className="art-sidebar"/><div className="art-content"><i/><i/><i/><i/><b/><b/><b/></div></div><span className="art-glow"/></div>
}

function App() {
  const [dark, setDark] = useState(false)
  const [role, setRole] = useState('Electrical Engineer')

  useEffect(() => {
    const roles = ['Electrical Engineer', 'AI Developer', 'Amador Valley High ’28']
    let roleIndex = 0
    let deleting = false
    let typed = ''
    let timer
    const tick = () => {
      const current = roles[roleIndex]
      typed = deleting ? typed.slice(0, -1) : current.slice(0, typed.length + 1)
      const next = typed
      setRole(next)
      if (!deleting && next === current) { deleting = true; timer = window.setTimeout(tick, 1700); return }
      if (deleting && next.length === 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length }
      timer = window.setTimeout(tick, deleting ? 42 : 78)
    }
    timer = window.setTimeout(tick, 1900)
    return () => window.clearTimeout(timer)
  }, [])

  return <div className={dark ? 'site theme-dark' : 'site'}>
    <header className="site-header">
      <a className="brand" href="#home" aria-label="Shaina Gupta home">SG</a>
      <nav aria-label="Main navigation"><a href="#projects">Projects</a><a href="#experience">Experience</a><a href="#research">Research</a><a href="#awards">Awards</a><a href="#education">Education</a><a href="#contact">Contact</a></nav>
      <button className="theme-toggle" onClick={() => setDark(!dark)} aria-label={dark ? 'Use light theme' : 'Use dark theme'}><Icon name={dark ? 'sun' : 'moon'} size={22}/></button>
    </header>

    <main>
      <section className="hero grid-bg" id="home">
        <div className="hero-copy"><span className="status"><i/>System Online</span><h1>Shaina<br/>Gupta</h1><div className="role-line"><span className="prompt">›</span><span>{role}<span className="cursor"/></span></div><a className="primary-button" href="#projects">Initialize Projects <Icon name="arrow" size={19}/></a></div>
        <div className="hero-visual" aria-hidden="true"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="orbit orbit-three"/><div className="cpu-badge"><Icon name="cpu" size={58}/></div></div>
        <a className="scroll-cue" href="#projects"><span>SCROLL</span><i/></a>
      </section>

      <section className="section projects-section" id="projects"><div className="section-heading"><Icon name="code"/><h2>Featured Projects</h2></div><p className="section-intro">A selection of recent engineering and development work, focusing on scalable<br className="desktop-break"/> solutions and innovative technologies.</p>
        <div className="project-grid">{projects.map((project) => <article className="project-card" key={project.title}><ProjectArt kind={project.art}/><div className="project-info"><div className="project-title-row"><h3>{project.title}</h3><a href="#contact" className="round-arrow" aria-label={`Learn more about ${project.title}`}><Icon name="arrow" size={17}/></a></div><p>{project.kind}</p><div className="tag-list">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div></article>)}</div>
      </section>

      <section className="section experience-section grid-bg" id="experience"><div className="section-heading"><Icon name="briefcase"/><h2>Professional Timeline</h2></div><div className="timeline">{jobs.map((job) => <article className="timeline-item" key={job.title}><div className="timeline-dot"/><div className="timeline-card"><div className="job-top"><div><h3>{job.title}</h3><a href="#contact" className="company-link">{job.company} <span>↗</span></a></div><span className="date-pill">{job.date}<b>→</b>{job.end}</span></div><p className="job-place">• {job.place}</p><p className="job-description">{job.description}</p></div></article>)}</div></section>

      <section className="section research-section" id="research"><div className="research-column"><div className="section-heading"><Icon name="flask"/><h2>Featured Research</h2></div>
          <article className="research-card"><div className="research-art chip-art"><span className="year-badge">2024</span><h3>Efficient Deep Learning for Edge Devices</h3><a href="#contact" aria-label="Read research"><Icon name="arrow" size={22}/></a></div><div className="research-copy"><span className="eyebrow">ROLE: LEAD RESEARCHER</span><p>Research on model compression techniques and quantization methods to enable deployment of deep learning models on resource-constrained edge devices.</p></div></article>
          <article className="research-card"><div className="research-art green-art"><span className="year-badge">2024</span><h3>Sustainable AI: Carbon-Aware Computing</h3><a href="#contact" aria-label="Read research"><Icon name="arrow" size={22}/></a></div><div className="research-copy"><span className="eyebrow">ROLE: CO-AUTHOR</span><p>Investigating methods to reduce the carbon footprint of AI training and inference through algorithmic innovations and hardware optimization.</p></div></article>
        </div>
        <div className="awards-column" id="awards"><div className="section-heading"><Icon name="award"/><h2>Recognition</h2></div><div className="award-list">{awards.map(([title, desc, org, year]) => <article className="award-card" key={title} tabIndex="0"><Icon name="arrow" size={17}/><h3>{title}</h3><p>{desc}</p><div><span>{org}</span><time>{year}</time></div></article>)}</div></div>
      </section>

      <section className="section education-section grid-bg" id="education"><div className="section-heading centered-heading"><Icon name="book"/><h2>Academic Profile</h2></div><article className="school-card"><header><h3>Amador Valley High School</h3><span className="enrollment"><i/>Active Enrollment</span></header><div className="school-details"><div><span className="eyebrow muted">CORE METRICS</span><div className="metrics"><div className="metric"><span>Weighted GPA</span><strong className="blue">4.00</strong></div><div className="metric"><span>Unweighted GPA</span><strong>3.95</strong></div><div className="metric wide"><span>Standardized ACT Score</span><strong className="cyan">35</strong></div></div></div><div className="curriculum"><span className="eyebrow muted">CURRICULUM FOCUS</span><h4>› &nbsp;Advanced Placement</h4><div className="course-tags">{['AP Computer Science','AP Calculus BC','AP Physics C','AP Statistics','AP Chemistry'].map(x => <span key={x}>{x}</span>)}</div><h4>› &nbsp;Relevant Coursework</h4><div className="course-tags soft">{['Advanced Algorithms','Data Structures','Artificial Intelligence','Web Development','Cybersecurity'].map(x => <span key={x}>{x}</span>)}</div></div></div></article></section>

      <section className="contact-section grid-bg" id="contact"><span className="contact-kicker"><Icon name="message" size={17}/>Let’s Connect</span><h2>Ready to<br/>Collaborate?</h2><p className="contact-lead">I'm always interested in hearing about new projects and opportunities.<br/> Whether you have a question or just want to say hello, feel free to reach<br className="desktop-break"/> out!</p><div className="contact-cards"><a className="contact-card" href="mailto:shaina@example.com"><span className="contact-icon email"><Icon name="mail" size={36}/></span><h3>Email</h3><p>shaina@example.com</p><span className="contact-link">Send Message <Icon name="arrow" size={16}/></span></a><a className="contact-card" href="https://discord.com" target="_blank" rel="noreferrer"><span className="contact-icon discord"><Icon name="message" size={35}/></span><h3>Discord</h3><p>shainag294</p><span className="contact-link purple">DM me <Icon name="arrow" size={16}/></span></a><a className="contact-card" href="https://linkedin.com" target="_blank" rel="noreferrer"><span className="contact-icon linked"><Icon name="arrow" size={35}/></span><h3>LinkedIn</h3><p>Connect with me</p><span className="contact-link green">Visit Profile <Icon name="arrow" size={16}/></span></a></div><a href="mailto:shaina@example.com" className="conversation-button">Start a Conversation <Icon name="arrow" size={20}/></a></section>
    </main>

    <footer className="site-footer grid-bg"><div className="footer-top"><a className="footer-name" href="#home">Shaina Gupta</a><div><span>Connect</span><div className="footer-social"><a href="https://github.com" aria-label="GitHub"><Icon name="github"/></a><a href="https://linkedin.com" aria-label="LinkedIn"><Icon name="linkedin"/></a><a href="mailto:shaina@example.com" aria-label="Email"><Icon name="mail"/></a></div></div></div><div className="copyright">© 2026 Shaina Gupta. All rights reserved.</div></footer>
  </div>
}

export default App
