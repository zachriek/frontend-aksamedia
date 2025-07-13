// src/contexts/ThemeContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ThemeContextType } from '@/utils/interface';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [theme, setTheme] = useState<ThemeContextType['theme']>('system');
	const [isDark, setIsDark] = useState<boolean>(false);

	useEffect(() => {
		const savedTheme = localStorage.getItem('theme') as ThemeContextType['theme'] | null;
		const initialTheme = savedTheme || 'system';
		setTheme(initialTheme);
		applyTheme(initialTheme);
	}, []);

	useEffect(() => {
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

		const handleSystemChange = () => {
			if (theme === 'system') {
				applyTheme('system');
			}
		};

		mediaQuery.addEventListener('change', handleSystemChange);
		return () => mediaQuery.removeEventListener('change', handleSystemChange);
	}, [theme]);

	const applyTheme = (newTheme: ThemeContextType['theme']) => {
		let darkMode = false;

		if (newTheme === 'system') {
			darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
		} else {
			darkMode = newTheme === 'dark';
		}

		setIsDark(darkMode);

		if (darkMode) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	};

	const changeTheme = (newTheme: ThemeContextType['theme']) => {
		localStorage.setItem('theme', newTheme);
		setTheme(newTheme);
		applyTheme(newTheme);
	};

	const value: ThemeContextType = {
		theme,
		isDark,
		changeTheme,
	};

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextType => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}
	return context;
};

export default ThemeProvider;
