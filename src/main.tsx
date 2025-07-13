import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/globals.css';
import App from './App.tsx';
import ThemeProvider from './contexts/ThemeContext.tsx';
import AuthProvider from './contexts/AuthContext.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ThemeProvider>
			<AuthProvider>
				<App />
			</AuthProvider>
		</ThemeProvider>
	</StrictMode>
);
