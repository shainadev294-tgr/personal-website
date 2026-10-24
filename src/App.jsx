import { useEffect, useState } from 'react'
import './App.css'

const projects = [
  {
    title: 'Distracted Drivers Detection System',
    kind: 'Machine Learning',
    tags: ['React', 'TypeScript', 'Python', 'FastAPI', 'PostgreSQL', 'D3.js'],
    art: 'analytics',
  },
  {
    title: 'Phoenix',
    kind: 'App Development',
    tags: ['PyTorch', 'TensorFlow', 'NumPy', 'CUDA', 'OpenCV'],
    art: 'network',
  },
  {
    title: 'EcoTrain AI',
    kind: 'Full Stack',
    tags: ['Next.js', 'WebSockets', 'MongoDB', 'Redis', 'Docker'],
    art: 'code',
  },
]

const jobs = [
  {
    title: 'VP of Finance',
    company: 'AV Technology Student Assoc.',
    date: 'Aug 2025',
    end: 'Present',
    place: 'Pleasanton, CA',
    description:
      'Developed machine learning models for natural language processing, conducted research on transformer architectures, and published findings in peer-reviewed journals.',
  },
  {
    title: 'Project Lead',
    company: 'AV Girls Who Code',
    date: 'Aug 2024',
    end: 'Present',
    place: 'Pleasanton, CA',
    description:
      'Built scalable web applications using React and Node.js, optimized database queries, and mentored junior developers on best practices.',
  },
  {
    title: 'Electrical Design Lead',
    company: 'AmadorUAVs',
    date: 'Aug 2025',
    end: 'Present',
    place: 'Pleasanton, CA',
    description:
      'Contributed to core product features, fixed critical bugs, and improved application performance by 40% through code optimization.',
  },
]

const awards = [
  {
    title: 'Robotics Pre-Apprenticeship',
    description:
      'Recipient of the State of California (DAS) Robotics Pre-Apprenticeship',
    organization: 'State of California',
    year: '2026',
  },
  {
    title: '1st States: Engineering Design',
    description:
      'Placed 1st at States conference and qualified for Nationals',
    organization: 'Technology Student Assoc.',
    year: '2026',
  },
  {
    title: '1st States: Coding',
    description:
      'Placed 1st at States conference and qualified for Nationals',
    organization: 'Technology Student Assoc.',
    year: '2026',
  },
  {
    title: 'Department Award for Computers',
    description:
      'Recongnized for excellence in computer science; 1 of 2 recipients from 372+ students',
    organization: 'Pleasanton Middle School',
    year: '2024',
  },
]

const advancedPlacementCourses = [
  'AP Environmental Science',
  'AP World History',
  'AP Computer Science A',
  'AP Statistics',
  'AP Physics C: Mechanics',
  'AP Physics C: Electricity & Magnetism',
  'AP English Language/Composition',
  'AP Biology',
  'AP Calculus BC',
  'AP US History',
]

const relevantCoursework = [
  'Intro into Engineering & Design',
  'Hon Principles of Engineering',
  'Hon Computer-Integrated Manufacturing',
  'BWSI Program Racing Drones',
  'Inspirit AI Scholars',
  'Girls Who Code Summer Pathways',
]

