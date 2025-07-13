import React, { useRef, useState, useEffect } from 'react';

interface ImageUploadProps {
	label: string;
	onChange: (file: File | null) => void;
	previewUrl?: string;
	className?: string;
	errors?: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({ label, onChange, previewUrl, className = '', errors = null }) => {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [preview, setPreview] = useState<string | undefined>(previewUrl);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setPreview(URL.createObjectURL(file));
			onChange(file);
		} else {
			setPreview(undefined);
			onChange(null);
		}
	};

	useEffect(() => {
		if (previewUrl) setPreview(previewUrl);
	}, [previewUrl]);

	return (
		<div className={className}>
			<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
			<input
				type="file"
				accept="image/*"
				onChange={handleFileChange}
				ref={fileInputRef}
				className="cursor-pointer file:cursor-pointer block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-lg file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100
          dark:file:bg-gray-800 dark:file:text-gray-100 dark:hover:file:bg-gray-700"
			/>
			{preview && <img src={preview} alt="Preview" className="mt-2 max-h-40 rounded shadow-md border dark:border-gray-700" />}
			{!errors ? null : (
				<div className="mt-1">
					{errors.map((err) => (
						<p className="text-sm text-red-500">{err}</p>
					))}
				</div>
			)}
		</div>
	);
};

export default ImageUpload;
