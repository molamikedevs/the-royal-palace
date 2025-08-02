'use client'

import { useState } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'
import Navigation from './Navigation'

interface NavigationClientProps {
	user: {
		firstName: string
		lastName: string
		avatar?: string
		email: string
	}
}

export default function NavigationClient({ user }: NavigationClientProps) {
	const [menuOpen, setMenuOpen] = useState(false)
	const toggleMenu = () => setMenuOpen(prev => !prev)
	const closeMenu = () => setMenuOpen(false)

	return (
		<>
			{/* Desktop */}
			<div className="hidden lg:block">
				<Navigation user={user} />
			</div>

			{/* Mobile hamburger */}
			<button
				className="lg:hidden text-primary-100 z-50"
				onClick={toggleMenu}
				aria-label="Toggle menu">
				{menuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
			</button>

			{/* Mobile dropdown menu */}
			{menuOpen && (
				<div className="absolute top-full left-0 right-0 bg-primary-950 border-t border-primary-800 px-4 py-6 shadow-md z-40">
					<Navigation user={user} mobile onNavigate={closeMenu} />
				</div>
			)}
		</>
	)
}
