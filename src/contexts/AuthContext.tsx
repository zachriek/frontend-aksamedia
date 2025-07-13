import React, { createContext, useContext, useEffect, useState } from 'react';
import type { AuthContextType, Response, User } from '@/utils/interface';
import { useFetchWithAuth } from '@/hooks/useFetchWithAuth';

type LoginResponse = Response<{
	token: string;
	admin: User;
}>;

type LogoutResponse = Response;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const { fetchData, error } = useFetchWithAuth();

	useEffect(() => {
		const savedUser = localStorage.getItem('user');
		if (savedUser) {
			try {
				setUser(JSON.parse(savedUser));
			} catch (error) {
				console.error('Error parsing saved user:', error);
				localStorage.removeItem('user');
			}
		}
	}, []);

	const login = async (username: string, password: string) => {
		const data = await fetchData<LoginResponse>('/login', {
			method: 'POST',
			body: JSON.stringify({ username, password }),
		});

		if (data?.data) {
			setUser(data.data.admin);
			localStorage.setItem('token', data.data.token);
			localStorage.setItem('user', JSON.stringify(data.data.admin));
			alert(data.message);
			window.location.href = '/';
		}
	};

	const logout = async () => {
		const data = await fetchData<LogoutResponse>('/logout', {
			method: 'POST',
			withAuth: true,
		});

		if (data) {
			setUser(null);
			localStorage.removeItem('token');
			localStorage.removeItem('user');
			alert(data.message);
			window.location.href = '/login';
		}
	};

	const updateUser = (newData: Partial<User>): void => {
		if (user) {
			const updatedUser: User = { ...user, ...newData };
			setUser(updatedUser);
			localStorage.setItem('user', JSON.stringify(updatedUser));
			alert('Berhasil update user');
		}
	};

	const value: AuthContextType = {
		user,
		login,
		logout,
		errorLogin: error,
		updateUser,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};

export default AuthProvider;
