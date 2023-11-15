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
const getAuthFromLocalStorage = () => {
	const auth = localStorage.getItem('isAuth');
	return JSON.parse(auth);
};
const getUserIdFromLocalStorage = () => {
	const auth = localStorage.getItem('userId') || '';
	return auth.replaceAll('"', '');
};
const getUserFromLocalStorage = () => {
	const user = localStorage.getItem('user');
	return JSON.parse(user);
};

const initialState = {
	userId: getUserIdFromLocalStorage(),
	user: getUserFromLocalStorage(),
	progress: getProgressFromLocalStorage(),
	tasks: getTasksFromLocalStorage(),
	theme: getThemeFromLocalStorage(),
	showSuccessModal: false,
	doneTasksCount: getDoneTasksFromLocalStorage(),
	doneTasksBool: getDoneTasksBoolFromLocalStorage(),
	isAuth: getAuthFromLocalStorage(),
};

export const streakSlice = createSlice({
	name: 'streak',
	initialState,
	reducers: {
		getUserId: (state, actions) => {
			state.userId = actions.payload.userId;
			localStorage.setItem('userId', state.userId);
		},
		getUser: (state, actions) => {
			state.user = actions.payload.user;
			localStorage.setItem('user', JSON.stringify(state.user));
		},
		getUserTasks: (state, actions) => {
			console.log(actions.payload.tasks);
			state.tasks = actions.payload.tasks ?? [];
			localStorage.setItem('tasks', JSON.stringify(state.tasks));
		},
		setTasks: (state, actions) => {
			state.tasks = actions.payload.tasks.reverse();
			localStorage.setItem('tasks', JSON.stringify(state.tasks));
		},
		addTask: (state, actions) => {
			state.tasks.push(actions.payload);
			localStorage.setItem('tasks', JSON.stringify(state.tasks));
		},
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
		updateTasksLayout: (state, actions) => {
			const doneTasks = state.tasks.filter((item) => item.isDone);
			const notDoneTasks = state.tasks.filter((item) => !item.isDone);
			state.tasks = notDoneTasks.concat(doneTasks);
			localStorage.setItem('tasks', JSON.stringify(state.tasks));
		},
		editTask: (state, actions) => {
			const date = new Date();
			const id = actions.payload.id;
			const task = actions.payload.task;
			state.tasks = state.tasks.map((item) => {
				if (item.id === id) {
					item.edited = true;
					item.task = task;
					item.time = `${date.toGMTString()}`;
				}
				return item;
			});
			localStorage.setItem('tasks', JSON.stringify(state.tasks));
		},
	},
});

export const {
	addTask,
	toggleTheme,
	toggleTask,
	updateProgress,
	deleteTask,
	deleteAllTasks,
	markAllAsDone,
	markAllAsUndone,
	updateTasksLayout,
	editTask,
	login,
	logout,
	getUserId,
	getUser,
	getUserTasks,
	setTasks,
} = streakSlice.actions;

export default streakSlice.reducer;
