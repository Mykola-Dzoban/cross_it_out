/* eslint-disable jsx-a11y/anchor-is-valid */
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { Badge, Button, Checkbox } from 'perkslab-ui';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { users } from '../config/firebaseConfig';
import EditModal from './EditModal';
import Modal from './Modal';

const Tasks = ({ tasks, setIsLoading }) => {
	const theme = useSelector((state) => state.streak.theme);
	const userId = useSelector((state) => state.streak.userId);

	const [isModalActive, setIsModalActive] = useState(false);
	const [isEditModalActive, setIsEditModalActive] = useState(false);
	const [taskIdToDelete, setTaskIdToDelete] = useState(null);
	const [taskIdToEdit, setTaskIdToEdit] = useState(null);
	const [taskNameToDelete, setTaskNameToDelete] = useState(null);
	const [taskNameToEdit, setTaskNameToEdit] = useState(null);

	const handleEditingTask = async (id, isDone) => {
		const updatedTasks = tasks.map((taskItem) => {
			if (taskItem.id === id) {
				taskItem.isDone = !isDone;
			}
			return taskItem;
		});
		await users
			.update({ id: userId, tasks: [...updatedTasks] })
			.then((res) => {
				setIsLoading(true);
				toast.warn('Task edited successfully.', {
					theme: `${theme === 'myDark' ? 'dark' : 'light'}`,
				});
			})
			.catch((err) => console.log(err));
	};

	return (
		<>
			<div className=" w-full bg-base-100 border-2 border-zinc-600 p-3">
				<div className="flex flex-col items-center">
					{tasks.map((item) => {
						const { id, task, isDone, time } = item;
						return (
							<div className="w-full" key={id}>
								<Badge type="primary" className="text-zinc-950 text-xs">
									{time}
								</Badge>
								<p className=""></p>
								<div className="flex items-center justify-between">
									<div className="flex gap-3 items-center">
										<Checkbox type="checkbox" checked={isDone} className="" onChange={() => handleEditingTask(id, isDone)} />

										<p className={`text-lg md:text-xl ${isDone ? 'line-through' : ''}`}>{task}</p>
									</div>

									<div className="flex items-center justify-between">
										<div className="dropdown dropdown-bottom dropdown-left">
											<Button type="ghost" className="w-fit px-2 cursor-pointer">
												<label tabIndex={0} className="cursor-pointer">
													<MoreHorizontal />
												</label>
											</Button>
											<ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 w-52 gap-2">
												<li>
													<Button
														type="error"
														className="w-full"
														onClick={() => {
															setIsModalActive(true);
															document.documentElement.style.overflow = 'hidden';
															setTaskIdToDelete(id);
															setTaskNameToDelete(task);
														}}>
														<Trash2 /> Delete task
													</Button>
												</li>
												<li>
													<Button
														type="success"
														className="w-full"
														onClick={() => {
															setIsEditModalActive(true);
															document.documentElement.style.overflow = 'hidden';
															setTaskIdToEdit(id);
															setTaskNameToEdit(task);
														}}>
														<Pencil />
														Edit task
													</Button>
												</li>
											</ul>
										</div>
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
					tasks={tasks}
					taskId={taskIdToDelete}
					setIsModalActive={setIsModalActive}
					setIsLoading={setIsLoading}
				/>
			)}
			{isEditModalActive && (
				<EditModal
					header="Are you sure you want to edit this task?"
					text={taskNameToEdit}
					taskId={taskIdToEdit}
					setIsModalActive={setIsEditModalActive}
					setIsLoading={setIsLoading}
					tasks={tasks}
				/>
			)}
		</>
	);
};
export default Tasks;
