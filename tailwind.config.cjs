/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}"
    ],
    safelist: [
        'bg-purple-900', 'via-indigo-900', 'to-blue-900', 'from-blue-900', 'from-pink-900', 'from-gray-900', 'via-indigo-950', 'to-black',
        'border-purple-400', 'hover:border-pink-400', 'text-purple-300', 'bg-white/10', 'backdrop-blur-md', 'backdrop-blur-xl'
    ],
    theme: {
        extend: {
            fontFamily: {
                display: ['Inter', 'ui-sans-serif', 'system-ui'],
            },
            boxShadow: {
                glow: '0 0 20px rgba(167,139,250,0.5)',
            },
            keyframes: {
                'spin-slow': { '0%': { transform: 'rotate(0deg)' }, '100%': { transform: 'rotate(360deg)' } },
                float: {
                    '0%,100%': { transform: 'translateY(-6px)' },
                    '50%': { transform: 'translateY(6px)' }
                },
                'gradient-x': {
                    '0%,100%': { 'background-position': '0% 50%' },
                    '50%': { 'background-position': '100% 50%' }
                }
            },
            animation: {
                'spin-slow': 'spin-slow 6s linear infinite',
                float: 'float 5s ease-in-out infinite',
                'gradient-x': 'gradient-x 8s ease infinite'
            },
            backgroundSize: {
                '200%': '200% 200%'
            },
            colors: {
                brand: {
                    purple: '#6d28d9',
                    pink: '#f472b6'
                }
            }
        },
    },
    plugins: [],
};