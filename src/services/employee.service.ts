import type { Employee, Response } from '@/utils/interface';
import { useFetchWithAuth } from '@/hooks/useFetchWithAuth';

type GetEmployeesResponse = Response<{ employees: Employee[] }>;
type GetEmployeeResponse = Response<{ employee: Employee }>;
type EmployeeResponse = Response;

export function useEmployeeService() {
	const { fetchData, error, errors } = useFetchWithAuth();

	const getEmployees = (params?: { page?: number | null; per_page?: number | null; name?: string | null; division_id?: string | null }) => {
		const query = new URLSearchParams();

		if (params?.page) query.set('page', params.page.toString());
		if (params?.per_page) query.set('per_page', params.per_page.toString());
		if (params?.name) query.set('name', params.name);
		if (params?.division_id) query.set('division_id', params.division_id);

		return fetchData<GetEmployeesResponse>(`/employees?${query.toString()}`, {
			withAuth: true,
		});
	};

	const getEmployee = (id: string) => fetchData<GetEmployeeResponse>(`/employee/${id}`, { withAuth: true });

	const createEmployee = (data: FormData) =>
		fetchData<EmployeeResponse>('/employees', {
			method: 'POST',
			body: data,
			withAuth: true,
		});

	const updateEmployee = (id: string, data: FormData) =>
		fetchData<EmployeeResponse>(`/employees/${id}`, {
			method: 'POST',
			body: data,
			withAuth: true,
		});

	const deleteEmployee = (id: string) =>
		fetchData<EmployeeResponse>(`/employees/${id}`, {
			method: 'DELETE',
			withAuth: true,
		});

	return {
		getEmployees,
		getEmployee,
		createEmployee,
		updateEmployee,
		deleteEmployee,
		error,
		errors,
	};
}
