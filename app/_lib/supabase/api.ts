// File: app/_lib/supabase/api.ts
// This file contains functions to interact with the Supabase API for the Royal Palace application.

// Import the Supabase client instance from our configuration
import { SuiteDetails, Suites } from '@/app/_types'
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
// Returns a SuiteDetails object or throws an error if the fetch fails
export const getSuiteById = async function (id: string): Promise<SuiteDetails> {
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

	// Getting all bookings
	const { data, error } = await supabase
		.from('bookings')
		.select('*')
		.eq('suiteId', suiteId)
		.or(`startDate.gte.${todayISOString},status.eq.checked-in`)

	if (error) {
		console.error(error)
		throw new Error('Bookings could not get loaded')
	}

	// Converting to actual dates to be displayed in the date picker
	const bookedDates: Date[] = data
		.map(booking => {
			return eachDayOfInterval({
				start: new Date(booking.startDate),
				end: new Date(booking.endDate),
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
