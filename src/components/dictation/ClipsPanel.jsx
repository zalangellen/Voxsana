import useStore from '../../store'
import ClipItem from './ClipItem'

export default function ClipsPanel() {
  const clips = useStore((s) => s.clips)

  const totalSecs = clips.reduce((a, c) => a + (c.secs || 0), 0)

  return (
    <div className="clips-panel">
      <div className="clips-head">
        <span className="clips-head-title">Dictation clips</span>
        <span className="clips-badge">{clips.length} {clips.length === 1 ? 'clip' : 'clips'}</span>
      </div>
      <div className="clips-body">
        {clips.length === 0 ? (
          <div className="clips-empty-state">
            <div className="empty-ring">
              <svg viewBox="0 0 20 20"><rect x="6.5" y="2.5" width="7" height="10" rx="3.5"/><path d="M3 10c0 3.9 3.1 7 7 7s7-3.1 7-7" strokeLinecap="round"/><line x1="10" y1="17" x2="10" y2="20" strokeLinecap="round"/></svg>
            </div>
            <div className="empty-title">No clips recorded yet</div>
            <div className="empty-desc">Press the microphone and dictate.<br />Each clip is transcribed and classified automatically.</div>
          </div>
        ) : (
          <div className="clips-list">
            {clips.map((clip, i) => <ClipItem key={clip.id} clip={clip} index={i} />)}
          </div>
        )}
      </div>
      {clips.length > 0 && (
        <div className="clips-foot">
          Total: <b>{totalSecs}</b> sec recorded
        </div>
      )}
    </div>
  )
}
