import useStore from '../../store'

const SECTIONS = [
  { key: 'complaint', label: 'Chief complaint', color: 'var(--red)' },
  { key: 'anamnesis', label: 'Anamnesis', color: 'var(--amber)' },
  { key: 'status', label: 'Status', color: 'var(--blue)' },
  { key: 'diagnosis', label: 'Diagnosis', color: 'var(--purple)' },
  { key: 'plan', label: 'Plan / Rx', color: 'var(--green)' },
]

export default function LiveSections() {
  const clips = useStore((s) => s.clips)
  const isRec = useStore((s) => s.isRec)
  const currentCat = useStore((s) => s.currentCat)

  const grouped = SECTIONS.reduce((acc, { key }) => {
    acc[key] = clips.filter((c) => c.category === key)
    return acc
  }, {})

  return (
    <div className="live-sections">
      {SECTIONS.map(({ key, label, color }) => {
        const items = grouped[key]
        const isActive = isRec && currentCat === key
        const hasContent = items.length > 0
        const preview = items.map((c) => c.transcript).filter(Boolean).join(' · ')
        return (
          <div
            key={key}
            className={`live-section ${hasContent ? 'has-content' : ''} ${isActive ? 'recording-section' : ''}`}
          >
            <div className="ls-header">
              <div className="ls-dot" style={{ background: color }} />
              <div className="ls-label">{label}</div>
              <div className="ls-count">{items.length} {items.length === 1 ? 'clip' : 'clips'}</div>
            </div>
            <div className={`ls-content ${hasContent ? 'active-text' : ''}`}>
              {hasContent ? preview.substring(0, 120) + (preview.length > 120 ? '...' : '') : 'Waiting for dictation...'}
            </div>
          </div>
        )
      })}
    </div>
  )
}
