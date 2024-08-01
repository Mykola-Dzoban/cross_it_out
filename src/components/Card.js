import { Card, CardContent } from 'perkslab-ui';
import ConfettiExplosion from 'react-confetti-explosion';

const CrossCard = ({ tasks, refetchTasks }) => {
	const totalTasks = tasks.length;
	const doneTasks = tasks.filter((task) => task.isDone).length;
	const progress = (doneTasks / totalTasks) * 100 || 0;
	const doneTasksBool = progress === 100;

	return (
		<div
			className="rounded-2xl tooltip tooltip-bottom h-full w-72 sm:w-auto"
			data-tip={`Finish ${tasks.length === 1 ? 'task' : 'tasks'} and cross this word`}>
			<Card className="w-full">
				<CardContent className="w-full">
					<div className="w-full flex gap-1 flex-wrap relative items-center justify-center">
						<span className="text-6xl text-center sm:text-7xl z-0 md:text-9xl">
							{progress !== 0 && (
								<progress
									className="w-full absolute top-[50%] z-50 transition h-2 md:h-4"
									value={progress}
									min="0"
									max="100"></progress>
							)}
							CROSS
						</span>
						{doneTasksBool && <ConfettiExplosion duration={2000} className="absolute left-[50%]" />}
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
export default CrossCard;
