import { useEffect, useState } from 'react'

function useDarkMode() {
  const [theme, setTheme] = useState('light')
  const colorTheme = theme === 'dark' ? 'light' : 'dark'

  useEffect(() => {
    setTheme(getThemePreference())
  }, [])

  useEffect(() => {
    const bodyEl = window.document.body
    bodyEl.classList.remove(colorTheme)
    bodyEl.classList.add(theme)

    localStorage.setItem('theme', theme)
  }, [theme])

  return [theme, setTheme] as const
}

function getThemePreference() {
  if ('theme' in localStorage) return localStorage.getItem('theme')
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark'
  return 'light'
}

export default useDarkMode
