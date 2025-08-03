// File: app/_components/Reservation.tsx
// This file defines the Reservation component which handles the reservation process for a specific suite
'use client'
import { ReservationProps, Suites } from "../_types"
import DateSelector from "./DateSelector"
import ReservationForm from "./ReservationForm"


const Reservation = ({ suite, settings, bookedDates }: ReservationProps) => {
	
	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 border border-primary-800 min-h-[400px] lg:min-h-[500px] rounded-lg p-6 sm:p-8 lg:p-10 mt-8 lg:mt-12 gap-6 lg:gap-8">

			<DateSelector settings={settings} bookedDates={bookedDates} />
			<ReservationForm suite={suite} />
		</div>
	)
}

export default Reservation
