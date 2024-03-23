import { useState } from 'react';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { users } from '../config/firebaseConfig';

const EditModal = ({ taskId, setIsModalActive, tasks, setIsLoading, header, text }) => {
	const auth = useAuthUser();
	const theme = useSelector((state) => state.streak.theme);

	const [task, setTask] = useState(text);

	const date = new Date();

	const handleEditTask = async (taskId, text) => {
		const updatedTasks = tasks.map((taskItem) => {
			if (taskItem.id === taskId) {
				taskItem.task = text;
				taskItem.time = `${date.toGMTString()}`;
			}
			return taskItem;
		});
		await users
			.update({ id: auth?.userId, tasks: [...updatedTasks] })
			.then((res) => {
				setIsLoading(true);
				toast.warn('Task edited successfully.', {
					theme: `${theme === 'myDark' ? 'dark' : 'light'}`,
				});
			})
			.catch((err) => console.log(err));
	};

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
						<p className={`w-full py-2 border-b border-t border-slate-600 font-semibold ${text ? '' : 'hidden'}`}>"{text}"</p>
						<input type="text" onChange={(e) => handleTask(e)} className={`input input-bordered w-full max-w-xs`} value={task} />
						<div className="card-actions justify-end">
							<button
								className="btn btn-error"
								onClick={() => {
									handleEditTask(taskId, task);
									setIsModalActive(false);
									document.documentElement.style.overflow = 'auto';
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
