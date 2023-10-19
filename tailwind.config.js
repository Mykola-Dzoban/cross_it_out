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
					primary: '#abd0ea',
					secondary: '#c6562d',
					accent: '#65ea12',
					neutral: '#181424',
					'base-100': '#ebeff5',
					info: '#6fabe7',
					success: '#1fb281',
					warning: '#c96e13',
					error: '#e55452',
				},
			},
		],
	},
};
