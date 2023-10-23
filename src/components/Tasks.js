/* eslint-disable jsx-a11y/anchor-is-valid */
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { toggleTask, updateProgress } from '../reducer';
import Modal from './Modal';

const Tasks = () => {
	const dispatch = useDispatch();
	const tasks = useSelector((state) => state.streak.tasks);
	const theme = useSelector((state) => state.streak.theme);

	const [isModalActive, setIsModalActive] = useState(false);
	const [taskIdToDelete, setTaskIdToDelete] = useState(null);
	const [taskNameToDelete, setTaskNameToDelete] = useState(null);
	const [showAlert, setShowAlert] = useState(false);

	useEffect(() => {
		if (showAlert) {
			toast.warn('Task deleted.', {
				theme: `${theme === 'myDark' ? 'dark' : 'light'}`,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [showAlert]);

	return (
		<>
			<div className="card w-full bg-base-100 border-2 border-gray-300">
				<div className="card-body flex flex-col items-center">
					{tasks.map((item) => {
						const { id, task, isDone } = item;
						return (
							<div className="w-full" key={id}>
								<div className="flex justify-between">
									<div className="flex gap-3 items-center">
										<input
											type="checkbox"
											defaultChecked={isDone}
											checked={isDone}
											className="checkbox checkbox-secondary checkbox-sm"
											onChange={() => {
												dispatch(toggleTask(id));
												dispatch(updateProgress());
											}}
										/>
										<p className={`text-2xl ${isDone ? 'line-through' : ''}`}>{task}</p>
									</div>

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
											<li className='disabled'>
												<a>
													<div className="indicator">
														<span className="indicator-item badge badge-accent font-bold">soon</span>
														<Pencil />
													</div>{' '}
													Edit task
												</a>
											</li>
										</ul>
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
		</>
	);
};
export default Tasks;
