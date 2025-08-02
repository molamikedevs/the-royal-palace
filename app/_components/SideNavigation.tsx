'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
	CalendarDaysIcon,
	HomeIcon,
	UserIcon,
	ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/solid'
import SignOutButton from './SignOutButton'
import MobileNav from './MobileNav'


function SideNavigation() {
	const pathname = usePathname()


	return (
		<>
			{/* Desktop Navigation */}
			<nav className="hidden lg:block border-r border-primary-900">
				<ul className="flex flex-col gap-2 h-full text-lg">
					{[
						{
							name: 'Home',
							href: '/account',
							icon: <HomeIcon className="h-5 w-5" />,
						},
						{
							name: 'Reservations',
							href: '/account/reservations',
							icon: <CalendarDaysIcon className="h-5 w-5" />,
						},
						{
							name: 'Guest profile',
							href: '/account/profile',
							icon: <UserIcon className="h-5 w-5" />,
						},
					].map(link => (
						<li key={link.name}>
							<Link
								className={`py-3 px-5 flex items-center gap-4 font-semibold transition-colors ${
									pathname === link.href
										? 'bg-primary-900 text-accent-400'
										: 'text-primary-200 hover:bg-primary-900 hover:text-primary-100'
								}`}
								href={link.href}>
								{link.icon}
								<span>{link.name}</span>
							</Link>
						</li>
					))}
					<li className="mt-auto">
						<SignOutButton />
					</li>
				</ul>
			</nav>

			{/* Mobile Bottom Navigation */}
			<MobileNav pathname={pathname} />
		</>
	)
}

export default SideNavigation
