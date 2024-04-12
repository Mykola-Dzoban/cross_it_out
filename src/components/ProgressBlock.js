import { Button } from 'perkslab-ui';
import { useState } from 'react';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { users } from '../config/firebaseConfig';
import Modal from './Modal';

const ProgressBlock = ({ tasks, setIsLoading }) => {
	const auth = useAuthUser();

	const [isModalActive, setIsModalActive] = useState(false);

	const theme = useSelector((state) => state.streak.theme);

	// const date = new Date();

	const totalTasks = tasks.length;
	const doneTasks = tasks.filter((task) => task.isDone).length;
	const progress = (doneTasks / totalTasks) * 100 || 0;
	const doneTasksBool = progress === 100;

	const markAllAsDone = async () => {
		const updatedTasks = tasks.map((item) => {
			item.isDone = true;
			return item;
		});
		await users
			.update({ id: auth?.userId, tasks: [...updatedTasks] })
			.then((res) => {
				setIsLoading(true);
				toast.warn('All tasks are done.', {
					theme: `${theme === 'myDark' ? 'dark' : 'light'}`,
				});
			})
			.catch((err) => console.log(err));
	};
	const markAllAsUndone = async () => {
		const updatedTasks = tasks.map((item) => {
			item.isDone = false;
			return item;
		});
		await users
			.update({ id: auth?.userId, tasks: [...updatedTasks] })
			.then((res) => {
				setIsLoading(true);
				toast.warn('All tasks are undone.', {
					theme: `${theme === 'myDark' ? 'dark' : 'light'}`,
				});
			})
			.catch((err) => console.log(err));
	};

	return (
		<>
			<div className="w-full ">
				<div className="flex flex-col items-center justify-between gap-6">
					<div className="flex flex-row items-center gap-6">
						<span className="font-bold uppercase text-3xl">Soon</span>
					</div>
					<div className="flex flex-col xl:flex-row items-center gap-3">
						<Button
							variant="error"
							className=""
							onClick={() => {
								setIsModalActive(true);
								document.documentElement.style.overflow = 'hidden';
							}}>
							Delete all tasks
						</Button>
						<Button
							variant="neutral"
							className=""
							onClick={() => {
								if (doneTasksBool) {
									markAllAsUndone();
								} else {
									markAllAsDone();
								}
							}}>
							{doneTasksBool ? 'Mark all as undone' : 'Mark all as done'}
						</Button>
					</div>
				</div>
			</div>
			{isModalActive && (
				<Modal
					header="Are you sure that you want to delete all of the tasks?"
					text={``}
					setIsModalActive={setIsModalActive}
					setIsLoading={setIsLoading}
					tasks={tasks}
				/>
			)}
		</>
	);
};
export default ProgressBlock;
