import { PencilSquareIcon } from '@heroicons/react/24/solid'
import { format, isPast, isToday } from 'date-fns'
import DeleteReservation from './DeleteReservation'
import { formatDistanceFromNow } from '../_lib/utils'
import { Reservations } from '../_types'
import Image from 'next/image'
import Link from 'next/link'

function ReservationCard({
	reservation,
	onDelete,
}: {
	reservation: Reservations
	onDelete: (id: string) => void
}) {
	// Destructure with fallbacks to prevent errors
	const {
		id,
		startDate,
		endDate,
		numNights,
		totalPrice,
		numGuests,
		created_at,
		suites,
	} = reservation

	// Provide fallback values if suites is missing
	const suiteName = suites?.name || 'Unknown Suite'
	const suiteImage = suites?.image || '/default-suite.jpg'

	return (
		<div className="flex flex-col md:flex-row border border-primary-800">
			{/* IMAGE */}
			<div className="relative w-full h-48 md:h-auto md:flex-1 md:aspect-square">
				<Image
					src={suiteImage}
					alt={`Suite ${suiteName}`}
					className="object-cover border-b md:border-b-0 md:border-r border-primary-800"
					fill
					priority={false}
					loading="lazy"
					onError={e => {
						e.currentTarget.src = '/default-suite.jpg'
					}}
				/>
			</div>

			{/* MAIN CONTENT */}
			<div className="flex-grow px-4 py-4 flex flex-col gap-2">
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
					<h3 className="text-xl font-semibold">
						{numNights} nights in Suite {suiteName}
					</h3>
					{isPast(new Date(startDate)) ? (
						<span className="bg-yellow-800 text-yellow-200 w-max px-3 h-6 uppercase text-xs font-bold flex items-center rounded-sm">
							past
						</span>
					) : (
						<span className="bg-green-800 text-green-200 w-max px-3 h-6 uppercase text-xs font-bold flex items-center rounded-sm">
							upcoming
						</span>
					)}
				</div>

				<p className="text-base text-primary-300">
					{format(new Date(startDate), 'EEE, MMM dd yyyy')} (
					{isToday(new Date(startDate))
						? 'Today'
						: formatDistanceFromNow(
								typeof startDate === 'string'
									? startDate
									: startDate.toISOString()
						  )}
					) &mdash; {format(new Date(endDate), 'EEE, MMM dd yyyy')}
				</p>

				<div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mt-auto">
					<p className="text-xl font-semibold text-accent-400">${totalPrice}</p>
					<p className="text-primary-300 hidden sm:inline">&bull;</p>
					<p className="text-base text-primary-300">
						{numGuests} guest{numGuests > 1 && 's'}
					</p>
					<p className="sm:ml-auto text-sm text-primary-400 mt-1 sm:mt-0">
						Booked {format(new Date(created_at), 'EEE, MMM dd yyyy, p')}
					</p>
				</div>
			</div>

			{/* ACTIONS */}
			<div className="flex gap-8 md:flex-col justify-between md:justify-center border-t md:border-t-0 md:border-l border-primary-800 md:w-[100px]">
				{!isPast(new Date(startDate)) && (
					<>
						<Link
							href={`/account/reservations/edit/${id}`}
							className="group flex items-center justify-center gap-2 uppercase text-xs font-bold text-primary-300 border-r md:border-r-0 md:border-b border-primary-800 px-3 py-2 hover:bg-accent-600 transition-colors hover:text-primary-900 w-full">
							<PencilSquareIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
							<span>Edit</span>
						</Link>
						<div className="w-full">
							<DeleteReservation
								onDelete={onDelete}
								reservationId={id}
								className="w-full"
							/>
						</div>
					</>
				)}
			</div>
		</div>
	)
}

export default ReservationCard
