import { createSlice } from '@reduxjs/toolkit';

const themes = {
	dark: 'myDark',
	light: 'myLight',
};

const getThemeFromLocalStorage = () => {
	const theme = localStorage.getItem('theme') || themes.light;
	document.documentElement.setAttribute('data-theme', theme);
	return theme;
};

const initialState = {
	theme: getThemeFromLocalStorage(),
};

export const streakSlice = createSlice({
	name: 'streak',
	initialState,
	reducers: {
		toggleTheme: (state, actions) => {
			const { light, dark } = themes;
			state.theme = state.theme === dark ? light : dark;
			document.documentElement.setAttribute('data-theme', state.theme);
			localStorage.setItem('theme', state.theme);
		},
	},
});

export const { toggleTheme, login, logout } = streakSlice.actions;

export default streakSlice.reducer;
