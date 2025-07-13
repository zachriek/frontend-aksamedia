import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

const LoginForm: React.FC = () => {
	const { login, errorLogin } = useAuth();
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		login(username, password);
	};

	return (
		<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
			<div>
				<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Username</label>
				<input
					type="text"
					value={username}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
					className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
					required
				/>
			</div>
			<div>
				<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
				<input
					type="password"
					value={password}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
					className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
					required
				/>
			</div>
			{!errorLogin ? null : <div className="text-red-600 text-sm">{errorLogin}</div>}
			<button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200">
				Sign In
			</button>
		</form>
	);
};

export default LoginForm;
