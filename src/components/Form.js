import { Button, Input, Label } from 'perkslab-ui';
import { useState } from 'react';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { dbTasks } from '../config/firebaseConfig';

const Form = ({ tasks, refetchTasks, projectId }) => {
	const auth = useAuthUser();
	const theme = useSelector((state) => state.streak.theme);

	const [task, setTask] = useState('');

	const handleTasksAdding = async (data) => {
		await dbTasks
			.create(data)
			.then((res) => {
				refetchTasks?.();
				toast.success('task added', {
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
		<div className="w-full">
			<div className="flex flex-col w-full gap-4 items-center">
				<form className="w-full flex flex-col items-center gap-2">
					<Label>What is your task for today?</Label>
					<Input onChange={(e) => handleTask(e)} value={task} type="text" placeholder="Type here" className={`w-full max-w-xs`} />
				</form>
				<div>
					<Button
						className="uppercase font-semibold"
						variant="primary"
						onClick={async () => {
							if (task?.trim()) {
								const date = new Date();
								handleTasksAdding({
									text: task.trim(),
									isDone: false,
									createdAt: date.toUTCString(),
									projectId: projectId,
								});
								setTask('');
							}
						}}>
						add task
					</Button>
				</div>
			</div>
		</div>
	);
};
export default Form;
