import useStore from '../store'
import { SPEC_NAMES } from '../constants.jsx'
import { exportAs } from '../utils/export'

export default function Sidebar() {
  const step = useStore((s) => s.step)
  const specialty = useStore((s) => s.specialty)
  const clips = useStore((s) => s.clips)
  const pFiles = useStore((s) => s.pFiles)
  const parsedFields = useStore((s) => s.parsedFields)
  const setSpecialty = useStore((s) => s.setSpecialty)
  const setStep = useStore((s) => s.setStep)
  const approveDoc = useStore((s) => s.approveDoc)

  const exportFields = () => {
    if (!parsedFields?.fields) return []
    return parsedFields.fields.map((f) => ({ ...f, sourceLabel: f.source || '' }))
  }

  const navItems = [
    { n: 1, id: 'nav-specialty', label: 'Specialty', badge: specialty ? (SPEC_NAMES[specialty] || '').split(' ')[0] : '—', icon: <svg viewBox="0 0 16 16"><circle cx="8" cy="5" r="2.5"/><path d="M2 13.5c0-2.8 2.7-5 6-5s6 2.2 6 5" strokeLinecap="round"/></svg> },
    { n: 2, id: 'nav-dictation', label: 'Dictation', badge: clips.length, icon: <svg viewBox="0 0 16 16"><rect x="5.5" y="2" width="5" height="8" rx="2.5"/><path d="M3 8c0 2.8 2.2 5 5 5s5-2.2 5-5" strokeLinecap="round"/><line x1="8" y1="13" x2="8" y2="15" strokeLinecap="round"/></svg> },
    { n: 3, id: 'nav-documents', label: 'Documents', badge: pFiles.length, icon: <svg viewBox="0 0 16 16"><rect x="3" y="2" width="10" height="12" rx="2"/><path d="M5.5 6h5M5.5 9h3.5" strokeLinecap="round"/></svg> },
    { n: 4, id: 'nav-review', label: 'Review', badge: parsedFields ? 'Ready' : '—', icon: <svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="6"/><path d="M5.5 8l2 2 3.5-4" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  ]

  return (
    <aside className="sidebar">
      <div className="sb-inner">
        <div className="sb-label">Session</div>
        {navItems.map(({ n, label, badge, icon }) => (
          <button key={n} className={`nav-item ${step === n ? 'active' : ''}`} onClick={() => setStep(n)}>
            {icon}{label}
            <span className="nav-badge">{badge}</span>
          </button>
        ))}
      </div>
      <div className="sb-div" />
      <div className="sb-sel-wrap">
        <label className="sb-sel-label" htmlFor="sb-spec">Active specialty</label>
        <select className="sb-sel" id="sb-spec" value={specialty || ''} onChange={(e) => setSpecialty(e.target.value || null)}>
          <option value="">Select specialty</option>
          {Object.entries(SPEC_NAMES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
      </div>
      <div className="sb-div" />
      <div className="sb-actions">
        <div className="sb-label">Actions</div>
        <button className="nav-item" onClick={() => exportAs('clipboard', exportFields())}>
          <svg viewBox="0 0 16 16"><rect x="5" y="5" width="9" height="9" rx="1.5"/><path d="M11 5V3.5A1.5 1.5 0 0 0 9.5 2H3.5A1.5 1.5 0 0 0 2 3.5v6A1.5 1.5 0 0 0 3.5 11H5" strokeLinecap="round"/></svg>
          Copy to clipboard
        </button>
        <button className="nav-item" onClick={() => exportAs('txt', exportFields())}>
          <svg viewBox="0 0 16 16"><path d="M8 2v7M5.5 6.5L8 9l2.5-2.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M2.5 11v1.5a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V11" strokeLinecap="round"/></svg>
          Download .txt
        </button>
        <button className="nav-item" onClick={() => exportAs('pdf', exportFields())}>
          <svg viewBox="0 0 16 16"><rect x="2" y="1" width="12" height="14" rx="2"/><path d="M5 5.5h6M5 8h6M5 10.5h4" strokeLinecap="round"/></svg>
          Export PDF
        </button>
        <button className="nav-item" onClick={approveDoc}>
          <svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="6"/><path d="M5.5 8l2 2 3.5-4" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Approve &amp; save
        </button>
      </div>
    </aside>
  )
}
