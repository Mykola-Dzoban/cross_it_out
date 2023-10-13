import { nanoid } from 'nanoid';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask, updateProgress } from '../reducer';

const Form = () => {
	const dispatch = useDispatch();

	const date = new Date().toDateString();

	const [task, setTask] = useState('');

	const handleTask = (e) => {
		e.preventDefault();
		setTask(e.target.value);
	};
	return (
		<div className="card bg-base-100 shadow-md w-full md:w-6/12">
			<div className="card-body">
				<div className="flex flex-col w-full gap-4 items-center">
					<div className="form-control w-full flex flex-col items-center">
						<label className="label">
							<span className="label-text">What is your task for today?</span>
						</label>
						<input
							onChange={(e) => handleTask(e)}
							value={task}
							type="text"
							placeholder="Type here"
							className="input input-bordered w-full max-w-xs"
						/>
						<label className="label">
							<span className="label-text-alt">{date}</span>
						</label>
					</div>
					<div>
						<button
							className="btn btn-secondary"
							onClick={() => {
								dispatch(addTask({ id: nanoid(), task, isDone: false }));
								dispatch(updateProgress());
								setTask('');
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
