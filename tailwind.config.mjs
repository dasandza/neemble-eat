/** @type {import('tailwindcss').Config} */
import {defineConfig} from 'tailwindcss';
import lineClamp from '@tailwindcss/line-clamp';

export default {
    content: ["./index.html", "./src/**/*.{js,ts,tsx,jsx}"],
    theme: {
        extend: {},
    },
    plugins: [
        lineClamp
    ],
}

