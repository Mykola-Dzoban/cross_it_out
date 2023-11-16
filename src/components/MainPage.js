import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { users } from '../config/firebaseConfig';
import Card from './Card';
import Form from './Form';
import ProgressBlock from './ProgressBlock';
import Tasks from './Tasks';

const MainPage = () => {
	const isAuth = useSelector((state) => state.streak.isAuth);
	const id = useSelector((state) => state.streak.userId);

	const [isLoading, setIsLoading] = useState(false);
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		const fetchUser = async (id) => {
			if (id) {
				await users
					.getById(id)
					.then((res) => {
						setIsLoading(false);
						setTasks(res.tasks);
					})
					.catch((err) => console.log(err));
			}
		};
		fetchUser(id);
	}, [isLoading, id]);

	if (isLoading) {
		return (
			<div className="flex flex-col w-full items-center">
				<span className="loading loading-bars loading-lg"></span>
			</div>
		);
	}

	return (
		isAuth && (
			<div className="flex flex-col items-center gap-4 ">
				<div className="w-full flex justify-between items-center flex-col lg:flex-row gap-4">
					<Card tasks={tasks} setIsLoading={setIsLoading} />
					<Form tasks={tasks} setIsLoading={setIsLoading} />
				</div>
				{tasks.length !== 0 && (
					<div className="w-full flex justify-center items-center flex-col gap-7">
						<ProgressBlock tasks={tasks} setIsLoading={setIsLoading} />
						<Tasks tasks={tasks} setIsLoading={setIsLoading} />
					</div>
				)}
				{tasks.length === 0 && (
					<div className="flex flex-col w-full items-center bg-base-100 border-2 border-gray-300 py-12 rounded-xl">
						<span className="text-2xl font-bold">You don`t have tasks</span>
					</div>
				)}
			</div>
		)
	);
};
export default MainPage;
