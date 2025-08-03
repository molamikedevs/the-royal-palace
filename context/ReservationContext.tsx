// The reservation context is used to manage the date range and open state of the reservation modal.
// It provides a way to set and reset the date range for reservations.
'use client'

import { ChildrenProps, CustomDateRange } from '@/app/_types' // Importing types for children props and custom date range
import { createContext, useContext, useState } from 'react' // Importing React context and hooks for state management

// Define the initial state for the date range
const initialState: CustomDateRange = {
	from: undefined,
	to: undefined,
}

// Create a context for the reservation state
const ReservationContext = createContext({
	range: initialState,
	isOpen: false,
	setIsOpen: (isOpen: boolean) => {},
	setRange: (range: typeof initialState) => {},
	resetRange: () => {},
})

// ReservationProvider component to provide the reservation context to its children
// It manages the state of the reservation date range and whether the reservation modal is open.
export const ReservationProvider = ({ children }: ChildrenProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const [range, setRange] = useState<CustomDateRange>({
		from: initialState.from,
		to: initialState.to,
	})

	const resetRange = () => {
		setRange(initialState)
	}

	return (
		<ReservationContext.Provider
			value={{ range, isOpen, setIsOpen, setRange, resetRange }}>
			{children}
		</ReservationContext.Provider>
	)
}

// Custom hook to use the ReservationContext
// This hook allows components to access the reservation context without needing to import the context directly.
export const useReservationContext = () => {
	const context = useContext(ReservationContext)
	if (!context) {
		throw new Error(
			'useReservationContext must be used within a ReservationProvider'
		)
	}
	return context
}
