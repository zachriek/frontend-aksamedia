import React from 'react';

interface TextInputProps {
	label: string;
	name: string;
	value: string;
	onChange: (value: string) => void;
	required?: boolean;
	type?: string;
	className?: string;
	errors?: string[];
}

const TextInput: React.FC<TextInputProps> = ({ label, name, value, onChange, required = false, type = 'text', className = '', errors = null }) => {
	return (
		<div className={className}>
			<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
			<input
				type={type}
				name={name}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				required={required}
				className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
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

export default TextInput;
