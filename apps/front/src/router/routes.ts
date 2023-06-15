import Account from "../pages/account.vue";
import Login from "@/views/Session/Login.vue";
import Register from "@/views/Session/Register.vue";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import BecomeContractor from "@/views/BecomeContractor.vue";
import Cesu from "@/views/Cesu.vue";
import AdminAnnouncement from "@/views/Admin/Announcement/Announcement.vue";
import AdminAnnouncements from "@/views/Admin/Announcement/Announcements.vue";
import AdminUser from "@/views/Admin/Announcement/Announcements.vue";
import AdminUsers from "@/views/Admin/Announcement/Announcements.vue";
import AdminChat from "@/views/Admin/Announcement/Announcements.vue";
import AdminGeolocations from "@/views/Admin/Announcement/Announcements.vue";
import AdminNotifications from "@/views/Admin/Announcement/Announcements.vue";
import AdminPartnerships from "@/views/Admin/Announcement/Announcements.vue";
import AdminProfile from "@/views/Admin/Announcement/Announcements.vue";
import AdminReviews from "@/views/Admin/Announcement/Announcements.vue";
import ClientAnnouncement from "@/views/Client/Announcement/Announcement.vue";
import ClientAnnouncements from "@/views/Client/Announcement/Announcements.vue";
import ClientContractor from "@/views/Client/Contractor/Contractor.vue";
import ClientContractors from "@/views/Client/Contractor/Contractors.vue";
import ClientChat from "@/views/Client/Chat.vue";
import ClientDevis from "@/views/Client/Devis.vue";
import ClientGeoLocation from "@/views/Client/GeoLocation.vue";
import ClientNotifications from "@/views/Client/Notifications.vue";
import ClientPartnership from "@/views/Client/Partnership.vue";
import ClientProfile from "@/views/Client/Profile.vue";
import ClientReviews from "@/views/Client/Reviews.vue";
import ClientWallet from "@/views/Client/Wallet.vue";
import ContractorAnnouncement from "@/views/Contractor/Announcement/Announcement.vue";
import ContractorAnnouncements from "@/views/Contractor/Announcement/Announcements.vue";
import ContractorMission from "@/views/Contractor/Mission/Mission.vue";
import ContractorMissions from "@/views/Contractor/Mission/Missions.vue";
import ContractorChat from "@/views/Contractor/Chat.vue";
import ContractorGeolocation from "@/views/Contractor/GeoLocation.vue";
import ContractorNotifications from "@/views/Contractor/Notifications.vue";
import ContractorPartnership from "@/views/Contractor/Partnership.vue";
import ContractorProfile from "@/views/Contractor/Profile.vue";
import ContractorReviews from "@/views/Contractor/Reviews.vue";
import ContractorWallet from "@/views/Contractor/Wallet.vue";

const routes = [
	{
		name: "home",
		path: "/",
		children: [
			{
				name: "home-page",
				path: "",
				component: Home,
			},
			{
				name: "about",
				path: "about",
				component: About
			},
			{
				name: "become-contractor",
				path: "become-contractor",
				component: BecomeContractor,
			},
			{
				name: "cesu",
				path: "cesu",
				component: Cesu
			}
		],
		meta: {
			admin: false,
			contractor: false,
			mobile: true,
			connected: false
		}
	},
	{
		name: "session",
		path: "/session",
		children: [
			{
				name: "login",
				path: "login",
				component: Login,
			},
			{
				name: "register",
				path: "register",
				component: Register,
			}
		],
		meta: {
			admin: false,
			contractor: false,
			mobile: true,
			connected: false
		}
	},
	{
		name: "client",
		path: "/client",
		children: [
			{
				name: "client-announcement",
				path: "announcement/{id}",
				component: ClientAnnouncement
			},
			{
				name: "client-announcements",
				path: "announcements",
				component: ClientAnnouncements
			},
			{
				name: "client-contractor",
				path: "contractor/{id}",
				component: ClientContractor
			},
			{
				name: "client-contractors",
				path: "contractors",
				component: ClientContractors
			},
			{
				name: "client-chat",
				path: "chat",
				component: ClientChat
			},
			{
				name: "client-devis",
				path: "devis",
				component: ClientDevis
			},
			{
				name: "client-geo-location",
				path: "geo-location",
				component: ClientGeoLocation
			},
			{
				name: "client-notifications",
				path: "notifications",
				component: ClientNotifications
			},
			{
				name: "client-partnerships",
				path: "partnerships",
				component: ClientPartnership
			},
			{
				name: "client-profile",
				path: "profile",
				component: ClientProfile
			},
			{
				name: "client-reviews",
				path: "reviews",
				component: ClientReviews
			},
			{
				name: "client-wallet",
				path: "wallet",
				component: ClientWallet
			},
		],
		meta: {
			admin: true,
			contractor: true,
			mobile: true,
			connected: true,
		}
	},
	{
		name: "contractor",
		path: "/contractor",
		children: [
			{
				name: "contractor-announcement",
				path: "announcement/{id}",
				component: ContractorAnnouncement
			},
			{
				name: "contractor-announcements",
				path: "announcements",
				component: ContractorAnnouncements
			},
			{
				name: "contractor-mission",
				path: "mission/{id}",
				component: ContractorMission
			},
			{
				name: "contractor-missions",
				path: "missions",
				component: ContractorMissions
			},
			{
				name: "contractor-chat",
				path: "chat",
				component: ContractorChat
			},
			{
				name: "contractor-geo-location",
				path: "geo-location",
				component: ContractorGeolocation
			},
			{
				name: "contractor-notifications",
				path: "notifications",
				component: ContractorNotifications
			},
			{
				name: "contractor-partnership",
				path: "partnership",
				component: ContractorPartnership
			},
			{
				name: "contractor-profile",
				path: "profile",
				component: ContractorProfile
			},
			{
				name: "contractor-reviews",
				path: "reviews",
				component: ContractorReviews
			},
			{
				name: "contractor-wallet",
				path: "wallet",
				component: ContractorWallet
			},
		],
		meta: {
			admin: true,
			contractor: true,
			mobile: true,
			connected: true
		}

	},
	{
		name: "admin",
		path: "/admin",
		children: [
			{
				name: "profile",
				path: "profile",
				component: AdminProfile
			},
			{
				name: "user",
				path: "user",
				component: AdminUser
			},
			{
				name: "users",
				path: "users",
				component: AdminUsers
			},
			{
				name: "announcement",
				path: "announcement",
				component: AdminAnnouncement
			},
			{
				name: "announcement",
				path: "announcements",
				component: AdminAnnouncements
			},
			{
				name: "chat",
				path: "chat",
				component: AdminChat
			},
			{
				name: "geo-locations",
				path: "geo-locations",
				component: AdminGeolocations
			},
			{
				name: "notifications",
				path: "notifications",
				component: AdminNotifications
			},
			{
				name: "partnerships",
				path: "partnerships",
				component: AdminPartnerships
			},
			{
				name: "profile",
				path: "profile",
				component: AdminProfile
			},
			{
				name: "reviews",
				path: "reviews",
				component: AdminReviews
			}
		],
		meta: {
			admin: true,
			contractor: false,
			mobile: false,
			connected: true
		}
	},
];

export default routes;
