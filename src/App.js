import Card from './components/Card';
import Form from './components/Form';
import Navbar from './components/Navbar';
import Tasks from './components/Tasks';

export const App = () => {
	// const tasks = useSelector((state) => state.streak.tasks);

	return (
		<div className="container mx-auto py-10 ">
			<Navbar />
			<div className="flex flex-col items-center gap-4 ">
				<div className="w-full flex justify-between items-center flex-col md:flex-row gap-4">
					<Card />
					<Form />
				</div>
				<div className="w-full flex justify-center items-center flex-col">
					<Tasks />
				</div>
			</div>
		</div>
	);
};
