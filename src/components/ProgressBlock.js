import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { users } from '../config/firebaseConfig';
import Modal from './Modal';

const ProgressBlock = ({ tasks, setIsLoading }) => {
	const [isModalActive, setIsModalActive] = useState(false);
	const userId = useSelector((state) => state.streak.userId);
	const theme = useSelector((state) => state.streak.theme);

	const dispatch = useDispatch();
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
			.update({ id: userId, tasks: [...updatedTasks] })
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
			.update({ id: userId, tasks: [...updatedTasks] })
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
			<div className="card w-full bg-base-100 border-2 border-gray-300">
				<div className="card-body flex flex-col md:flex-row items-center justify-between gap-6">
					<div className="flex flex-row items-center gap-6">
						<span>
							<span className="font-bold">Done tasks:</span> {doneTasks}
						</span>
						<span>
							<span className="font-bold">Progress:</span> {progress.toFixed(2)}%
						</span>
					</div>
					<div className="flex flex-col md:flex-row items-center gap-3">
						<button
							className="btn btn-error"
							onClick={() => {
								setIsModalActive(true);
								document.documentElement.style.overflow = 'hidden';
							}}>
							Delete all tasks
						</button>
						<button
							className="btn btn-neutral"
							onClick={() => {
								if (doneTasksBool) {
									markAllAsUndone();
								} else {
									markAllAsDone();
								}
							}}>
							{doneTasksBool ? 'Mark all as undone' : 'Mark all as done'}
						</button>
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
