import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getTasksByUser, updateUserData } from '../config/firebase';
import { setTasks, updateProgress } from '../reducer';

const Form = () => {
	const dispatch = useDispatch();
	const theme = useSelector((state) => state.streak.theme);
	const userId = useSelector((state) => state.streak.userId);

	const [task, setTask] = useState('');
	const [showAlert, setShowAlert] = useState(false);

	const date = new Date().toDateString();

	const handleTasksAdding = async (data) => {
		const tasksFromDB = await getTasksByUser(userId);
		await updateUserData(userId, { tasks: JSON.stringify([...(JSON.parse(tasksFromDB) ?? []), data]) });
		dispatch(setTasks({ tasks: [...(JSON.parse(tasksFromDB) ?? []), data] }));
	};

	const handleTask = (e) => {
		e.preventDefault();
		setTask(e.target.value);
	};

	useEffect(() => {
		if (showAlert) {
			toast.success('Task added successfully.', {
				theme: `${theme === 'myDark' ? 'dark' : 'light'}`,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [showAlert]);

	return (
		<div className="card bg-base-100 w-full lg:w-6/12 border-2 border-gray-300">
			<div className="card-body">
				<div className="flex flex-col w-full gap-4 items-center">
					<form className="form-control w-full flex flex-col items-center">
						<label className="label">
							<span className="label-text">What is your task for today?</span>
						</label>
						<input
							onChange={(e) => handleTask(e)}
							value={task}
							type="text"
							placeholder="Type here"
							className={`input input-bordered w-full max-w-xs`}
						/>
						<label className="label">
							<span className="label-text-alt">{date}</span>
						</label>
					</form>
					<div>
						<button
							className="btn btn-primary"
							onClick={async () => {
								if (task?.trim()) {
									const date = new Date();
									// dispatch(
									// 	addTask({
									// 		id: nanoid(),
									// 		task: task.trim(),
									// 		isDone: false,
									// 		time: `${date.toUTCString()}`,
									// 		edited: false,
									// 	})
									// );
									handleTasksAdding({
										id: nanoid(),
										task: task.trim(),
										isDone: false,
										time: `${date.toUTCString()}`,
										edited: false,
									});
									dispatch(updateProgress());
									setTask('');
									setShowAlert(true);
									setTimeout(() => {
										setShowAlert(false);
									}, 2000);
								}
							}}>
							add task
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Form;
