// import { getUser } from '@/lib/auth' // your future auth util
import NavigationClient from './NavigationClient'
import Logo from './Logo'

export default async function Header() {
	// const user = await getUser() // SSR user fetching
	const user = {
		firstName: 'Kevin',
		lastName: 'Smith',
		email: 'guest@example.com',
		avatar: '/avatar.png',
	}

	return (
		<header className="border-b border-primary-900 px-8 py-5">
			<div className="flex justify-between items-center max-w-7xl mx-auto relative">
				{/* Logo */}
				<Logo />

				{/* Client-side nav (handles hamburger + active path) */}
				<NavigationClient user={user} />
			</div>
		</header>
	)
}
