import React, { useEffect, useRef } from 'react';
import { Save, X } from 'lucide-react';
import Heading from '../heading';
import Button from '../button';

interface ModalProps<T> {
	data?: T;
	title: string;
	onChange: (data: T) => void;
	onSave: (data: T) => void;
	onClose: () => void;
	children: (formData: T, handleChange: (key: string | number | symbol, value: any) => void) => React.ReactNode;
}

function Modal<T extends Record<string, any>>({ data, title, onChange, onSave, onClose, children }: ModalProps<T>) {
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
				onClose();
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [onClose]);

	const handleChange = (key: string | number | symbol, value: any) => {
		const updated = { ...data, [key]: value };
		onChange(updated as T);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSave(data!);
	};

	return (
		<div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 overflow-y-auto">
			<div ref={modalRef} className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
				<div className="flex justify-between items-center mb-4">
					<Heading level={2}>{title}</Heading>
					<Button variant="text" onClick={onClose}>
						<X size={20} />
					</Button>
				</div>

				<form onSubmit={handleSubmit} className="flex flex-col gap-y-4 mt-8">
					{children(data!, handleChange)}
					<div className="flex justify-end space-x-3 mt-4">
						<Button variant="text" onClick={onClose} className="px-4 py-2">
							Cancel
						</Button>
						<Button type="submit" variant="primary" icon={Save} iconSize={16} className="px-4 py-2">
							Save
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Modal;
