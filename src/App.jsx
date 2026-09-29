const profile = {
  name: 'Amritjot Singh',
  email: 'aj044223@gmail.com',
  linkedin: 'https://www.linkedin.com/in/amritjot-singh4322/',
  github: 'https://github.com/amrit4322',
  resume: '/Amritjot_Singh_Resume.pdf',
  portrait: '/amritjot-portrait.webp',
}

const projects = [
  {
    number: '01',
    category: 'Civic technology',
    title: 'CoBuild',
    description:
      'Led the architecture and team delivery of a civic-data platform at GovHack 2025. We brought public datasets, mapping and scoring together to make urban-planning decisions easier to explore, all within 48 hours.',
    tags: ['React', 'Node.js', 'Python', 'Public data'],
    badge: 'Victorian State Winner',
    url: 'https://github.com/amrit4322/coBuild',
  },
  {
    number: '02',
    category: 'AI research',
    title: 'PIPER',
    description:
      'My Deakin research compares PPO reinforcement learning with LLM and vision-language approaches on drawing-based physical reasoning. The experiments surfaced stronger trajectory and target performance for PPO, alongside stability limits.',
    tags: ['Python', 'PyTorch', 'Gymnasium', 'Reinforcement learning'],
  },
  {
    number: '03',
    category: 'Product building',
    title: 'DigiSpy',
    description:
      'An AI and cyber-safety learning platform for children. I’m building structured missions, agent accounts and live teacher controls that turn complex digital concepts into hands-on activities.',
    tags: ['Next.js', 'Supabase', 'Realtime', 'Education'],
  },
  {
    number: '04',
    category: 'Backend engineering',
    title: 'BlockAgile & Note Wallet',
    description:
      'At Antier, I built dashboards and distributed services. BlockAgile reduced manual progress reporting by about 50%; gRPC service work on Note Wallet improved response time by about 30%.',
    tags: ['React', 'FastAPI', 'gRPC', 'Docker'],
  },
]

const repositories = [
  {
    type: 'Civic data · React / Python',
    name: 'coBuild',
    description: 'GovHack prototype with mapping, feedback and planning views.',
    url: 'https://github.com/amrit4322/coBuild',
  },
  {
    type: 'Realtime · React / Node',
    name: 'chatApp',
    description: 'Frontend and backend code for a real-time messaging application.',
    url: 'https://github.com/amrit4322/chatApp',
  },
  {
    type: 'Computer vision · Python',
    name: 'objectDetection',
    description: 'A containerised object detection application with a Python server and web templates.',
    url: 'https://github.com/amrit4322/objectDetection',
  },
  {
    type: 'DevSecOps · CI/CD',
    name: '8.2CDevSecOps',
    description: 'A public course project documenting security and delivery practice.',
    url: 'https://github.com/amrit4322/8.2CDevSecOps',
  },
]

const milestones = [
  {
    date: '2025 — 2026',
    title: 'Data science research · Deakin University',
    description: 'Physical reasoning experiments across reinforcement learning and AI models.',
  },
  {
    date: '2025',
    title: 'GovHack Victorian State Winner',
    description: 'Led CoBuild’s technical direction and delivery during a 48-hour build.',
  },
  {
    date: '2023 — 2024',
    title: 'Software Engineer · Antier Solutions',
    description: 'Built full stack features, APIs, analytics dashboards and distributed backend services.',
  },
  {
    date: '2025 — present',
    title: 'Operations & Inventory · ID Logistics',
    description: 'Investigate system and stock exceptions for Amazon client operations in Melbourne.',
  },
]

const skills = [
  ['Languages and foundations', 'Python', 'TypeScript', 'JavaScript', 'SQL', 'Java', 'C++', 'Data structures', 'OOP'],
  ['Frontend and product', 'React', 'Next.js', 'HTML / CSS', 'Tailwind CSS', 'Responsive UI', 'UI components'],
  ['Backend and data', 'FastAPI', 'Node.js', 'Express', 'REST', 'gRPC', 'PostgreSQL', 'MongoDB', 'Redis'],
  ['AI, ML and analysis', 'PyTorch', 'scikit-learn', 'TensorFlow', 'OpenCV', 'YOLOv8', 'PPO', 'Gymnasium', 'Model evaluation'],
  ['Cloud and delivery', 'Docker', 'Azure', 'AWS', 'Kubernetes', 'GitHub Actions', 'CI/CD'],
  ['Engineering habits', 'API design', 'Unit and integration testing', 'Debugging', 'Performance optimisation', 'Code review', 'Agile delivery'],
]

function ExternalLink({ href, children, className }) {
  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}

function SectionHead({ kicker, title, intro }) {
  return (
    <div className="sectionhead">
      <div>
        <div className="kicker">{kicker}</div>
        <h2>{title}</h2>
      </div>
      {intro && <p className="sectionintro">{intro}</p>}
    </div>
  )
}

function Header() {
  return (
    <header>
      <nav className="wrap nav" aria-label="Primary">
        <a className="brand" href="#top" aria-label="Amritjot Singh, back to top">
          <span className="mark">AS</span> {profile.name}
        </a>
        <div className="navlinks">
          <a href="#work">Work</a>
          <a href="#repositories">Code</a>
          <a href="#about">Experience</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </div>
        <a className="navcta" href={profile.resume} download>Download résumé</a>
      </nav>
    </header>
  )
}

