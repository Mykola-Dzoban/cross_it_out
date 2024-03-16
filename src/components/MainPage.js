import { LayoutDashboard, PenLine } from 'lucide-react';
import { Accordion, AccordionContent, AccordionTrigger } from 'perkslab-ui';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { users } from '../config/firebaseConfig';
import CrossCard from './Card';
import Form from './Form';
import ProgressBlock from './ProgressBlock';
import Tasks from './Tasks';

const MainPage = () => {
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
		<div className="flex flex-col items-center gap-4 ">
			<div className="w-full flex flex-col justify-center items-center md:flex-row gap-4">
				<Accordion className="w-11/12 md:w-1/2">
					<AccordionTrigger>
						<div className="text-center text-xl font-medium flex flex-row items-center justify-center gap-3">
							<PenLine />
							Add task
						</div>
					</AccordionTrigger>
					<AccordionContent>
						<Form tasks={tasks} setIsLoading={setIsLoading} />
					</AccordionContent>
				</Accordion>
				<Accordion className=" w-11/12 md:w-1/2">
					<AccordionTrigger>
						<div className="text-center text-xl font-medium flex flex-row items-center justify-center gap-3">
							<LayoutDashboard />
							Dashboard
						</div>
					</AccordionTrigger>
					<AccordionContent>
						<ProgressBlock tasks={tasks} setIsLoading={setIsLoading} />
					</AccordionContent>
				</Accordion>
			</div>
			<div className="w-full flex justify-center items-center flex-col lg:flex-row gap-4">
				<CrossCard tasks={tasks} setIsLoading={setIsLoading} />
			</div>
			{tasks.length !== 0 && (
				<div className="w-full flex justify-center items-center flex-col gap-7">
					<Tasks tasks={tasks} setIsLoading={setIsLoading} />
				</div>
			)}
			{tasks.length === 0 && (
				<div className="flex flex-col w-full items-center bg-base-100 border-2 border-gray-300 py-12 rounded-xl">
					<span className="text-2xl font-bold">You don`t have tasks</span>
				</div>
			)}
		</div>
	);
};
export default MainPage;
