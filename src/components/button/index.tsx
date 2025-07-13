import type { LucideIcon } from 'lucide-react';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outline' | 'text' | 'text-primary' | 'text-danger';
	onClick?: () => void;
	icon?: LucideIcon;
	iconSize?: number;
	children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', onClick, icon: Icon, iconSize = 20, children, className = '', type = 'button', ...rest }) => {
	const getVariantClass = () => {
		switch (variant) {
			case 'secondary':
				return `bg-gray-500 hover:bg-gray-600 text-white`;
			case 'danger':
				return `bg-red-600 hover:bg-red-700 text-white`;
			case 'success':
				return `bg-green-600 hover:bg-green-700 text-white`;
			case 'outline':
				return `border border-gray-400 text-gray-700 hover:bg-gray-100`;
			case 'text':
				return `text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200`;
			case 'text-primary':
				return `text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300`;
			case 'text-danger':
				return `text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300`;
			case 'primary':
			default:
				return `bg-blue-600 hover:bg-blue-700 text-white`;
		}
	};

	return (
		<button
			onClick={onClick}
			type={type}
			className={`${!variant.includes('text') ? 'px-3 py-1.5' : ''} rounded-lg transition duration-200 flex items-center space-x-2 cursor-pointer ${getVariantClass()} ${className}`}
			{...rest}
		>
			{Icon && <Icon size={iconSize} />}
			<span>{children}</span>
		</button>
	);
};

export default Button;
