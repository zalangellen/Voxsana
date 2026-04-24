import { useRef, useCallback } from 'react'

export function useSpeechRecognition({ lang = 'hu-HU', onResult, onError } = {}) {
  const recogRef = useRef(null)

  const start = useCallback(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) return false
    const r = new SR()
    r.continuous = true
    r.interimResults = true
    r.lang = lang
    r.onresult = (e) => {
      let fin = '', interim = ''
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) fin += e.results[i][0].transcript + ' '
        else interim += e.results[i][0].transcript
      }
      onResult?.({ final: fin.trim(), interim })
    }
    r.onerror = (e) => onError?.(e)
    try { r.start() } catch {}
    recogRef.current = r
    return true
  }, [lang, onResult, onError])

  const stop = useCallback(() => {
    try { recogRef.current?.stop() } catch {}
    recogRef.current = null
  }, [])

  return { start, stop }
}
