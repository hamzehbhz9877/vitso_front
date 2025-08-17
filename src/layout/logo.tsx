"use client";
import React, {useEffect, useState} from "react";
import Image from "next/image";

import LogoLight from "../../public/images/logoDark.svg";
import LogoDark from "../../public/images/logoLight.svg";

const Logo = () => {
    const [theme, setTheme] = useState<"light" | "dark" | "">("");

    useEffect(() => {
        const html = document.documentElement;

        // مقدار اولیه
        setTheme((html.getAttribute("data-theme") as "light" | "dark") || "light");

        // Observer برای تغییر attribute
        const observer = new MutationObserver(() => {
            const newTheme =
                (html.getAttribute("data-theme") as "light" | "dark") || "light";
            setTheme(newTheme);
        });

        observer.observe(html, {attributes: true, attributeFilter: ["data-theme"]});

        return () => observer.disconnect();
    }, []);

    return (
        <Image
            alt="logo"
            className="mx-3"
            src={theme === "dark" ?  LogoLight:  LogoDark}
            width={50}
            height={50}
            priority
        />
    );
};

export default Logo;
