/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {},
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: [
			{
				myDark: {
					primary: '#8eef39',
					secondary: '#cce8ff',
					accent: '#ff99d6',
					neutral: '#171826',
					'base-100': '#2e2d39',
					info: '#268ed9',
					success: '#23e1be',
					warning: '#f4b352',
					error: '#e54d38',
				},
			},
			{
				myLight: {
					primary: '#0b8266',
					secondary: '#3e5ed1',
					accent: '#4408a5',
					neutral: '#2c1b31',
					'base-100': '#fcfcfd',
					info: '#4a6ac9',
					success: '#0e7757',
					warning: '#e5990b',
					error: '#f76a55',
				},
			},
		],
	},
};
