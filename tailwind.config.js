/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./frontend/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./frontend/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./frontend/src/**/*.{js,ts,jsx,tsx,mdx}",
        // 혹시 모르니 현재 경로도 포함
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}