import React from 'react';
import AuthProvider from 'react-auth-kit';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { App } from './App';
import { authStore } from './auth';
import './index.css';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<AuthProvider store={authStore}>
		<BrowserRouter>
			<Provider store={store}>
				<App />
				<ToastContainer position="bottom-right" autoClose={2000} />
			</Provider>
		</BrowserRouter>
	</AuthProvider>
);
