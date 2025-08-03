'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import FilterButton from './FilterButton'


const Filter = () => {
	const searchParams = useSearchParams()
	const router = useRouter()
	const pathname = usePathname()

    const activeFilter = searchParams.get('capacity') ?? 'all'

	const handleFilter = (filter: string) => {
		const params = new URLSearchParams(searchParams.toString())
		params.set('capacity', filter)
		router.replace(`${pathname}?${params.toString()}`, { scroll: false })
	}

	return (
		<div className="border border-primary-800 flex ">
			<FilterButton filter="all" handleFilter={handleFilter} activeFilter={activeFilter}>All</FilterButton>
            <FilterButton filter="small" handleFilter={handleFilter} activeFilter={activeFilter}>1-2</FilterButton>
            <FilterButton filter="medium" handleFilter={handleFilter} activeFilter={activeFilter}>2-4</FilterButton>
            <FilterButton filter="large" handleFilter={handleFilter} activeFilter={activeFilter}>4-8</FilterButton>
		</div>
	)
}

export default Filter
