// File: app/_components/SuiteList.tsx
// This file defines the SuiteList component which displays a list of suites based on the selected filter
import { getSuites } from '../_lib/supabase/api'
import { unstable_noStore as noStore } from 'next/cache'
import SuitesCard from './SuitesCard'


type SuiteListProps = {
	filter: string
}

const SuiteList = async ({ filter }: SuiteListProps) => {
	// Disable caching for this component to ensure fresh data is fetched
	// This is important for dynamic data that may change frequently
	// Using unstable_noStore to prevent caching in Next.js
	noStore()

	// Fetch Suites using our service
	const suites = await getSuites()
	// Filter suites based on the capacity
	let displayedSuites = suites // Default to all suites
	if (filter === 'small')
		displayedSuites = suites.filter(suite => suite.maxCapacity <= 2)
	else if (filter === 'medium')
		displayedSuites = suites.filter(
			suite => suite.maxCapacity > 2 && suite.maxCapacity <= 4
		)
	else if (filter === 'large')
		displayedSuites = suites.filter(
			suite => suite.maxCapacity > 4 && suite.maxCapacity <= 8
		)

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-8 xl:gap-10">
			{suites.length > 0 ? (
				displayedSuites.map(suite => (
					<SuitesCard suite={suite} key={suite.id} />
				))
			) : (
				<div className="col-span-full text-center py-10">
					<p className="text-lg text-primary-300">
						No suites available at the moment.
					</p>
				</div>
			)}
		</div>
	)
}

export default SuiteList
