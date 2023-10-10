import { nextui } from '@nextui-org/react';

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./index.html',
		'./src/**/*.{vue,js,ts,jsx,tsx}',
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
	],
	darkMode: 'class', // or 'media' or 'class'
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
			boxShadow: {
				goldenShadow: '0 3px 1px 0px rgba(255, 193, 1, 0.7)',
			},
			colors: {
				white: '#ffffff',

				Dark_Navy_Blue: '#1A2C56',

				golden: '#ffc107',

				linkedin: '#0e76a8',

				darck_black: '#000000',

				dark_grayish_blue: '#1f2022',

				light_grayish_blue: '#B9C4C9',

				soft_green: '#37BD74',

				bright_red: '#D81E5B',

				vivid_blue: '#0D6EFD',

				pale_blue: '#F0F5F9',
			},
			fontFamily: {
				aboreto: ['Aboreto', 'cursive'],
				volkhov: ['Volkhov', 'serif'],
				ysabeau: ['Ysabeau SC', 'sans-serif'],
				sf: ['San Francisco', 'sans-serif'],
				oswald: ['Oswald', 'sans-serif'],
				playfair: ['Playfair Display', 'serif'],
			},
			fontWeight: {
				light: 300,
				bold: 700,
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [nextui()],
	corePlugins: {
		preflight: true,
	},
};
