import { useEffect } from "react"

let isLocked = false
let previousOverflow = ''
let previousPaddingRight = ''

/**
 * Hook برای غیرفعال کردن اسکرول body.
 * @param dependencies یک boolean یا آرایه‌ای از boolean‌ها
 */
export function useDisableBodyScroll(dependencies) {
    useEffect(() => {
        const active = Array.isArray(dependencies)
            ? dependencies.some(Boolean)
            : !!dependencies

        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

        if (active) {
            if (!isLocked) {
                previousOverflow = document.body.style.overflow || ''
                previousPaddingRight = document.body.style.paddingRight || ''
                document.body.style.overflow = 'hidden'
                document.body.style.paddingRight = `${scrollbarWidth}px`
                isLocked = true
            }
        } else {
            if (isLocked) {
                document.body.style.overflow = previousOverflow
                document.body.style.paddingRight = previousPaddingRight
                isLocked = false
            }
        }

        return () => {
            if (isLocked) {
                document.body.style.overflow = previousOverflow
                document.body.style.paddingRight = previousPaddingRight
                isLocked = false
            }
        }
    }, [dependencies])
}
