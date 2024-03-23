import { Link } from 'react-router-dom';

const Error = () => {
	return (
		<main className="grid place-items-center px-8">
			<div className="text-center">
				<h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">Page not found</h1>
				<p className="mt-6 text-lg leading-7">Sorry, we couldn`t find the page you`re looking for.</p>
				<div className="mt-10">
					<Link to="/welcome" className="btn btn-secondary">
						Back to home
					</Link>
				</div>
			</div>
		</main>
	);
};
export default Error;
