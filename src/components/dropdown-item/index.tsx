import React from 'react';

interface DropdownItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'secondary' | 'danger';
	icon?: React.ElementType;
	active?: boolean;
	label: string;
	className?: string;
	disabled?: boolean;
}

const DropdownItem: React.FC<DropdownItemProps> = ({ variant = 'secondary', icon: Icon, active, label, className = '', disabled = false, ...props }) => {
	const getVariantClass = () => {
		switch (variant) {
			case 'danger':
				return `text-red-600 dark:text-red-400`;
			case 'secondary':
			default:
				return `text-gray-700 dark:text-white`;
		}
	};

	return (
		<button
			className={`w-full flex items-center px-4 py-2 text-sm text-left ${getVariantClass()} ${disabled ? '' : 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700'} ${
				active ? 'bg-gray-100 dark:bg-gray-700' : ''
			} ${className}`}
			{...props}
		>
			{Icon && <Icon size={16} className="mr-3" />}
			{label}
		</button>
	);
};

export default DropdownItem;
