// This file defines the ReservationList component which displays a list of reservations
// It imports the ReservationCard component to render each reservation

'use client'
import ReservationCard from './ReservationCard'
import { Reservations } from '../_types'
import { useOptimistic } from 'react'

import { deleteReservationAction } from '../_lib/actions'

const ReservationList = ({
	reservations,
}: {
	reservations: Reservations[]
}) => {
	const [optimisticReservations, optimisticDelete] = useOptimistic(
		reservations,
		(currentReservations, reservationId) => {
			return currentReservations.filter(
				reservation => reservation.id !== reservationId
			)
		}
	)

	const handleDelete = async (reservationId: string) => {
		optimisticDelete(reservationId)
		try {
			await deleteReservationAction(reservationId)
		} catch (error) {
			console.error('Failed to delete:', error)
			// Optional: show error toast or revert optimistic update
		}
	}

	return (
		<ul className="space-y-6">
			{optimisticReservations.map(reservation => (
				<ReservationCard
					onDelete={handleDelete}
					reservation={reservation}
					key={reservation.id}
				/>
			))}
		</ul>
	)
}

export default ReservationList
