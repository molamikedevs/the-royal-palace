'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UserCircleIcon } from '@heroicons/react/24/solid'


interface NavigationProps {
	mobile?: boolean
	onNavigate?: () => void
	user: {
		firstName: string
		lastName: string
		avatar?: string
		email: string
	}
}


export default function Navigation({ mobile = false, onNavigate }: NavigationProps) {
	const pathname = usePathname()
	const name = {
		firstName: 'Kevin',
		lastName: 'Smith',
		email: 'guest@example.com',
		avatar: '', // Provide a string URL here, e.g. '/avatar.png' or leave empty for fallback
	}

	const baseClasses = 'transition-colors block py-2 md:py-0 px-3 md:px-0'
	const activeClasses = 'text-accent-400 font-medium'
	const inactiveClasses = 'text-primary-200 hover:text-accent-400'

	const handleClick = () => {
		if (onNavigate) onNavigate()
	}

	return (
		<nav className={`z-10 ${mobile ? 'text-xl' : 'text-lg md:text-xl'}`}>
			<ul
				className={`${
					mobile
						? 'flex flex-col gap-4 items-start'
						: 'flex flex-col md:flex-row gap-4 md:gap-8 lg:gap-16 items-center'
				}`}>
				<li>
					<Link
						href="/suites"
						onClick={handleClick}
						className={`${baseClasses} ${pathname === '/suites' ? activeClasses : inactiveClasses}`}>
						Suites
					</Link>
				</li>
				<li>
					<Link
						href="/about"
						onClick={handleClick}
						className={`${baseClasses} ${pathname === '/about' ? activeClasses : inactiveClasses}`}>
						About
					</Link>
				</li>
				<li>
					{name.avatar ? (
						<Link href="/account" onClick={handleClick} className="flex items-center gap-3">
							<Image
								className="rounded-full"
								src={name.avatar}
								height={30}
								width={30}
								alt={name.firstName || 'User avatar'}
								priority={false}
								loading="lazy"
								onError={e => {
									e.currentTarget.src = '/avatar.png'
								}}
							/>
							<p>{name.firstName}</p>
						</Link>
					) : (
						<Link href="/account" onClick={handleClick} className="flex items-center gap-3">
							<UserCircleIcon className="h-8 w-8" />
							<p>{name.firstName}</p>
						</Link>
					)}
				</li>
			</ul>
		</nav>
	)
}
