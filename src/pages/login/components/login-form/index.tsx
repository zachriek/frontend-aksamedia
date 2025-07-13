import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import TextInput from '@/components/text-input';
import Button from '@/components/button';

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
			<TextInput label="Username" name="username" value={username} onChange={(val) => setUsername(val)} required />
			<TextInput type="password" label="Password" name="password" value={password} onChange={(val) => setPassword(val)} required />
			{!errorLogin ? null : <div className="text-red-600 text-sm">{errorLogin}</div>}
			<Button type="submit" className="w-full py-2">
				Sign In
			</Button>
		</form>
	);
};

export default LoginForm;
