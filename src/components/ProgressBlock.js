import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { markAllAsDone, markAllAsUndone, updateProgress } from '../reducer';
import Modal from './Modal';

const ProgressBlock = () => {
	const dispatch = useDispatch();
	const doneTasks = useSelector((state) => state.streak.doneTasksCount);
	const progress = useSelector((state) => state.streak.progress);
	const doneTasksBool = useSelector((state) => state.streak.doneTasksBool);

	const [isModalActive, setIsModalActive] = useState(false);

	return (
		<>
			<div className="card w-full bg-base-100 border-2 border-gray-300">
				<div className="card-body flex flex-col md:flex-row items-center justify-between gap-6">
					<div className="flex flex-row items-center gap-6">
						<span>
							<span className="font-bold">Done tasks:</span> {doneTasks}
						</span>
						<span>
							<span className="font-bold">Progress:</span> {progress}%
						</span>
					</div>
					<div className="flex flex-row items-center gap-3">
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
									dispatch(markAllAsUndone());
								} else {
									dispatch(markAllAsDone());
								}

								dispatch(updateProgress());
							}}>
							{doneTasksBool ? 'Mark all as undone' : 'Mark all as done'}
						</button>
					</div>
				</div>
			</div>
			{isModalActive && (
				<Modal header="Are you sure you want to delete all tasks?" text={``} setIsModalActive={setIsModalActive} />
			)}
		</>
	);
};
export default ProgressBlock;
