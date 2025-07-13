import type { Division, Response } from '@/utils/interface';
import { useFetchWithAuth } from '@/hooks/useFetchWithAuth';

type DivisionResponse = Response<{ divisions: Division[] }>;

export function useDivisionService() {
	const { fetchData } = useFetchWithAuth();

	const getDivisions = () => fetchData<DivisionResponse>('/divisions', { withAuth: true });

	return { getDivisions };
}
