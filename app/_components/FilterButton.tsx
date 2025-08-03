type FilterButtonProps = {
	filter: string
	handleFilter: (filter: string) => void
	activeFilter: string
	children: React.ReactNode
}

const FilterButton = ({
	filter,
	handleFilter,
	activeFilter,
	children
}: FilterButtonProps) => {
	return (
		<button
			onClick={() => handleFilter(filter)}
			className={`px-5 py-2 hover:bg-primary-900 ${
				activeFilter === filter ? 'bg-primary-900 text-white' : ''
			}`}>
			{children}
		</button>
	)
}

export default FilterButton
