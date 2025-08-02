// Comment on all functions in this file according to their purpose
// Utility functions for the Royal Palace application
import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";


// Interface for formatDistance options
// This interface defines the options that can be passed to the formatDistance function
export interface FormatDistanceOptions {
	addSuffix?: boolean;
}


// Get countries from an external API
// This function fetches a list of countries and their flags from a public API
export async function getCountries() {
	try {
		const res = await fetch('https://restcountries.com/v2/all?fields=name,flag')
		const countries = await res.json()
		return countries
	} catch {
		throw new Error('Could not fetch countries')
	}
}

// Formats the distance from the current date to a given date string
// This function takes a date string, parses it, and returns a human-readable distance from now


export const formatDistanceFromNow = (dateStr: string): string =>
	formatDistance(parseISO(dateStr), new Date(), {
		addSuffix: true,
	} as FormatDistanceOptions).replace("about ", "");