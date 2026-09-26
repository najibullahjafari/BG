/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,jsx,ts,tsx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                display: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
                mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
            },
            colors: {
                surface: {
                    DEFAULT: '#0b100f',
                    raised: '#121a17',
                },
                accent: {
                    200: '#efffb4',
                    300: '#ddff78',
                    400: '#c8f34a',
                    500: '#a8d93f',
                    600: '#7ea52d',
                },
            },
            maxWidth: {
                content: '72rem',
            },
        }
    },
    plugins: []
};
