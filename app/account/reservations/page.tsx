// Comment each snippet in this file according to its purpose
import ReservationList from '@/app/_components/ReservationList'
import { auth } from '@/app/_lib/auth/config'
import { getReservations } from '@/app/_lib/supabase/api'
import { Metadata } from 'next'

// this snippet defines the metadata for the Reservations page
export const metadata: Metadata = {
	title: 'Reservations',
}

const ReservationsPage = async () => {
	const session = await auth()
	const reservations = await getReservations(session?.user.guestId || '')

	return (
		<div className="px-4 sm:px-6 md:px-8 py-6">
			<h2 className="font-semibold text-xl sm:text-2xl text-accent-400 mb-6">
				Your reservations
			</h2>
			{reservations.length === 0 ? (
				<p className="text-lg">
					You have no reservations yet. Check out our{' '}
					<a className="underline text-accent-500" href="/suites">
						luxury suites &rarr;
					</a>
				</p>
			) : (
				<ReservationList reservations={reservations} />
			)}
		</div>
	)
}

export default ReservationsPage
