import { Metadata } from "next"
import { auth } from '../_lib/auth/config'

// this snippet defines the metadata for the Guest Area page
export const metadata: Metadata = {
	title: 'Guest Area',
}

// functional component representing the Account landing page
const AccountPage = async () => {
	const session = await auth() // Check if the user is authenticated
	// If the session is not available, it means the user is not signed in
	if (!session) {
		return (
			<div className="px-4 sm:px-6 md:px-8 py-6">
				<p className="text-primary-200">You are not signed in.</p>
			</div>
		)
	}
	// Extracting the first name from the session user name
	// If the name is not available, it defaults to 'Guest'
	const user = {
		firstName: session?.user?.name?.split(' ')?.[0] || 'Guest',
	}

	return (
		<div>
			<h2 className="font-semibold text-2xl sm:text-3xl md:text-4xl text-accent-400 mb-4">
				Welcome, {user.firstName}
			</h2>

			<p className="text-primary-200 text-base sm:text-lg mb-6 max-w-2xl">
				This is your guest dashboard where you can:
			</p>

			<ul className="list-disc pl-5 text-primary-100 space-y-2 text-sm sm:text-base md:text-lg">
				<li>
					📅 View and manage your <strong>reservations</strong>
				</li>
				<li>
					👤 Update your <strong>guest profile</strong> and preferences
				</li>
				<li>
					🏨 Explore available <strong>suites</strong> and amenities
				</li>
				<li>🔐 Sign out securely when you&#39;re done</li>
			</ul>
		</div>
	)
}

export default AccountPage


