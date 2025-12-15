import { ReactNode } from 'react'

/**
 * TypeScript interface defining the structure of a room object
 * This ensures type safety for all room data we work with
 */

interface Suites {
	id: number 
	suiteId?: string 
	name: string 
	maxCapacity: number 
	regularPrice: number 
	discount: number 
	image: string | null 
	description: string 
}

interface Country {
	name: string 
	flag: string 
	id: string 
	defaultCountry: string 
	className: string 
}


interface SignInParams {
	email: string
	password: string
}


interface CustomDateRange {
	from: Date | undefined 
	to: Date | undefined 
}


interface ChildrenProps {
	children: ReactNode 
}


interface Reservations {
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

interface ReservationFormData {
	startDate: Date | string 
	endDate: Date | string 
	numNights: number 
	suiteId: string 
	suitePrice: number 
}


interface NavigationContextType {
	pathname: string 
	menuOpen: boolean 
	toggleMenu: () => void 
	closeMenu: () => void 
}


interface SelectCountryProps {
	defaultCountry: string 
	name: string
	id?: string 
	className?: string 
}


interface FilterButtonProps {
	filter: string 
	handleFilter: (filter: string) => void 
	activeFilter: string 
	children: React.ReactNode 
}