function Hero() {
  return (
    <>
      <div className="hero" id="top">
        <div className="wrap">
          <div>
            <div className="eyebrow">Software engineer · Data science graduate</div>
            <h1>I build where <em>software meets intelligence.</em></h1>
            <p className="lead">
              I’m Amritjot, a Melbourne-based engineer who turns complex problems into useful products. My work spans full stack systems, applied AI and data, from award-winning civic tech to research in physical reasoning.
            </p>
            <div className="actions">
              <a className="button primary" href="#work">Explore my work</a>
              <a className="button secondary" href={`mailto:${profile.email}`}>Get in touch</a>
            </div>
            <p className="location"><strong>Melbourne, Australia</strong> · Open to software, data and AI opportunities</p>
          </div>
          <figure className="portrait">
            <img src={profile.portrait} width="1086" height="1448" alt="Portrait of Amritjot Singh" fetchPriority="high" />
            <figcaption>Amritjot Singh <span>Software · Data · AI</span></figcaption>
          </figure>
        </div>
      </div>
      <div className="proof">
        <div className="wrap">
          <div className="proofitem"><strong>GovHack 2025</strong><span>Victorian State Winner · CoBuild</span></div>
          <div className="proofitem"><strong>Master of Data Science</strong><span>Deakin University · completed 2026</span></div>
          <div className="proofitem"><strong>Full stack + AI</strong><span>Industry engineering and applied research</span></div>
        </div>
      </div>
    </>
  )
}

function Work() {
  return (
    <section className="section" id="work">
      <div className="wrap">
        <SectionHead
          kicker="Selected work"
          title="Problems worth building for."
          intro="A few examples of how I move between research, software engineering and real-world use."
        />
        <div className="projectgrid">
          {projects.map((project) => (
            <article className="project" key={project.title}>
              <span className="projectno">{project.number} / {project.category.toUpperCase()}</span>
              {project.badge && <span className="award">{project.badge.toUpperCase()}</span>}
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              {project.url && <ExternalLink href={project.url} className="repo">View source and project notes</ExternalLink>}
              <div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Repositories() {
  return (
    <section className="section" id="repositories">
      <div className="wrap">
        <SectionHead
          kicker="Public code"
          title="Open the repository."
          intro="Selected public work you can inspect. The strongest current project is first; the others show earlier experiments and engineering practice."
        />
        <div className="repogrid">
          {repositories.map((repo) => (
            <article className="repocard" key={repo.name}>
              <span className="type">{repo.type.toUpperCase()}</span>
              <h3>{repo.name}</h3>
              <p>{repo.description}</p>
              <ExternalLink href={repo.url}>View repository</ExternalLink>
            </article>
          ))}
        </div>
        <ExternalLink href={`${profile.github}?tab=repositories`} className="githuball">Browse all public repositories</ExternalLink>
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="section about" id="about">
      <div className="wrap aboutgrid">
        <div>
          <div className="kicker">A bit about me</div>
          <h2>Curious enough to research it. Practical enough to ship it.</h2>
          <p>I completed a Master of Data Science at Deakin after studying computer science engineering. That combination shapes how I work: test assumptions with data, design understandable systems, and build for the people who use them.</p>
          <p className="small">I’ve also spoken about Docker at Microsoft Melbourne and worked with teams across engineering, university and high-volume operations.</p>
        </div>
        <div className="journey">
          {milestones.map((item) => (
            <div className="milestone" key={item.title}>
              <time>{item.date.toUpperCase()}</time>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section className="section" id="skills">
      <div className="wrap">
        <SectionHead
          kicker="Technical skills"
          title="What I build with."
          intro="I work across the path from prototype to deployed product, with research depth in machine learning and practical experience building services and interfaces."
        />
        <div className="skillmatrix">
          {skills.map(([category, ...items]) => (
            <div className="skillrow" key={category}>
              <h3>{category}</h3>
              <div className="skillpills">{items.map((item) => <span key={item}>{item}</span>)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Recognition() {
  return (
    <section className="section sectiontight" id="recognition">
      <div className="wrap">
        <SectionHead kicker="Beyond the code" title="Research, recognition, community." />
        <div className="credgrid">
          <div className="cred"><strong>GovHack 2025 Victorian State Winner</strong><span>CoBuild · civic technology and open data</span></div>
          <div className="cred"><strong>Master of Data Science</strong><span>Deakin University · physical reasoning research · 2026</span></div>
          <div className="cred"><strong>Technical speaker</strong><span>Docker and deployment consistency · Microsoft Melbourne office, 2026</span></div>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <div className="kicker">Let’s connect</div>
        <h2>Have a problem worth solving?</h2>
        <p>I’m exploring graduate and junior roles across software engineering, data science and applied AI. I’d be glad to talk about a role, collaboration or an interesting technical challenge.</p>
        <div className="actions">
          <a className="button primary" href={`mailto:${profile.email}`}>Email me</a>
          <ExternalLink href={profile.linkedin} className="button secondary">LinkedIn</ExternalLink>
          <ExternalLink href={profile.github} className="button secondary">GitHub</ExternalLink>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer>
      <div className="wrap foot">
        <span>© 2026 Amritjot Singh · Melbourne, Australia</span>
        <div className="footlinks">
          <a href={`mailto:${profile.email}`}>Email</a>
          <ExternalLink href={profile.linkedin}>LinkedIn</ExternalLink>
          <a href="#top">Back to top</a>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Hero />
        <Work />
        <Repositories />
        <About />
        <Skills />
        <Recognition />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
