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
const getDoneTasksFromLocalStorage = () => {
	const tasks = localStorage.getItem('doneTasks') || '0';
	return JSON.parse(tasks);
};
const getDoneTasksBoolFromLocalStorage = () => {
	const tasks = localStorage.getItem('doneTasksBool');
	return JSON.parse(tasks);
};

const initialState = {
	progress: getProgressFromLocalStorage(),
	tasks: getTasksFromLocalStorage(),
	theme: getThemeFromLocalStorage(),
	showSuccessModal: false,
	doneTasksCount: getDoneTasksFromLocalStorage(),
	doneTasksBool: getDoneTasksBoolFromLocalStorage(),
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
			state.doneTasksCount = doneTasks;
			const progress = (doneTasks / totalTasks) * 100;
			state.progress = progress;
			state.doneTasksBool = false;
			if (state.tasks.length === 0) {
				state.progress = 0;
				state.doneTasksCount = 0;
			}
			if (state.progress === 100) {
				state.showSuccessModal = true;
				state.doneTasksBool = true;
			} else {
				state.showSuccessModal = false;
			}
			localStorage.setItem('progress', JSON.stringify(state.progress));
			localStorage.setItem('doneTasks', JSON.stringify(state.doneTasksCount));
		},
		deleteTask: (state, actions) => {
			const id = actions.payload;
			state.tasks = state.tasks.filter((item) => item.id !== id);
			localStorage.setItem('tasks', JSON.stringify(state.tasks));
		},
		deleteAllTasks: (state, actions) => {
			state.tasks = [];
			localStorage.setItem('tasks', JSON.stringify(state.tasks));
		},
		markAllAsDone: (state, actions) => {
			state.tasks = state.tasks.filter((item) => {
				if (item.isDone === false) {
					item.isDone = true;
				}
				return item;
			});
			localStorage.setItem('tasks', JSON.stringify(state.tasks));
		},
		markAllAsUndone: (state, actions) => {
			state.tasks = state.tasks.filter((item) => {
				if (item.isDone === true) {
					item.isDone = false;
				}
				return item;
			});
			localStorage.setItem('tasks', JSON.stringify(state.tasks));
		},
	},
});

export const { addTask, toggleTheme, toggleTask, updateProgress, deleteTask, deleteAllTasks, markAllAsDone, markAllAsUndone } =
	streakSlice.actions;

export default streakSlice.reducer;
