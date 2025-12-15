'use client'


import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { CustomDateRange, Suites } from "../../types";
import { useReservationContext } from '@/context/ReservationContext'
import { differenceInDays, isPast, isSameDay } from 'date-fns'
import { isAlreadyBooked } from '@/lib/utils';

type DateSelectorProps = {
	settings: any
	bookedDates: Date[]
	suite: Suites
}

function DateSelector({ settings, bookedDates, suite }: DateSelectorProps) {
	// Use the reservation context to manage date selection
	const { range, setRange, resetRange } = useReservationContext()

	// If no range is selected, default to an empty CustomDateRange object
	const displayRange: CustomDateRange = isAlreadyBooked(range, bookedDates)
		? { from: undefined, to: undefined }
		: range

	// Extract necessary settings for reservation
	const { maxBookingLength, minBookingLength } = settings

	// Extract regular price and discount from the suite object
	const { regularPrice, discount } = suite

	// Calculate the number of nights based on the selected date range
	// If no range is selected, default to 0 nights
	// Calculate the total price based on the number of nights and the suite's pricing
	const numNights = differenceInDays(
		displayRange.to || new Date(),
		displayRange.from || new Date()
	)
	const cabinPrice = numNights * (regularPrice - discount)

	return (
		<div className="flex flex-col justify-between">
			<DayPicker
				className="pt-12 place-self-center"
				mode="range"
				onSelect={range => setRange((range as CustomDateRange) || {})}
				selected={displayRange}
				min={minBookingLength + 1}
				max={maxBookingLength}
				fromMonth={new Date()}
				fromDate={new Date()}
				toYear={new Date().getFullYear() + 5}
				disabled={curDate =>
					isPast(curDate) || bookedDates.some(date => isSameDay(date, curDate))
				}
				captionLayout="dropdown"
				numberOfMonths={1} // 👈 fallback for small screens
				modifiersClassNames={{
					selected: 'bg-accent-600 text-white',
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