function Icon({ name, size = 24 }) {
  const commonProps = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: name === 'moon' ? 1.45 : 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }

  const icons = {
    moon: (
      <path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z" />
    ),
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
      </>
    ),
    code: (
      <path d="m8 17-5-5 5-5M16 7l5 5-5 5M14 4l-4 16" />
    ),
    briefcase: (
      <>
        <rect x="3" y="7" width="18" height="14" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M12 12v3" />
      </>
    ),
    flask: (
      <path d="M9 3h6M10 3v6l-6 10a1.5 1.5 0 0 0 1.3 2.2h13.4A1.5 1.5 0 0 0 20 19L14 9V3M8 15h8" />
    ),
    award: (
      <>
        <circle cx="12" cy="8" r="6" />
        <path d="m8.2 13-1 8 4.8-2.7 4.8 2.7-1-8" />
      </>
    ),
    book: (
      <path d="M12 7v14M3 5.5A2.5 2.5 0 0 1 5.5 3H12v18H5.5A2.5 2.5 0 0 0 3 23zM21 5.5A2.5 2.5 0 0 0 18.5 3H12v18h6.5a2.5 2.5 0 0 1 2.5 2z" />
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    arrow: (
      <path d="M7 17 17 7M7 7h10v10" />
    ),
    message: (
      <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8A8.5 8.5 0 0 1 8.7 3.9a8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z" />
    ),
    cpu: (
      <>
        <rect x="6" y="6" width="12" height="12" rx="2" />
        <rect x="9" y="9" width="6" height="6" rx="1" />
        <path d="M9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4" />
      </>
    ),
    github: (
      <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 6v-3.9a3.4 3.4 0 0 0-.9-2.7c3-.3 6.2-1.5 6.2-6.8A5.3 5.3 0 0 0 19 5a4.9 4.9 0 0 0-.1-3S17.7 1.7 15 3.5a13.5 13.5 0 0 0-7 0C5.3 1.7 4.1 2 4.1 2A4.9 4.9 0 0 0 4 5a5.3 5.3 0 0 0-1.3 3.7c0 5.3 3.2 6.5 6.2 6.8A3.4 3.4 0 0 0 8 18.2V22" />
    ),
    linkedin: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6ZM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),
  }

  return <svg {...commonProps}>{icons[name] || icons.arrow}</svg>
}

function ProjectArt({ kind }) {
  return (
    <div className={`project-art art-${kind}`} aria-hidden="true">
      <div className="art-window">
        <div className="art-sidebar" />
        <div className="art-content">
          <i />
          <i />
          <i />
          <i />
          <b />
          <b />
          <b />
        </div>
      </div>
      <span className="art-glow" />
    </div>
  )
}

function SectionHeading({ icon, children, centered = false }) {
  return (
    <div className={`section-heading${centered ? ' centered-heading' : ''}`}>
      <Icon name={icon} />
      <h2>{children}</h2>
    </div>
  )
}

function SiteHeader({ dark, onToggleTheme }) {
  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="Shaina Gupta home">
        SG
      </a>
      <nav aria-label="Main navigation">
        <a href="#projects">Projects</a>
        <a href="#experience">Experience</a>
        <a href="#research">Research</a>
        <a href="#awards">Awards</a>
        <a href="#education">Education</a>
        <a href="#contact">Contact</a>
      </nav>
      <button
        className="theme-toggle"
        onClick={onToggleTheme}
        aria-label={dark ? 'Use light theme' : 'Use dark theme'}
      >
        <Icon name={dark ? 'sun' : 'moon'} size={22} />
      </button>
    </header>
  )
}

