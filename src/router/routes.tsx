import type { RouteObject } from 'react-router-dom';
import LoginPage from '@/pages/login';
import BaseLayout from '@/layouts/base-layout';
import GuestLayout from '@/layouts/guest-layout';
import HomePage from '@/pages/home';

const routes: RouteObject[] = [
	{
		path: '/',
		element: (
			<BaseLayout>
				<HomePage />
			</BaseLayout>
		),
	},
	{
		path: '/login',
		element: (
			<GuestLayout>
				<LoginPage />
			</GuestLayout>
		),
	},
];

export default routes;
