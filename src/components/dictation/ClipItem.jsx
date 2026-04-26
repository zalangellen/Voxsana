import { useRef } from 'react'
import useStore from '../../store'
import { CATS, CAT_COLORS } from '../../constants.jsx'

export default function ClipItem({ clip, index }) {
  const updateClip = useStore((s) => s.updateClip)
  const removeClip = useStore((s) => s.removeClip)
  const activeClipId = useStore((s) => s.activeClipId)
  const isLive = clip.id === activeClipId
  const txRef = useRef(null)

  const handleCatChange = (e) => updateClip(clip.id, { category: e.target.value })
  const handleTranscriptBlur = () => {
    if (txRef.current) updateClip(clip.id, { transcript: txRef.current.textContent.trim() })
  }

  return (
    <div className={`clip-item ${isLive ? 'recording-now' : ''}`}>
      <div className="clip-item-hdr">
        <div className="clip-num">{index + 1}</div>
        <select className="clip-cat-select" value={clip.category} onChange={handleCatChange}>
          {CATS.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <span className="clip-time">
          {clip.timestamp}{clip.secs ? ` · ${clip.secs}s` : ''}
        </span>
        <span className="clip-rm" onClick={() => removeClip(clip.id)}>
          <svg viewBox="0 0 10 10"><path d="M2 2l6 6M8 2l-6 6" strokeLinecap="round"/></svg>
        </span>
      </div>
      {clip.isCorrecting ? (
        <div className="clip-correcting">
          <svg viewBox="0 0 16 16" fill="none" className="clip-correcting-spin">
            <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" strokeDasharray="28" strokeDashoffset="10" strokeLinecap="round"/>
          </svg>
          Correcting with AI…
        </div>
      ) : (
        <div
          ref={txRef}
          className={`clip-transcript ${isLive ? 'live' : ''}`}
          contentEditable
          suppressContentEditableWarning
          onBlur={handleTranscriptBlur}
          dangerouslySetInnerHTML={{ __html: clip.transcript || (isLive ? 'Listening...' : '') }}
        />
      )}
      <div className="clip-edit-hint">{clip.isCorrecting ? '' : 'Click to edit transcript'}</div>
    </div>
  )
}
