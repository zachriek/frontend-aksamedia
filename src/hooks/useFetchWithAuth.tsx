import { useState } from 'react';

interface FetchOptions extends RequestInit {
	withAuth?: boolean;
}

export interface ValidationErrors {
	[key: string]: string[];
}

export function useFetchWithAuth() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [errors, setErrors] = useState<ValidationErrors | null>(null);

	const fetchData = async <T = any,>(url: string, options: FetchOptions = {}): Promise<T | null> => {
		setLoading(true);
		setError(null);
		setErrors(null);

		try {
			const headers: Record<string, string> = {
				...(options.headers as Record<string, string>),
			};

			if (!(options.body instanceof FormData)) {
				headers['Content-Type'] = 'application/json';
			}

			if (options.withAuth) {
				const token = localStorage.getItem('token');
				if (token) {
					headers['Authorization'] = `Bearer ${token}`;
				}
			}

			const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`, {
				...options,
				headers,
			});

			if (response.status === 401) {
				localStorage.removeItem('token');
				localStorage.removeItem('user');
				window.location.href = '/login';
				return null;
			}

			const data = await response.json();

			if (!response.ok) {
				setError(data.message || 'Request failed');
				if (data.errors) {
					setErrors(data.errors);
				}
				return null;
			}

			return data;
		} catch (err: any) {
			setError(err.message || 'Error');
			return null;
		} finally {
			setLoading(false);
		}
	};

	return { fetchData, loading, error, errors };
}
