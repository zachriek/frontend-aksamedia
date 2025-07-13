import React from 'react';

interface Option {
	value: string | number;
	label: string | number;
}

interface Props {
	label?: string;
	name: string;
	value: string | number | undefined;
	options: Option[];
	onChange: (value: string) => void;
	required?: boolean;
	errors?: string[];
}

const SelectInput: React.FC<Props> = ({ label, name, value, options, onChange, required, errors = null }) => {
	return (
		<div>
			{!label ? null : (
				<label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
					{label}
				</label>
			)}
			<select
				id={name}
				name={name}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				required={required}
				className="w-full border rounded px-3 py-2 text-sm
					bg-white dark:bg-gray-800
					border-gray-300 dark:border-gray-600
					text-gray-900 dark:text-gray-100
					focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
			>
				{!label ? null : <option value="">Select {label}</option>}
				{options.map((opt) => (
					<option key={opt.value} value={opt.value}>
						{opt.label}
					</option>
				))}
			</select>
			{!errors ? null : (
				<div className="mt-1">
					{errors.map((err, idx) => (
						<p key={idx} className="text-sm text-red-500">
							{err}
						</p>
					))}
				</div>
			)}
		</div>
	);
};

export default SelectInput;
