import { useEffect, useRef, useState } from 'react'

function readPreference(key, fallback) {
  try { return localStorage.getItem(key) || fallback } catch { return fallback }
}
export function usePreferences() {
  const [theme, setTheme] = useState(() => readPreference('portfolio-theme', 'dark'))
  const [paused, setPaused] = useState(() => readPreference('portfolio-motion', 'on') === 'off')
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(media.matches)
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem('portfolio-theme', theme) } catch { /* Storage is optional. */ }
  }, [theme])
  useEffect(() => {
    document.documentElement.dataset.motion = paused || reduced ? 'off' : 'on'
    try { localStorage.setItem('portfolio-motion', paused ? 'off' : 'on') } catch { /* Storage is optional. */ }
  }, [paused, reduced])
  return { theme, toggleTheme: () => setTheme(t => t === 'dark' ? 'light' : 'dark'), motionOff: paused || reduced, reduced, toggleMotion: () => setPaused(p => !p) }
}

export function useScrollSpy(ids) {
  const [active, setActive] = useState('')
  const progressRef = useRef(null)
  useEffect(() => {
    let frame = 0
    const update = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${height > 0 ? Math.min(1, window.scrollY / height) : 0})`
      const current = ids.filter(id => document.getElementById(id)?.getBoundingClientRect().top < window.innerHeight * 0.35).at(-1)
      setActive(current || '')
      frame = 0
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    const observer = 'ResizeObserver' in window ? new ResizeObserver(schedule) : null
    observer?.observe(document.body)
    return () => { window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); observer?.disconnect(); cancelAnimationFrame(frame) }
  }, [ids])
  return { active, progressRef }
}
