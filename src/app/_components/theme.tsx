'use client'
import { useEffect, useState } from 'react'

const COOKIE_KEY = "theme"

function getCookieTheme(): string | null {
    if (typeof document === "undefined") return null
    const match = document.cookie.match(new RegExp(`(^| )${COOKIE_KEY}=([^;]+)`))
    return match ? match[2] : null
}

function getSystemTheme() {
    const hour = new Date().getHours()
    return hour >= 20 || hour < 6 ? "dark" : "light"
}

function setCookieTheme(value: string) {
    document.cookie = `${COOKIE_KEY}=${value}; path=/; max-age=${60 * 60 * 24 * 365}`
}

const ThemeToggle = () => {
    const [theme, setTheme] = useState<string | null>(null)

    useEffect(() => {
        // sync با چیزی که head گذاشته
        let current = document.documentElement.getAttribute('data-theme')
        if (!current) {
            current = getCookieTheme() || getSystemTheme()
            document.documentElement.classList.remove('light','dark')
            document.documentElement.classList.add(current)
            document.documentElement.setAttribute('data-theme', current)
        }
        setTheme(current)
    }, [])

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        document.documentElement.classList.remove('light', 'dark')
        document.documentElement.classList.add(newTheme)
        document.documentElement.setAttribute('data-theme', newTheme)
        setTheme(newTheme)
        setCookieTheme(newTheme)
    }

    if (!theme) return null

    return (
        <label className="btn btn-circle btn-primary btn-soft swap swap-rotate">
            <input
                type="checkbox"
                className="theme-controller"
                onChange={toggleTheme}
                checked={theme === 'dark'}
            />

            {/* Sun icon */}
            <svg
                className="swap-on h-7 w-7 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24">
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,...Z"/>
            </svg>

            {/* Moon icon */}
            <svg
                className="swap-off h-7 w-7 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24">
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,...Z"/>
            </svg>
        </label>
    )
}

export default ThemeToggle
