/* eslint-disable jsx-a11y/anchor-is-valid */
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getTasksByUser } from '../config/firebase';
import { setTasks, toggleTask, updateProgress, updateTasksLayout } from '../reducer';
import EditModal from './EditModal';
import Modal from './Modal';

const Tasks = () => {
	const dispatch = useDispatch();
	const theme = useSelector((state) => state.streak.theme);
	const userId = useSelector((state) => state.streak.userId);
	const tasks = useSelector((state) => state.streak.tasks);


	const handleTasks = async () => {
		const tasksFromDB = await getTasksByUser(userId);
		dispatch(setTasks({ tasks: JSON.parse(tasksFromDB) }));
	};

	const [isModalActive, setIsModalActive] = useState(false);
	const [isEditModalActive, setIsEditModalActive] = useState(false);
	const [taskIdToDelete, setTaskIdToDelete] = useState(null);
	const [taskIdToEdit, setTaskIdToEdit] = useState(null);
	const [taskNameToDelete, setTaskNameToDelete] = useState(null);
	const [taskNameToEdit, setTaskNameToEdit] = useState(null);
	const [showAlert, setShowAlert] = useState(false);
	const [showEditAlert, setShowEditAlert] = useState(false);

	useEffect(() => {
		if (showAlert) {
			toast.warn('Task deleted.', {
				theme: `${theme === 'myDark' ? 'dark' : 'light'}`,
			});
		}
		if (showEditAlert) {
			toast.warn('Task edited successfully.', {
				theme: `${theme === 'myDark' ? 'dark' : 'light'}`,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [showAlert, showEditAlert]);

	useEffect(() => {
		handleTasks();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<div className="card w-full bg-base-100 border-2 border-gray-300">
				<div className="card-body flex flex-col items-center">
					{tasks.map((item) => {
						const { id, task, isDone, time, edited } = item;
						return (
							<div className="w-full" key={id}>
								<div className="flex items-center justify-between">
									<div className="flex gap-3 items-center">
										<input
											type="checkbox"
											checked={isDone}
											className="checkbox checkbox-secondary checkbox-sm"
											onChange={() => {
												dispatch(toggleTask(id));
												dispatch(updateProgress());
												dispatch(updateTasksLayout());
											}}
										/>
										{edited ? (
											<div className="indicator">
												<span className="indicator-item badge badge-xs badge-secondary text-[10px]">
													edited
												</span>
												<p className={`text-2xl ${isDone ? 'line-through' : ''}`}>{task}</p>
											</div>
										) : (
											<p className={`text-2xl ${isDone ? 'line-through' : ''}`}>{task}</p>
										)}
									</div>

									<div className="flex items-center justify-between">
										<p className="text-xs">{time}</p>
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
					taskId={taskIdToDelete}
					setIsModalActive={setIsModalActive}
					setShowAlert={setShowAlert}
				/>
			)}
			{isEditModalActive && (
				<EditModal
					header="Are you sure you want to edit this task?"
					text={taskNameToEdit}
					taskId={taskIdToEdit}
					setIsModalActive={setIsEditModalActive}
					setShowAlert={setShowEditAlert}
				/>
			)}
		</>
	);
};
export default Tasks;
