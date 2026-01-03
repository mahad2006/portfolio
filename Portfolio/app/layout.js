import './globals.css'; // <--- THIS WAS MISSING! It connects your styles.

export const metadata = {
  title: 'Shaikh Mahad | Backend Systems Engineer',
  description: 'Portfolio of Shaikh Mahad, a Backend Systems Engineer.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />

        {/* Tailwind CDN */}
        <script src="https://cdn.tailwindcss.com"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            tailwind.config = {
              theme: {
                extend: {
                  fontFamily: {
                    sans: ['Inter', 'sans-serif'],
                    mono: ['JetBrains Mono', 'monospace'],
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
                }
              }
            }
          `
        }} />
      </head>
      <body>{children}</body>
    </html>
  )
}