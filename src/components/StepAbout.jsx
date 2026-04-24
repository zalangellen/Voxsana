import useStore from '../store'

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
            Today, physicians spend a substantial portion of their working day on documentation
            and administrative tasks. Studies show that 35–50% of a physician's time is consumed
            by documentation, with nearly half of the office day spent interacting with electronic
            systems rather than patients. In primary care, this often means around 3 hours per day
            dedicated to documentation — often followed by additional work outside clinical hours.
          </p>

          <p>
            This shift has fundamentally changed the nature of medical practice.
            Physicians are trained to treat patients — yet a significant part of their time is
            spent documenting care instead of delivering it.
          </p>

          <p>
            Healthcare systems are under increasing pressure. In Hungary, for example, general
            practitioners are responsible for nearly 2,000 patients each on average, while the
            number of practicing physicians continues to decline.
          </p>

          <div className="about-callout">
            Every hour spent on documentation is an hour not spent with patients. Yet documentation
            itself remains essential. The challenge is not to eliminate it, but to rethink how it
            is created.
          </div>

          <p>
            Voxana was built in response to this imbalance. Its goal is simple: to reduce the
            time physicians spend documenting, without compromising accuracy, control, or clinical
            integrity.
          </p>

          <p>
            By enabling faster, more structured documentation workflows, even modest improvements —
            such as saving 2 hours per day — can translate into meaningful impact: more time for
            patient care, reduced administrative strain, and increased capacity within existing
            healthcare systems.
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
