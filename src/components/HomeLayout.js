import { Outlet } from 'react-router';
import Navbar from './Navbar';

const HomeLayout = () => {
	return (
		<>
			<Navbar />
			<div className="container mx-auto py-10 min-h-[100vh]">
				<Outlet />
			</div>
			{/* <Footer /> */}
		</>
	);
};
export default HomeLayout;
