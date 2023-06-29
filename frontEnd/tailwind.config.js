/** @type {import('tailwindcss').Config} */
export default {
	purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				blue: {
					dark: '#003366',
				},
				green: {
					emerald: '#00a99d',
				},
				gray: {
					steel: '#999999',
				},
				yellow: {
					golden: '#ffc107',
				},
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};

