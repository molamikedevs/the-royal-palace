'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'

interface Props {
	user: {
		firstName: string
		avatar?: string | null
	}
	isAuthenticated: boolean
}

export default function Navigation({ user, isAuthenticated }: Props) {
	const [menuOpen, setMenuOpen] = useState(false)
	const pathname = usePathname()
	const router = useRouter()

	const toggleMenu = () => setMenuOpen(prev => !prev)
	const closeMenu = () => setMenuOpen(false)

	const baseClasses = 'transition-colors block py-2 md:py-0 px-3 md:px-0'
	const activeClasses = 'text-accent-400 font-medium'
	const inactiveClasses = 'text-primary-200 hover:text-accent-400'

	const NavLink = (href: string, label: string) => (
		<Link
			href={href}
			onClick={closeMenu}
			className={`${baseClasses} ${
				pathname === href ? activeClasses : inactiveClasses
			}`}>
			{label}
		</Link>
	)

	const handleGuestClick = () => {
		closeMenu()
		if (!isAuthenticated) {
			router.push('/login?callbackUrl=/account')
		} else {
			router.push('/account')
		}
	}

	return (
		<>
			{/* Desktop Navigation */}
			<div className="hidden lg:flex items-center gap-12 ml-auto">
				<nav className="text-lg md:text-xl flex items-center gap-8">
					{NavLink('/suites', 'Suites')}
					{NavLink('/about', 'About')}
				</nav>
				<button
					onClick={handleGuestClick}
					className="flex items-center gap-2 text-primary-200 hover:text-accent-400 text-lg">
					{isAuthenticated && user.avatar ? (
						<Image
							src={user.avatar}
							width={30}
							height={30}
							className="rounded-full"
							alt="User Avatar"
							onError={e => {
								e.currentTarget.src = '/avatar.png'
							}}
						/>
					) : null}
					<span>{user.firstName}</span>
				</button>
			</div>

			{/* Hamburger Button */}
			<button
				className="lg:hidden text-primary-100 z-50 relative"
				onClick={toggleMenu}
				aria-label="Toggle menu">
				{menuOpen ? (
					<XMarkIcon className="w-6 h-6" />
				) : (
					<Bars3Icon className="w-6 h-6" />
				)}
			</button>

			{/* Mobile Drawer */}
			<div
				className={`fixed top-0 left-0 h-[110vh] w-[70%] bg-primary-950 border-r border-primary-800 px-4 py-6 shadow-lg z-40 transition-transform duration-300 ease-in-out ${
					menuOpen ? 'translate-x-0' : '-translate-x-full'
				}`}>
				<div className="mb-8">
					<Link href="/" onClick={closeMenu}>
						<Image src="/logo.svg" alt="Logo" width={100} height={40} />
					</Link>
				</div>
				<nav className="text-2xl flex flex-col gap-8 items-start">
					{NavLink('/suites', 'Suites')}
					{NavLink('/about', 'About')}
					<button
						onClick={handleGuestClick}
						className="flex items-center gap-3 text-primary-200 hover:text-accent-400 text-left text-2xl">
						{isAuthenticated && user.avatar ? (
							<Image
								src={user.avatar}
								width={30}
								height={30}
								className="rounded-full"
								alt="User Avatar"
								onError={e => {
									e.currentTarget.src = '/avatar.png'
								}}
							/>
						) : null}
						<span>{user.firstName}</span>
					</button>
				</nav>
			</div>
		</>
	)
}
