import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, toggleTask, updateProgress } from '../reducer';

const Tasks = () => {
	const [showAlert, setShowAlert] = useState(false);
	const [timeoutId, setTimeoutId] = useState(null);

	const tasks = useSelector((state) => state.streak.tasks);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!showAlert) {
			clearTimeout(timeoutId);
		}
	}, [showAlert, timeoutId]);

	return (
		<div className="card w-full bg-base-100 shadow-md">
			<div className="card-body flex flex-col items-center">
				{tasks.map((item) => {
					const { id, task, isDone } = item;
					return (
						<div className="w-full" key={id}>
							<div className="flex justify-between">
								<div className="flex gap-3 items-center">
									<input
										type="checkbox"
										defaultChecked={isDone}
										className="checkbox checkbox-secondary checkbox-sm"
										onChange={() => {
											dispatch(toggleTask(id));
											dispatch(updateProgress());
										}}
									/>
									<p className={`text-2xl ${isDone ? 'line-through' : ''}`}>{task}</p>
								</div>
								<div className="tooltip tooltip-bottom" data-tip="Delete task">
									<button
										className="btn btn-square bg-red-400 hover:bg-red-600"
										onClick={() => {
											dispatch(deleteTask(id));
											dispatch(updateProgress());
											setShowAlert(true);
											const idTime = setTimeout(() => {
												setShowAlert(false);
											}, 2000);
											setTimeoutId(idTime);
										}}>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-6 w-6"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M6 18L18 6M6 6l12 12"
											/>
										</svg>
									</button>
								</div>
							</div>
							<div className="divider"></div>
						</div>
					);
				})}
				<div id="toastTasks" className="toast toast-end">
					<div className={`alert alert-warning bg-orange-400 ${!showAlert && 'hidden'}`}>
						<span className="text-slate-100 font-bold">Task deleted.</span>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Tasks;
