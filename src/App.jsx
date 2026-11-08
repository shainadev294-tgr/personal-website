import { useEffect, useRef, useState } from 'react'
import './App.css'

const projects = [
  {
    title: 'Phoenix',
    kind: 'A cross-platform app built to allow safe preparation, handling, and recovery during all stages of a wildfire. The app uses machine learning to predict fire spread and provide real-time updates to users. Presents a unified platform to organize evacuation plans, track fire locations, and access emergency resources.',
    tags: ['PyTorch', 'TensorFlow', 'NumPy', 'CUDA', 'OpenCV'],
    art: 'network',
    cover: `${import.meta.env.BASE_URL}phoenix-cover.png`,
    coverFit: 'phoenix',
    href: 'https://vimeo.com/1240535601',
  },
  {
    title: 'Search and Rescue VTOL',
    kind: 'An autonomous fixed wing designed for search and rescue operations. The aircraft is capable of vertical takeoff and landing, as well as efficient forward flight. It is equipped with a high-resolution camera and thermal imaging sensors to locate missing persons in challenging environments.',
    tags: ['VTOL', 'Search & Rescue'],
    art: 'analytics',
    cover: `${import.meta.env.BASE_URL}search-rescue-vtol-cover.png`,
    coverFit: 'crop',
    href: '#contact',
  },
  {
    title: 'Ladybug',
    kind: 'A completely autonomous quadcopter built from scratch for SUAS 2026. Features custom lithium ion battery packs, TMOTOR MN7005 230 KV anti-gravity motors, a Pixhawk 6x flight controller, a robust carbon fiber frame, and 24*7.2 inch propellers. View additional technical information and documentation at https://amadoruavs.com/ladybug.',
    tags: [],
    art: 'code',
    cover: `${import.meta.env.BASE_URL}ladybug-cover-card.png`,
    coverFit: 'crop',
    coverBrightness: true,
    href: 'https://youtu.be/O-y4a6SeSLk',
  },
  {
    title: 'Distracted Drivers Detection System',
    kind: 'Utilized transfer learning with the VGG19 framework and custom CNNs to process live video feed and flag inattentive drivers and unsafe behaviors. Achieved an accuracy of 93% from limited data sources through data augmentation and implemented saliency maps to only analyze useful pixels, such as those describing the hands and eyes, preserving user privacy.',
    tags: ['React', 'TypeScript', 'Python', 'FastAPI', 'PostgreSQL', 'D3.js'],
    art: 'analytics',
    cover: `${import.meta.env.BASE_URL}distracted-drivers-cover.png`,
    href: 'https://docs.google.com/presentation/d/1Ujiju-2A2JLKRG2gHLWMw58_ODTBZsI_uwVaDte5w5I/edit?usp=sharing', // Replace with this project's demo, source code, or presentation URL.
  },
  {
    title: 'EcoTrain',
    kind: 'Full Stack',
    tags: ['Next.js', 'WebSockets', 'MongoDB', 'Redis', 'Docker'],
    art: 'code',
    href: '#contact', // Replace with this project's demo, source code, or presentation URL.
  },
]

