import React from 'react';
import { Search } from 'lucide-react';

interface SearchInputProps {
	placeholder?: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	className?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ placeholder = 'Search...', value, onChange, className = '' }) => {
	return (
		<div className={`relative ${className}`}>
			<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
			<input
				type="text"
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				className="w-full pl-10 pr-4 py-2 border border-gray-300 bg-white dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
			/>
		</div>
	);
};

export default SearchInput;
