/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    safelist: [
        'animate-marquee-left',
        'animate-marquee-right',
        'animate-marquee-slow',
        'marquee-paused',
    ],
    theme: {
        extend: {
            colors: {
                primary: 'var(--color-primary)',
                secondary: '#E76F00',
                bg: 'var(--bg-page)',
                surface: 'var(--bg-surface)',
                'surface-hover': 'var(--bg-surface-hover)',
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'sans-serif'],
                mono: ['var(--font-mono)', 'monospace'],
            },
            animation: {
                blob: "blob 7s infinite",
                'fade-up': 'fadeUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
            },
            keyframes: {
                blob: {
                    "0%": { transform: "translate(0px, 0px) scale(1)" },
                    "33%": { transform: "translate(30px, -50px) scale(1.1)" },
                    "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
                    "100%": { transform: "translate(0px, 0px) scale(1)" }
                },
                fadeUp: {
                    "from": { opacity: "0", transform: "translateY(20px)" },
                    "to": { opacity: "1", transform: "translateY(0)" }
                }
            }
        },
    },
    plugins: [],
};