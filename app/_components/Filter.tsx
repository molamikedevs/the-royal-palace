// the-royal-palace/app/_components/Filter.tsx
// This component provides filtering options for the Suites page, allowing users to filter by suite capacity
'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import FilterButton from './FilterButton'

const Filter = () => {
	const searchParams = useSearchParams() // Get the current search parameters from the URL
	const router = useRouter() // Use the router to navigate without reloading the page
	const pathname = usePathname() // Get the current pathname

	// Get the current filter from the search parameters, defaulting to 'all' if not set
	// This allows the filter to persist across navigations
	const activeFilter = searchParams.get('capacity') ?? 'all'

	// Function to handle filter changes
	// This updates the URL with the selected filter without reloading the page
	const handleFilter = (filter: string) => {
		const params = new URLSearchParams(searchParams.toString())
		params.set('capacity', filter)
		router.replace(`${pathname}?${params.toString()}`, { scroll: false })
	}

	return (
		<div className="border border-primary-800 flex ">
			<FilterButton
				filter="all"
				handleFilter={handleFilter}
				activeFilter={activeFilter}>
				All
			</FilterButton>
			<FilterButton
				filter="small"
				handleFilter={handleFilter}
				activeFilter={activeFilter}>
				1-2
			</FilterButton>
			<FilterButton
				filter="medium"
				handleFilter={handleFilter}
				activeFilter={activeFilter}>
				2-4
			</FilterButton>
			<FilterButton
				filter="large"
				handleFilter={handleFilter}
				activeFilter={activeFilter}>
				4-8
			</FilterButton>
		</div>
	)
}

export default Filter
