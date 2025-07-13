import { Plus, Edit2, Trash2 } from 'lucide-react';
import type { Employee } from '@/utils/interface';
import Button from '@/components/button';
import Heading from '@/components/heading';
import Modal from '@/components/modal';
import SearchInput from '@/components/search-input';
import Table, { type Column } from '@/components/table';
import Pagination from '@/components/pagination';
import EmployeeForm from '../form';
import SelectInput from '@/components/select-input';
import { useEmployeeModule, type EmployeeFormData } from '@/hooks/useEmployeeModule';

const initialFormData: EmployeeFormData = {
	image: null,
	name: '',
	phone: '',
	division: '',
	position: '',
};

const HomeCard: React.FC = () => {
	const { items, divisions, formData, handlers, totalItems, totalPage, currentPage, itemsPerPage, searchTerm, divisionId, isModalOpen, editingItem, errors, loading } = useEmployeeModule();

	const columns: Column<Employee>[] = [
		{ header: 'Image', accessor: (row) => row.image && <img src={row.image} className="h-10 w-10 rounded-full object-cover" /> },
		{ header: 'Name', accessor: 'name' },
		{ header: 'Phone', accessor: 'phone' },
		{ header: 'Division', accessor: 'division.name' },
		{ header: 'Position', accessor: 'position' },
	];

	return (
		<>
			<div className="py-6">
				<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
					<Heading>Employees</Heading>

					<div className="flex flex-wrap items-end gap-x-6 gap-y-4">
						<SelectInput
							label="Division"
							name="division_id"
							value={divisionId ?? ''}
							options={divisions.map((div) => ({ value: div.value, label: div.label }))}
							onChange={handlers.handleDivisionChange}
						/>

						<SelectInput
							label="Per Page"
							name="per_page"
							value={itemsPerPage}
							options={[5, 10, 25, 50].map((num) => ({ value: num, label: num }))}
							onChange={(value) => handlers.handlePerPageChange(parseInt(value))}
						/>

						<Button icon={Plus} onClick={() => handlers.openModal(null, initialFormData)}>
							Add New
						</Button>
					</div>
				</div>

				<SearchInput placeholder="Search by name..." value={searchTerm} onChange={handlers.handleSearch} className="mt-4" />
			</div>

			<div className="flex flex-wrap items-center justify-between mb-2">
				<div className="text-sm text-gray-500">
					Halaman {!totalPage ? 0 : currentPage} dari {totalPage ?? 0}
				</div>
				<div className="text-sm text-gray-600 dark:text-gray-300">
					Menampilkan {totalItems === 0 ? 0 : Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)}–{totalItems === 0 ? 0 : Math.min(currentPage * itemsPerPage, totalItems)} dari {totalItems}{' '}
					data
				</div>
			</div>

			<Table
				className="mt-2"
				columns={columns}
				data={items}
				rowKey={(item) => item.id}
				loading={loading}
				actions={(item) => (
					<>
						<Button variant="text-primary" onClick={() => handlers.handleClickEdit(item)}>
							<Edit2 size={16} />
						</Button>
						<Button variant="text-danger" onClick={() => handlers.handleDelete(item.id)}>
							<Trash2 size={16} />
						</Button>
					</>
				)}
			/>

			{totalPage && currentPage && <Pagination totalPages={totalPage} currentPage={currentPage} onPageChange={handlers.setCurrentPage} className="mt-10" />}

			{isModalOpen && (
				<Modal
					title={editingItem ? 'Edit Employee' : 'Add Employee'}
					data={formData!}
					onChange={(updated) => handlers.setFormData(updated)}
					onSave={(data) => handlers.handleSaveData(data)}
					onClose={handlers.closeModal}
				>
					{(formData, handleChange) => <EmployeeForm formData={formData} onChange={handleChange} errors={errors} />}
				</Modal>
			)}
		</>
	);
};

export default HomeCard;
