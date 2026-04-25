import useStore from '../store'

const STATS = [
  { value: '3×', label: 'more patients\ndocumented per day' },
  { value: '80%', label: 'less time spent\non administration' },
  { value: '2 min', label: 'average note\ncompletion time' },
  { value: '0', label: 'patient data\nstored or retained' },
]

export default function Landing() {
  const showLanding = useStore((s) => s.showLanding)
  const setShowLanding = useStore((s) => s.setShowLanding)

  if (!showLanding) return null

  return (
    <div className="landing">
      <div className="landing-inner">
        <p className="landing-eyebrow">AI-powered medical documentation</p>

        <h1 className="landing-logo">Voxana</h1>

        <p className="landing-sub">
          Dictate. Upload. Done. Your notes, filled in seconds.
        </p>

        <div className="landing-stats">
          {STATS.map((s) => (
            <div className="landing-stat" key={s.value}>
              <span className="landing-stat-value">{s.value}</span>
              <span className="landing-stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        <button
          className="landing-btn"
          onClick={() => setShowLanding(false)}
        >
          Start Session
        </button>

        <p className="landing-note">No sign-in required · Nothing is stored</p>
      </div>
    </div>
  )
}
