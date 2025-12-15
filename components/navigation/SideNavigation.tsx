'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { sideNav } from '@/config/site'
import SignOutButton from '../auth/SignOutButton'
import MobileNav from './MobileNav'



function SideNavigation() {
	const pathname = usePathname()


	return (
		<>
			{/* Desktop Navigation */}
			<nav className="hidden lg:block border-r border-primary-900">
				<ul className="flex flex-col gap-2 h-full text-lg">
					{sideNav.map(link => (
						<li key={link.name}>
							<Link
								className={`py-3 px-5 flex items-center gap-4 font-semibold transition-colors ${
									pathname === link.href
										? 'bg-primary-900 text-accent-400'
										: 'text-primary-200 hover:bg-primary-900 hover:text-primary-100'
								}`}
								href={link.href}>
								{link.icon && (<link.icon className="h-6 w-6" />)}
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
