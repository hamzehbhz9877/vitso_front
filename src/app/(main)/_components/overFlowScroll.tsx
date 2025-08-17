'use client';
import { useEffect } from 'react';

export default function ScrollManager() {
    useEffect(() => {
        const container = document.getElementById('main-content');
        if (!container) return;

        const body = document.querySelector('body.panel[data-scroll-locked]') as HTMLElement | null;
        if (!body) return;

        const updateScroll = () => {
            const overflow = container.scrollHeight > window.innerHeight;

            // ویژگی‌های ثابت همیشه
            body.style.setProperty('overscroll-behavior', 'contain', 'important');
            body.style.setProperty('margin-right', '0', 'important');

            // overflow-y شرطی
            if (overflow) {
                body.style.setProperty('overflow-y', 'scroll', 'important');
            } else {
                body.style.removeProperty('overflow-y');
            }
        };

        // اجرا در ابتدا
        updateScroll();

        // اجرا در resize
        window.addEventListener('resize', updateScroll);

        // بررسی تغییرات محتوا
        const observer = new MutationObserver(() => updateScroll());
        observer.observe(container, { childList: true, subtree: true, attributes: true });

        return () => {
            window.removeEventListener('resize', updateScroll);
            observer.disconnect();
        };
    }, []);

    return null;
}
