import useStore from '../../store'
import RecordCard from '../dictation/RecordCard'
import ClipsPanel from '../dictation/ClipsPanel'

export default function StepDictation({ active }) {
  const clips = useStore((s) => s.clips)
  const setStep = useStore((s) => s.setStep)
  const canContinue = clips.length > 0 && clips.some((c) => c.transcript?.length > 5)

  return (
    <div className={`panel ${active ? 'active' : ''}`} id="p2">
      <div className="phead">
        <div className="peyebrow">Step 2 of 4</div>
        <div className="ptitle">Physician dictation</div>
        <div className="psub">Record targeted clips. Transcribed immediately and classified into structured sections in real time.</div>
      </div>
      <div className="pbody">
        <div className="notice notice-plain" style={{ marginBottom: 14 }}>
          <svg viewBox="0 0 14 14"><circle cx="7" cy="7" r="5.5"/><path d="M7 6.5v3" strokeLinecap="round"/><circle cx="7" cy="4.8" r=".6" fill="currentColor" stroke="none"/></svg>
          <span><strong style={{ color: 'var(--text1)' }}>Ptk. 2:48</strong> — Only the physician's voice is recorded. Patient consent not required in this mode.</span>
        </div>
        <div className="dict-layout">
          <RecordCard />
          <ClipsPanel />
        </div>
        <div className="btn-row">
          <button className="btn btn-o" onClick={() => setStep(1)}>Back</button>
          <button className="btn btn-p" disabled={!canContinue} onClick={() => setStep(3)}>Add documents →</button>
        </div>
      </div>
    </div>
  )
}
