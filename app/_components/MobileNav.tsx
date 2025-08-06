'use client'

import React from 'react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import {
	CalendarDaysIcon,
	HomeIcon,
	UserIcon,
	ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/solid'
import { signOutAction } from '../_lib/actions'

interface MobileNavProps {
	pathname: string
}

const MobileNav = ({ pathname }: MobileNavProps) => {
	const links = [
		{
			name: 'Home',
			href: '/account',
			icon: <HomeIcon className="h-6 w-6" />,
		},
		{
			name: 'Reservations',
			href: '/account/reservations',
			icon: <CalendarDaysIcon className="h-6 w-6" />,
		},
		{
			name: 'Profile',
			href: '/account/profile',
			icon: <UserIcon className="h-6 w-6" />,
		},
	]

	return (
		<div className="lg:hidden fixed bottom-0 left-0 right-0 bg-primary-950 border-t border-primary-800 z-50">
			<div className="flex justify-around">
				{links.map(link => (
					<Link
						key={link.name}
						href={link.href}
						className={`flex flex-col items-center justify-center py-3 px-4 text-xs transition-colors ${
							pathname === link.href
								? 'text-accent-400'
								: 'text-primary-200 hover:text-accent-400'
						}`}>
						{link.icon}
						<span className="mt-1">{link.name}</span>
					</Link>
				))}

				{/* Sign out button */}
				<form action={signOutAction}>
					<button className="flex flex-col items-center justify-center py-3 px-4 text-xs text-primary-200 hover:text-accent-400 transition-colors">
						<ArrowRightOnRectangleIcon className="h-6 w-6" />
						<span className="mt-1">Sign out</span>
					</button>
				</form>
			</div>
		</div>
	)
}

export default MobileNav
