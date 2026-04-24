import { useTheme } from '../hooks/useTheme'
import useStore from '../store'
import { SPEC_NAMES } from '../constants.jsx'

export default function Topbar() {
  const { toggle } = useTheme()
  const specialty = useStore((s) => s.specialty)

  return (
    <header className="topbar">
      <span className="logo-name">Vox<b>ana</b></span>
      <div className="topbar-sep" />
      <span className="topbar-session">Medical documentation</span>
      <div className="topbar-right">
        <div className={`spec-pill ${specialty ? 'on' : ''}`}>
          <div className="spec-pill-dot" />
          <span>{specialty ? SPEC_NAMES[specialty] : ''}</span>
        </div>
        <button className="theme-btn" onClick={toggle} aria-label="Toggle theme">
          <svg className="icon-sun" viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="3.5"/>
            <path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3.22 3.22l1.06 1.06M11.72 11.72l1.06 1.06M3.22 12.78l1.06-1.06M11.72 4.28l1.06-1.06" strokeLinecap="round"/>
          </svg>
          <svg className="icon-moon" viewBox="0 0 16 16">
            <path d="M13.5 9.5A6 6 0 0 1 6 2a6 6 0 1 0 7.5 7.5z"/>
          </svg>
        </button>
      </div>
    </header>
  )
}
