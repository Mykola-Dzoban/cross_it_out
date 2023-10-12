import { createSlice } from '@reduxjs/toolkit';

const themes = {
	dark: 'myDark',
	light: 'myLight',
};

export const streakSlice = createSlice({
	name: 'streak',
	initialState: {
		value: 0,
		months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		tasks: [],
		theme: themes.light,
	},
	reducers: {
		increment: (state) => {
			state.value += 1;
		},
		addTask: (state, actions) => {
			state.tasks.push(actions.payload);
		},
		toggleTheme: (state, actions) => {
            const { light, dark } = themes;
			state.theme = state.theme === dark ? light : dark;
            document.documentElement.setAttribute('data-theme', state.theme);
        },
	},
});

export const { increment, addTask, toggleTheme } = streakSlice.actions;

export default streakSlice.reducer;
