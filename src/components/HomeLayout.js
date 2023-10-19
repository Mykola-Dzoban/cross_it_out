import { Outlet } from 'react-router';
import Navbar from './Navbar';

const HomeLayout = () => {
	return (
		<>
			<Navbar />
			<div className="container mx-auto py-10 ">
				<Outlet />
			</div>
		</>
	);
};
export default HomeLayout;
