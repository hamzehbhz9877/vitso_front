"use client";
import { useEffect, useRef, useState } from "react";

interface CountUpProps {
    end: number;
    duration?: number; // مدت زمان انیمیشن به ثانیه
    suffix?: string;
}

export default function CountUp({ end, duration = 2, suffix = "" }: CountUpProps) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement | null>(null);
    const started = useRef(false);

    useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && !started.current) {
                    started.current = true;

                    let start = 0;
                    const startTime = performance.now();

                    const animate = (time: number) => {
                        const progress = Math.min((time - startTime) / (duration * 1000), 1);
                        const value = Math.floor(progress * (end - start) + start);
                        setCount(value);

                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        }
                    };

                    requestAnimationFrame(animate);
                }
            },
            { threshold: 0.5 }
        );

        observer.observe(ref.current);

        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, [end, duration]);

    return (
        <div ref={ref}>
            {count}
            {suffix}
        </div>
    );
}
