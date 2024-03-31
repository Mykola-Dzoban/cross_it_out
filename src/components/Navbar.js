import { LogOut } from 'lucide-react';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { Link } from 'react-router-dom';
import { useLogin } from '../auth';

const Navbar = () => {
	const { onSignOut } = useLogin();

	const auth = useAuthUser();

	return (
		<div className="border-b-2 border-zinc-700 container mx-auto py-5">
			<div className="flex justify-between flex-col sm:flex-row ">
				<Link to="/" className="text-2xl font-bold whitespace-normal flex items-center">
					CrossChronicle
				</Link>
				{auth && (
					<button
						to="/new"
						className="btn btn-ghost btn-circle"
						onClick={async () => {
							onSignOut();
						}}>
						<LogOut />
					</button>
				)}
			</div>
		</div>
	);
};
export default Navbar;
