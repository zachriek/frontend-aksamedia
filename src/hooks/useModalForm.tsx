import { useState } from 'react';

export function useModalForm<T>() {
	const [isOpen, setIsOpen] = useState(false);
	const [formData, setFormData] = useState<T | null>(null);
	const [editingId, setEditingId] = useState<string | null>(null);

	const open = (data: T | null = null, id: string | null = null) => {
		setFormData(data);
		setEditingId(id);
		setIsOpen(true);
	};

	const close = () => {
		setFormData(null);
		setEditingId(null);
		setIsOpen(false);
	};

	return {
		isOpen,
		formData,
		editingId,
		open,
		close,
		setFormData,
	};
}
