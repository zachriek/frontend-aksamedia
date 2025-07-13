import React from 'react';

export interface Column<T> {
	header: string;
	accessor: keyof T | string | ((row: T) => React.ReactNode);
	className?: string;
}

interface TableProps<T> {
	columns: Column<T>[];
	data: T[];
	rowKey: (row: T) => string | number;
	actions?: (row: T) => React.ReactNode;
	className?: string;
	loading?: boolean;
}

const getValueFromPath = (obj: any, path: string): any => {
	return path.split('.').reduce((acc, part) => acc?.[part], obj);
};

const Table = <T,>({ columns, data, rowKey, actions, className = '', loading = false }: TableProps<T>) => {
	return (
		<div className={`overflow-x-auto rounded-lg ${className}`}>
			<table className="w-full">
				<thead className="bg-gray-50 dark:bg-gray-700">
					<tr>
						{columns.map((col, idx) => (
							<th key={idx} className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider ${col.className || ''}`}>
								{col.header}
							</th>
						))}
						{actions && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>}
					</tr>
				</thead>
				<tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
					{!loading
						? null
						: Array.from({ length: 5 }).map((_, index) => (
								<tr key={index}>
									<td colSpan={columns.length + 1} className="p-4">
										<div className="animate-pulse bg-gray-200 dark:bg-gray-700 w-full h-6 rounded"></div>
									</td>
								</tr>
						  ))}

					{data.length > 0 || loading ? null : (
						<tr>
							<td colSpan={columns.length + (actions ? 1 : 0)} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
								No data found.
							</td>
						</tr>
					)}

					{data.length === 0 || loading
						? null
						: data.map((row) => (
								<tr key={rowKey(row)} className="hover:bg-gray-50 dark:hover:bg-gray-700">
									{columns.map((col, idx) => (
										<td key={idx} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
											{typeof col.accessor === 'function'
												? col.accessor(row)
												: typeof col.accessor === 'string'
												? (getValueFromPath(row, col.accessor) as React.ReactNode)
												: (row[col.accessor] as React.ReactNode)}
										</td>
									))}

									{actions && (
										<td className="px-6 py-4 whitespace-nowrap text-sm">
											<div className="flex space-x-2">{actions(row)}</div>
										</td>
									)}
								</tr>
						  ))}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
