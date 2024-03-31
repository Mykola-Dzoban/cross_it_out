import { Button, Card, CardContent, CardFooter, CardHeader } from 'perkslab-ui';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { dbTasks, users } from '../config/firebaseConfig';

const Modal = ({ taskId, setIsModalActive, header, text, refetchTasks,...props }) => {
	const auth = useAuthUser();
	const theme = useSelector((state) => state.streak.theme);

	const handleDeletingAllTasks = async () => {
		await users
			.update({ id: auth?.userId, tasks: [] })
			.then((res) => {
				toast.warn('All tasks deleted successfully.', {
					theme: `${theme === 'myDark' ? 'dark' : 'light'}`,
				});
			})
			.catch((err) => console.log(err));
	};

	const handleDeletingTask = async (taskId) => {
		await dbTasks
			.delete(taskId)
			.then((res) => {
				refetchTasks?.();
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
					<Card>
						<CardHeader>
							<h2 className="text-xl font-semibold">{header}</h2>
						</CardHeader>
						<CardContent className="text-center">
							<p className={`w-full py-2 border-b border-t border-slate-600 font-semibold ${text ? '' : 'hidden'}`}>"{text}"</p>
						</CardContent>
						<CardFooter className="justify-end">
							<Button
								className=""
								variant="error"
								onClick={() => {
									document.documentElement.style.overflow = 'auto';
									handleDeletingTask(taskId);
									setIsModalActive(false);
								}}>
								Delete
							</Button>
							<Button
								className="btn btn-ghost"
								onClick={() => {
									document.documentElement.style.overflow = 'auto';
									setIsModalActive(false);
								}}>
								Cancel
							</Button>
						</CardFooter>
					</Card>
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
