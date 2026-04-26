import useStore from '../../store'
import DropZone from '../documents/DropZone'
import DocIntelligence from '../documents/DocIntelligence'
import { processFile } from '../../utils/fileUtils'
import { runProcess } from '../../utils/api'

const FT_CLASS = { image: 'ft-img', pdf: 'ft-pdf', docx: 'ft-doc', txt: 'ft-txt' }

function FileItem({ f, onRemove }) {
  const statusLabel = f.status === 'ok' ? '✓ Ready' : f.status === 'loading' ? '⏳ Reading...' : '⚠ Binary'
  return (
    <div className="file-item">
      <div className="fi-left">
        <span className={`ft ${FT_CLASS[f.ftype] || 'ft-txt'}`}>{f.ftype.toUpperCase()}</span>
        <div>
          <div className="fname">{f.name}</div>
          <div className={`fstat ${f.status}`}>{statusLabel}</div>
        </div>
      </div>
      <span className="frm" onClick={onRemove} title="Remove file">
        <svg viewBox="0 0 9 9"><path d="M1.5 1.5l6 6M7.5 1.5l-6 6" strokeLinecap="round"/></svg>
      </span>
    </div>
  )
}

export default function StepDocuments({ active }) {
  const tFiles = useStore((s) => s.tFiles)
  const pFiles = useStore((s) => s.pFiles)
  const specialty = useStore((s) => s.specialty)
  const clips = useStore((s) => s.clips)
  const setTFiles = useStore((s) => s.setTFiles)
  const removeTFile = useStore((s) => s.removeTFile)
  const addPFile = useStore((s) => s.addPFile)
  const removePFile = useStore((s) => s.removePFile)
  const setStep = useStore((s) => s.setStep)
  const setProcessing = useStore((s) => s.setProcessing)
  const setReviewData = useStore((s) => s.setReviewData)

  const canProcess = tFiles.length > 0 && tFiles[0]?.status !== 'loading'

  const handleTemplateFiles = async (files) => {
    const f = files[0]
    const entry = { name: f.name, ftype: 'loading', status: 'loading', extracted: '', isImage: false }
    setTFiles([entry])
    const processed = await processFile(f, 't')
    setTFiles([processed])
  }

  const handleSupportFiles = async (files) => {
    for (const f of files) {
      const entry = { name: f.name, ftype: 'loading', status: 'loading', extracted: '', isImage: false }
      addPFile(entry)
      const processed = await processFile(f, 'p')
      // Replace placeholder — use store update via index approach
      useStore.setState((s) => ({ pFiles: s.pFiles.map((p) => p.name === f.name && p.status === 'loading' ? processed : p) }))
    }
  }

  const handleProcess = async () => {
    setProcessing(true)
    setStep(4)
    try {
      const { parsed, mergedTx, sdocs } = await runProcess({ specialty, clips, tFiles, pFiles })
      const srcMap = buildSrcMap(mergedTx, clips, sdocs)
      setReviewData({ parsedFields: parsed, srcMap, mergedTx, sdocs })
    } catch {
      setReviewData({ parsedFields: { fields: [{ label: 'Note', value: 'API connection required.', source: '' }] }, srcMap: {}, mergedTx: '', sdocs: [] })
    }
  }

  return (
    <div className={`panel ${active ? 'active' : ''}`} id="p3">
      <div className="phead">
        <div className="peyebrow">Step 3 of 4</div>
        <div className="ptitle">Upload documents</div>
        <div className="psub">Upload the template to fill and any supporting patient documents. Key values are extracted and displayed in the intelligence panel.</div>
      </div>
      <div className="pbody">
        <div className="docs-outer">
          <div className="doc-card">
            <div className="doc-card-hdr">
              <div className="doc-card-title">Document template</div>
              <span className="badge b-req">Required</span>
            </div>
            <div className="doc-card-desc">Ambuláns lap, beutaló, zárójelentés, or any custom form.</div>
            <DropZone id="tz" inputId="t-in" accept=".pdf,.docx,.txt,.doc" filled={tFiles.length > 0} onFiles={handleTemplateFiles}>
              <div className="dz-icon"><svg viewBox="0 0 12 12"><rect x="1.5" y="1" width="9" height="10" rx="1.5"/><path d="M3.5 4.5h5M3.5 6.5h3.5" strokeLinecap="round"/></svg></div>
              <div className="dz-text">Drop or click to upload</div>
              <div className="dz-sub">PDF, DOCX, TXT</div>
            </DropZone>
            <div className="file-list">{tFiles.map((f, i) => <FileItem key={i} f={f} onRemove={removeTFile} />)}</div>
          </div>

          <div className="doc-card doc-card-opt">
            <div className="doc-card-hdr">
              <div className="doc-card-title">Supporting documents</div>
              <span className="badge b-opt">Optional</span>
            </div>
            <div className="doc-card-desc">
              CT, labor, korábbi ambuláns lap, képalkotó lelet — bármi ami segít kitölteni a sablont.
              <span className="doc-skip-hint"> Nem szükséges a folytatáshoz.</span>
            </div>
            <DropZone id="pz" inputId="p-in" accept=".pdf,.jpg,.jpeg,.png,.bmp,.tiff,.tif,.txt" multiple filled={pFiles.length > 0} onFiles={handleSupportFiles}>
              <div className="dz-icon"><svg viewBox="0 0 12 12"><path d="M6 1v6M3.5 4.5L6 7l2.5-2.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M1 9v1.5h10V9" strokeLinecap="round"/></svg></div>
              <div className="dz-text">Drop or click to upload</div>
              <div className="dz-sub">PDF, JPG, PNG, BMP, TIFF, TXT · többet is lehet egyszerre</div>
            </DropZone>
            {pFiles.length > 0 && (
              <div className="file-list">{pFiles.map((f, i) => <FileItem key={i} f={f} onRemove={() => removePFile(i)} />)}</div>
            )}
          </div>
        </div>

        <DocIntelligence pFiles={pFiles} />

        <div className="notice notice-info" style={{ marginTop: 12 }}>
          <svg viewBox="0 0 14 14"><circle cx="7" cy="7" r="5.5"/><path d="M7 6.5v3" strokeLinecap="round"/><circle cx="7" cy="4.8" r=".6" fill="currentColor" stroke="none"/></svg>
          <span>Every filled field will display its source. Fields not confirmed from any source are left blank.</span>
        </div>
        <div className="btn-row">
          <button className="btn btn-o" onClick={() => setStep(2)}>Back</button>
          <button className="btn btn-p" disabled={!canProcess} onClick={handleProcess}>Fill document →</button>
        </div>
      </div>
    </div>
  )
}

function buildSrcMap(mergedTx, clips, sdocs) {
  const map = {
    dictation: {
      label: `Physician dictation (${clips.length} clips)`,
      color: 'var(--blue)', cls: 'src-transcript',
      preview: mergedTx.substring(0, 280) + (mergedTx.length > 280 ? '...' : ''),
    },
  }
  sdocs.forEach((d, i) => {
    const col = d.isImage ? 'var(--green)' : i === 0 ? 'var(--cyan)' : 'var(--purple)'
    const cls = d.isImage ? 'src-image' : i === 0 ? 'src-lab' : 'src-prev'
    map[`doc_${i}`] = { label: d.name, color: col, cls, preview: d.content.substring(0, 260) + (d.content.length > 260 ? '...' : '') }
  })
  return map
}
