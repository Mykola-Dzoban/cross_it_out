import { LogIn } from 'lucide-react';
import { Button } from 'perkslab-ui';
import { useEffect, useState } from 'react';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import ConfettiExplosion from 'react-confetti-explosion';
import { useLogin } from '../auth';

const WelcomePage = () => {
	const { onSignInWithGoogle } = useLogin();
	const auth = useAuthUser();

	const [isExploding, setIsExploding] = useState(false);
	const [isStart, setIsStart] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setIsExploding(true);
			setIsStart(true);
		}, 1300);
	}, []);

	return (
		<div className="h-[50vh] w-full flex items-center justify-center flex-col gap-5 transition-all duration-300">
			<div className="welcome-block border-teal-700">
				<span className="welcome-text leading-[0] select-none">C</span>
				<div className="welcome-cross bg-red-700"></div>
				{isExploding && <ConfettiExplosion duration={2000} className="absolute" />}
			</div>
			<Button
				type="primary"
				className={` items-center gap-2 ${isStart ? 'flex' : 'hidden'}`}
				onClick={async () => {
					try {
						onSignInWithGoogle();
					} catch (error) {
						console.error('Error during Google login:', error);
					}
				}}>
				{auth ? (
					<>
						<LogIn />
						Enter
					</>
				) : (
					<>
						<LogIn />
						Google
					</>
				)}
			</Button>
		</div>
	);
};
export default WelcomePage;
