import { nanoid } from 'nanoid';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { users } from '../config/firebaseConfig';

const Form = ({ tasks, setIsLoading }) => {
	const id = useSelector((state) => state.streak.userId);
	const theme = useSelector((state) => state.streak.theme);

	const [task, setTask] = useState('');

	const date = new Date().toDateString();

	const handleTasksAdding = async (data) => {
		const updatedTasks = [...tasks, data];
		await users
			.update({ id, tasks: updatedTasks })
			.then((res) => {
				setIsLoading(true);
				toast.success('task added', {
					theme: `${theme === 'myDark' ? 'dark' : 'light'}`,
				});
			})
			.catch((err) => console.log(err));
	};

	const handleTask = (e) => {
		e.preventDefault();
		setTask(e.target.value);
	};

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
									handleTasksAdding({
										id: nanoid(),
										task: task.trim(),
										isDone: false,
										time: `${date.toUTCString()}`,
										edited: false,
									});
									setTask('');
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
