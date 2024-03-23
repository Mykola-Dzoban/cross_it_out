import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import { Navigate } from 'react-router-dom';

const RequiredAuth = ({ children, callbackPath = '/welcome', needAdmin = false, ...props }) => {
	const isAuthenticated = useIsAuthenticated();
	const isAuth = isAuthenticated();
	const auth = useAuthUser();

	if (!isAuth) {
		return <Navigate to={callbackPath} replace />;
	}
	if (needAdmin) {
		if (!auth.admin) {
			return <Navigate to={callbackPath} replace />;
		}
	}
	return children;
};
export default RequiredAuth;
