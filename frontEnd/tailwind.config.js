/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	darkMode: 'media', // or 'media' or 'class'
	theme: {
		extend: {
			screens: {
				sm: '640px',
				// => @media (min-width: 640px) { ... }

				md: '768px',
				// => @media (min-width: 768px) { ... }

				lg: '1024px',
				// => @media (min-width: 1024px) { ... }

				xl: '1280px',
				// => @media (min-width: 1280px) { ... }

				'2xl': '1536px',
				// => @media (min-width: 1536px) { ... }
			},
			colors: {
				Dark_Navy_Blue: '#1A2C56 ',

				white_bg: '#ffffff',

				coral: '#FF6B6B',

				golden: '#ffc107',

				gris: '#A9A9A9',
			},
			fontFamily: {
				volkhov: ['Volkhov', 'serif'],
				ysabeau: ['Ysabeau SC', 'sans-serif'],
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
	corePlugins: {
		preflight: true,
	},
};
