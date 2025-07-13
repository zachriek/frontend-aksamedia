import React from 'react';

interface HeadingProps {
	level?: 1 | 2 | 3 | 4 | 5 | 6;
	children: React.ReactNode;
	className?: string;
}

const Heading: React.FC<HeadingProps> = ({ level = 1, children, className = '' }) => {
	const Tag = `h${level}` as any;

	const baseStyles = 'font-bold text-gray-900 dark:text-white';
	const sizeStyles: Record<number, string> = {
		1: 'text-2xl',
		2: 'text-xl',
		3: 'text-lg',
		4: 'text-base',
		5: 'text-sm',
		6: 'text-xs',
	};

	return <Tag className={`${baseStyles} ${sizeStyles[level]} ${className}`}>{children}</Tag>;
};

export default Heading;
