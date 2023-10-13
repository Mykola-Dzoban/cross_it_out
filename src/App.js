// import { nanoid } from 'nanoid';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, increment, toggleTheme } from './reducer';

let el = null;

export const App = () => {
	const streak = useSelector((state) => state.streak.value);
	const months = useSelector((state) => state.streak.months);
	// const tasks = useSelector((state) => state.streak.tasks);

	const dispatch = useDispatch();

	const [task, setTask] = useState('');

	const date = new Date().toDateString();

	const handleTask = (e) => {
		e.preventDefault();
		setTask(e.target.value);
	};

	const handleColor = (count) => {
		if (count === 1) {
			return 'bg-purple-500';
		} else if (count === 2) {
			return 'bg-purple-700';
		} else if (count >= 3) {
			return 'bg-purple-900';
		}
		return 'bg-slate-300';
	};

	const buttonsInMonth = (daysInMonth) => {
		const elements = [];
		for (let i = 1; i < daysInMonth; i++) {
			elements.push(
				<div className="tooltip" data-tip={`${i} ${months[new Date().getMonth()]}, ${new Date().getFullYear()}`}>
					<div
						id={`${i}${months[new Date().getMonth()]}${new Date().getFullYear()}`}
						className={`mr-1 w-4 h-4 rounded-md ${handleColor(streak)} day-streak`}
						onClick={() => {
							dispatch(increment());
						}}></div>
				</div>
			);
		}
		el = elements;
	};

	const handleTheme = () => {
		dispatch(toggleTheme());
	};

	buttonsInMonth(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate());

	return (
		<div className="container mx-auto py-10">
			<div>
				<div className="indicator">
					<span className="indicator-item badge badge-accent">beta</span>
					<h1 className="text-3xl font-bold whitespace-normal">Cross it out</h1>
				</div>
				<h2 className="text-lg font-bold">Your daily streak</h2>
				<h2 className="text-md">{date}</h2>
			</div>

			<label className="swap swap-rotate">
				<input type="checkbox" onClick={handleTheme} />
				{/* sun icon */}
				<svg className="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
				</svg>
				{/* moon icon */}
				<svg className="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
				</svg>
			</label>

			<div className="flex justify-between items-center flex-col md:flex-row ">
				<div className="card w-60 md:w-96 bg-base-100 shadow-md">
					<div className="card-body">
						<h2 className="card-title">{months[new Date().getMonth()]}</h2>
						<div className="w-full flex gap-1 flex-wrap">
							{el?.map((item, index) => {
								return <div key={index}>{item}</div>;
							})}
						</div>
					</div>
				</div>
				<div className="flex flex-col w-[100%] md:w-[50%] gap-4">
					<div className="form-control w-full max-w-xs">
						<label className="label">
							<span className="label-text">What is your task?</span>
						</label>
						<input
							onChange={(e) => handleTask(e)}
							type="text"
							placeholder="Type here"
							className="input input-bordered w-full max-w-xs"
						/>
					</div>
					<div>
						<button className="btn btn-secondary" onClick={() => dispatch(addTask(task))}>
							add task
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
