import { Card, CardContent } from 'perkslab-ui';
import ConfettiExplosion from 'react-confetti-explosion';

const CrossCard = ({ tasks, setIsLoading }) => {
	const totalTasks = tasks.length;
	const doneTasks = tasks.filter((task) => task.isDone).length;
	const progress = (doneTasks / totalTasks) * 100 || 0;
	const doneTasksBool = progress === 100;

	return (
		<div
			className="rounded-2xl tooltip tooltip-bottom h-full w-72 sm:w-auto"
			data-tip={`Finish ${tasks.length === 1 ? 'task' : 'tasks'} and cross this word`}>
			<Card>
				<CardContent className="w-full p-5">
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
				</CardContent>
			</Card>
		</div>
	);
};
export default CrossCard;
