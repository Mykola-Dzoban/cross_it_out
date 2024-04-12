import { memo } from 'react';
import { Outlet, useRoutes } from 'react-router-dom';
import Error from '../components/Error';
import Dashboard from '../pages/dashboard/dashboard';
import Project from '../pages/project/project';
import { urlConfig } from '../utils/urlConfig';
import RequiredAuth from './RequiredAuth';
import ThrowAuth from './ThrowAuth';
import WelcomePage from '../pages/welcome/WelcomePage';

export const Routes = memo(() => {
	return useRoutes([
		// auth required
		{
			path: urlConfig.pages.dashboard,
			element: (
				<RequiredAuth>
					<Outlet />
				</RequiredAuth>
			),
			children: [
				{
					index: true,
					element: <Dashboard />,
				},
				{
					path: urlConfig.pages.project,
					element: <Project />,
				},
			],
		},
		// no auth required
		{
			path: urlConfig.pages.welcome,
			element: (
				<ThrowAuth callbackPath={urlConfig.pages.dashboard}>
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
