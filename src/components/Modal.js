import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { users } from '../config/firebaseConfig';

const Modal = ({ taskId, tasks, setIsModalActive, setIsLoading, header, text }) => {
	const auth = useAuthUser();
	const theme = useSelector((state) => state.streak.theme);

	const handleDeletingAllTasks = async () => {
		await users
			.update({ id: auth?.userId, tasks: [] })
			.then((res) => {
				setIsLoading(true);
				toast.warn('All tasks deleted successfully.', {
					theme: `${theme === 'myDark' ? 'dark' : 'light'}`,
				});
			})
			.catch((err) => console.log(err));
	};

	const handleDeletingTask = async (taskId) => {
		const updatedTasks = tasks.filter((taskItem) => taskItem.id !== taskId);
		await users
			.update({ id: auth?.userId, tasks: [...updatedTasks] })
			.then((res) => {
				setIsLoading(true);
				toast.warn('Task deleted successfully.', {
					theme: `${theme === 'myDark' ? 'dark' : 'light'}`,
				});
			})
			.catch((err) => console.log(err));
	};

	if (taskId) {
		return (
			<div className="fixed inset-0 bg-gray-500 bg-opacity-75 backdrop-blur z-10">
				<div className="absolute w-full h-full flex items-center justify-center">
					<div className="card w-80 md:w-96 bg-red-200 text-slate-700">
						<div className="card-body items-center text-center">
							<h2 className="card-title">{header}</h2>
							<p className={`w-full py-2 border-b border-t border-slate-600 font-semibold ${text ? '' : 'hidden'}`}>"{text}"</p>
							<div className="card-actions justify-end">
								<button
									className="btn btn-error"
									onClick={() => {
										document.documentElement.style.overflow = 'auto';
										handleDeletingTask(taskId);
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
						<p className={`w-full py-2 border-b border-t border-slate-600 font-semibold ${text ? '' : 'hidden'}`}>"{text}"</p>
						<div className="card-actions justify-end">
							<button
								className="btn btn-error"
								onClick={() => {
									document.documentElement.style.overflow = 'auto';
									handleDeletingAllTasks();
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
