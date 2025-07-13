import React from 'react';
import Navbar from '@/components/navbar';
import AuthRoute from '@/router/auth-route';

const BaseLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<AuthRoute>
			<Navbar />
			{children}
		</AuthRoute>
	);
};

export default BaseLayout;
