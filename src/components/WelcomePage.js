import { useEffect, useState } from 'react';
import ConfettiExplosion from 'react-confetti-explosion';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
	const [isExploding, setIsExploding] = useState(false);
	const [isStart, setIsStart] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setIsExploding(true);
			setIsStart(true);
		}, 4500);
	}, []);
	return (
		<div className="h-[50vh] w-full flex items-center justify-center flex-col gap-5 transition-all duration-300">
			<div className="welcome-block border-slate-500">
				<span className="welcome-text">C</span>
				<div className="welcome-cross bg-red-700"></div>
				{isExploding && <ConfettiExplosion duration={2000} className="absolute" />}
			</div>
			<Link to="/main" className={`btn btn-primary ${isStart ? 'flex' : 'hidden'}`}>
				Start
			</Link>
		</div>
	);
};
export default WelcomePage;
