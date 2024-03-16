import { Button } from 'perkslab-ui';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { users } from '../config/firebaseConfig';
import Modal from './Modal';

const ProgressBlock = ({ tasks, setIsLoading }) => {
	const [isModalActive, setIsModalActive] = useState(false);
	const userId = useSelector((state) => state.streak.userId);
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
			<div className="w-full ">
				<div className="flex flex-col items-center justify-between gap-6">
					<div className="flex flex-row items-center gap-6">
						{/* <span className="h-fit">
							<div className="shadow border h-auto">
								<div className="">
									<div className="">Done</div>
									<div className="">{doneTasks}</div>
								</div>

								<div className="">
									<div className="">All</div>
									<div className="">{totalTasks}</div>{' '}
								</div>
							</div>
						</span> */}
						{/* <span>
							<div className="radial-progress text-green-500" style={{ '--value': progress }} role="progressbar">
								{progress.toFixed(2)}%
							</div>
						</span> */}
						<span className="font-bold uppercase text-3xl">Soon</span>
					</div>
					<div className="flex flex-col xl:flex-row items-center gap-3">
						<Button
							type="error"
							className=""
							onClick={() => {
								setIsModalActive(true);
								document.documentElement.style.overflow = 'hidden';
							}}>
							Delete all tasks
						</Button>
						<Button
							type="neutral"
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
