import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, updateProgress } from '../reducer';
import { toast } from 'react-toastify';

const Form = () => {
	const dispatch = useDispatch();
	const theme = useSelector((state) => state.streak.theme);

	const [task, setTask] = useState('');
	const [showAlert, setShowAlert] = useState(false);

	const date = new Date().toDateString();

	useEffect(() => {
		if (showAlert) {
			toast.success('Task added successfully.', {
				theme: `${theme === 'myDark' ? 'dark' : 'light'}`,
			});
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [showAlert]);

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
							className="btn btn-secondary"
							onClick={() => {
								if (task?.trim()) {
									dispatch(addTask({ id: nanoid(), task: task.trim(), isDone: false }));
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
