import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '@/utils/auth';

const AuthRoute = ({ children }: { children: React.ReactNode }) => {
	if (!isAuthenticated()) {
		return <Navigate to="/login" replace />;
	}
	return <>{children}</>;
};

export default AuthRoute;
