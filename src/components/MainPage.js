import { useSelector } from 'react-redux';
import Card from './Card';
import Form from './Form';
import ProgressBlock from './ProgressBlock';
import Tasks from './Tasks';

const MainPage = () => {
	const tasks = useSelector((state) => state.streak.tasks);
	const isAuth = useSelector((state) => state.streak.isAuth);

	return (
		isAuth && (
			<div className="flex flex-col items-center gap-4 ">
				<div className="w-full flex justify-between items-center flex-col lg:flex-row gap-4">
					<Card />
					<Form />
				</div>
				{tasks.length !== 0 && (
					<div className="w-full flex justify-center items-center flex-col gap-7">
						<ProgressBlock />
						<Tasks />
					</div>
				)}
			</div>
		)
	);
};
export default MainPage;
