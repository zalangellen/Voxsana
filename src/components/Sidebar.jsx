import useStore from '../store'

const STEPS = [
  { n: 1, label: 'Specialty',  desc: 'Select documentation mode' },
  { n: 2, label: 'Dictation',  desc: 'Record key details' },
  { n: 3, label: 'Documents',  desc: 'Upload supporting files' },
  { n: 4, label: 'Review',     desc: 'Validate and export' },
]

export default function Sidebar() {
  const step      = useStore((s) => s.step)
  const setStep   = useStore((s) => s.setStep)
  const showAbout = useStore((s) => s.showAbout)
  const setShowAbout = useStore((s) => s.setShowAbout)

  const getState = (n) => {
    if (n < step) return 'completed'
    if (n === step) return 'active'
    return 'upcoming'
  }

  return (
    <aside className="sidebar">

      {/* ── Progress tracker ── */}
      <div className="sb-tracker">
        <div className="sb-tracker-label">Workflow</div>

        <div className="sb-steps">
          {STEPS.map((s, i) => {
            const state  = getState(s.n)
            const isLast = i === STEPS.length - 1
            return (
              <div
                key={s.n}
                className={`sb-step sb-step--${state}`}
                onClick={() => setStep(s.n)}
                title={`Go to ${s.label}`}
              >
                <div className="sb-step-left">
                  <div className="sb-step-dot">
                    {state === 'completed'
                      ? <svg viewBox="0 0 10 10" fill="none">
                          <path d="M2 5l2 2 4-4" stroke="currentColor" strokeWidth="1.8"
                            strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      : s.n
                    }
                  </div>
                  {!isLast && <div className="sb-step-line" />}
                </div>
                <div className="sb-step-content">
                  <div className="sb-step-name">{s.label}</div>
                  <div className="sb-step-desc">{s.desc}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── About link ── */}
      <div className="sb-bottom">
        <button
          className={`sb-about-btn${showAbout ? ' active' : ''}`}
          onClick={() => setShowAbout(!showAbout)}
        >
          <svg viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.4"/>
            <path d="M7 6.5v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            <circle cx="7" cy="4.8" r=".6" fill="currentColor" stroke="none"/>
          </svg>
          About Voxana
        </button>
      </div>

    </aside>
  )
}
