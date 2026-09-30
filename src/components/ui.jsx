import { useEffect, useRef, useState } from 'react'

export function Icon({ name, size = 20, ...props }) {
  const paths = {
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></>,
    moon: <path d="M20.5 14.5A9 9 0 0 1 9.5 3.5a9 9 0 1 0 11 11Z"/>,
    pause: <path d="M8 5v14M16 5v14"/>,
    play: <path d="m8 5 11 7-11 7Z"/>,
    close: <path d="m6 6 12 12M6 18 18 6"/>,
    menu: <path d="M4 6h16M4 12h16M4 18h16"/>,
    search: <><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></>,
    code: <path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-13-2 16"/>,
    copy: <><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V4H4v12h4"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    plus: <path d="M12 5v14M5 12h14"/>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/></>,
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name] || paths.code}</svg>
}

export function ExternalLink({ href, children, className = '' }) {
  return <a href={href} className={className} target="_blank" rel="noopener noreferrer">{children}<span className="sr-only"> (opens a new tab)</span></a>
}

export function Reveal({ children, className = '', as: Tag = 'div', ...props }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (!('IntersectionObserver' in window)) { setVisible(true); return }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect() }
    }, { threshold: 0.05 })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return <Tag ref={ref} className={`reveal ${visible ? 'visible' : ''} ${className}`} {...props}>{children}</Tag>
}

export function SectionHead({ kicker, title, intro, number }) {
  return <Reveal className="section-head"><div><span className="eyebrow">{number && <span className="section-number">{number}</span>}{kicker}</span><h2>{title}</h2></div>{intro && <p>{intro}</p>}</Reveal>
}

export function Tags({ items = [] }) {
  return <div className="tags">{items.map(item => <span key={item}>{item}</span>)}</div>
}

export function Dialog({ children, title, onClose }) {
  const ref = useRef(null)
  useEffect(() => {
    const dialog = ref.current
    const previousOverflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => { dialog.close(); document.body.style.overflow = previousOverflow }
  }, [])
  return <dialog ref={ref} className="project-dialog" aria-labelledby="dialog-title" onCancel={event => { event.preventDefault(); onClose() }}
    onClick={event => { if (event.target === ref.current) { const r=ref.current.getBoundingClientRect(); if(event.clientX<r.left || event.clientX>r.right || event.clientY<r.top || event.clientY>r.bottom) onClose() } }}>
    <button type="button" className="icon-button dialog-close" aria-label="Close project details" onClick={onClose} autoFocus><Icon name="close"/></button>
    <div className="eyebrow">Project notes</div><h2 id="dialog-title">{title}</h2>{children}
  </dialog>
}

export function spotlight(event) {
  if (event.pointerType === 'touch') return
  const rect = event.currentTarget.getBoundingClientRect()
  event.currentTarget.style.setProperty('--px', `${event.clientX - rect.left}px`)
  event.currentTarget.style.setProperty('--py', `${event.clientY - rect.top}px`)
}
