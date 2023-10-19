import { useSelector } from 'react-redux';

const Card = () => {
	const progress = useSelector((state) => state.streak.progress);
	const showSuccessModal = useSelector((state) => state.streak.showSuccessModal);
	const tasks = useSelector((state) => state.streak.tasks);

	return (
		<div className="tooltip tooltip-bottom" data-tip={`Finish ${tasks.length === 1 ? 'task' : 'tasks'} and cross this word`}>
			<div className="card w-auto glass border-2 border-gray-300">
				<div className="card-body">
					<div className="w-full flex gap-1 flex-wrap  relative">
						{progress !== 0 && (
							<progress
								className="progress progress-error w-full absolute top-[50%] z-50 transition"
								value={progress}
								max="100"></progress>
						)}
						<span className=" text-7xl z-0 md:text-9xl">CROSS</span>
					</div>
				</div>
			</div>
			<div id="toastTasks" className="toast toast-end">
				<div className={`alert alert-success ${!showSuccessModal && 'hidden'}`}>
					<span className="text-slate-100 font-bold">All tasks are done.</span>
				</div>
			</div>
		</div>
	);
};
export default Card;
