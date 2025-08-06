import { ReactNode } from 'react'

/**
 * TypeScript interface defining the structure of a room object
 * This ensures type safety for all room data we work with
 */


export interface Suites {
	id: number // Unique identifier for the room
	suiteId: string // Unique identifier for the suite
	name: string // Name of the room
	maxCapacity: number // Maximum number of guests allowed
	regularPrice: number // Standard price without discounts
	discount: number // Current discount amount (if any)
	image: string | null // URL/path to room image (nullable)
	description: string // Description of the room
}

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

// Interface for the reservation object
// This defines the structure of a reservation object used in the application
export interface Reservations {
	id: string
	guestId: string
	suiteId: string
	observations: string
	startDate: string | Date
	endDate: string | Date
	numNights: number
	totalPrice: number
	suitePrice: number
	numGuests: number
	status: string
	created_at: string | Date
	suites: {
		name: string
		image: string
	}
}

// Interface for the reservation form data
// This defines the structure of the data submitted through the reservation form
export interface ReservationFormData {
	startDate: Date | string // Start date of the reservation
	endDate: Date | string // End date of the reservation
	numNights: number // Number of nights for the reservation
	suiteId: string // ID of the suite being reserved
	suitePrice: number // Price of the suite for the reservation
}


// Interface for the navigation context
// This defines the structure of the navigation context used in the application
export interface NavigationContextType {
	pathname: string // Current path of the application
	menuOpen: boolean // Indicates if the menu is open or closed
	toggleMenu: () => void // Function to toggle the menu open/closed
	closeMenu: () => void // Function to close the menu
}

// Interface for the SelectCountry component props
export interface SelectCountryProps {
	defaultCountry: string // Default country to be selected
	name: string // Name attribute for the select element
	id?: string // Optional ID for the select element
	className?: string // Optional CSS class for styling
}

// Interface for the FilterButton component props
// This defines the structure of the props used in the FilterButton component
export interface FilterButtonProps {
	filter: string // Filter value to be applied
	handleFilter: (filter: string) => void // Function to handle filter changes
	activeFilter: string // Currently active filter
	children: React.ReactNode // Child elements to be rendered inside the button
}
