// File: app/_components/ReservationForm.tsx
// This file defines the ReservationForm component which handles the reservation form for a specific suite
import { useReservationContext } from '@/context/ReservationContext'
import Image from 'next/image'


// Interface for reservation settings
// This interface defines the structure of the reservation settings used in the form
interface ReservationSettings {
	maxCapacity: number
}

export default function ReservationForm({
	suite,
}: {
	suite: ReservationSettings
}) {
	const { maxCapacity } = suite
	const { range } = useReservationContext()

	const name = {
		firstName: 'Kevin',
		lastName: 'Smith',
		email: 'guest@example.com',
		avatar: '',
	}

	return (
		<div className="scale-[1.01] w-full max-w-2xl mx-auto">
			<div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
				<p>Logged in as</p>

				<p>
					{String(range.from)} to {String(range.to)}
				</p>

				<div className="flex gap-4 items-center aspect-square">
					<Image
						className="rounded-full"
						src={name.avatar}
						height={30}
						width={30}
						alt={name.firstName || 'User avatar'}
						priority={false}
						loading="lazy"
						onError={e => {
							e.currentTarget.src = '/avatar.png'
						}}
					/>
					<p>{name.firstName}</p>
				</div>
			</div>

			<form className="bg-primary-900 py-8 px-6 sm:px-10 md:px-16 text-base sm:text-lg flex flex-col gap-6 rounded-md">
				{/* Number of Guests */}
				<div className="space-y-2">
					<label htmlFor="numGuests" className="block font-medium">
						How many guests?
					</label>
					<select
						name="numGuests"
						id="numGuests"
						className="px-4 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm focus:outline-none focus:ring-2 focus:ring-accent-500 text-sm sm:text-base"
						required>
						<option value="">Select number of guests...</option>
						{Array.from({ length: maxCapacity }, (_, i) => i + 1).map(x => (
							<option value={x} key={x}>
								{x} {x === 1 ? 'guest' : 'guests'}
							</option>
						))}
					</select>
				</div>

				{/* Observations */}
				<div className="space-y-2">
					<label htmlFor="observations" className="block font-medium">
						Anything we should know about your stay?
					</label>
					<textarea
						name="observations"
						id="observations"
						rows={4}
						className="px-4 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm resize-none focus:outline-none focus:ring-2 focus:ring-accent-500 text-sm sm:text-base"
						placeholder="Any pets, allergies, special requirements, etc.?"
					/>
				</div>

				{/* Reservation Footer */}
				<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mt-4">
					<p className="text-primary-300 text-sm sm:text-base">
						Start by selecting dates
					</p>

					<button className="bg-accent-500 px-5 py-3 text-primary-800 font-semibold rounded-sm hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300 w-full sm:w-auto">
						Reserve now
					</button>
				</div>
			</form>
		</div>
	)
}
