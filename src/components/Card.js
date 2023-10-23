import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Card = () => {
	const progress = useSelector((state) => state.streak.progress);
	const showSuccessModal = useSelector((state) => state.streak.showSuccessModal);
	const tasks = useSelector((state) => state.streak.tasks);
	const theme = useSelector((state) => state.streak.theme);

	useEffect(() => {
		if (showSuccessModal) {
			toast.success('All tasks are done.', {
				theme: `${theme === 'myDark' ? 'dark' : 'light'}`,
			});
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [showSuccessModal]);

	return (
		<div
			className="border-2 border-gray-300 rounded-2xl tooltip tooltip-bottom h-full"
			data-tip={`Finish ${tasks.length === 1 ? 'task' : 'tasks'} and cross this word`}>
			<div className="card w-auto glass ">
				<div className="card-body">
					<div className="w-full flex gap-1 flex-wrap  relative">
						{progress !== 0 && (
							<progress
								className="progress progress-error w-full absolute top-[50%] z-50 transition"
								value={progress}
								max="100"></progress>
						)}
						<span className="text-7xl z-0 md:text-9xl">CROSS</span>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Card;
