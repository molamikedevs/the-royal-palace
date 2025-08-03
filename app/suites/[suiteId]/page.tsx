// File: app/suites/[suiteId]/page.tsx
// This file defines the dynamic route for displaying a specific suite's details
import Reservation from '@/app/_components/Reservation'
import Suite from '@/app/_components/Suite'
import { getBookedDatesBySuiteId, getSettings, getSuiteById, getSuites } from '@/app/_lib/supabase/api'
import Spinner from '@/app/loading'
import { Suspense } from 'react'


/// This function generates metadata for the page, including the title
/// It fetches the suite details using the suite ID from the URL parameters.
export async function generateMetadata({
	params,
}: {
	params: { suiteId: string }
}) {
	const { suiteId } = await params
	if (!suiteId) {
		return {
			title: 'Suite not found',
		}
	}
	const suite = await getSuiteById(suiteId)
	return {
		title: `Suite ${suite.name}`,
	}
}

// generateStaticParams function is used to generate static paths for dynamic routes
// It fetches all suites from the database and returns an array of objects with the suiteId property.
export async function generateStaticParams() {
	const suites = await getSuites()
	const ids = suites.map(suite => ({
		suiteId: String(suite.id),
		
	}))
	return ids
	
}

/// This is a dynamic route that displays the details of a specific suite
/// The suite ID is passed as a parameter in the URL, and the suite details are fetched from the database.
const SuiteDetailsPage = async ({
	params,
}: {
	params: { suiteId: string }
}) => {
	const { suiteId } = await params
	// Handle case where suite isn't found
	if (!suiteId) {
		return <div className="text-center py-20">Suite not found</div>
	}

	// Fetch the suite details using the suite ID from the URL parameters
	const suite = await getSuiteById(suiteId)
	const settings = await getSettings()
	const bookedDates = await getBookedDatesBySuiteId(suiteId)

	return (
		<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<Suite suite={suite} />
			{/* Reservation Section */}
			<div className="text-center px-4">
				<h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold">
					Reserve {suite.name} today. Pay on arrival.
				</h2>

				<Suspense fallback={<Spinner />}>
					<Reservation suite={{ ...suite, id: suite.id }} settings={settings} bookedDates={bookedDates} />
				</Suspense>
			</div>
		</div>
	)
}

export default SuiteDetailsPage
