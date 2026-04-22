import { useRef, useState } from 'react'
import useStore from '../../store'
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition'
import { applyVoiceCorrection } from '../../utils/api'

const EXAMPLES = ['"Change age to 54"', '"Set BP to 140/90"', '"Add allergy: penicillin"', '"Remove medication section"']

export default function VoiceEdit() {
  const [command, setCommand] = useState('')
  const [status, setStatus] = useState('Press to record a command')
  const [applying, setApplying] = useState(false)
  const [secs, setSecs] = useState(0)
  const isVeRec = useStore((s) => s.isVeRec)
  const setIsVeRec = useStore((s) => s.setIsVeRec)
  const parsedFields = useStore((s) => s.parsedFields)
  const specialty = useStore((s) => s.specialty)
  const updateField = useStore((s) => s.updateField)

  const timerRef = useRef(null)
  const secsRef = useRef(0)

  const { start: startSR, stop: stopSR } = useSpeechRecognition({
    onResult: ({ final, interim }) => setCommand(final + interim),
  })

  const startVe = () => {
    startSR()
    setIsVeRec(true)
    secsRef.current = 0
    timerRef.current = setInterval(() => { secsRef.current++; setSecs(secsRef.current) }, 1000)
    setStatus('Recording correction...')
  }

  const stopVe = () => {
    stopSR()
    clearInterval(timerRef.current)
    setIsVeRec(false)
    setSecs(0)
    setStatus('Correction recorded. Apply below.')
  }

  const applyCmd = async () => {
    if (!command.trim() || !parsedFields?.fields) return
    setApplying(true)
    try {
      const fields = parsedFields.fields.map((f) => ({ label: f.label, value: f.value }))
      const result = await applyVoiceCorrection({ instruction: command, fields, specialty })
      const updates = result?.updates || []
      updates.forEach((u) => {
        const i = parsedFields.fields.findIndex((f) => f.label === u.label)
        if (i !== -1) updateField(i, { value: u.new_value })
      })
      setCommand('')
      setStatus(updates.length > 0 ? `${updates.length} field${updates.length > 1 ? 's' : ''} updated.` : 'No matching fields found.')
    } catch {
      setStatus('Error. Please try again.')
    }
    setApplying(false)
  }

  const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

  return (
    <div className="ve-section">
      <div className="ve-title">Voice command editing</div>
      <div className="ve-desc">Dictate a precise edit instruction. System interprets safe, explicit commands only.</div>
      <div className="ve-row">
        <button className={`ve-rec-btn ${isVeRec ? 'rec' : ''}`} onClick={isVeRec ? stopVe : startVe}>
          <svg viewBox="0 0 16 16" fill="none" style={{ display: isVeRec ? 'none' : 'block', stroke: 'var(--text2)' }}>
            <rect x="5" y="1" width="6" height="9" rx="3"/><path d="M2 8c0 3.3 2.7 6 6 6s6-2.7 6-6" strokeLinecap="round"/><line x1="8" y1="14" x2="8" y2="16" strokeLinecap="round"/>
          </svg>
          <svg viewBox="0 0 16 16" fill="none" style={{ display: isVeRec ? 'block' : 'none' }}>
            <rect x="5" y="5" width="6" height="6" rx="1.5" fill="var(--red)"/>
          </svg>
        </button>
        <div>
          {isVeRec && <div className="ve-timer show">{fmt(secs)}</div>}
          <div className="ve-status">{status}</div>
        </div>
      </div>
      <textarea
        className="ve-tx"
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        placeholder="e.g. 'Change blood pressure to 140/90' · 'Remove medication section' · 'Change age to 54'"
      />
      <div className="cmd-examples">
        {EXAMPLES.map((ex) => (
          <span key={ex} className="cmd-ex" onClick={() => setCommand(ex)}>{ex}</span>
        ))}
      </div>
      <div style={{ marginTop: 10 }}>
        <button className="btn btn-sm btn-o" disabled={applying || !command.trim()} onClick={applyCmd}>
          {applying ? 'Applying...' : 'Apply command'}
        </button>
      </div>
    </div>
  )
}
