import React from 'react';
import GuestRoute from '@/router/guest-route';

const GuestLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<GuestRoute>
			<div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
				<div className="max-w-md w-full space-y-8">{children}</div>
			</div>
		</GuestRoute>
	);
};

export default GuestLayout;
