import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, toggleTask, updateProgress } from '../reducer';

const Tasks = () => {
	const tasks = useSelector((state) => state.streak.tasks);
	const dispatch = useDispatch();

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
								<button
									className="btn btn-square bg-red-200 hover:bg-red-400"
									onClick={() => {
										dispatch(deleteTask(id));
										dispatch(updateProgress());
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
							<div className="divider"></div>
						</div>
					);
				})}
			</div>
		</div>
	);
};
export default Tasks;
