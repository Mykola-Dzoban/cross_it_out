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

const getTasksFromLocalStorage = () => {
	const tasks = localStorage.getItem('tasks') || '[]';
	return JSON.parse(tasks);
};

const initialState = {
	value: 0,
	tasks: getTasksFromLocalStorage(),
	theme: getThemeFromLocalStorage(),
};

export const streakSlice = createSlice({
	name: 'streak',
	initialState,
	reducers: {
		addTask: (state, actions) => {
			state.tasks.push(actions.payload);
			localStorage.setItem('tasks', JSON.stringify(state.tasks));
		},
		toggleTheme: (state, actions) => {
			const { light, dark } = themes;
			state.theme = state.theme === dark ? light : dark;
			document.documentElement.setAttribute('data-theme', state.theme);
			localStorage.setItem('theme', state.theme);
		},
		toggleTask: (state, actions) => {
			const id = actions.payload;
			state.tasks = state.tasks.map((item) => {
				if (item.id === id) {
					item.isDone = !item.isDone;
				}
				return item;
			});
			localStorage.setItem('tasks', JSON.stringify(state.tasks));
		},
		countDoneTasks: (state) => {
			state.value += 1;
		},
	},
});

export const { addTask, toggleTheme, toggleTask } = streakSlice.actions;

export default streakSlice.reducer;
