import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomeLayout from './components/HomeLayout';
import MainPage from './components/MainPage';
import WelcomePage from './components/WelcomePage';

const router = createBrowserRouter([
	{
		path: '/',
		element: <HomeLayout />,
		children: [
			{
				index: true,
				element: <WelcomePage />,
			},
			{
				path: '/main',
				element: <MainPage />,
			},
		],
	},
]);

export const App = () => {
	return <RouterProvider router={router} />;
};
