import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editTask, updateProgress } from '../reducer';

const EditModal = ({ taskId, setIsModalActive, setShowAlert, header, text }) => {
	const dispatch = useDispatch();

	const [task, setTask] = useState(text);

	const handleTask = (e) => {
		e.preventDefault();
		setTask(e.target.value);
	};

	return (
		<div className="fixed inset-0 bg-gray-500 bg-opacity-75 backdrop-blur z-10">
			<div className="absolute w-full h-full flex items-center justify-center">
				<div className="card w-80 md:w-96 bg-red-200 text-slate-700">
					<div className="card-body items-center text-center">
						<h2 className="card-title">{header}</h2>
						<p className={`w-full py-2 border-b border-t border-slate-600 font-semibold ${text ? '' : 'hidden'}`}>
							"{text}"
						</p>
						<input
							type="text"
							onChange={(e) => handleTask(e)}
							className={`input input-bordered w-full max-w-xs`}
							value={task}
						/>
						<div className="card-actions justify-end">
							<button
								className="btn btn-error"
								onClick={() => {
									dispatch(editTask({ id: taskId, task }));
									dispatch(updateProgress());
									setShowAlert(true);
									setTimeout(() => {
										setShowAlert(false);
									}, 2000);
									setIsModalActive(false);
								}}>
								Edit
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
export default EditModal;
