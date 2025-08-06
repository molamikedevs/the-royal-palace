// File: app/_lib/supabase/api.ts
// This file contains functions to interact with the Supabase API for the Royal Palace application.

// Import the Supabase client instance from our configuration
import { Reservations, Suites } from '@/app/_types'
import { supabase } from './config'
import { notFound } from 'next/navigation'
import { eachDayOfInterval } from 'date-fns'

// Function to fetch all suites from the database
// Returns an array of Suites objects or throws an error if the fetch fails
export const getSuites = async function (): Promise<Suites[]> {
	try {
		// Execute the Supabase query:
		// 1. Select from 'suites' table
		// 2. Only get specified columns
		// 3. Order results by suites name
		const { data, error } = await supabase
			.from('suites')
			.select(
				'id, name, maxCapacity, regularPrice, discount, image, description'
			)

			.order('name')

		// Handle any errors returned from Supabase
		if (error) {
			throw new Error(`Suites could not be loaded: ${error.message}`)
		}

		// Additional safety check - ensure we received data
		if (!data) {
			throw new Error('No Suites data returned from query')
		}

		// Return the successfully fetched Suites data
		return data
	} catch (error) {
		// Throw user-friendly error message
		throw new Error('Failed to load suites. Please try again later.')
	}
}

// Function to fetch a specific suite by its ID
// Returns a Suite object or throws an error if the fetch fails
export const getSuiteById = async function (id: string): Promise<Suites> {
	try {
		// Execute the Supabase query:
		// 1. Select from 'suites' table
		// 2. Only get specified columns
		// 3. Filter by the provided ID
		const { data, error } = await supabase
			.from('suites')
			.select(
				'id, name, maxCapacity, regularPrice, discount, description, image'
			)
			.eq('id', id)
			.single()

		// Handle any errors returned from Supabase
		if (error) {
			throw new Error(`Suite could not be loaded: ${error.message}`)
		}

		// Additional safety check - ensure we received data
		if (!data) {
			throw new Error('No Suite data returned from query')
		}

		// Return the successfully fetched Suite data
		return data
	} catch (error) {
		// Throw user-friendly error message
		notFound() // Redirect to 404 page
	}
}

// Function to fetch booked dates for a specific suite by its ID
// Returns an array of Date objects representing booked dates or throws an error if the fetch fails
export async function getBookedDatesBySuiteId(
	suiteId: string
): Promise<Date[]> {
	let today = new Date()
	today.setUTCHours(0, 0, 0, 0)
	const todayISOString = today.toISOString()

	// Getting all reservations
	const { data, error } = await supabase
		.from('reservations')
		.select('*')
		.eq('suiteId', suiteId)
		.or(`startDate.gte.${todayISOString},status.eq.checked-in`)

	if (error) {
		console.error(error)
		throw new Error('Reservations could not get loaded')
	}

	// Converting to actual dates to be displayed in the date picker
	const bookedDates: Date[] = data
		.map(reservation => {
			return eachDayOfInterval({
				start: new Date(reservation.startDate),
				end: new Date(reservation.endDate),
			})
		})
		.flat()

	return bookedDates
}

// Function to fetch settings from the database
// Returns a settings object or throws an error if the fetch fails
export async function getSettings() {
	const { data, error } = await supabase.from('settings').select('*').single()

	if (error) {
		console.error(error)
		throw new Error('Settings could not be loaded')
	}

	return data
}

// Function to create a new guest in the database
// Accepts a newGuest object with email and fullName properties
export async function createGuest(newGuest: {
	email: string
	fullName: string
}) {
	const { data, error } = await supabase.from('guests').insert([newGuest])
	if (error) {
		console.error('Supabase insert error:', error)
		throw error // Let the callback catch this
	}
	return data
}

// Function to fetch a guest by their email
// Returns a guest object or null if no guest is found
export async function getGuest(email: string) {
	const { data, error } = await supabase
		.from('guests')
		.select('*')
		.eq('email', email)
		.single()

	// No error here! We handle the possibility of no guest in the sign in callback
	return data
}

// Function to fetch reservations for a specific guest by their ID
// Returns an array of reservation objects or throws an error if the fetch fails
export async function getReservations(
	guestId: string
): Promise<Reservations[]> {
	const { data, error, count } = await supabase
		.from('reservations')
		// We actually also need data on the suites as well. But let's ONLY take the data that we actually need, in order to reduce downloaded data.
		.select(
			'id, created_at, startDate, endDate, status, numNights, numGuests, observations, totalPrice, guestId, suiteId, suitePrice, suites(name, image)'
		)
		.eq('guestId', guestId)
		.order('startDate')

	if (error) {
		console.error(error)
		throw new Error('Reservation could not get loaded')
	}

	return data.map(reservation => ({
		...reservation,
		suites:
			reservation.suites && Array.isArray(reservation.suites)
				? reservation.suites[0]
				: reservation.suites,
	}))
}

// Function to fetch a specific reservation by its ID
// Returns a reservation object or throws an error if the fetch fails
export async function getReservation(id: string): Promise<Reservations> {
	const { data, error } = await supabase
		.from('reservations')
		.select('*')
		.eq('id', id)
		.single()

	if (error) {
		throw new Error('Reservation could not get loaded')
	}

	return data
}

