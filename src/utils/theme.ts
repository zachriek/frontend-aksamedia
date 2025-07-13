import { Monitor, Moon, Sun } from 'lucide-react';
import type { ThemeOption } from './interface';

export const themeOptions: ThemeOption[] = [
	{ value: 'light', label: 'Light', icon: Sun },
	{ value: 'dark', label: 'Dark', icon: Moon },
	{ value: 'system', label: 'System', icon: Monitor },
];
