const routes = [
	{
		name: "home",
		path: "/",
		component: () => import("@/views/Base.vue"),
		children: [
			{
				name: "home-page",
				path: "",
				component: () => import("@/views/Home.vue"),
			},
			{
				name: "post-announcement",
				path: "/poster-une-annonce",
				component: () => import("@/views/PostAnnouncement.vue"),
				meta: {
					admin: false,
					contractor: false,
					mobile: true,
					connected: false,
				},
			},
			{
				path: "/:pathMatch(.*)*",
				component: () => import("@/views/NotFound.vue"),
			},
		],
		meta: {
			admin: false,
			contractor: false,
			mobile: true,
			connected: false,
		},
	},
	{
		name: "session",
		path: "/session",
		component: () => import("@/views/Session/Session.vue"),
		children: [
			{
				name: "register",
				path: "register",
				component: () => import("@/views/Session/Register.vue"),
			},
		],
		meta: {
			admin: false,
			contractor: false,
			mobile: true,
			connected: false,
		},
	},
	{
		name: "client",
		path: "/client",
		component: () => import("@/views/Client/Client.vue"),
		children: [
			{
				name: "client-announcement",
				path: "announcement/:id",
				component: () =>
					import("@/views/Client/Announcement/Announcement.vue"),
			},
			{
				name: "client-announcements",
				path: "announcements",
				component: () =>
					import("@/views/Client/Announcement/Announcements.vue"),
			},
			{
				name: "client-contractor",
				path: "contractor/:id",
				component: () =>
					import("@/views/Client/Contractor/Contractor.vue"),
			},
			{
				name: "client-contractors",
				path: "contractors",
				component: () =>
					import("@/views/Client/Contractor/Contractors.vue"),
			},
			{
				name: "client-chats",
				path: "chats",
				component: () => import("@/views/Client/Chat.vue"),
			},
			{
				name: "client-chat",
				path: "chat/:id",
				component: () => import("@/views/Client/Chat.vue"),
			},
			{
				name: "client-devis",
				path: "devis",
				component: () => import("@/views/Client/Devis.vue"),
			},
			{
				name: "client-geo-location",
				path: "geo-location/announcement/:id",
				component: () => import("@/views/Client/GeoLocation.vue"),
			},
			{
				name: "client-notifications",
				path: "notifications",
				component: () => import("@/views/Client/Notifications.vue"),
			},
			{
				name: "client-partnerships",
				path: "partnerships",
				component: () => import("@/views/Client/Partnership.vue"),
			},
			{
				name: "client-profile",
				path: "profile",
				component: () => import("@/views/Profile.vue"),
			},
			{
				name: "client-reviews",
				path: "reviews",
				component: () => import("@/views/Client/Reviews.vue"),
			},
			{
				name: "client-wallet",
				path: "wallet",
				component: () => import("@/views/Client/Wallet.vue"),
			},
		],
		meta: {
			admin: false,
			contractor: false,
			mobile: true,
			connected: true,
		},
	},
	{
		name: "contractor",
		path: "/contractor",
		component: () => import("@/views/Contractor/Contractor.vue"),
		children: [
			{
				name: "contractor-announcement",
				path: "announcement/:id",
				component: () =>
					import("@/views/Contractor/Announcement/Announcement.vue"),
			},
			{
				name: "contractor-announcements",
				path: "announcements",
				component: () =>
					import("@/views/Contractor/Announcement/Announcements.vue"),
			},
			{
				name: "contractor-mission",
				path: "mission/:id",
				component: () =>
					import("@/views/Contractor/Mission/Mission.vue"),
			},
			{
				name: "contractor-missions",
				path: "missions",
				component: () =>
					import("@/views/Contractor/Mission/Missions.vue"),
			},
			{
				name: "contractor-chat",
				path: "chat",
				component: () => import("@/views/Client/Chat.vue"),
			},
			{
				name: "contractor-geo-location",
				path: "geo-location",
				component: () => import("@/views/Contractor/GeoLocation.vue"),
			},
			{
				name: "contractor-notifications",
				path: "notifications",
				component: () => import("@/views/Contractor/Notifications.vue"),
			},
			{
				name: "contractor-partnership",
				path: "partnership",
				component: () => import("@/views/Contractor/Partnership.vue"),
			},
			{
				name: "contractor-profile",
				path: "profile",
				component: () => import("@/views/Profile.vue"),
			},
			{
				name: "contractor-reviews",
				path: "reviews",
				component: () => import("@/views/Contractor/Reviews.vue"),
			},
			{
				name: "contractor-wallet",
				path: "wallet",
				component: () => import("@/views/Contractor/Wallet.vue"),
			},
		],
		meta: {
			admin: false,
			contractor: true,
			mobile: true,
			connected: true,
		},
	},
	{
		name: "admin",
		path: "/admin",
		component: () => import("@/views/Admin/Admin.vue"),
		children: [
			{
				name: "admin-user",
				path: "user/:id",
				component: () => import("@/views/Admin/User/User.vue"),
			},
			{
				name: "admin-users",
				path: "users",
				component: () => import("@/views/Admin/User/Users.vue"),
			},
			{
				name: "admin-jobs",
				path: "jobs",
				component: () => import("@/views/Admin/Jobs.vue"),
			},
			{
				name: "admin-announcement",
				path: "announcement",
				component: () =>
					import("@/views/Admin/Announcement/Announcement.vue"),
			},
			{
				name: "admin-announcements",
				path: "announcements",
				component: () =>
					import("@/views/Admin/Announcement/Announcements.vue"),
			},
			{
				name: "admin-chat",
				path: "chat",
				component: () => import("@/views/Client/Chat.vue"),
			},
			{
				name: "admin-notifications",
				path: "notifications",
				component: () => import("@/views/Admin/Notifications.vue"),
			},
			{
				name: "admin-partnerships",
				path: "partnerships",
				component: () => import("@/views/Admin/Partnerships.vue"),
			},
			{
				name: "admin-profile",
				path: "profile",
				component: () => import("@/views/Profile.vue"),
			},
		],
		meta: {
			admin: true,
			contractor: true,
			mobile: false,
			connected: true,
		},
	},
];

export default routes;
