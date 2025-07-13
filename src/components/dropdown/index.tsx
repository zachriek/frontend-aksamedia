import React, { useEffect, useRef } from 'react';

interface DropdownProps {
	trigger: React.ReactNode;
	children: React.ReactNode;
	isOpen: boolean;
	onClose: () => void;
}

const Dropdown: React.FC<DropdownProps> = ({ trigger, children, isOpen, onClose }) => {
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent): void => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, onClose]);

	return (
		<div className="relative" ref={dropdownRef}>
			{trigger}
			{!isOpen ? null : <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">{children}</div>}
		</div>
	);
};

export default Dropdown;
