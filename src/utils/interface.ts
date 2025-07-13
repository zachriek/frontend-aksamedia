export interface User {
	id: string;
	name: string;
	username: string;
	phone: string;
	email: string;
}

export interface Division {
	id: string;
	name: string;
}

export interface Employee {
	id: string;
	image: string | null;
	name: string;
	phone: string;
	division: Division;
	position: string;
}

export interface AuthContextType {
	user: User | null;
	login: (username: string, password: string) => void;
	logout: () => void;
	errorLogin: string | null;
	updateUser: (newData: Partial<User>) => void;
}

export interface ThemeContextType {
	theme: 'light' | 'dark' | 'system';
	isDark: boolean;
	changeTheme: (theme: 'light' | 'dark' | 'system') => void;
}

export interface ThemeOption {
	value: 'light' | 'dark' | 'system';
	label: string;
	icon: React.ComponentType<{ size?: number; className?: string }>;
}

export interface PaginationPage {
	type: 'number' | 'ellipsis';
	value: number | string;
	isCurrent?: boolean;
}

export interface Response<T = undefined> {
	status: string;
	message: string;
	data?: T;
	pagination?: {
		current_page: number;
		per_page: number;
		total: number;
		last_page: number;
		from: number;
		to: number;
		has_more_pages: boolean;
		prev_page_url: string;
		next_page_url: string;
	};
}
