import { useCallback, useEffect } from 'react'

export function useTheme() {
  useEffect(() => {
    try {
      const saved = localStorage.getItem('voxsana-theme')
      if (saved) document.documentElement.setAttribute('data-theme', saved)
    } catch {}
  }, [])

  const toggle = useCallback(() => {
    const html = document.documentElement
    const next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light'
    html.setAttribute('data-theme', next)
    try { localStorage.setItem('voxsana-theme', next) } catch {}
  }, [])

  return { toggle }
}