function HeroSection() {
  const [role, setRole] = useState('Electrical Engineer')

  useEffect(() => {
    const roles = ['Electrical Engineer', 'ML Researcher', 'Amador Valley High ’28']
    let roleIndex = 0
    let deleting = false
    let typed = ''
    let timer

    const tick = () => {
      const current = roles[roleIndex]
      typed = deleting ? typed.slice(0, -1) : current.slice(0, typed.length + 1)
      setRole(typed)

      if (!deleting && typed === current) {
        deleting = true
        timer = window.setTimeout(tick, 1700)
        return
      }

      if (deleting && typed.length === 0) {
        deleting = false
        roleIndex = (roleIndex + 1) % roles.length
      }

      timer = window.setTimeout(tick, deleting ? 42 : 78)
    }

    timer = window.setTimeout(tick, 1900)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <section className="hero grid-bg" id="home">
      <div className="hero-copy">
        <span className="status">
          <i />
          System Online
        </span>
        <h1>
          Shaina
          <br />
          Gupta
        </h1>
        <div className="role-line">
          <span className="prompt">›</span>
          <span>
            {role}
            <span className="cursor" />
          </span>
        </div>
        <a className="primary-button" href="#projects">
          Initialize Projects
          <Icon name="arrow" size={19} />
        </a>
      </div>

      <div className="hero-visual" aria-hidden="true">
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <div className="orbit orbit-three" />
        <div className="cpu-badge">
          <Icon name="cpu" size={58} />
        </div>
      </div>

      <a className="scroll-cue" href="#projects">
        <span>SCROLL</span>
        <i />
      </a>
    </section>
  )
}

function ProjectsSection() {
  return (
    <section className="section projects-section" id="projects">
      <SectionHeading icon="code">Featured Projects</SectionHeading>
      <p className="section-intro">
        A selection of recent engineering and development work, focusing on scalable
        <br className="desktop-break" /> solutions and innovative technologies.
      </p>

      <div className="project-grid">
        {projects.map((project) => (
          <article className="project-card" key={project.title}>
            <ProjectArt kind={project.art} />
            <div className="project-info">
              <div className="project-title-row">
                <h3>{project.title}</h3>
                <a
                  href="#contact"
                  className="round-arrow"
                  aria-label={`Learn more about ${project.title}`}
                >
                  <Icon name="arrow" size={17} />
                </a>
              </div>
              <p>{project.kind}</p>
              <div className="tag-list">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function ExperienceSection() {
  return (
    <section className="section experience-section grid-bg" id="experience">
      <SectionHeading icon="briefcase">Professional Timeline</SectionHeading>
      <div className="timeline">
        {jobs.map((job) => (
          <article className="timeline-item" key={job.title}>
            <div className="timeline-dot" />
            <div className="timeline-card">
              <div className="job-top">
                <div>
                  <h3>{job.title}</h3>
                  <a href="#contact" className="company-link">
                    {job.company} <span>↗</span>
                  </a>
                </div>
                <span className="date-pill">
                  {job.date}
                  <b>→</b>
                  {job.end}
                </span>
              </div>
              <p className="job-place">• {job.place}</p>
              <p className="job-description">{job.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function ResearchCard({ art, title, role, children }) {
  return (
    <article className="research-card">
      <div className={`research-art ${art}`}>
        <span className="year-badge">2024</span>
        <h3>{title}</h3>
        <a href="#contact" aria-label="Read research">
          <Icon name="arrow" size={22} />
        </a>
      </div>
      <div className="research-copy">
        <span className="eyebrow">ROLE: {role}</span>
        <p>{children}</p>
      </div>
    </article>
  )
}

function AwardCard({ award }) {
  return (
    <article className="award-card" tabIndex="0">
      <Icon name="arrow" size={17} />
      <h3>{award.title}</h3>
      <p>{award.description}</p>
      <div>
        <span>{award.organization}</span>
        <time>{award.year}</time>
      </div>
    </article>
  )
}

function ResearchAndAwardsSection() {
  return (
    <section className="section research-section" id="research">
      <div className="research-column">
        <SectionHeading icon="flask">Featured Research</SectionHeading>
        <ResearchCard
          art="chip-art"
          title="Efficient Deep Learning for Edge Devices"
          role="LEAD RESEARCHER"
        >
          Research on model compression techniques and quantization methods to enable
          deployment of deep learning models on resource-constrained edge devices.
        </ResearchCard>
        <ResearchCard
          art="green-art"
          title="Sustainable AI: Carbon-Aware Computing"
          role="CO-AUTHOR"
        >
          Investigating methods to reduce the carbon footprint of AI training and
          inference through algorithmic innovations and hardware optimization.
        </ResearchCard>
      </div>

      <div className="awards-column" id="awards">
        <SectionHeading icon="award">Recognition</SectionHeading>
        <div className="award-list">
          {awards.map((award) => (
            <AwardCard key={award.title} award={award} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CourseTags({ courses, soft = false }) {
  return (
    <div className={`course-tags${soft ? ' soft' : ''}`}>
      {courses.map((course) => (
        <span key={course}>{course}</span>
      ))}
    </div>
  )
}

function EducationSection() {
  return (
    <section className="section education-section grid-bg" id="education">
      <SectionHeading icon="book" centered>
        Academic Profile
      </SectionHeading>
      <article className="school-card">
        <header>
          <h3>Amador Valley High School</h3>
          <span className="enrollment">
            <i />
            Active Enrollment
          </span>
        </header>

        <div className="school-details">
          <div>
            <span className="eyebrow muted">CORE METRICS</span>
            <div className="metrics">
              <div className="metric">
                <span>Weighted GPA</span>
                <strong className="blue">4.48</strong>
              </div>
              <div className="metric">
                <span>Unweighted GPA</span>
                <strong>3.98</strong>
              </div>
              <div className="metric wide">
                <span>Standardized ACT Score</span>
                <strong className="cyan">35</strong>
              </div>
            </div>
          </div>

          <div className="curriculum">
            <span className="eyebrow muted">CURRICULUM FOCUS</span>
            <h4>› &nbsp;Advanced Placement</h4>
            <CourseTags courses={advancedPlacementCourses} />
            <h4>› &nbsp;Relevant Coursework</h4>
            <CourseTags courses={relevantCoursework} soft />
          </div>
        </div>
      </article>
    </section>
  )
}

const contactMethods = [
  {
    title: 'Email',
    detail: 'shaingupta294@gmail.com',
    action: 'Send Message',
    href: 'mailto:shaingupta294@gmail.com',
    icon: 'mail',
    iconClass: 'email',
    actionClass: '',
  },
  {
    title: 'Discord',
    detail: 'shainag294',
    action: 'DM me',
    href: 'https://discord.com',
    icon: 'message',
    iconClass: 'discord',
    actionClass: 'purple',
    external: true,
  },
  {
    title: 'LinkedIn',
    detail: 'Connect with me',
    action: 'Visit Profile',
    href: 'https://linkedin.com',
    icon: 'arrow',
    iconClass: 'linked',
    actionClass: 'green',
    external: true,
  },
]

function ContactCard({ contact }) {
  return (
    <a
      className="contact-card"
      href={contact.href}
      target={contact.external ? '_blank' : undefined}
      rel={contact.external ? 'noreferrer' : undefined}
    >
      <span className={`contact-icon ${contact.iconClass}`}>
        <Icon name={contact.icon} size={36} />
      </span>
      <h3>{contact.title}</h3>
      <p>{contact.detail}</p>
      <span className={`contact-link ${contact.actionClass}`}>
        {contact.action}
        <Icon name="arrow" size={16} />
      </span>
    </a>
  )
}

function ContactSection() {
  return (
    <section className="contact-section grid-bg" id="contact">
      <span className="contact-kicker">
        <Icon name="message" size={17} />
        Let’s Connect
      </span>
      <h2>
        Ready to
        <br />
        Collaborate?
      </h2>
      <p className="contact-lead">
        I'm always interested in hearing about new projects and opportunities.
        <br />
        Whether you have a question or just want to say hello, feel free to reach
        <br className="desktop-break" /> out!
      </p>

      <div className="contact-cards">
        {contactMethods.map((contact) => (
          <ContactCard key={contact.title} contact={contact} />
        ))}
      </div>

      <a href="mailto:shainagupta294@gmail.com" className="conversation-button">
        Start a Conversation
        <Icon name="arrow" size={20} />
      </a>
    </section>
  )
}

function SiteFooter() {
  return (
    <footer className="site-footer grid-bg">
      <div className="footer-top">
        <a className="footer-name" href="#home">
          Shaina Gupta
        </a>
        <div>
          <span>Connect</span>
          <div className="footer-social">
            <a href="https://github.com/shainadev294-tgr" aria-label="GitHub">
              <Icon name="github" />
            </a>
            <a href="https://linkedin.com" aria-label="LinkedIn">
              <Icon name="linkedin" />
            </a>
            <a href="mailto:shainagupta294@gmail.com" aria-label="Email">
              <Icon name="mail" />
            </a>
          </div>
        </div>
      </div>
      <div className="copyright">© 2026 Shaina Gupta. All rights reserved.</div>
    </footer>
  )
}

function App() {
  const [dark, setDark] = useState(false)

  return (
    <div className={dark ? 'site theme-dark' : 'site'}>
      <SiteHeader dark={dark} onToggleTheme={() => setDark(!dark)} />
      <main>
        <HeroSection />
        <ProjectsSection />
        <ExperienceSection />
        <ResearchAndAwardsSection />
        <EducationSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  )
}

export default App
