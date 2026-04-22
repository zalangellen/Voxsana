import { useRef, useEffect, useCallback } from 'react'
import useStore from '../../store'
import { CATS } from '../../constants.jsx'
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition'
import LiveSections from './LiveSections'

export default function RecordCard() {
  const isRec = useStore((s) => s.isRec)
  const secs = useStore((s) => s.secs)
  const currentCat = useStore((s) => s.currentCat)
  const activeClipId = useStore((s) => s.activeClipId)
  const clips = useStore((s) => s.clips)

  const setIsRec = useStore((s) => s.setIsRec)
  const setSecs = useStore((s) => s.setSecs)
  const setActiveClipId = useStore((s) => s.setActiveClipId)
  const setCurrentCat = useStore((s) => s.setCurrentCat)
  const addClip = useStore((s) => s.addClip)
  const updateClip = useStore((s) => s.updateClip)

  const timerRef = useRef(null)
  const mediaRecRef = useRef(null)
  const secsRef = useRef(0)
  const activeIdRef = useRef(null)

  const { start: startSR, stop: stopSR } = useSpeechRecognition({
    lang: 'hu-HU',
    onResult: ({ final, interim }) => {
      if (!activeIdRef.current) return
      updateClip(activeIdRef.current, { transcript: final || interim || '' })
    },
    onError: () => {
      if (activeIdRef.current) updateClip(activeIdRef.current, { transcript: '[Speech recognition error — please type below]' })
    },
  })

  const startRec = useCallback(() => {
    const clipId = Date.now()
    activeIdRef.current = clipId
    const clip = {
      id: clipId,
      category: currentCat,
      transcript: '',
      secs: 0,
      timestamp: new Date().toLocaleTimeString('hu-HU', { hour: '2-digit', minute: '2-digit' }),
    }
    addClip(clip)
    setActiveClipId(clipId)
    startSR()

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mr = new MediaRecorder(stream)
      mr.onstop = () => stream.getTracks().forEach((t) => t.stop())
      mr.start()
      mediaRecRef.current = mr
    }).catch(() => {})

    setIsRec(true)
    secsRef.current = 0
    setSecs(0)
    timerRef.current = setInterval(() => {
      secsRef.current++
      setSecs(secsRef.current)
      if (activeIdRef.current) updateClip(activeIdRef.current, { secs: secsRef.current })
    }, 1000)
  }, [currentCat, addClip, setActiveClipId, setIsRec, setSecs, updateClip, startSR])

  const stopRec = useCallback(() => {
    stopSR()
    if (mediaRecRef.current?.state !== 'inactive') mediaRecRef.current?.stop()
    clearInterval(timerRef.current)
    setIsRec(false)
    setActiveClipId(null)
    activeIdRef.current = null
  }, [stopSR, setIsRec, setActiveClipId])

  useEffect(() => () => clearInterval(timerRef.current), [])

  const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
  const hasClips = clips.length > 0 && clips.some((c) => c.transcript?.length > 5)

  return (
    <div className="rec-card">
      <div className="card-title">Record a clip</div>
      <div className="card-desc">Press and dictate. VoxSana classifies each clip into the correct section as you speak.</div>

      <div className="rec-stage">
        <button className={`rec-btn-main ${isRec ? 'rec' : ''}`} onClick={isRec ? stopRec : startRec}>
          <svg id="mic-ic" viewBox="0 0 26 26" fill="none" style={{ display: isRec ? 'none' : 'block', stroke: 'var(--blue)', strokeWidth: 1.6 }}>
            <rect x="8.5" y="3" width="9" height="13" rx="4.5"/>
            <path d="M5 13c0 4.4 3.6 8 8 8s8-3.6 8-8" strokeLinecap="round"/>
            <line x1="13" y1="21" x2="13" y2="24" strokeLinecap="round"/>
            <line x1="9.5" y1="24" x2="16.5" y2="24" strokeLinecap="round"/>
          </svg>
          <svg viewBox="0 0 26 26" fill="none" style={{ display: isRec ? 'block' : 'none' }}>
            <rect x="9" y="9" width="8" height="8" rx="2" fill="var(--red)"/>
          </svg>
        </button>
        <div className="rec-readout">
          {isRec && <div className="rec-timer show">{fmt(secs)}</div>}
          <div className="rec-status-text">
            {isRec ? `Recording clip #${clips.length}...` : 'Press to begin recording'}
          </div>
        </div>
      </div>

      <div className={`waveform ${isRec ? 'on' : ''}`}>
        {[4, 10, 16, 7, 20, 12, 14, 8, 12].map((h, i) => (
          <div key={i} className="wb" style={{ height: h }} />
        ))}
      </div>

      <div style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--text4)', marginBottom: 7 }}>
        Real-time classification
      </div>
      <LiveSections />

      <div style={{ marginTop: 16, padding: '10px 12px', background: 'var(--amber-l)', border: '1px solid rgba(217,119,6,.25)', borderRadius: 'var(--r)', display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12, color: 'var(--text2)', lineHeight: 1.5 }}>
        <svg viewBox="0 0 14 14" width="13" height="13" fill="none" style={{ flexShrink: 0, marginTop: 1, stroke: 'var(--amber)', strokeWidth: 1.4 }}>
          <circle cx="7" cy="7" r="5.5"/><path d="M7 4.5v3" strokeLinecap="round"/><circle cx="7" cy="9.2" r=".6" fill="currentColor" stroke="none"/>
        </svg>
        <span>Make sure to use quality microphone. It significantly improves recognition accuracy.</span>
      </div>

      <div className="clip-cat-section" style={{ marginTop: 14 }}>
        <div className="clip-cat-title">Manual tag override</div>
        <div className="clip-cat-tags">
          {CATS.map((cat) => (
            <span key={cat} className={`cat-tag ${currentCat === cat ? 'active' : ''}`} onClick={() => setCurrentCat(cat)}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
