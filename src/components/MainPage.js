import Card from './Card';
import Form from './Form';
import Tasks from './Tasks';
import { useSelector } from 'react-redux';

const MainPage = () => {
	const tasks = useSelector((state) => state.streak.tasks);

	return (
		<div className="flex flex-col items-center gap-4 ">
			<div className="w-full flex justify-between items-center flex-col md:flex-row gap-4">
				<Card />
				<Form />
			</div>
			{tasks.length !== 0 && (
				<div className="w-full flex justify-center items-center flex-col">
					<Tasks />
				</div>
			)}
		</div>
	);
};
export default MainPage;
