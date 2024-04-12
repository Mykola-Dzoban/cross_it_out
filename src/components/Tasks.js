/* eslint-disable jsx-a11y/anchor-is-valid */
import { Pencil, Trash2 } from 'lucide-react';
import { Badge, Button, Checkbox } from 'perkslab-ui';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { dbTasks } from '../config/firebaseConfig';
import EditModal from './EditModal';
import Modal from './Modal';

const Tasks = ({ tasks, refetchTasks }) => {
	const theme = useSelector((state) => state.streak.theme);

	const [isModalActive, setIsModalActive] = useState(false);
	const [isEditModalActive, setIsEditModalActive] = useState(false);
	const [taskIdToDelete, setTaskIdToDelete] = useState(null);
	const [taskIdToEdit, setTaskIdToEdit] = useState(null);
	const [taskNameToDelete, setTaskNameToDelete] = useState(null);
	const [taskNameToEdit, setTaskNameToEdit] = useState(null);

	const handleEditingTask = async (id, isDone) => {
		await dbTasks
			.update({ id: id, isDone: !isDone })
			.then((res) => {
				refetchTasks?.();
				toast.warn('Task edited successfully.', {
					theme: `${theme === 'myDark' ? 'dark' : 'light'}`,
				});
			})
			.catch((err) => console.log(err));
	};

	return (
		<>
			<div className=" w-full bg-base-100 p-3">
				<div className="flex flex-col items-center">
					{tasks.map((item) => {
						const { id, text, isDone, createdAt } = item;
						return (
							<div className="w-full" key={id}>
								<Badge variant="primary" className="text-zinc-950 text-xs flex items-center gap-1">
									<span className="font-bold">Created at: </span>
									{createdAt}
								</Badge>
								<p className=""></p>
								<div className="flex items-center justify-between">
									<div className="flex gap-3 items-center">
										<Checkbox type="checkbox" checked={isDone} className="" onChange={() => handleEditingTask(id, isDone)} />

										<p className={`text-lg md:text-xl ${isDone ? 'line-through' : ''}`}>{text}</p>
									</div>

									<div className="flex gap-2 items-center justify-between">
										<Button
											variant="error"
											className="p-2 flex items-center gap-2"
											onClick={() => {
												setIsModalActive(true);
												document.documentElement.style.overflow = 'hidden';
												setTaskIdToDelete(id);
												setTaskNameToDelete(text);
											}}>
											<Trash2 className="size-4 md:size-6" />
										</Button>

										<Button
											variant="success"
											className="p-2 flex items-center gap-2"
											onClick={() => {
												setIsEditModalActive(true);
												document.documentElement.style.overflow = 'hidden';
												setTaskIdToEdit(id);
												setTaskNameToEdit(text);
											}}>
											<Pencil className="size-4 md:size-6" />
										</Button>
									</div>
								</div>
								<div className="border-b border-zinc-600 my-2"></div>
							</div>
						);
					})}
				</div>
			</div>
			{isModalActive && (
				<Modal
					header="Are you sure you want to delete this task?"
					text={taskNameToDelete}
					taskId={taskIdToDelete}
					setIsModalActive={setIsModalActive}
					refetchTasks={refetchTasks}
				/>
			)}
			{isEditModalActive && (
				<EditModal
					header="Are you sure you want to edit this task?"
					text={taskNameToEdit}
					taskId={taskIdToEdit}
					setIsModalActive={setIsEditModalActive}
					refetchTasks={refetchTasks}
				/>
			)}
		</>
	);
};
export default Tasks;
