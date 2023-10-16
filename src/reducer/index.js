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
const getProgressFromLocalStorage = () => {
	const tasks = localStorage.getItem('progress') || '0';
	return JSON.parse(tasks);
};

const initialState = {
	progress: getProgressFromLocalStorage(),
	tasks: getTasksFromLocalStorage(),
	theme: getThemeFromLocalStorage(),
	showSuccessModal: false
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
		updateProgress: (state) => {
			const totalTasks = state.tasks.length;
			const doneTasks = state.tasks.filter((task) => task.isDone).length;
			const progress = (doneTasks / totalTasks) * 100;
			state.progress = progress;
			if (state.tasks.length === 0) {
				state.progress = 0;
			}
			if (state.progress === 100) {
				state.showSuccessModal = true;
			}
			else{
				state.showSuccessModal = false;
			}
			localStorage.setItem('progress', JSON.stringify(state.progress));
		},
		deleteTask: (state, actions) => {
			const id = actions.payload;
			state.tasks = state.tasks.filter((item) => item.id !== id);
			localStorage.setItem('tasks', JSON.stringify(state.tasks));
		},
	},
});

export const { addTask, toggleTheme, toggleTask, updateProgress, deleteTask } = streakSlice.actions;

export default streakSlice.reducer;
