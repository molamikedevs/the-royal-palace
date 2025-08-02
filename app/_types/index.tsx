import { ReactNode } from 'react'

/**
 * TypeScript interface defining the structure of a room object
 * This ensures type safety for all room data we work with
 */


export interface Suites {
	id: number // Unique identifier for the room
	name: string // Name of the room
	maxCapacity: number // Maximum number of guests allowed
	regularPrice: number // Standard price without discounts
	discount: number // Current discount amount (if any)
	image: string | null // URL/path to room image (nullable)
	description: string // Description of the room
}


// Interface for the children prop
// This is used to type components that accept children as props
export interface SuiteDetails {
	id: number // Unique identifier for the room
	name: string // Name of the room
	maxCapacity: number // Maximum number of guests allowed
	regularPrice: number // Standard price without discounts
	discount: number // Current discount amount (if any)
	image: string | null // URL/path to room image (nullable)
	description: string // Description of the room
}


// Interface for the children prop
// This is used to type components that accept children as props
export interface Country {
	name: string // Name of the country
	flag: string // URL/path to the country's flag image
	id: string // Unique identifier for the country
	defaultCountry: string // Default country name for display purposes
	className: string // CSS class for styling the country element
}


// Interface for sign-in parameters
// This is used to define the structure of the parameters required for signing in
export interface signInParams {
	email: string
	password: string
}


// Interface for custom date range
// This is used to define a date range for reservations or bookings
export interface CustomDateRange {
	from: Date | undefined // Start date of the reservation
	to: Date | undefined // End date of the reservation
}

// Interface for the children prop
// This is used to type components that accept children as props
export interface ChildrenProps {
	children: ReactNode // ReactNode type for children prop
}


// Interface for the booking object
// This defines the structure of a booking object used in the application
export interface Booking {
	id: string
	guestId: string
	startDate: string | Date
	endDate: string | Date
	numNights: number
	totalPrice: number
	numGuests: number
	status: string
	created_at: string | Date
	cabins: {
		name: string
		image: string
	}
}
