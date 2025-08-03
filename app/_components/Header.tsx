import Navigation from './Navigation'
import Logo from './Logo'
import { auth } from '../_lib/auth/config'

export default async function Header() {
	const session = await auth()
	const user = {
		firstName: session?.user?.name?.split(' ')?.[0] || 'Guest Area',
		avatar: session?.user?.image || '/avatar.png',
	}

	return (
		<header className="border-b border-primary-900 px-8 py-5">
			<div className="flex justify-between items-center max-w-7xl mx-auto relative">
				<Logo />
				<Navigation user={user} isAuthenticated={!!session} />
			</div>
		</header>
	)
}
