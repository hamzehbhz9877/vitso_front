'use client'

import * as React from "react";
import {MoonIcon, PanelLeft, SunMediumIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import LightIcon from "next/dist/client/components/react-dev-overlay/ui/icons/light-icon";
import DarkIcon from "next/dist/client/components/react-dev-overlay/ui/icons/dark-icon";

const SwitchDark =React.forwardRef<
    React.ElementRef<typeof Button>,
    React.ComponentProps<typeof Button>
>(({ className, onClick, ...props }, ref) => {

    const [isDarkMode, setIsDarkMode] = React.useState(false);

    React.useEffect(() => {
        // بارگذاری وضعیت ذخیره شده از localStorage یا مقدار پیش‌فرض
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            setIsDarkMode(true);
            document.documentElement.classList.add("dark");
            document.documentElement.classList.remove("light");
        } else {
            setIsDarkMode(false);
            document.documentElement.classList.add("light");
            document.documentElement.classList.remove("dark");
        }
    }, []);

    const toggleTheme = (checked: boolean) => {
        setIsDarkMode(checked);

        if (checked) {
            document.documentElement.classList.add("dark");
            document.documentElement.classList.remove("light");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.add("light");
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    };

    return (
        <Button
            data-sidebar="trigger"
            variant="ghost"
            size="icon"
            className={cn("h-7 w-7", className)}
            onClick={(event) => {
                onClick?.(event)
                toggleTheme(!isDarkMode);
            }}
            {...props}
        >
            {isDarkMode?<LightIcon />:<DarkIcon/>}
        </Button>
    );
})

export default SwitchDark;
