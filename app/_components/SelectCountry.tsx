// Comment each snippet in this file according to its purpose
import { getCountries } from '../_lib/utils'
import { SelectCountryProps } from '../_types'


// This snippet defines the structure of a country object
interface Country {
		name: string
		flag: string
	}

// This component fetches a list of countries and renders a select dropdown
// allowing users to choose their country, displaying both the name and flag.
const SelectCountry = async ({
	defaultCountry,
	name,
	id,
	className,
}: SelectCountryProps) => {
	const countries = await getCountries()
	

    // Find the flag for the default country
    // If the country is not found, it will default to an empty string
	const flag: string =
		(countries as Country[]).find(
			(country: Country) => country.name === defaultCountry
		)?.flag ?? ''

	return (
		<select
			name={name}
			id={id}
			// Here we use a trick to encode BOTH the country name and the flag into the value. Then we split them up again later in the server action
			defaultValue={`${defaultCountry}%${flag}`}
			className={className}>
			<option value="">Select country...</option>
			{countries.map((c: Country) => (
				<option key={c.name} value={`${c.name}%${c.flag}`}>
					{c.name}
				</option>
			))}
		</select>
	)
}

export default SelectCountry
