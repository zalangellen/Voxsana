import { useState, useEffect } from 'react'
import { extractDocValues } from '../../utils/api'

export default function DocIntelligence({ pFiles }) {
  const [items, setItems] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!pFiles.length) return
    const docContent = pFiles
      .filter((f) => !f.isImage && f.extracted)
      .map((f) => f.extracted)
      .join('\n\n')

    if (docContent.length < 20) {
      setItems([{ key: 'Status', value: 'Binary files — values will be extracted during processing.' }])
      return
    }

    setLoading(true)
    extractDocValues(docContent)
      .then((result) => {
        if (result?.extracted?.length) setItems(result.extracted)
        else setItems([{ key: 'Status', value: 'No explicit values found in text content.' }])
      })
      .catch(() => setItems([{ key: 'Status', value: 'Values will be extracted during document fill.' }]))
      .finally(() => setLoading(false))
  }, [pFiles])

  if (!pFiles.length || !items) return null

  return (
    <div className="doc-intel-panel on">
      <div className="dip-title">
        <svg viewBox="0 0 14 14"><path d="M2 4h10M2 7h7M2 10h5" strokeLinecap="round"/></svg>
        Document Intelligence — extracted values
      </div>
      <div className="dip-sub">Explicit values extracted from uploaded documents. No clinical interpretation. Verify before use.</div>
      <div className="dip-grid">
        {loading ? (
          <div className="dip-item"><div className="dip-key">Status</div><div className="dip-val loading">Extracting values from documents...</div></div>
        ) : items.map((item, i) => (
          <div key={i} className="dip-item">
            <div className="dip-key">{item.key}</div>
            <div className="dip-val">{item.value}</div>
            {item.source && <div className="dip-source">From: {item.source}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}
