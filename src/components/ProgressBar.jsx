import useStore from '../store'

export default function ProgressBar() {
  const step      = useStore((s) => s.step)
  const showAbout = useStore((s) => s.showAbout)

  const pct = showAbout ? 0 : (step / 4) * 100

  return (
    <div className="prog-track" aria-hidden="true">
      <div className="prog-fill" style={{ width: `${pct}%` }}>
        <div className="prog-glow" />
      </div>
    </div>
  )
}
