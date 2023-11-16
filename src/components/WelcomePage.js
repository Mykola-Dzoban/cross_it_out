import { LogIn } from 'lucide-react';
import { useEffect, useState } from 'react';
import ConfettiExplosion from 'react-confetti-explosion';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { users } from '../config/firebaseConfig';
import { login } from '../reducer';

const WelcomePage = () => {
	const isAuth = useSelector((state) => state.streak.isAuth);

	const dispatch = useDispatch();

	const [isExploding, setIsExploding] = useState(false);
	const [isStart, setIsStart] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		setTimeout(() => {
			setIsExploding(true);
			setIsStart(true);
		}, 1300);
	}, []);
	return (
		<div className="h-[50vh] w-full flex items-center justify-center flex-col gap-5 transition-all duration-300">
			<div className="welcome-block border-slate-500">
				<span className="welcome-text">C</span>
				<div className="welcome-cross bg-red-700"></div>
				{isExploding && <ConfettiExplosion duration={2000} className="absolute" />}
			</div>
			<button
				className={`btn btn-primary font-bold ${isStart ? 'flex' : 'hidden'}`}
				onClick={async () => {
					if (isAuth) {
						navigate('/main');
					} else {
						try {
							const user = await users.loginWithGoogle();
							dispatch(login());
							localStorage.setItem('userId', JSON.stringify(user.id));
							navigate('/main');
						} catch (error) {
							console.error('Error during Google login:', error);
						}
					}
				}}>
				{isAuth ? (
					<>
						<LogIn /> Enter
					</>
				) : (
					<>
						<LogIn /> Google
					</>
				)}
			</button>
		</div>
	);
};
export default WelcomePage;
