import { useEmployeeService } from '@/services/employee.service';
import { useDivisionService } from '@/services/division.service';
import type { Division, Employee } from '@/utils/interface';
import { useCrudModule } from '@/hooks/useCrudModule';
import { useSelectOptions } from '@/hooks/useSelectOptions';
import { useQuerySync } from '@/hooks/useQuerySync';
import { useSearchParams } from 'react-router-dom';

export type EmployeeFormData = Omit<Employee, 'id' | 'image' | 'division'> & {
	image: string | File | null;
	division: string;
};

export type EditEmployeeFormData = Omit<Employee, 'image' | 'division'> & {
	image: string | File | null;
	division: string;
};

export function useEmployeeModule() {
	const { getEmployees, createEmployee, updateEmployee, deleteEmployee, errors } = useEmployeeService();
	const { getDivisions } = useDivisionService();
	const [params] = useSearchParams();

	const initialSearch = params.get('search') ?? '';
	const initialPage = parseInt(params.get('page') ?? '1');
	const initialPerPage = parseInt(params.get('per_page') ?? '10');
	const initialDivision = params.get('division_id') ?? '';

	const {
		items,
		loading,
		formData,
		editingItem,
		currentPage,
		itemsPerPage,
		totalItems,
		totalPage,
		isModalOpen,
		searchTerm,
		errors: crudErrors,
		filter,
		handlers,
	} = useCrudModule<Employee, EmployeeFormData | EditEmployeeFormData>({
		fetchFn: getEmployees,
		createFn: createEmployee,
		updateFn: updateEmployee,
		deleteFn: deleteEmployee,
		defaultFilter: { division_id: initialDivision },
		defaultSearch: initialSearch,
		defaultPage: initialPage,
		defaultPerPage: initialPerPage,
	});

	useQuerySync({
		search: searchTerm,
		page: currentPage,
		per_page: itemsPerPage,
		division_id: filter.division_id,
	});

	const { options: divisions, loading: divisionsLoading } = useSelectOptions<Division>(
		async () => {
			const res = await getDivisions();
			return res?.data ? { data: { divisions: res.data.divisions } } : { data: { divisions: [] } };
		},
		'id',
		'name'
	);

	return {
		items,
		loading,
		divisions,
		divisionsLoading,
		formData,
		editingItem,
		divisionId: filter.division_id,
		currentPage,
		itemsPerPage,
		totalItems,
		totalPage,
		searchTerm,
		isModalOpen,
		errors: { ...errors, ...crudErrors },
		handlers: {
			...handlers,
			setDivisionId: (id: string) => handlers.setFilter({ ...filter, division_id: id }),
			handleClickEdit: (item: Employee) => {
				const formItem: EditEmployeeFormData = {
					id: item.id,
					image: item.image,
					name: item.name,
					phone: item.phone,
					division: item.division.id,
					position: item.position,
				};
				handlers.openModal(formItem, formItem);
			},
			handleDivisionChange: (id: string) => {
				handlers.setFilter({ ...filter, division_id: id });
				handlers.setCurrentPage(1);
			},
			handlePerPageChange: (value: number) => {
				handlers.setItemsPerPage(value);
				handlers.setCurrentPage(1);
			},
		},
	};
}
