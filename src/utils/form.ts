export function buildFormData(data: Record<string, any>): FormData {
	const form = new FormData();
	for (const key in data) {
		if (data[key] !== null && data[key] !== undefined) {
			form.append(key, data[key]);
		}
	}
	return form;
}
