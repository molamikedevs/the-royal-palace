// File: app/_components/Reservation.tsx
// This file defines the Reservation component which handles the reservation process for a specific suite
import { auth } from '@/app/_lib/auth/config'
import { getBookedDatesBySuiteId, getSettings } from '@/app/_lib/supabase/api'

import DateSelector from './DateSelector'
import LoginMessage from './LoginMessage'
import ReservationForm from './ReservationForm'
import { Suites } from '../_types'

const Reservation = async ({ suite }: { suite: Suites }) => {
	const session = await auth()
	const user = {
		firstName: session?.user?.name?.split(' ')?.[0] || 'Guest',
		avatar: session?.user?.image || '/avatar.png',
	}
	const [settings, bookedDates] = await Promise.all([
		getSettings(),
		getBookedDatesBySuiteId(String(suite.id)),
	])

	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 border border-primary-800 min-h-[400px] lg:min-h-[500px] rounded-lg p-6 sm:p-8 lg:p-10 mt-8 lg:mt-12 gap-6 lg:gap-8">
			<DateSelector
				settings={settings}
				bookedDates={bookedDates}
				suite={suite}
			/>
			{session?.user ? (
				<ReservationForm suite={suite} user={user} />
			) : (
				<LoginMessage />
			)}
		</div>
	)
}

export default Reservation
