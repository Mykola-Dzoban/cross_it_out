import { useDispatch } from 'react-redux';
import { deleteAllTasks, deleteTask, updateProgress } from '../reducer';

const Modal = ({ taskId, setIsModalActive, setShowAlert, header, text }) => {
	const dispatch = useDispatch();

    if (taskId) {
        return (
			<div className="fixed inset-0 bg-gray-500 bg-opacity-75 backdrop-blur z-10">
				<div className="absolute w-full h-full flex items-center justify-center">
					<div className="card w-80 md:w-96 bg-red-200 text-slate-700">
						<div className="card-body items-center text-center">
							<h2 className="card-title">{header}</h2>
							<p className={`w-full py-2 border-b border-t border-slate-600 font-semibold ${text ? '' : 'hidden'}`}>
								"{text}"
							</p>
							<div className="card-actions justify-end">
								<button
									className="btn btn-error"
									onClick={() => {
										document.documentElement.style.overflow = 'auto';
										dispatch(deleteTask(taskId));
										dispatch(updateProgress());
										setShowAlert(true);
										setTimeout(() => {
											setShowAlert(false);
										}, 2000);
										setIsModalActive(false);
									}}>
									Delete
								</button>
								<button
									className="btn btn-ghost"
									onClick={() => {
										document.documentElement.style.overflow = 'auto';
										setIsModalActive(false);
									}}>
									Cancel
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
    }

	return (
		<div className="fixed inset-0 bg-gray-500 bg-opacity-75 backdrop-blur z-10">
			<div className="absolute w-full h-full flex items-center justify-center">
				<div className="card w-80 md:w-96 bg-red-200 text-slate-700">
					<div className="card-body items-center text-center">
						<h2 className="card-title">{header}</h2>
						<p className={`w-full py-2 border-b border-t border-slate-600 font-semibold ${text ? '' : 'hidden'}`}>
							"{text}"
						</p>
						<div className="card-actions justify-end">
							<button
								className="btn btn-error"
								onClick={() => {
									dispatch(deleteAllTasks());
									dispatch(updateProgress());
									setIsModalActive(false);
								}}>
								Delete
							</button>
							<button
								className="btn btn-ghost"
								onClick={() => {
									setIsModalActive(false);
									document.documentElement.style.overflow = 'auto';
								}}>
								Cancel
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Modal;
