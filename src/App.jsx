import { useEffect, useRef, useState } from 'react'
import portfolio from './data/portfolio.json'
import { Dialog, ExternalLink, Icon, Reveal, SectionHead, Tags, spotlight } from './components/ui'
import { usePreferences, useScrollSpy } from './hooks/usePortfolio'

const { profile, specialties, projects, repositories, experience, skillGroups, highlights, content } = portfolio

// Vite rewrites BASE_URL at build time, so public assets work on a domain or a repository URL.
const asset = path => /^(https?:|data:)/.test(path) ? path : `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
const navigation = [
  ...(projects.length ? [['work', 'Work']] : []),
  ...(repositories.length ? [['repositories', 'Code']] : []),
  ...(experience.length ? [['about', 'Experience']] : []),
  ...(skillGroups.length ? [['skills', 'Skills']] : []),
  ['contact', 'Contact'],
]
const sectionIds = navigation.map(([id]) => id)

function Header({ preferences }) {
  const { active, progressRef } = useScrollSpy(sectionIds)
  const [menu, setMenu] = useState(false)
  const menuRef = useRef(null)
  useEffect(() => {
    const close = event => { if (event.key === 'Escape') { setMenu(false); menuRef.current?.focus() } }
    document.addEventListener('keydown', close)
    return () => document.removeEventListener('keydown', close)
  }, [])
  return <header className="header">
    <div className="scroll-progress" ref={progressRef} aria-hidden="true"/>
    <nav className="container nav" aria-label="Primary">
      <a className="brand" href="#top" onClick={() => setMenu(false)}><span className="monogram">{profile.initials}</span><span>{profile.name}</span></a>
      <div className="nav-tools">
        <button type="button" className="icon-button" onClick={preferences.toggleTheme} aria-label={`Switch to ${preferences.theme === 'dark' ? 'light' : 'dark'} theme`} title="Change theme"><Icon name={preferences.theme === 'dark' ? 'sun' : 'moon'}/></button>
        {/* <button type="button" className="icon-button motion-control" onClick={preferences.toggleMotion} disabled={preferences.reduced} aria-label={preferences.reduced ? 'Motion reduced by your device setting' : preferences.motionOff ? 'Resume animations' : 'Pause animations'} title={preferences.reduced ? 'Your device requests reduced motion' : preferences.motionOff ? 'Resume animations' : 'Pause animations'}><Icon name={preferences.motionOff ? 'play' : 'pause'}/></button> */}
        <button type="button" ref={menuRef} className="icon-button menu-toggle" aria-expanded={menu} aria-controls="main-navigation" aria-label={menu ? 'Close navigation' : 'Open navigation'} onClick={() => setMenu(!menu)}><Icon name={menu ? 'close' : 'menu'}/></button>
      </div>
      <div className={`nav-links ${menu ? 'open' : ''}`} id="main-navigation">
        {navigation.map(([id, label]) => <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined} onClick={() => setMenu(false)}>{label}</a>)}
        <a className="resume-link" href={asset(profile.resume)} download>Résumé</a>
      </div>
    </nav>
  </header>
}

function Hero({ setFocus }) {
  const [selected, setSelected] = useState(specialties[0]?.id)
  const specialty = specialties.find(item => item.id === selected) || specialties[0]
  return <section className="hero" id="top" onPointerMove={spotlight} aria-labelledby="hero-title">
    <div className="hero-mesh" aria-hidden="true"/>
    <div className="container hero-grid">
      <div className="hero-copy">
        <span className="eyebrow">{profile.role}</span>
        <h1 id="hero-title">{profile.headline}<br/><em>{profile.headlineAccent}</em></h1>
        <p className="hero-bio">{profile.bio}</p>
        {specialty && <div className="focus-switcher">
          <div className="focus-options" aria-label="Explore my focus">
            {specialties.map(item => <button type="button" key={item.id} aria-pressed={selected === item.id} onClick={() => setSelected(item.id)}>{item.label}</button>)}
          </div>
          <div className="focus-description" key={specialty.id}><p>{specialty.description}</p><a href="#work" onClick={() => setFocus(specialty.projectFocus)}>Explore {specialty.label.toLowerCase()} work</a></div>
        </div>}
        <div className="hero-actions"><a className="button primary" href="#contact">Let’s connect</a><a className="button secondary" href={asset(profile.resume)} download>Download résumé</a></div>
        <p className="location">{profile.location}<span>{profile.availability}</span></p>
      </div>
      <div className="portrait-stage"><img className="portrait-photo" src={asset(profile.portrait)} width="1086" height="1448" alt={profile.portraitAlt} fetchPriority="high"/></div>
    </div>
    <a className="scroll-cue" href="#work">Keep exploring<span aria-hidden="true"/></a>
  </section>
}

function Work({ focus, setFocus, onProject }) {
  const options = ['All work', ...new Set(projects.map(project => project.focus).filter(Boolean))]
  const shown = focus === 'All work' ? projects : projects.filter(project => project.focus === focus)
  return <section className="section" id="work"><div className="container">
    <SectionHead {...content.sections.work} number="01"/>
    <div className="filter-row"><div className="filters" aria-label="Project focus">{options.map(option => <button type="button" key={option} className="pill" aria-pressed={focus === option} onClick={() => setFocus(option)}>{option}</button>)}</div><span className="result-count" aria-live="polite">{shown.length} {shown.length === 1 ? 'project' : 'projects'}</span></div>
    <div className="project-grid">
      {shown.map(project => <Reveal as="article" className="project-card spotlight" key={project.id} onPointerMove={spotlight}>
        <div className="card-top"><span className="mono">{String(projects.indexOf(project)+1).padStart(2,'0')} / {project.category}</span>{project.badge && <span className="badge">{project.badge}</span>}</div>
        <div className="project-glyph" aria-hidden="true"><span/><span/><span/></div>
        <h3>{project.title}</h3><p>{project.description}</p><Tags items={project.tags}/>
        <div className="card-bottom"><button type="button" className="text-button" onClick={() => onProject(project)}>Explore project <Icon name="plus" size={18}/></button>{project.url && <ExternalLink href={project.url} className="small-link">Source code</ExternalLink>}</div>
      </Reveal>)}
    </div>
    {shown.length === 0 && <p className="empty">No projects in this focus yet. <button className="text-button" onClick={() => setFocus('All work')}>Show all work</button></p>}
  </div></section>
}

function Repositories() {
  return <section className="section code-section" id="repositories"><div className="container">
    <SectionHead {...content.sections.repositories} number="02"/>
    <div className="repo-grid">{repositories.map(repo => <Reveal as="article" className="repo-card spotlight" key={repo.id} onPointerMove={spotlight}><div className="repo-label"><Icon name="code"/><span className="mono">{repo.type}</span></div><h3>{repo.name}</h3><p>{repo.description}</p><Tags items={repo.tags}/><ExternalLink href={repo.url} className="repo-link">View repository</ExternalLink></Reveal>)}</div>
    <ExternalLink href={`${profile.github}?tab=repositories`} className="button secondary browse-code">Browse all public repositories</ExternalLink>
  </div></section>
}

function About() {
  return <section className="section about-section" id="about"><div className="container about-grid">
    <Reveal className="about-intro"><span className="eyebrow">03 / {content.about.kicker}</span><h2>{content.about.title}</h2>{content.about.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</Reveal>
    <div className="timeline">{experience.map((item,index) => <Reveal key={item.id}><details className="experience" name="career" open={index === 0}><summary><span className="mono">{item.date}</span><h3>{item.title}</h3><span className="expand-icon"><Icon name="plus" size={18}/></span></summary><div className="experience-detail"><p>{item.description}</p>{item.details?.filter(detail => detail !== item.description).length > 0 && <ul>{item.details.filter(detail => detail !== item.description).map(detail => <li key={detail}>{detail}</li>)}</ul>}{item.tags && <Tags items={item.tags}/>}</div></details></Reveal>)}</div>
  </div></section>
}

function Skills({ onProject }) {
  const [category,setCategory] = useState('all')
  const [query,setQuery] = useState('')
  const [selected,setSelected] = useState([])
  const [matchMode,setMatchMode] = useState('all')
  const groups = skillGroups.filter(group => category === 'all' || group.id === category)
  const matching = groups.map(group => ({...group,items:group.items.filter(skill => skill.toLowerCase().includes(query.toLowerCase().trim()))})).filter(group => group.items.length)
  const matches = item => selected.length > 0 && (matchMode === 'all' ? selected.every(skill => item.skills?.includes(skill)) : selected.some(skill => item.skills?.includes(skill)))
  const matchingProjects = projects.filter(matches)
  const matchingRepos = repositories.filter(matches)
  const toggleSkill = skill => setSelected(current => current.includes(skill) ? current.filter(item => item !== skill) : [...current,skill])
  return <section className="section" id="skills"><div className="container">
    <SectionHead {...content.sections.skills} number="04"/>
    <div className="skill-controls"><label className="search-field"><Icon name="search"/><span className="sr-only">Search skills</span><input value={query} onChange={event=>setQuery(event.target.value)} placeholder="Find a skill, e.g. Python" type="search"/></label><label className="category-field"><span className="sr-only">Skill category</span><select value={category} onChange={event=>setCategory(event.target.value)}><option value="all">All categories</option>{skillGroups.map(group=><option key={group.id} value={group.id}>{group.title}</option>)}</select></label></div>
    <div className="skill-layout"><div className="skill-groups">{matching.map(group=><Reveal className="skill-group" key={group.id}><div className="skill-group-heading"><h3>{group.title}</h3><span className="mono">{group.items.length}</span></div><div className="skill-pills">{group.items.map(skill=><button type="button" key={skill} aria-pressed={selected.includes(skill)} onClick={()=>toggleSkill(skill)}>{skill}</button>)}</div></Reveal>)}{!matching.length && <p className="empty">No matching skills. <button type="button" className="text-button" onClick={()=>{setQuery('');setCategory('all')}}>Reset search</button></p>}</div>
      <aside id="skill-context" className="skill-context" aria-live="polite"><span className="eyebrow">Skills in practice</span><h3>{selected.length ? `${selected.length} ${selected.length === 1 ? 'skill' : 'skills'} selected` : 'Choose a skill'}</h3>{!selected.length ? <p>Select a skill to see the projects and public repositories where I used it.</p> : <><div className="selected-skills">{selected.map(skill=><button type="button" key={skill} onClick={()=>toggleSkill(skill)} aria-label={`Remove ${skill} from selection`}>{skill}<Icon name="close" size={13}/></button>)}</div>{selected.length>1 && <fieldset className="match-mode"><legend>Show work using</legend><label><input type="radio" name="skill-match" checked={matchMode==='all'} onChange={()=>setMatchMode('all')}/> All selected skills</label><label><input type="radio" name="skill-match" checked={matchMode==='any'} onChange={()=>setMatchMode('any')}/> Any selected skill</label></fieldset>}<p className="match-summary">{matchingProjects.length} {matchingProjects.length===1?'project':'projects'} · {matchingRepos.length} {matchingRepos.length===1?'repository':'repositories'}</p>{matchingProjects.length+matchingRepos.length===0 && <p>No linked work for this combination yet. Try “Any selected skill” or remove one.</p>}<div className="related-work">{matchingProjects.map(project=><button type="button" key={project.id} onClick={()=>onProject(project)}><span>Project · {project.skills.filter(skill=>selected.includes(skill)).join(', ')}</span>{project.title}<Icon name="plus" size={16}/></button>)}{matchingRepos.map(repo=><ExternalLink key={repo.id} href={repo.url}><span>Repository · {repo.skills.filter(skill=>selected.includes(skill)).join(', ')}</span>{repo.name}<Icon name="code" size={16}/></ExternalLink>)}</div><button type="button" className="text-button clear-skill" onClick={()=>setSelected([])}>Clear selection</button></>}</aside>
    </div>
  </div></section>
}

function Recognition() {
  return <section className="section recognition-section" id="recognition"><div className="container"><SectionHead {...content.sections.recognition} number="05"/><div className="recognition-grid">{highlights.map((item,index)=><Reveal className="recognition-card" key={item.id}><span className="recognition-number">{String(index+1).padStart(2,'0')}</span><h3>{item.title}</h3><p className="recognition-subtitle">{item.subtitle}</p><p>{item.description}</p></Reveal>)}</div></div></section>
}

function Contact() {
  const [topic,setTopic] = useState(content.contact.topics[0] || '')
  const [feedback,setFeedback] = useState('')
  const timer = useRef(null)
  useEffect(()=>()=>clearTimeout(timer.current),[])
  async function copy() {
    clearTimeout(timer.current)
    try { await navigator.clipboard.writeText(profile.email); setFeedback('Email copied') }
    catch { setFeedback(`Please copy: ${profile.email}`) }
    timer.current=setTimeout(()=>setFeedback(''),6000)
  }
  return <section className="section contact-section" id="contact"><div className="container contact-grid"><Reveal><span className="eyebrow">Start a conversation</span><h2>{content.contact.title}</h2><p>{content.contact.description}</p></Reveal><Reveal className="contact-panel"><span className="contact-label">What’s on your mind?</span><div className="contact-topics">{content.contact.topics.map(item=><button type="button" className="pill" aria-pressed={topic===item} key={item} onClick={()=>setTopic(item)}>{item}</button>)}</div><a className="button primary email-button" href={`mailto:${profile.email}?subject=${encodeURIComponent(topic)}`}><Icon name="mail"/> Email {profile.name.split(' ')[0]}</a><div className="email-copy"><span>{profile.email}</span><button type="button" className="icon-button" onClick={copy} aria-label="Copy email address"><Icon name={feedback==='Email copied'?'check':'copy'}/></button></div><p className="copy-feedback" role="status">{feedback}</p><div className="social-links"><ExternalLink href={profile.linkedin}>LinkedIn</ExternalLink><ExternalLink href={profile.github}>GitHub</ExternalLink><a href={asset(profile.resume)} download>Résumé</a></div></Reveal></div></section>
}

export default function App() {
  const preferences = usePreferences()
  const [focus,setFocus] = useState('All work')
  const [project,setProject] = useState(null)
  return <><a className="skip" href="#main">Skip to content</a><Header preferences={preferences}/><main id="main"><Hero setFocus={setFocus}/>{projects.length>0 && <Work focus={focus} setFocus={setFocus} onProject={setProject}/>} {repositories.length>0 && <Repositories/>}{experience.length>0 && <About/>}{skillGroups.length>0 && <Skills onProject={setProject}/>} {highlights.length>0 && <Recognition/>}<Contact/></main><footer className="footer"><div className="container"><span>© {new Date().getFullYear()} {profile.name}</span><span>{profile.location}</span><a href="#top">Back to top</a></div></footer>{project && <Dialog title={project.title} onClose={()=>setProject(null)}><span className="dialog-category">{project.category}</span><p>{project.description}</p>{project.highlights?.length>0 && <ul className="project-highlights">{project.highlights.map(item=><li key={item}>{item}</li>)}</ul>}<h3>Built with</h3><Tags items={project.tags}/>{project.url && <ExternalLink className="button primary" href={project.url}>Explore source code</ExternalLink>}</Dialog>}</>
}
