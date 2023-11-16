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
const getAuthFromLocalStorage = () => {
	const authSes = sessionStorage.getItem('isAuth');
	const auth = localStorage.getItem('isAuth');
	return JSON.parse(auth) || JSON.parse(authSes);
};
const getUserIdFromLocalStorage = () => {
	const auth = localStorage.getItem('userId') || '';
	return auth.replaceAll('"', '');
};

const initialState = {
	userId: getUserIdFromLocalStorage(),
	theme: getThemeFromLocalStorage(),
	isAuth: getAuthFromLocalStorage(),
};

export const streakSlice = createSlice({
	name: 'streak',
	initialState,
	reducers: {
		login: (state, actions) => {
			state.isAuth = true;
			localStorage.setItem('isAuth', JSON.stringify(state.isAuth));
		},
		logout: (state, actions) => {
			state.isAuth = false;
			localStorage.setItem('isAuth', JSON.stringify(state.isAuth));
		},
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
