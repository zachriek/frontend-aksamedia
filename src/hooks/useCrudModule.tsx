import { useEffect, useState } from 'react';
import { useDebouncedSearch } from '@/hooks/useDebouncedSearch';
import { buildFormData } from '@/utils/form';

interface UseCrudModuleOptions<TFilter = any> {
	fetchFn: (params: any) => Promise<any>;
	createFn: (data: any) => Promise<any>;
	updateFn: (id: string, data: any) => Promise<any>;
	deleteFn: (id: string) => Promise<any>;
	defaultFilter?: TFilter;
	defaultSearch?: string;
	defaultPage?: number;
	defaultPerPage?: number;
}

export function useCrudModule<TData, TFormData>(options: UseCrudModuleOptions) {
	const { fetchFn, createFn, updateFn, deleteFn, defaultFilter = {} } = options;

	const [items, setItems] = useState<TData[]>([]);
	const [filter, setFilter] = useState<any>(defaultFilter);
	const [currentPage, setCurrentPage] = useState(options.defaultPage ?? 1);
	const [itemsPerPage, setItemsPerPage] = useState(options.defaultPerPage ?? 10);
	const [totalPage, setTotalPage] = useState<number | null>(null);
	const [totalItems, setTotalItems] = useState<number>(0);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingItem, setEditingItem] = useState<TData | null>(null);
	const [formData, setFormData] = useState<TFormData | null>(null);
	const [errors, setErrors] = useState<Record<string, string[]>>({});

	const [loading, setLoading] = useState<boolean>(false);

	const [searchTerm, setSearchTerm] = useState(options.defaultSearch ?? '');
	const debouncedSearchTerm = useDebouncedSearch(searchTerm, 500);

	useEffect(() => {
		loadItems();
	}, [currentPage, itemsPerPage, debouncedSearchTerm, filter]);

	const loadItems = async () => {
		setLoading(true);
		try {
			const res = await fetchFn({
				page: currentPage,
				per_page: itemsPerPage,
				name: debouncedSearchTerm,
				...filter,
			});

			if (res?.data) setItems(res.data.employees || res.data.items || []);

			if (res?.pagination?.total) {
				setTotalItems(res.pagination.total);
				setTotalPage(Math.ceil(res.pagination.total / itemsPerPage));
			} else {
				setTotalItems(0);
				setTotalPage(null);
			}
		} catch (e) {
			console.error(e);
		} finally {
			setLoading(false);
		}
	};

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
		setCurrentPage(1);
	};

	const openModal = (item: any = null, defaultValue: TFormData) => {
		if (item?.image) item.image = null;
		setEditingItem(item);
		setFormData(item || defaultValue);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setEditingItem(null);
		setFormData(null);
		setErrors({});
		setIsModalOpen(false);
	};

	const handleSaveData = async (data: any) => {
		try {
			const body = buildFormData(data);

			if (editingItem) {
				body.append('_method', 'PUT');
			}

			const res = editingItem ? await updateFn((editingItem as any).id, body) : await createFn(body);

			if (res) {
				alert(res.message);
				await loadItems();
				closeModal();
			}
		} catch (e: any) {
			if (e.response?.data?.errors) {
				setErrors(e.response.data.errors);
			}
		}
	};

	const handleDelete = async (id: string) => {
		if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
			const res = await deleteFn(id);
			if (res) {
				alert(res.message);
				await loadItems();
			}
		}
	};

	return {
		items,
		loading,
		totalItems,
		totalPage,
		currentPage,
		itemsPerPage,
		editingItem,
		formData,
		isModalOpen,
		errors,
		searchTerm,
		filter,
		handlers: {
			setCurrentPage,
			setFilter,
			setItemsPerPage,
			setFormData,
			openModal,
			closeModal,
			handleSaveData,
			handleDelete,
			handleSearch,
		},
	};
}
