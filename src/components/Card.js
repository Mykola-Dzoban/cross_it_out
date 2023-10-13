import { useSelector } from "react-redux";

const Card = () => {
	const progress = useSelector((state) => state.streak.progress);

	return (
		<div className="card w-auto bg-base-100 shadow-md">
			<div className="card-body">
				<div className="w-full flex gap-1 flex-wrap  relative">
					{progress !== 0 && (
						<progress
							className="progress progress-error w-full absolute top-[50%] z-50 transition"
							value={progress}
							max="100"></progress>
					)}
					<span className=" text-7xl z-0 md:text-9xl">CROSS</span>
				</div>
			</div>
		</div>
	);
};
export default Card;
