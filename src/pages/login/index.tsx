import LoginForm from './components/login-form';

const LoginPage = () => {
	return (
		<>
			<div className="text-center">
				<h2 className="text-3xl font-bold text-gray-900 dark:text-white">Sign In</h2>
				<p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Use: admin / pastibisa</p>
			</div>
			<LoginForm />
		</>
	);
};

export default LoginPage;
