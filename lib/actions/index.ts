"use server"

import { revalidatePath } from 'next/cache'
import { auth, signIn, signOut } from '../auth/config'
import { supabase } from '../supabase/config'
import { getReservations } from '../supabase/api'
import { redirect } from 'next/navigation'
import { ReservationFormData } from "@/types";


//Update profile form action
export async function updateProfileAction(formData: FormData) {
	const session = await auth()
	if (!session) {
		throw new Error('You must be logged in to update your profile.')
	}

	const nationalID = formData.get('nationalID')?.toString()

	const nationalValue = formData.get('nationality')?.toString() || ''
	const [nationality, countryFlag] = nationalValue.split('%')

	// Validate the national ID
	if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID ?? '')) {
		throw new Error('Please provide a valid National ID.')
	}

	// Update the guest profile in the database
	// Prepare the data to be updated
	const updateData = { nationalID, nationality, countryFlag }

	const { error } = await supabase // Update the guest profile in the database
		.from('guests')
		.update(updateData)
		.eq('id', session.user.guestId) // Use the guestId from the session
		.select()
		.single()
	if (error) {
		throw new Error('Guest could not be updated')
	}
	revalidatePath('/account/profile') // Revalidate the profile page to reflect changes
}

// This function handles the creation of a reservation
export async function createReservationAction(
	reservationData: ReservationFormData,
	formData: FormData
) {
	// Ensure the user is authenticated
	const session = await auth()
	// Check if the user is logged in
	if (!session) {
		throw new Error('You must be logged in to create a reservation.')
	}

	const newReservation = {
		...reservationData, // Spread the reservation data
		guestId: session.user.guestId, // Use the guestId from the session
		numGuests: Number(formData.get('numGuests')?.toString()),
		observations: formData.get('observations')?.toString().slice(0, 100) || '',
		extrasPrice: 0, // Initialize extrasPrice to 0
		totalPrice: reservationData.suitePrice, // Use the suite price from the reservation data
		isPaid: false, // Set isPaid to false by default
		hasBreakfast: false, // Set hasBreakfast to false by default
		status: 'unconfirmed', // Set the initial status to 'unconfirmed'
	}

	console.log('Creating reservation:', newReservation)

	// Insert the new reservation into the database
	const { error } = await supabase.from('reservations').insert([newReservation])

	// throw an error if the reservation could not be created
	if (error) {
		throw new Error('Reservation could not be created')
	}

	// Revalidate the reservations page to reflect changes
	revalidatePath(`/suites/${reservationData.suiteId}`) // Revalidate the specific suite page

	// Redirect to the thank you page after successful reservation creation
	redirect('/suites/thank-you')
}

// This function handles the editing of a reservation
export async function updateReservationAction(formData: FormData) {
	// Ensure the user is authenticated
	const session = await auth()
	if (!session) {
		throw new Error('You must be logged in to delete a reservation.')
	}

	const reservationId = Number(formData.get('reservationId')?.toString())

	// Ensure the reservation belongs to the authenticated user
	const guestReservations = await getReservations(session.user.guestId || '')
	const guestBookingIds = guestReservations.map(reservation => reservation.id)

	//@ts-ignore
	if (!guestBookingIds.includes(reservationId)) {
		throw new Error('You are not authorized to update this reservation.')
	}

	const updateData = {
		numGuests: formData.get('numGuests')?.toString(),
		observations: formData.get('observations')?.toString().slice(0, 100),
	}

	const { error } = await supabase
		.from('reservations')
		.update(updateData)
		.eq('id', reservationId)
		.select()
		.single()

	if (error) {
		throw new Error('Reservation could not be updated')
	}
	// revalidatePath('/account/reservations')
	revalidatePath(`/account/reservations`) // Revalidate the specific reservation edit page
	// Redirect to the updated reservation page
	revalidatePath(`/account/reservations/edit/${reservationId}`)

	// Optionally, you can redirect to the reservations page or the updated reservation page
	redirect(`/account/reservations`) // Redirect to the updated reservation page
}

// This function handles the deletion of a reservation
export async function deleteReservationAction(reservationId: string) {
	const session = await auth()
	if (!session) {
		throw new Error('You must be logged in to delete a reservation.')
	}

	// Ensure the reservation belongs to the authenticated user
	const guestReservations = await getReservations(session.user.guestId || '')
	const guestReservationsIds = guestReservations.map(
		reservation => reservation.id
	)
	if (!guestReservationsIds.includes(reservationId)) {
		throw new Error('You are not authorized to delete this reservation.')
	}

	const { error } = await supabase
		.from('reservations')
		.delete()
		.eq('id', reservationId)
		.select()
		.single()
	if (error) {
		throw new Error('Reservation could not be deleted')
	}
	revalidatePath('/account/reservations') // Revalidate the reservations page to reflect changes
}

// This function handles the sign-in action for different providers
// It expects a FormData object with a "provider" field
export async function signInAction(formData: FormData) {
	const provider = formData.get('provider')
	if (provider === 'google' || provider === 'github') {
		await signIn(provider as string, {
			redirectTo: '/account',
		})
	} else {
		throw new Error('Invalid provider')
	}
}

// This function handles the sign-out action
export async function signOutAction() {
	await signOut({
		redirectTo: '/', // Redirect to the home page after signing out
	})
}