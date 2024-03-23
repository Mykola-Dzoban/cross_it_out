import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import { Navigate } from 'react-router-dom';

const ThrowAuth = ({ children, callbackPath = '/', needAdmin = false, ...props }) => {
	const isAuthenticated = useIsAuthenticated();
	const isAuth = isAuthenticated();
	// console.log('throw >>> ', isAuth);

	return isAuth ? <Navigate to={callbackPath} replace /> : children;
};
export default ThrowAuth;
