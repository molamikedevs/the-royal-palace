// File: app/_components/DateSelector.tsx
// This file defines the DateSelector component which allows users to select a date range for reservations
'use client'


import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { CustomDateRange, Suite } from '../_types'
import { useReservationContext } from '@/context/ReservationContext'

type DateSelectorProps = {
	settings: any
	bookedDates: Date[]
	suite: Suite
}

function DateSelector({ settings, bookedDates, suite }: DateSelectorProps) {
	const { range, setRange, resetRange } = useReservationContext()
	// CHANGE
	const regularPrice = 23
	const discount = 23
	const numNights = 23
	const cabinPrice = 23

	// SETTINGS

	const { maxBookingLength, minBookingLength } = settings

	return (
		<div className="flex flex-col justify-between">
			<DayPicker
				className="pt-12 place-self-center"
				mode="range"
				onSelect={range => setRange((range as CustomDateRange) || {})}
				selected={range}
				min={minBookingLength + 1}
				max={maxBookingLength}
				fromMonth={new Date()}
				fromDate={new Date()}
				toYear={new Date().getFullYear() + 5}
				captionLayout="dropdown"
				numberOfMonths={1} // 👈 fallback for small screens
				modifiersClassNames={{
					selected: 'bg-accent-500 text-white',
					disabled: 'opacity-40',
				}}
				classNames={{
					months: 'grid grid-cols-1 lg:grid-cols-2 gap-4',
				}}
			/>

			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 sm:px-8 py-4 bg-accent-500 text-primary-800 gap-4 sm:gap-0">
				<div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-6 gap-2">
					<p className="flex gap-1 sm:gap-2 items-baseline">
						{discount > 0 ? (
							<>
								<span className="text-xl sm:text-2xl">
									${regularPrice - discount}
								</span>
								<span className="line-through font-semibold text-primary-700 text-base sm:text-lg">
									${regularPrice}
								</span>
							</>
						) : (
							<span className="text-xl sm:text-2xl">${regularPrice}</span>
						)}
						<span className="text-sm">/night</span>
					</p>

					{numNights ? (
						<div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
							<p className="bg-accent-600 px-3 py-2 text-xl sm:text-2xl w-max">
								<span>&times;</span> <span>{numNights}</span>
							</p>
							<p>
								<span className="text-sm sm:text-lg font-bold uppercase">
									Total
								</span>{' '}
								<span className="text-xl sm:text-2xl font-semibold">
									${cabinPrice}
								</span>
							</p>
						</div>
					) : null}
				</div>

				{(range.from || range.to) && (
					<button
						className="border border-primary-800 py-2 px-4 text-sm font-semibold self-start sm:self-auto w-max"
						onClick={() => resetRange()}>
						Clear
					</button>
				)}
			</div>
		</div>
	)
}

export default DateSelector
