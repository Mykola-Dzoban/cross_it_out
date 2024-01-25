/* eslint-disable jsx-a11y/anchor-is-valid */
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { Badge } from 'perkslab-ui';
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
			<div className="card w-full bg-base-100 border-2 border-gray-300">
				<div className="card-body flex flex-col items-center">
					{tasks.map((item) => {
						const { id, task, isDone, time, edited } = item;
						return (
							<div className="w-full" key={id}>
								<Badge type="primary" className="text-zinc-950 text-xs">
									{time}
								</Badge>
								<p className=""></p>
								<div className="flex items-center justify-between">
									<div className="flex gap-3 items-center">
										<input
											type="checkbox"
											checked={isDone}
											className="checkbox checkbox-secondary checkbox-sm"
											onChange={() => handleEditingTask(id, isDone)}
										/>
										{edited ? (
											<div className="indicator">
												<span className="indicator-item badge badge-xs badge-secondary text-[10px]">
													edited
												</span>
												<p className={`text-2xl ${isDone ? 'line-through' : ''}`}>{task}</p>
											</div>
										) : (
											<p className={`text-lg md:text-2xl ${isDone ? 'line-through' : ''}`}>{task}</p>
										)}
									</div>

									<div className="flex items-center justify-between">
										<div className="dropdown dropdown-bottom dropdown-left">
											<label tabIndex={0} className="btn btn-ghost m-1">
												<MoreHorizontal />
											</label>
											<ul
												tabIndex={0}
												className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 gap-2">
												<li>
													<a
														className="bg-red-400 hover:bg-red-600 text-slate-100 font-bold"
														onClick={() => {
															setIsModalActive(true);
															document.documentElement.style.overflow = 'hidden';
															setTaskIdToDelete(id);
															setTaskNameToDelete(task);
														}}>
														<Trash2 /> Delete task
													</a>
												</li>
												<li>
													<a
														onClick={() => {
															setIsEditModalActive(true);
															document.documentElement.style.overflow = 'hidden';
															setTaskIdToEdit(id);
															setTaskNameToEdit(task);
														}}>
														<div className="indicator">
															<span className="indicator-item badge badge-accent font-bold">
																beta
															</span>
															<Pencil />
														</div>{' '}
														Edit task
													</a>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<div className="divider"></div>
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
