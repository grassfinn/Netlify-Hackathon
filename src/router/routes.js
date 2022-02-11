const routes = [
	{
		path: '/',
		component: () => import('layouts/MainLayout.vue'),
		// routes pages
		children: [
			{ path: '', component: () => import('pages/PageHome.vue'), name: 'Home' },
			{ path: '/about', component: () => import('pages/PageAbout.vue'), name: 'About' },
		],
	},

	// Always leave this as last one,
	// but you can also remove it
	{
		path: '/:catchAll(.*)*',
		component: () => import('pages/Error404.vue'),
	},
];

export default routes;