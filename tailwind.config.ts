/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
import Animate from "tailwindcss-animate"
import Daisyui from "daisyui"

const config = {
    darkMode: 'class',
    content: [
        // "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        // "./src/_components/**/*.{js,ts,jsx,tsx,mdx}",
        // "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
        './styles/**/*.{css,scss}', // Make sure this includes your styles
    ],

    theme: {
        extend: {
            fontFamily: {
                bYekan: [
                    'var(--font-Yekan)'
                ],
                parskala: [
                    'var(--font-parskala)'
                ]
            },
            height: {
                // 'calc-full-minus-10': 'calc(100% - 10px)',
            },
            colors: {
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                // 'c-primary':'oklch(62.6% 0.222 256.1)',
                'c-primary':'#048970',
                // 'primary-600': 'oklch(50% 0.222 256.1)',
                // 'primary-900': 'oklch(30% 0.1 256.1)',
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))'
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))'
                },
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))'
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))'
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                chart: {
                    '1': 'hsl(var(--chart-1))',
                    '2': 'hsl(var(--chart-2))',
                    '3': 'hsl(var(--chart-3))',
                    '4': 'hsl(var(--chart-4))',
                    '5': 'hsl(var(--chart-5))'
                },
                sidebar: {
                    DEFAULT: 'hsl(var(--sidebar-background))',
                    foreground: 'hsl(var(--sidebar-foreground))',
                    primary: 'hsl(var(--sidebar-primary))',
                    'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
                    accent: 'hsl(var(--sidebar-accent))',
                    'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
                    border: 'hsl(var(--sidebar-border))',
                    ring: 'hsl(var(--sidebar-ring))'
                }
            },
            screens: {
                tablet: '640px',
                laptop: '1024px',
                desktop: '1200px',
                xdesktop: '1400px'
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            }
        },
        container: {
            center: true,
            padding: {
                DEFAULT: '1em',
                sm: '2.5rem',
                lg: '.5rem',
                xl: '.5rem',
                '2xl': '2rem'
            },
            screens: {
                sm: '800px',
                md: '900px',
                lg: '1000px',
                xl: '1100px',
                '2xl': '1350px'
            }
        }
    },
    plugins: [Animate,Daisyui],
};
export default config;
