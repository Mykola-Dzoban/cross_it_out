// import { nanoid } from 'nanoid';

import { useState } from 'react';

let el = null;

function App() {
	const [count, setCount] = useState(0);
	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	document.documentElement.setAttribute('data-theme', 'light');
	const date = new Date();

	const handleCount = () => {
		let funCount = count;
		funCount++;
		setCount(funCount);
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
				<div className="tooltip " data-tip={`${i} ${months[new Date().getMonth()]}, ${new Date().getFullYear()}`}>
					<button className={`mr-1 w-4 h-4 rounded-md ${handleColor(count)}`} onClick={handleCount}></button>
				</div>
			);
		}
		el = elements;
	};

	buttonsInMonth(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate());

	return (
		<div className="container mx-auto">
			<h1 className="text-3xl font-bold">Cross it out</h1>
			<h2 className="text-xl font-bold">{date.getFullYear()}</h2>
			<div className="card w-96 bg-base-100 shadow-xl">
				<div className="card-body">
					<h2 className="card-title">{months[date.getMonth()]}</h2>
					<div className="w-full flex gap-1 flex-wrap">
						{el?.map((item, index) => {
							return <div key={index}>{item}</div>;
						})}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
