'use client'

import { useEffect, useRef } from 'react'
import Hls from 'hls.js'

type Props = {
    src: string
    poster?: string
    onReady?: () => void
}

const PlyrPlayer = ({ src, poster, onReady }: Props) => {
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        const load = async () => {
            const Plyr = (await import('plyr')).default
            await import('plyr/dist/plyr.css')

            const video = videoRef.current
            if (!video) return

            if (Hls.isSupported() && src.endsWith('.m3u8')) {
                const hls = new Hls()
                hls.loadSource(src)
                hls.attachMedia(video)
            } else {
                video.src = src
            }

            const player = new Plyr(video, {
                controls: [
                    'play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen'
                ],
                i18n: {
                    restart: "شروع دوباره",
                    rewind: "عقب رفتن {seektime} ثانیه",
                    play: "پخش",
                    pause: "توقف",
                    fastForward: "جلو رفتن {seektime} ثانیه",
                    seek: "جستجو",
                    seekLabel: "{currentTime} از {duration}",
                    played: "پخش‌شده",
                    buffered: "بافر شده",
                    currentTime: "زمان فعلی",
                    duration: "مدت زمان",
                    volume: "صدا",
                    mute: "بی‌صدا",
                    unmute: "لغو بی‌صدا",
                    enableCaptions: "فعال‌سازی زیرنویس",
                    disableCaptions: "غیرفعال‌سازی زیرنویس",
                    download: "دانلود",
                    enterFullscreen: "ورود به حالت تمام‌صفحه",
                    exitFullscreen: "خروج از حالت تمام‌صفحه",
                    frameTitle: "پلیر برای {title}",
                    captions: "زیرنویس",
                    settings: "تنظیمات",
                    menuBack: "بازگشت به منوی قبلی",
                    speed: "سرعت",
                    normal: "عادی",
                    quality: "کیفیت",
                    loop: "تکرار",
                    start: "شروع",
                    end: "پایان",
                    all: "همه",
                    reset: "بازنشانی",
                    disabled: "غیرفعال",
                    enabled: "فعال",
                    advertisement: "تبلیغ",
                    qualityBadge: {
                        2160: "4K",
                        1440: "HD",
                        1080: "HD",
                        720: "HD",
                        576: "SD",
                        480: "SD"
                    },
                    pip: "تصویر در تصویر",
                    live: "زنده",
                    error: "مشکلی پیش آمده است",
                    toggleColor: "تغییر رنگ",
                    ariaLabel: {
                        seek: "جستجو",
                        play: "پخش",
                        pause: "توقف",
                        volume: "صدا",
                        captions: "زیرنویس",
                        settings: "تنظیمات",
                        fullscreen: "تمام‌صفحه",
                        mute: "بی‌صدا",
                        unmute: "لغو بی‌صدا"
                    }
                },
                keyboard: {
                    global: true,
                },
                tooltips: {
                    controls: true,
                },
                captions: {
                    active: true,
                },
                /* ads: {
                  enabled: isProduction,
                  publisherId: '918848828995742',
                }, */
            })

            // بدون تغییر dir یا کلاس فونت

            player.once('ready', () => {
                onReady?.()
            })

            return () => player.destroy()
        }

        load()
    }, [src])

    return (
        <div className="w-full rounded-t-lg overflow-hidden shadow-lg">
            <video
                ref={videoRef}
                className="w-full aspect-video"
                controls
                playsInline
                poster={poster}
                crossOrigin="anonymous"
            />
        </div>
    )
}

export default PlyrPlayer
