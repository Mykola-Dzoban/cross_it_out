const Card = () => {
	// const streak = useSelector((state) => state.streak.value);

	// const dispatch = useDispatch();

	return (
		<div className="card w-auto bg-base-100 shadow-md">
			<div className="card-body">
				<div className="w-full flex gap-1 flex-wrap  relative">
					<progress
						className="progress progress-error w-full absolute top-[50%] z-50 transition"
						value={0}
						max="100"></progress>
					<span className=" text-7xl z-0 md:text-9xl">CROSS</span>
				</div>
			</div>
		</div>
	);
};
export default Card;
