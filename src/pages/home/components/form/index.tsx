import { useState, useEffect } from 'react';
import TextInput from '@/components/text-input';
import ImageUpload from '@/components/image-upload';
import SelectInput from '@/components/select-input';
import type { Division } from '@/utils/interface';
import { useDivisionService } from '@/services/division.service';
import type { ValidationErrors } from '@/hooks/useFetchWithAuth';
import type { EmployeeFormData } from '@/hooks/useEmployeeModule';

interface Props {
	formData: EmployeeFormData;
	onChange: (name: keyof EmployeeFormData, value: any) => void;
	errors: ValidationErrors | null;
}

const EmployeeForm: React.FC<Props> = ({ formData, onChange, errors }) => {
	const { getDivisions } = useDivisionService();

	const [divisions, setDivisions] = useState<Division[]>([]);

	const loadDivisions = async () => {
		const res = await getDivisions();
		if (res?.data?.divisions) {
			setDivisions(res.data.divisions);
		}
	};

	useEffect(() => {
		loadDivisions();
	}, []);

	return (
		<>
			{typeof formData.image === 'string' ? null : (
				<ImageUpload
					label="Profile Picture"
					onChange={(val) => onChange('image', val)}
					previewUrl={formData.image ? (typeof formData.image === 'string' ? formData.image : URL.createObjectURL(formData.image)) : undefined}
					errors={errors?.image}
				/>
			)}

			<TextInput label="Name" name="name" value={formData.name} onChange={(val) => onChange('name', val)} required errors={errors?.name} />

			<TextInput label="Phone" name="phone" value={formData.phone} onChange={(val) => onChange('phone', val)} required errors={errors?.phone} />

			<SelectInput
				label="Division"
				name="division"
				value={formData.division}
				options={divisions.map((div) => ({ value: div.id, label: div.name }))}
				onChange={(id) => {
					const selected = divisions.find((d) => d.id === id);
					if (selected) {
						onChange('division', selected.id);
					}
				}}
				required
				errors={errors?.division}
			/>

			<TextInput label="Position" name="position" value={formData.position} onChange={(val) => onChange('position', val)} required errors={errors?.position} />
		</>
	);
};

export default EmployeeForm;
