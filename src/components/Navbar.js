import { LogOut } from 'lucide-react';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { Link } from 'react-router-dom';
import { useLogin } from '../auth';

const Navbar = () => {
	const { onSignOut } = useLogin();

	const auth = useAuthUser();

	return (
		<div className="navbar flex flex-col sm:flex-row justify-between border-b-2 border-zinc-700 container mx-auto py-5">
			<div className="navbar-center">
				<Link to="/" className="text-2xl font-bold whitespace-normal uppercase">
					Cross it out
				</Link>
			</div>
			<div className="navbar-end flex items-center sm:justify-end justify-center gap-2">
				{auth && (
					<button
						to="/new"
						className="btn btn-ghost btn-circle"
						onClick={async () => {
							onSignOut();
							// await users.logout();
						}}>
						<LogOut />
					</button>
				)}
			</div>
		</div>
	);
};
export default Navbar;
