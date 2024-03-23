import { signInWithPopup } from 'firebase/auth';
import { useCallback } from 'react';
import createStore from 'react-auth-kit/createStore';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { useNavigate } from 'react-router-dom';
import { firebaseAuth, firebaseProvider, users } from '../config/firebaseConfig';

export const authStore = createStore({
	authName: '_auth',
	authType: 'cookie',
	cookieDomain: window.location.hostname,
	cookieSecure: window.location.protocol === 'https:',
});

export const useLogin = () => {
	const signIn = useSignIn();
	const signOut = useSignOut();

	const navigate = useNavigate();

	const onSubmit = useCallback(
		(token, userState) => {
			if (
				signIn({
					auth: {
						token: token,
						type: 'Bearer',
					},
					userState: {
						...userState,
					},
				})
			) {
				navigate('/');
			}
		},
		[navigate, signIn]
	);

	const onSignInWithGoogle = useCallback(async () => {
		try {
			const usersFirestore = await users.getAll();

			const result = await signInWithPopup(firebaseAuth, firebaseProvider);
			// const additionalResult = getAdditionalUserInfo(result);

			const userInfo = result.user;
			// const additionalUserInfo = additionalResult?.profile;.

			const user = usersFirestore?.find((user) => user?.email === userInfo?.email);

			if (!user) {
				await users.create({
					displayName: userInfo?.displayName ?? undefined,
					email: userInfo?.email ?? undefined,
					image: userInfo?.photoURL ?? undefined,
					isAdmin: false,
					tasks: [],
				});
			}

			onSubmit(result?.user?.accessToken ?? undefined, {
				id: userInfo?.uid ?? undefined,
				name: userInfo?.displayName ?? undefined,
				email: userInfo?.email ?? undefined,
				image: userInfo?.photoURL ?? undefined,
				isAdmin: user?.isAdmin,
				userId: user?.id,
			});
		} catch (error) {
			console.error(error);
		}
	}, [onSubmit]);

	const onSignOut = useCallback(() => {
		signOut();
		navigate('/welcome');
	}, [navigate, signOut]);

	return { onSignInWithGoogle, onSignOut };
};
