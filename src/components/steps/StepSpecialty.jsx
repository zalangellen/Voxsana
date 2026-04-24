import useStore from '../../store'
import { SPECIALTIES } from '../../constants.jsx'

export default function StepSpecialty({ active }) {
  const specialty = useStore((s) => s.specialty)
  const setSpecialty = useStore((s) => s.setSpecialty)
  const setStep = useStore((s) => s.setStep)

  return (
    <div className={`panel ${active ? 'active' : ''}`} id="p1">
      <div className="phead">
        <div className="peyebrow">Step 1 of 4</div>
        <div className="ptitle">Select your specialty</div>
        <div className="psub">Loads the specialty-specific knowledge base, BNO-10 codes, and clinical terminology for accurate documentation.</div>
      </div>
      <div className="pbody">
        <div className="spec-grid">
          {SPECIALTIES.map(({ key, name, desc, icon }) => (
            <div
              key={key}
              className={`specialty-card ${specialty === key ? 'selected' : ''}`}
              onClick={() => setSpecialty(key)}
            >
              <div className="spec-icon">{icon}</div>
              <div className="spec-name">{name}</div>
              <div className="spec-desc">{desc}</div>
            </div>
          ))}
        </div>
        <div className="spec-more-notice">
          <svg viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.3"/>
            <path d="M7 4.5v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            <circle cx="7" cy="9.2" r=".55" fill="currentColor" stroke="none"/>
          </svg>
          More specialties — including Internal Medicine, Paediatrics, Pulmonology, and others — are currently in development and will be added soon.
        </div>
        <div className="btn-row" style={{ justifyContent: 'flex-start' }}>
          <button className="btn btn-p" disabled={!specialty} onClick={() => setStep(2)}>
            Continue to dictation →
          </button>
        </div>
      </div>
    </div>
  )
}
