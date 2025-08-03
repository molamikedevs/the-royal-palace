// components/Navigation.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Bars3Icon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

interface Props {
	user: {
		firstName: string
		lastName: string
		avatar?: string // should be a string URL or StaticImport
		email: string
	}
}

export default function Navigation({ user }: Props) {
	const [menuOpen, setMenuOpen] = useState(false)
	const pathname = usePathname()
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

	return (
		<>
			{/* Desktop Navigation */}
			{/* Desktop Navigation */}
			<div className="hidden lg:flex items-center gap-12 ml-auto">
				<nav className="text-lg md:text-xl flex items-center gap-8">
					{NavLink('/suites', 'Suites')}
					{NavLink('/about', 'About')}
				</nav>
				<Link
					href="/account"
					className="flex items-center gap-2 text-primary-200 hover:text-accent-400">
					{user.avatar ? (
						<Image
							className="rounded-full"
							src={user.avatar}
							height={30}
							width={30}
							alt="User avatar"
							onError={e => (e.currentTarget.src = '/avatar.png')}
						/>
					) : (
						<UserCircleIcon className="h-8 w-8" />
					)}
					<p className="mt-0.5">{user.firstName}</p>
				</Link>
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
					<Link
						href="/account"
						onClick={closeMenu}
						className="flex items-center gap-3 mt-12 text-primary-200 hover:text-accent-400">
						{user.avatar ? (
							<Image
								className="rounded-full"
								src={user.avatar}
								height={30}
								width={30}
								alt="User avatar"
								onError={e => (e.currentTarget.src = '/avatar.png')}
							/>
						) : (
							<UserCircleIcon className="h-8 w-8" />
						)}
						<p>{user.firstName}</p>
					</Link>
				</nav>
			</div>
		</>
	)
}
