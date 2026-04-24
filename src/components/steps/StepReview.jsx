import { useState } from 'react'
import useStore from '../../store'
import DocField from '../review/DocField'
import VoiceEdit from '../review/VoiceEdit'
import { exportAs } from '../../utils/export'

const PIPELINE_STAGES = ['Merge clips', 'Convert terminology', 'Structure context', 'Fill template', 'Attribute sources']

export default function StepReview({ active }) {
  const isProcessing = useStore((s) => s.isProcessing)
  const showReview = useStore((s) => s.showReview)
  const parsedFields = useStore((s) => s.parsedFields)
  const srcMap = useStore((s) => s.srcMap)
  const approved = useStore((s) => s.approved)
  const approveDoc = useStore((s) => s.approveDoc)
  const resetApproved = useStore((s) => s.resetApproved)

  const fields = parsedFields?.fields || []
  const exportFields = fields.map((f) => ({
    ...f,
    sourceLabel: srcMap?.[f.source]?.label || f.source || '',
  }))

  const handleApprove = () => {
    approveDoc()
  }

  return (
    <div className={`panel ${active ? 'active' : ''}`} id="p4">
      <div className="phead">
        <div className="peyebrow">Step 4 of 4</div>
        <div className="ptitle">Review &amp; approve</div>
        <div className="psub">Each field shows its source. Click to edit. Use voice commands for quick changes. Regenerate individual fields without affecting validated content.</div>
      </div>
      <div className="pbody">
        {isProcessing && (
          <div className="proc-card on">
            <div className="spinner" />
            <div className="proc-title">Processing dictation</div>
            <div className="proc-sub">Filling template...</div>
            <div className="pipeline">
              {PIPELINE_STAGES.map((s, i) => (
                <span key={s}><div className="ps active">{s}</div>{i < PIPELINE_STAGES.length - 1 && <div className="pa">›</div>}</span>
              ))}
            </div>
          </div>
        )}

        {showReview && !isProcessing && (
          <>
            {/* Source legend */}
            <div className="src-legend">
              <span className="legend-label">Sources:</span>
              {srcMap && Object.entries(srcMap).map(([k, s]) => (
                <span key={k} className={`src-tag ${s.cls}`}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: s.color, display: 'inline-block', flexShrink: 0 }} />
                  {s.label}
                </span>
              ))}
              <span className="src-tag src-empty">Not mentioned</span>
            </div>

            <div className="rev-layout">
              {/* Sources panel */}
              <div>
                <div className="rc-title">Sources</div>
                <div className="src-list">
                  {srcMap && Object.entries(srcMap).map(([k, s]) => (
                    <div key={k} className="src-card">
                      <div className="src-card-hdr">
                        <div className="src-dot" style={{ background: s.color }} />
                        <div className="src-name">{s.label}</div>
                        <div className="src-type">{k === 'dictation' ? 'Voice clips' : 'Document'}</div>
                      </div>
                      <div className="src-body">{s.preview}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Filled document */}
              <div>
                <div className="rc-title">Filled template</div>
                <div className="filled-doc">
                  {fields.map((f, i) => (
                    <DocField key={`${f.label}-${i}`} field={f} index={i} srcMap={srcMap || {}} />
                  ))}
                </div>
                <VoiceEdit />
              </div>
            </div>

            {/* Export row */}
            <div className="export-row">
              <span className="export-label">Export</span>
              <button className="export-btn" onClick={() => exportAs('clipboard', exportFields)}>
                <svg viewBox="0 0 14 14"><rect x="5" y="5" width="8" height="8" rx="1.5"/><path d="M9 5V3.5A1.5 1.5 0 0 0 7.5 2H3.5A1.5 1.5 0 0 0 2 3.5v5A1.5 1.5 0 0 0 3.5 10H5" strokeLinecap="round"/></svg>
                Clipboard
              </button>
              <button className="export-btn" onClick={() => exportAs('txt', exportFields)}>
                <svg viewBox="0 0 14 14"><rect x="2" y="1" width="10" height="12" rx="2"/><path d="M4.5 5h5M4.5 7.5h5M4.5 10h3" strokeLinecap="round"/></svg>
                Plain text
              </button>
              <button className="export-btn" onClick={() => exportAs('pdf', exportFields)}>
                <svg viewBox="0 0 14 14"><rect x="2" y="1" width="10" height="12" rx="2"/><path d="M4.5 5h5M4.5 7.5h5M4.5 10h3" strokeLinecap="round"/></svg>
                PDF
              </button>
              <div style={{ marginLeft: 'auto' }}>
                <button className="btn btn-g btn-sm" onClick={handleApprove}>Approve &amp; save</button>
              </div>
            </div>

            {approved && (
              <div className="success-banner on">
                <svg viewBox="0 0 14 14"><circle cx="7" cy="7" r="5.5"/><path d="M4.5 7l2 2 3-3.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Document approved. Session data deleted. Ready for next patient.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
