import { nanoid } from 'nanoid';
import { Button, Input, Label } from 'perkslab-ui';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { users } from '../config/firebaseConfig';

const Form = ({ tasks, setIsLoading }) => {
	const id = useSelector((state) => state.streak.userId);
	const theme = useSelector((state) => state.streak.theme);

	const [task, setTask] = useState('');

	// const date = new Date().toDateString();

	const handleTasksAdding = async (data) => {
		const updatedTasks = [...tasks, data];
		await users
			.update({ id, tasks: updatedTasks })
			.then((res) => {
				setIsLoading(true);
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
						type="primary"
						onClick={async () => {
							if (task?.trim()) {
								const date = new Date();
								handleTasksAdding({
									id: nanoid(),
									task: task.trim(),
									isDone: false,
									time: date.toUTCString(),
									edited: false,
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
