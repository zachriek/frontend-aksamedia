import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export function useQuerySync(filters: Record<string, any>) {
	const [params, setParams] = useSearchParams();

	useEffect(() => {
		const next = new URLSearchParams();
		let hasChanged = false;

		for (const key in filters) {
			const newValue = filters[key];
			const currentValue = params.get(key);

			if (newValue !== undefined && newValue !== null && newValue !== '') {
				next.set(key, newValue.toString());
				if (currentValue !== newValue.toString()) hasChanged = true;
			} else if (currentValue !== null) {
				hasChanged = true;
			}
		}

		if (hasChanged) {
			setParams(next);
		}
	}, [filters, params, setParams]);
}
