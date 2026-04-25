import { SPEC } from '../constants.jsx'

const ENDPOINT = '/api/claude'
const MODEL = 'claude-opus-4-5'

async function callClaude(system, userContent, maxTokens = 2000) {
  const r = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: maxTokens,
      system,
      messages: [{ role: 'user', content: userContent }],
    }),
  })
  const data = await r.json()
  const text = data?.content?.[0]?.text ?? ''
  try {
    return JSON.parse(text.replace(/```json|```/g, '').trim())
  } catch {
    return null
  }
}

export async function runProcess({ specialty, clips, tFiles, pFiles }) {
  const specP = SPEC[specialty] || SPEC.gp
  const tmpl = tFiles[0]?.extracted ?? ''
  const sdocs = pFiles.map((f, i) => ({ id: `doc_${i}`, name: f.name, ftype: f.ftype, content: f.extracted, isImage: f.isImage }))
  const mergedTx = clips.map((c, i) => `[Clip ${i + 1} — ${c.category}]: ${c.transcript}`).join('\n\n')

  let srcIds = 'dictation = physician dictation'
  sdocs.forEach((d) => { srcIds += `, ${d.id} = ${d.name}` })

  const sysP = `${specP}\n\nYou are filling an existing medical template. Your ONLY task is to populate the fields that appear in the template using information from the provided sources. Do NOT create new fields, rename fields, restructure the document, or generate narrative text.\n\nSTEP 1 — Extract patient demographics first: Carefully scan the entire dictation for patient name, date of birth, age, gender, and any ID or reference numbers. These may be spoken naturally (e.g. "patient is Maria Santos born 12th March 1978") or spelled out letter by letter. Match them to demographic fields in the template regardless of exact label wording.\n\nSTEP 2 — Fill remaining fields: Match each remaining template field to explicitly stated information in the sources. The physician dictation consists of multiple short clips tagged by category.\n\nRULES:\n1. Return EVERY field that appears in the template. Fill matched fields; leave unmatched fields as empty string "".\n2. Use the EXACT field label from the template — do not paraphrase or rename.\n3. Convert colloquial to clinical terminology.\n4. NEVER invent or infer information not explicitly stated.\n5. Record source_id per field. Source IDs: ${srcIds}\nReturn ONLY JSON: {"fields":[{"label":"...","value":"...","source":"..."},...]}`

  const content = []
  sdocs.forEach((d) => {
    if (d.isImage && d.content?.startsWith('data:image')) {
      const mm = d.content.match(/data:([^;]+);base64,/)
      content.push({ type: 'image', source: { type: 'base64', media_type: mm?.[1] ?? 'image/jpeg', data: d.content.replace(/^data:[^;]+;base64,/, '') } })
      content.push({ type: 'text', text: `[Image: ${d.name} (source_id: ${d.id})]` })
    }
  })

  let txt = `=== PHYSICIAN DICTATION (source_id: dictation) ===\n${mergedTx}\n\n`
  sdocs.forEach((d) => { if (!d.isImage) txt += `=== DOCUMENT: ${d.name} (source_id: ${d.id}) ===\n${d.content}\n\n` })
  txt += `=== TEMPLATE TO FILL ===\n${tmpl}\nReturn JSON.`
  content.push({ type: 'text', text: txt })

  const result = await callClaude(sysP, content, 2000)
  return { parsed: result ?? { fields: [{ label: 'Note', value: 'Processing failed — check server logs.', source: '' }] }, mergedTx, sdocs }
}

export async function regenerateField({ fieldLabel, specialty, mergedTx, sdocs }) {
  const specP = SPEC[specialty] || SPEC.gp
  const srcIds = 'dictation=physician dictation' + sdocs.map((d, i) => `, doc_${i}=${d.name}`).join('')
  const sysP = `${specP}\nYou are regenerating a SINGLE field only. Return JSON: {"label":"${fieldLabel}","value":"new value","source":"source_id"}. Source IDs: ${srcIds}\nIf not in sources, return empty string.`

  let txText = `=== PHYSICIAN DICTATION (source_id: dictation) ===\n${mergedTx}\n\n`
  sdocs.forEach((d) => { if (!d.isImage) txText += `=== DOCUMENT: ${d.name} (source_id: doc_${sdocs.indexOf(d)}) ===\n${d.content}\n\n` })
  txText += `Regenerate ONLY this field: ${fieldLabel}`

  return callClaude(sysP, txText, 300)
}

export async function applyVoiceCorrection({ instruction, fields, specialty }) {
  const specP = SPEC[specialty] || SPEC.gp
  const sysP = `${specP}\nInterpret voice command editing instructions. Only apply safe, explicit commands. Return ONLY JSON: {"updates":[{"label":"exact label","new_value":"updated value"},...]}. If command is ambiguous or unsafe, return {"updates":[]}.`
  const userMsg = `CURRENT DOCUMENT:\n${JSON.stringify(fields, null, 2)}\n\nVOICE COMMAND:\n${instruction}\n\nApply only clear, safe, explicit changes.`
  return callClaude(sysP, userMsg, 500)
}

export async function extractDocValues(docContent) {
  const sysP = `You are a medical document parser. Extract ONLY explicitly stated values from the provided documents. Do NOT interpret or infer. Return JSON: {"extracted":[{"key":"Value name","value":"Exact value","source":"filename"},...]}. Focus on: lab values, vital signs, dates, medications, diagnoses, numeric measurements. Maximum 12 items.`
  return callClaude(sysP, `Extract explicit values from these documents:\n\n${docContent.substring(0, 3000)}`, 600)
}
