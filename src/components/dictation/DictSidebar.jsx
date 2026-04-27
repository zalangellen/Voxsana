import useStore from '../../store'

const TIPS = [
  { icon: <svg viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5"/><path d="M5 7l1.5 1.5L9.5 5" strokeLinecap="round" strokeLinejoin="round"/></svg>, text: 'Speak clearly and at a natural pace' },
  { icon: <svg viewBox="0 0 14 14" fill="none"><rect x="2" y="2" width="10" height="10" rx="2"/><path d="M4.5 5h5M4.5 7h3" strokeLinecap="round"/></svg>, text: 'Include relevant clinical details' },
  { icon: <svg viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5"/><path d="M7 4.5v3" strokeLinecap="round"/><circle cx="7" cy="9.2" r=".6" fill="currentColor" stroke="none"/></svg>, text: 'Take a short pause between topics' },
  { icon: <svg viewBox="0 0 14 14" fill="none"><path d="M2 10l3-3 2 2 5-5" strokeLinecap="round" strokeLinejoin="round"/></svg>, text: 'You can edit everything in the review step' },
]

const AGENTS = [
  { icon: <svg viewBox="0 0 14 14" fill="none"><rect x="4" y="2" width="4" height="7" rx="2"/><path d="M2.5 7c0 2.5 2 4 4.5 4s4.5-1.5 4.5-4" strokeLinecap="round"/></svg>, label: 'Transcriber', idle: 'Ready', active: 'Listening...' },
  { icon: <svg viewBox="0 0 14 14" fill="none"><path d="M2 3h10M2 6h7M2 9h4" strokeLinecap="round"/></svg>, label: 'Classifier', idle: 'Standby', active: 'Analyzing...' },
  { icon: <svg viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5"/><path d="M4.5 7c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5" strokeLinecap="round"/></svg>, label: 'Medical NLP', idle: 'Standby', active: 'Extracting...' },
  { icon: <svg viewBox="0 0 14 14" fill="none"><rect x="2" y="2" width="4" height="4" rx="1"/><rect x="8" y="2" width="4" height="4" rx="1"/><rect x="2" y="8" width="4" height="4" rx="1"/><rect x="8" y="8" width="4" height="4" rx="1"/></svg>, label: 'Structurer', idle: 'Standby', active: 'Organizing...' },
  { icon: <svg viewBox="0 0 14 14" fill="none"><path d="M7 2l1.5 3.5H12L9.5 7.5l1 3.5L7 9l-3.5 2 1-3.5L2 5.5h3.5z" strokeLinejoin="round"/></svg>, label: 'Validator', idle: 'Standby', active: 'Checking...' },
  { icon: <svg viewBox="0 0 14 14" fill="none"><rect x="2.5" y="1.5" width="9" height="11" rx="1.5"/><path d="M4.5 5h5M4.5 7h5M4.5 9h3" strokeLinecap="round"/></svg>, label: 'Summarizer', idle: 'Standby', active: 'Preparing...' },
]

export default function DictSidebar() {
  const isRec = useStore((s) => s.isRec)

  return (
    <div className="dict-sidebar">
      <div className="dsb-section">
        <div className="dsb-title">Tips for better results</div>
        <div className="dsb-tips">
          {TIPS.map((t, i) => (
            <div className="dsb-tip" key={i}>
              <span className="dsb-tip-icon">{t.icon}</span>
              <span className="dsb-tip-text">{t.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="dsb-section">
        <div className="dsb-title">AI agents at work</div>
        <div className="dsb-agents">
          {AGENTS.map((a, i) => (
            <div className="dsb-agent" key={i}>
              <span className="dsb-agent-icon">{a.icon}</span>
              <div className="dsb-agent-info">
                <span className="dsb-agent-label">{a.label}</span>
                <span className={`dsb-agent-status ${isRec ? 'active' : ''}`}>
                  {isRec ? a.active : a.idle}
                </span>
              </div>
              {isRec && <span className="dsb-agent-dot" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