const jobs = [
  {
    title: 'Electrical Design Lead',
    company: 'AmadorUAVs',
    href: 'https://amadoruavs.com/',
    date: 'Aug 2025',
    end: 'Present',
    place: 'Pleasanton, CA',
    description:
      'Electrical Lead of an engineering team that designs fully autonomous drones to compete at the annual Student Unmanned Aerial Systems (SUAS) competition, an international collegiate competition with over 75 college teams. We have previously placed 1st nationally and 2nd internationally, outranking teams from Cornell, UC Berkely, and UC San Diego.',
  },
  {
    title: 'VP of Finance',
    company: 'AV Technology Student Assoc.',
    href: 'https://www.avtsa.com/',
    date: 'Aug 2025',
    end: 'Present',
    place: 'Pleasanton, CA',
    description:
      'Handle fundraising and promotion to raise competition fees as well as mentoring underclassman in their projects as a 2026 TSA State Champion and National Qualifier in the events of Engineering Design and Coding myself.',
  },
  {
    title: 'Project Lead',
    company: 'AV Girls Who Code',
    href: 'https://avhsgwc.weebly.com/',
    date: 'Aug 2024',
    end: 'Present',
    place: 'Pleasanton, CA',
    description:
      'Helped organize our annual Summit for three consecutive, an award winning and nationally recognized day-long event that brings together over 200 elementary through middle school girls from across the Bay Area to learn about computer science through workshops, guest speakers, and hands-on activities. Lead a team of 30+ students to plan and excecute a week-long hackathon for over 80 participants, and taught live workshops in python and machine learning.',
  },
  {
    title: 'Flagship Project Member',
    company: 'Tri-Valley Mars Society',
    href: 'https://trivalleymarssociety.com/',
    date: 'Aug 2026',
    end: 'Present',
    place: 'Pleasanton, CA',
    description:
      'Working under the guidance of Stanford Professor Dr. Kyle Douglas and former NASA engineer Mr. Kenny Vassigh to develop a Mars surface habitat optimized for usable pressurized interior volume and passive thermal performance while remaining rapidly deployable and reconfigurable for different surface functions.',
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
    title: 'AP Scholar',
    description:
      'Demonstrated outstanding college-level achievement through performance on multiple AP Exams.',
    organization: 'College Board',
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
    strokeWidth: name === 'moon' ? 1.4 : 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }

  const icons = {
    moon: (
      <path d="M19.3 14.8A8.5 8.5 0 0 1 9.2 4.2 8.5 8.5 0 1 0 19.3 14.8Z" />
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

function ProjectArt({ kind, cover, coverFit, coverBrightness }) {
  return (
    <div className={`project-art ${cover ? 'art-cover' : `art-${kind}`}`} aria-hidden="true">
      {cover ? (
        <img
          className={`project-cover-image${coverFit ? ` project-cover-image-${coverFit}` : ''}${coverBrightness ? ' project-cover-image-bright' : ''}`}
          src={cover}
          alt=""
        />
      ) : (
        <>
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
        </>
      )}
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

  function moveHeroLayers(event) {
    if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const visual = event.currentTarget
    const bounds = visual.getBoundingClientRect()
    const x = (event.clientX - (bounds.left + bounds.width / 2)) / (bounds.width / 2)
    const y = (event.clientY - (bounds.top + bounds.height / 2)) / (bounds.height / 2)

    visual.querySelectorAll('[data-parallax]').forEach((layer) => {
      const depth = Number(layer.dataset.parallax)
      layer.style.setProperty('--parallax-x', `${x * depth}px`)
      layer.style.setProperty('--parallax-y', `${y * depth}px`)
    })
  }

  function resetHeroLayers(event) {
    event.currentTarget.querySelectorAll('[data-parallax]').forEach((layer) => {
      layer.style.removeProperty('--parallax-x')
      layer.style.removeProperty('--parallax-y')
    })
  }

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

      <div
        className="hero-visual"
        aria-hidden="true"
        onPointerMove={moveHeroLayers}
        onPointerLeave={resetHeroLayers}
      >
        <div className="hero-glow" data-parallax="-5" />
        <img
          className="orbit orbit-one"
          src={`${import.meta.env.BASE_URL}wavy-gear-outline.png`}
          data-parallax="-10"
          alt=""
        />
        <img
          className="orbit orbit-two"
          src={`${import.meta.env.BASE_URL}wavy-gear-outline.png`}
          data-parallax="17"
          alt=""
        />
        <div className="orbiting-detail-path">
          <span className="orbiting-detail" />
        </div>
        <div className="cpu-badge" data-parallax="8">
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
  const projectScrollerRef = useRef(null)

  function scrollProjects(direction) {
    const scroller = projectScrollerRef.current
    const firstCard = scroller?.querySelector('.project-card')

    if (!scroller || !firstCard) return

    const gap = Number.parseFloat(window.getComputedStyle(scroller).columnGap) || 0
    scroller.scrollBy({
      left: direction * (firstCard.getBoundingClientRect().width + gap),
      behavior: 'smooth',
    })
  }

  function handleProjectKeys(event) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      scrollProjects(-1)
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      scrollProjects(1)
    }
  }

  return (
    <section className="section projects-section" id="projects">
      <div className="projects-heading-row">
        <SectionHeading icon="code">Featured Projects</SectionHeading>
        <div className="project-carousel-controls">
          <span>Scroll or use the arrows to see more.</span>
          <div className="project-carousel-buttons">
            <button
              className="carousel-arrow"
              type="button"
              aria-label="Scroll to previous projects"
              onClick={() => scrollProjects(-1)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m14 6-6 6 6 6M8 12h12" />
              </svg>
            </button>
            <button
              className="carousel-arrow"
              type="button"
              aria-label="Scroll to more projects"
              onClick={() => scrollProjects(1)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m10 6 6 6-6 6m6-6H4" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        className="project-grid"
        ref={projectScrollerRef}
        role="region"
        aria-label="Featured project cards"
        tabIndex={0}
        onKeyDown={handleProjectKeys}
      >
        {projects.map((project) => (
          <article className="project-card" key={project.title}>
            <ProjectArt
              kind={project.art}
              cover={project.cover}
              coverFit={project.coverFit}
              coverBrightness={project.coverBrightness}
            />
            <div className="project-info">
              <div className="project-title-row">
                <h3>{project.title}</h3>
                <a
                  href={project.href}
                  target={project.href.startsWith('http') ? '_blank' : undefined}
                  rel={project.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="round-arrow"
                  aria-label={`Open ${project.title} project link`}
                >
                  <Icon name="arrow" size={17} />
                </a>
              </div>
              <p>{project.description || project.kind}</p>
              {/* Uncomment this block to show project tools and languages again.
              <div className="tag-list">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              */}
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
      <SectionHeading icon="briefcase">Experience</SectionHeading>
      <div className="timeline">
        {jobs.map((job) => (
          <article className="timeline-item" key={job.title}>
            <div className="timeline-dot" />
            <div className="timeline-card">
              <div className="job-top">
                <div>
                  <h3>{job.title}</h3>
                  <a
                    href={job.href}
                    className="company-link"
                    target="_blank"
                    rel="noreferrer"
                  >
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

function ResearchCard({ art, cover, coverPosition, coverSize, title, role, children }) {
  return (
    <article className="research-card">
      <div
        className={`research-art ${art}${cover ? ' has-cover' : ''}`}
        style={
          cover
            ? {
                backgroundImage: `url(${cover})`,
                backgroundPosition: coverPosition || 'center center',
                backgroundSize: coverSize || 'cover',
              }
            : undefined
        }
      >
        <h3>{title}</h3>
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
          cover={`${import.meta.env.BASE_URL}mars-research-cover.png`}
          coverPosition="center 35%"
          coverSize="110% auto"
          title="Why Message Passing Fails on Functional Connectomes: A Mechanistic Study of Node-Feature Redundancy"
          role="MODEL ARCHITECTURE LEAD"
        >
          Investigates whether representation redundancy between connection-profile features and spatial message passing explains the failure of GNNs on connectomes.
        </ResearchCard>
        <ResearchCard
          art="green-art"
          cover={`${import.meta.env.BASE_URL}invasive-species-research-cover.png`}
          title="Analysis of Weather on Area Vulnerability to Invasive Species"
          role="LEAD RESEARCHER"
        >
          Investigating implications of weather on area vulnerability to invasive species through computational analysis. Built custom datasets from global historical TerraClim NetCDFs and performed ablation studies utilizing random forests to determine critical tipping points based on environmental factors such as solar insolation, precipitation, vapor pressure, wind speed and temperature.
        </ResearchCard>
        <ResearchCard
          art="green-art"
          cover={`${import.meta.env.BASE_URL}connectomes-research-cover.png`}
          coverSize="90% auto"
          title="A Pressure-Self-Energizing Structural Interface for Modular Martian Habitats"
          role="COMPUTATIONAL & ENGINEERING LEAD"
        >
          An established and experimentally quantified design envelope for modular planetary-habitat interfaces. Proposed Mars surface habitat architecture minimizes the mass and stowed volume transported from Earth while maximizing usable pressurized interior volume, passive thermal performance, and remaining rapidly deployable and reconfigurable for different surface functions.
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
              {/* Uncomment these metric blocks to show GPA again.
              <div className="metric">
                <span>Weighted GPA</span>
                <strong className="blue">4.48</strong>
              </div>
              <div className="metric">
                <span>Unweighted GPA</span>
                <strong>3.98</strong>
              </div>
              */}
              <div className="metric wide">
                <span>Standardized ACT Score</span>
                <strong className="cyan">35</strong>
              </div>
              <div className="metric wide">
                <span>PSAT Score</span>
                <strong className="blue">1500</strong>
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
