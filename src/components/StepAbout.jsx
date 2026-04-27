import useStore from '../store'

const AGENTS = [
  {
    name: 'Transcriber',
    desc: 'Receives the audio and converts the physician\'s voice to text with medical-grade accuracy. Handles multilingual input, mixed-language dictation, and the Latin and Greek terminology that standard speech recognition fails on.',
  },
  {
    name: 'Classifier',
    desc: 'Receives the raw transcript and organises it into structured clinical sections in real time — chief complaint, anamnesis, status, diagnosis, plan. The physician sees their dictation classified and structured as they speak, not after.',
  },
  {
    name: 'Medical NLP',
    desc: 'Receives the classified content and applies specialty-specific clinical intelligence. Colloquial language is converted to correct medical terminology. Diagnoses are mapped to ICD-10 codes — the international standard that operates identically across every market Voxana enters.',
  },
  {
    name: 'Structurer',
    desc: 'Receives the processed clinical content alongside any uploaded supporting documents — lab results, imaging reports, previous records — and fills the physician\'s own template. Only explicitly verified information is used. Every filled field is tagged with its exact source. Fields that cannot be confirmed are left blank.',
  },
  {
    name: 'Validator',
    desc: 'Reviews the structured output before the physician sees it. Flags missing mandatory fields, implausible numeric values, and internal inconsistencies — but does not correct. The physician remains in control of every decision.',
  },
  {
    name: 'Summarizer',
    desc: 'Produces the final approved document in the physician\'s chosen format — structured text, PDF, or clipboard-ready output compatible with existing practice management and EHR systems.',
  },
]

export default function StepAbout({ active }) {
  const setStep      = useStore((s) => s.setStep)
  const setShowAbout = useStore((s) => s.setShowAbout)

  const handleStart = () => {
    setShowAbout(false)
    setStep(1)
  }

  return (
    <div className={`panel about-panel ${active ? 'active' : ''}`} id="p-about">
      <div className="about-hero">
        <div className="about-hero-inner">
          <div className="about-eyebrow">About Voxana</div>
          <h1 className="about-headline">
            Less time on documentation.<br />More time for patient care.
          </h1>
        </div>
      </div>

      <div className="about-body">
        <div className="about-content">

          <p className="about-lead">
            Today, physicians spend 35–50% of their working day on documentation. Primary care
            physicians dedicate approximately 3 hours per day to clinical notes alone, often
            followed by additional work after hours. Nearly half of the office day is spent
            interacting with systems rather than patients.
          </p>

          <p>
            Physicians are trained to treat. Yet a growing portion of their time is spent
            documenting care instead of delivering it.
          </p>

          <p>
            Healthcare systems are under increasing pressure. In Hungary, GPs are responsible
            for nearly 2,000 patients each on average, while the number of practicing physicians
            continues to decline. This is not a local anomaly. Across Central and Eastern Europe,
            Western Europe, and beyond, the same structural imbalance exists in every healthcare
            system that relies on manual clinical documentation.
          </p>

          <div className="about-callout">
            Voxana was built to solve this at scale.
          </div>

          <p>
            The physician dictates short voice clips during or after the consultation. From that
            point, a pipeline of six specialised AI agents takes over — each with a defined role
            and a defined scope.
          </p>

          <div className="about-pipeline">
            {AGENTS.map((a, i) => (
              <div className="about-agent" key={a.name}>
                <div className="about-agent-left">
                  <div className="about-agent-num">{i + 1}</div>
                  {i < AGENTS.length - 1 && <div className="about-agent-line" />}
                </div>
                <div className="about-agent-body">
                  <div className="about-agent-name">{a.name}</div>
                  <p className="about-agent-desc">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p>
            Every agent runs in sequence. Every output is auditable. Audio and transcript are
            deleted the moment the session ends. Nothing is stored. Nothing is submitted without
            physician review and approval.
          </p>

          <p>
            The architecture is built for international scale from the ground up. ICD-10 support
            means the same six-agent pipeline operates in Hungary, Romania, Slovakia, Poland,
            Germany, or any market that uses the international coding standard — which is most
            of the world. Adding a new language requires updating one agent. Adding a new
            specialty requires updating one knowledge base. The marginal cost of serving one
            additional physician anywhere in the world is under one euro per month.
          </p>

          <div className="about-scale">
            <div className="about-scale-item">
              <span className="about-scale-num">25,000</span>
              <span className="about-scale-label">physicians in Hungary</span>
            </div>
            <div className="about-scale-divider" />
            <div className="about-scale-item">
              <span className="about-scale-num">200,000</span>
              <span className="about-scale-label">across Central &amp; Eastern Europe</span>
            </div>
            <div className="about-scale-divider" />
            <div className="about-scale-item">
              <span className="about-scale-num">Millions</span>
              <span className="about-scale-label">globally</span>
            </div>
          </div>

          <p>
            The documentation problem is the same in every country.
          </p>

          <div className="about-closing">
            Less time on documentation. More time where it matters most.
          </div>

          <div className="about-cta-row">
            <button className="btn btn-p about-cta-btn" onClick={handleStart}>
              Get started
              <svg viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
