export default function manifest() {
    return {
        name: 'Shaikh Mahad Portfolio',
        short_name: 'Mahad.Dev',
        description: 'Backend Systems Engineer Portfolio',
        start_url: '/',
        display: 'standalone',
        background_color: '#050505',
        theme_color: '#050505',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
            {
                src: '/profile.png', // Uses your profile pic as the app icon
                sizes: '192x192',
                type: 'image/png',
            },
        ],
    }
}