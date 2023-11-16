import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router';
import Footer from './Footer';
import Navbar from './Navbar';

const HomeLayout = () => {
	const isAuth = useSelector((state) => state.streak.isAuth);

	useEffect(() => {
		console.log('render');
	}, [isAuth]);
	return (
		<>
			<Navbar />
			<div className="container mx-auto py-10 min-h-[100vh]">
				<Outlet />
			</div>
			<Footer />
		</>
	);
};
export default HomeLayout;
