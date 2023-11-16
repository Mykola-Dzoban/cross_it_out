import ConfettiExplosion from 'react-confetti-explosion';

const Card = ({ tasks, setIsLoading }) => {
	const totalTasks = tasks.length;
	const doneTasks = tasks.filter((task) => task.isDone).length;
	const progress = (doneTasks / totalTasks) * 100 || 0;
	const doneTasksBool = progress === 100;

	return (
		<div
			className="brounded-2xl tooltip tooltip-bottom h-full w-72 sm:w-auto"
			data-tip={`Finish ${tasks.length === 1 ? 'task' : 'tasks'} and cross this word`}>
			<div className="card w-full backdrop-opacity-10 backdrop-invert bg-white/10 ">
				<div className="card-body">
					<div className="w-full flex gap-1 flex-wrap relative items-center justify-center">
						{progress !== 0 && (
							<progress
								className="progress progress-error w-full absolute top-[50%] z-50 transition"
								value={progress}
								max="100"></progress>
						)}
						<span className="text-6xl text-center sm:text-7xl z-0 md:text-9xl">CROSS</span>
						{doneTasksBool && <ConfettiExplosion duration={2000} className="absolute left-[50%]" />}
					</div>
				</div>
			</div>
		</div>
	);
};
export default Card;
