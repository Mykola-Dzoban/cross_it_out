import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask, updateProgress } from '../reducer';

const Form = () => {
	const [showAlert, setShowAlert] = useState(false);
	const [timeoutId, setTimeoutId] = useState(null);

	useEffect(() => {
		if (!showAlert) {
			clearTimeout(timeoutId);
		}
	}, [showAlert, timeoutId]);
	const dispatch = useDispatch();

	const date = new Date().toDateString();

	const [task, setTask] = useState('');

	const handleTask = (e) => {
		e.preventDefault();
		setTask(e.target.value);
	};

	// const checkTask = (task) => {
	// 	if (!task?.trim()) {
	// 		return 'input-error';
	// 	}
	// 	return '';
	// };

	return (
		<div className="card bg-base-100 shadow-md w-full md:w-6/12">
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
									const id = setTimeout(() => {
										setShowAlert(false);
									}, 2000);
									setTimeoutId(id);
								}
							}}>
							add task
						</button>
					</div>
					<div id="toastTasks" className="toast toast-end">
						<div className={`alert alert-info ${!showAlert && 'hidden'}`}>
							<span className="font-bold">Task added successfully.</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Form;
