import Navigation from './Navigation'
import Logo from './Logo'

export default async function Header() {
	const user = {
		firstName: 'Kevin',
		lastName: 'Smith',
		email: 'guest@example.com',
		avatar: '/avatar.png',
	}

	return (
		<header className="border-b border-primary-900 px-8 py-5">
			<div className="flex justify-between items-center max-w-7xl mx-auto relative">
				<Logo />
				<Navigation user={user} />
			</div>
		</header>
	)
}
