import { memo } from 'react';
import { Outlet, useRoutes } from 'react-router-dom';
import Error from '../components/Error';
import MainPage from '../components/MainPage';
import WelcomePage from '../components/WelcomePage';
import RequiredAuth from './RequiredAuth';
import ThrowAuth from './ThrowAuth';

export const Routes = memo(() => {
	return useRoutes([
		// auth required
		{
			path: '/',
			element: (
				<RequiredAuth>
					<Outlet />
				</RequiredAuth>
			),
			children: [
				{
					index: true,
					element: <MainPage />,
				},
			],
		},
		// no auth required
		{
			path: '/welcome',
			element: (
				<ThrowAuth callbackPath="/">
					<WelcomePage />
				</ThrowAuth>
			),
		},

		//
		{
			path: '*',
			element: <Error />,
		},
	]);
});
