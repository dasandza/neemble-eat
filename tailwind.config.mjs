/** @type {import('tailwindcss').Config} */
import {defineConfig} from 'tailwindcss';
import lineClamp from '@tailwindcss/line-clamp';

export default {
    content: ["./index.html", "./src/**/*.{js,ts,tsx,jsx}"],
    theme: {
        extend: {
            screens: {
                "tablet": "480px",
                "laptop": "768px",
                "desktop": "1024px",
                "tv": "1200px",
            },
            fontFamily: {
                'poppins': ['Poppins', 'sans-serif'], // Basic definition to use the font across Tailwind classes
            },
            fontWeight: {
                'poppins-regular': '400',
                'poppins-light': '300',
                'poppins-medium': '500',
                'poppins-semibold': '600',
            }
        },
    },
    plugins: [
        lineClamp
    ],
}

