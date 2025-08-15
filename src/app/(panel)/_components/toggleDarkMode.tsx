// SwitchDark.tsx
'use client'
import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import LightIcon from "next/dist/client/components/react-dev-overlay/ui/icons/light-icon";
import DarkIcon from "next/dist/client/components/react-dev-overlay/ui/icons/dark-icon";
import {useEffect, useState} from "react";

const SwitchDark = React.forwardRef<
    React.ElementRef<typeof Button>,
    React.ComponentProps<typeof Button>
>(({ className, onClick, ...props }, ref) => {
    const [theme, setTheme] = useState<string | null>(null)

    useEffect(() => {
        const current = document.documentElement.getAttribute('data-theme') || 'light'
        setTheme(current)
    }, [])

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        document.documentElement.classList.remove('light', 'dark')
        document.documentElement.classList.add(newTheme)
        document.documentElement.setAttribute('data-theme', newTheme)
        setTheme(newTheme)
    }

    if (!theme) return null

    return (
        <Button
            data-sidebar="trigger"
            variant="ghost"
            size="icon"
            className={cn("h-7 w-7", className)}
            onClick={(event) => {
                onClick?.(event);
                toggleTheme();
            }}
            {...props}
            ref={ref}
        >
            {theme==="dark" ? <LightIcon /> : <DarkIcon />}
        </Button>
    );
});

export default SwitchDark;
