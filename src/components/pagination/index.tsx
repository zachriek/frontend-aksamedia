import React from 'react';

interface PaginationProps {
	totalPages: number;
	currentPage: number;
	onPageChange: (page: number) => void;
	className?: string;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange, className = '' }) => {
	const getPaginationPages = (): (number | string)[] => {
		const pages: (number | string)[] = [];
		const maxVisible = 5;

		if (totalPages <= maxVisible) {
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i);
			}
		} else {
			if (currentPage <= 3) {
				for (let i = 1; i <= 4; i++) {
					pages.push(i);
				}
				pages.push('...');
				pages.push(totalPages);
			} else if (currentPage >= totalPages - 2) {
				pages.push(1);
				pages.push('...');
				for (let i = totalPages - 3; i <= totalPages; i++) {
					pages.push(i);
				}
			} else {
				pages.push(1);
				pages.push('...');
				for (let i = currentPage - 1; i <= currentPage + 1; i++) {
					pages.push(i);
				}
				pages.push('...');
				pages.push(totalPages);
			}
		}

		return pages;
	};

	return (
		<div className="p-4 flex justify-center space-x-2">
			{getPaginationPages().map((page, index) => (
				<button
					key={index}
					disabled={page === '...'}
					onClick={() => typeof page === 'number' && onPageChange(page)}
					className={`cursor-pointer px-3 py-1 rounded-md transition ${page === currentPage ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300'} ${
						page === '...' ? 'cursor-default' : 'hover:bg-blue-500 hover:text-white'
					} ${className}`}
				>
					{page}
				</button>
			))}
		</div>
	);
};

export default Pagination;
