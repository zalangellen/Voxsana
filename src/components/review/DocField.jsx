import { useRef, useState } from 'react'
import { regenerateField } from '../../utils/api'
import useStore from '../../store'

function detectFieldType(label, value) {
  const l = (label || '').toLowerCase()
  const v = (value || '').toLowerCase().trim()
  if (/igen|nem|yes|no|true|false|pozitív|negatív|positive|negative/.test(v) || /allergia|dohány|terhes|diabetes|hypertonia/.test(l))
    return { type: 'boolean' }
  if (/dátum|date|születési|born|kelt|diagnosed/.test(l) || /^\d{4}[\.\-\/]\d{2}[\.\-\/]\d{2}$/.test(v))
    return { type: 'date' }
  if (/vérnyomás|bp|blood pressure/.test(l)) return { type: 'numeric', unit: 'mmHg' }
  if (/pulzus|heart rate|hr|bpm/.test(l)) return { type: 'numeric', unit: 'bpm' }
  if (/súly|weight/.test(l)) return { type: 'numeric', unit: 'kg' }
  if (/magasság|height/.test(l)) return { type: 'numeric', unit: 'cm' }
  if (/hőmérséklet|temp|láz/.test(l)) return { type: 'numeric', unit: '°C' }
  if (/spo2|oxygen/.test(l)) return { type: 'numeric', unit: '%' }
  if (/bno|icd|kód|code/.test(l)) return { type: 'code' }
  return { type: 'text' }
}

export default function DocField({ field, index, srcMap }) {
  const [localValue, setLocalValue] = useState(field.value || '')
  const [regenerating, setRegenerating] = useState(false)
  const updateField = useStore((s) => s.updateField)
  const specialty = useStore((s) => s.specialty)
  const mergedTx = useStore((s) => s.mergedTx)
  const sdocs = useStore((s) => s.sdocs)

  const hasV = field.value?.trim()
  const src = hasV ? (field.source || '') : ''
  const srcInfo = src && srcMap[src] ? srcMap[src] : null
  const srcColor = srcInfo ? srcInfo.color : 'var(--text4)'
  const srcCls = srcInfo ? srcInfo.cls : 'src-empty'
  const srcLabel = srcInfo ? srcInfo.label : hasV ? 'Unknown' : 'Not mentioned'
  const fieldType = detectFieldType(field.label, field.value)

  const handleRegen = async () => {
    setRegenerating(true)
    try {
      const result = await regenerateField({ fieldLabel: field.label, specialty, mergedTx, sdocs })
      if (result?.value) {
        setLocalValue(result.value)
        updateField(index, { value: result.value, source: result.source })
      }
    } finally {
      setRegenerating(false)
    }
  }

  const renderValue = () => {
    if (fieldType.type === 'boolean') {
      const checked = /igen|yes|true|pozitív|positive/i.test(localValue)
      return (
        <div className="field-checkbox-row">
          <input type="checkbox" className="field-checkbox" checked={checked} onChange={(e) => {
            const v = e.target.checked ? 'Yes' : 'No'
            setLocalValue(v); updateField(index, { value: v })
          }} />
          <span className="field-checkbox-label">{localValue || (hasV ? localValue : '[not mentioned]')}</span>
        </div>
      )
    }
    if (fieldType.type === 'date') {
      return <input type="text" className="field-date-input" value={localValue} placeholder="YYYY.MM.DD"
        onChange={(e) => { setLocalValue(e.target.value); updateField(index, { value: e.target.value }) }} />
    }
    if (fieldType.type === 'numeric') {
      return (
        <div className="field-numeric">
          <input type="text" className="field-numeric-input" value={localValue} placeholder="—"
            onChange={(e) => { setLocalValue(e.target.value); updateField(index, { value: e.target.value }) }} />
          <span className="field-numeric-unit">{fieldType.unit}</span>
        </div>
      )
    }
    return (
      <div
        className={`doc-field-value ${hasV ? '' : 'empty'}`}
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => { const v = e.target.textContent; setLocalValue(v); updateField(index, { value: v }) }}
        dangerouslySetInnerHTML={{ __html: hasV ? field.value : '[not mentioned]' }}
      />
    )
  }

  return (
    <div className="doc-field">
      <div className="doc-field-hdr">
        <div className="doc-field-label">{field.label}</div>
        <span className={`src-tag ${srcCls}`} title={`Source: ${srcLabel}`}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: srcColor, display: 'inline-block', flexShrink: 0 }} />
          {srcLabel}
        </span>
        <span className="field-type-badge">{fieldType.type}</span>
        <div className="field-actions">
          <div className={`field-action-btn ${regenerating ? 'regenerating' : ''}`} title="Regenerate this field" onClick={handleRegen}>
            <svg viewBox="0 0 10 10"><path d="M1.5 5a3.5 3.5 0 0 1 6.3-2.1M8.5 5a3.5 3.5 0 0 1-6.3 2.1" strokeLinecap="round"/><path d="M7.5 2l1 1.2L9.7 2M.3 8l1.2.8.5-1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </div>
      </div>
      {renderValue()}
    </div>
  )
}
