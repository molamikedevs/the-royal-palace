// Comment each snippet in this file according to its purpose
import ReservationCard from "@/app/_components/ReservationCard"
import { Metadata } from "next"


// this snippet defines the metadata for the Reservations page
export const metadata: Metadata = {
	title: 'Reservations'
}

interface Booking {
	id: string
	// Add other relevant fields as needed, e.g. suiteName, date, etc.
}


const ReservationsPage = () => {

	const bookings: Booking[] = [] // This would typically be fetched from an API or database
	return (
		<div className="px-4 sm:px-6 md:px-8 py-6">
			<h2 className="font-semibold text-xl sm:text-2xl text-accent-400 mb-6">
				Your reservations
			</h2>
			{bookings.length === 0 ? (
				<p className="text-lg">
					You have no reservations yet. Check out our{' '}
					<a className="underline text-accent-500" href="/suites">
						luxury suites &rarr;
					</a>
				</p>
			) : (
				<ul className="space-y-6">
					{bookings.map(booking => (
						<ReservationCard booking={booking} key={booking.id} />
					))}
				</ul>
			)}
		</div>
	)
}

export default ReservationsPage
