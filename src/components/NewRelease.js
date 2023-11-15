import { BadgePlus } from 'lucide-react';

const NewRelease = () => {
	return (
		<div className="flex flex-col items-center relative">
			<button className="btn btn-neutral absolute top-0 left-0">
				<BadgePlus />
			</button>
		</div>
	);
};
export default NewRelease;
