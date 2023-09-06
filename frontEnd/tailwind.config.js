/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	darkMode: 'media', // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				blue: {
					dark: '#1A2C56 ',
				},
				green: {
					emerald: '#74AED7 ',
				},
				gray: {
					coral: '#FF6B6B',
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
	corePlugins: {
		preflight: false,
	},
};

