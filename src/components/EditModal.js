import { Button, Card, CardHeader, Input } from 'perkslab-ui';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { dbTasks } from '../config/firebaseConfig';

const EditModal = ({ taskId, setIsModalActive, refetchTasks, header, text }) => {
	const theme = useSelector((state) => state.streak.theme);

	const [task, setTask] = useState(text);

	const handleEditTask = async (taskId, text) => {
		await dbTasks
			.update({ id: taskId, text: text })
			.then((res) => {
				refetchTasks?.();
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
				<Card>
					<CardHeader>
						<h2 className="text-2xl break-words font-bold">{header}</h2>
					</CardHeader>
					<div className="items-center text-center">
						<Input type="text" onChange={(e) => handleTask(e)} className={`w-full max-w-xs`} value={task} />
						<div className="flex gap-2 justify-end mt-2">
							<Button
								className=""
								variant="secondary"
								onClick={() => {
									handleEditTask(taskId, task);
									setIsModalActive(false);
									document.documentElement.style.overflow = 'auto';
								}}>
								Edit
							</Button>
							<Button
								className=""
								variant="outline"
								onClick={() => {
									setIsModalActive(false);
									document.documentElement.style.overflow = 'auto';
								}}>
								Cancel
							</Button>
						</div>
					</div>
				</Card>
			</div>
		</div>
	);
};
export default EditModal;
