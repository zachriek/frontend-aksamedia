import { useEffect, useState } from 'react';

interface Option {
	label: string;
	value: string;
}

interface UseSelectOptionsResult {
	options: Option[];
	loading: boolean;
	error: string | null;
	refetch: () => void;
}

export function useSelectOptions<T>(fetchFn: () => Promise<{ data: Record<string, T[]> }>, key: keyof T, labelKey: keyof T): UseSelectOptionsResult {
	const [options, setOptions] = useState<Option[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const load = async () => {
		try {
			setLoading(true);
			const res = await fetchFn();
			const list = Object.values(res.data)[0];
			const mapped = list.map((item: any) => ({
				value: item[key],
				label: item[labelKey],
			}));
			setOptions(mapped);
		} catch (e: any) {
			setError(e.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		load();
	}, []);

	return { options, loading, error, refetch: load };
}
