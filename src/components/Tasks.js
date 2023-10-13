import { useDispatch, useSelector } from 'react-redux';
import { toggleTask } from '../reducer';

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
							<div className="flex gap-3 items-center">
								<input
									type="checkbox"
									defaultChecked={isDone}
									className="checkbox checkbox-secondary checkbox-sm"
									onChange={() => dispatch(toggleTask(id))}
								/>
								<p className={`text-2xl ${isDone ? 'line-through' : ''}`}>{task}</p>
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
