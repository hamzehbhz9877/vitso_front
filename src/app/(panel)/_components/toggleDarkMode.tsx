'use client'
import  React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import LightIcon from "next/dist/client/components/react-dev-overlay/ui/icons/light-icon";
import DarkIcon from "next/dist/client/components/react-dev-overlay/ui/icons/dark-icon";
import { useEffect, useState } from "react";

const COOKIE_KEY = "theme";

function getCookieTheme(): string | null {
    if (typeof document === "undefined") return null;
    const match = document.cookie.match(new RegExp(`(^| )${COOKIE_KEY}=([^;]+)`));
    return match ? match[2] : null;
}

function getSystemTheme() {
    const hour = new Date().getHours();
    return hour >= 20 || hour < 6 ? "dark" : "light";
}

function setCookieTheme(value: string) {
    document.cookie = `${COOKIE_KEY}=${value}; path=/; max-age=${60 * 60 * 24 * 365}`;
}

const SwitchDark = React.forwardRef<
    React.ElementRef<typeof Button>,
    React.ComponentProps<typeof Button>
>(({ className, onClick, ...props }, ref) => {
    const [theme, setTheme] = useState<string | null>(null);

    useEffect(() => {
        // همون لاجیک head رو تکرار می‌کنیم تا state React sync بشه
        const initial = getCookieTheme() || getSystemTheme();
        setTheme(initial);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
        setCookieTheme(newTheme);
        setTheme(newTheme);
    };

    if (!theme) return null;

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
            {theme === "dark" ? <LightIcon /> : <DarkIcon />}
        </Button>
    );
});

export default SwitchDark;
