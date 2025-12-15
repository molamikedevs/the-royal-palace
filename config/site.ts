import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
export const siteConfig = {
  title: "The Royal Palace",
  description:
    "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests",
};

export const sideNav = [
  { name: "Home", href: "/account", icon: HomeIcon },
  {
    name: "Reservations",
    href: "/account/reservations",
    icon: CalendarDaysIcon,
  },
  { name: "Profile", href: "/account/profile", icon: UserIcon },
];
