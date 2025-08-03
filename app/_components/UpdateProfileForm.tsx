import Image from 'next/image'
import SelectCountry from './SelectCountry'
import { ChildrenProps } from '../_types'

const UpdateProfileForm = ({ children }: ChildrenProps) => {
	const countryFlag = '/salone.svg'

	return (
		<form className="bg-primary-900 py-6 sm:py-8 px-4 sm:px-6 md:px-8 text-base sm:text-lg flex gap-4 sm:gap-6 flex-col">
			<div className="space-y-2 w-full">
				<label>Full name</label>
				<input
					disabled
					className="px-4 py-2 sm:px-5 sm:py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
				/>
			</div>

			<div className="space-y-2 w-full">
				<label>Email Address</label>
				<input
					disabled
					className="px-4 py-2 sm:px-5 sm:py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
				/>
			</div>

			<div className="space-y-2">
				<div className="flex items-center justify-between">
					<label htmlFor="nationality">Where are you from?</label>
					<div className="relative aspect-square">
						<Image
							src={countryFlag}
							fill
							alt="Country flag"
							className="h-5 rounded-sm object-cover"
						/>
					</div>
				</div>
				{children}
			</div>

			<div className="space-y-2 w-full">
				<label>National ID</label>
				<input
					disabled
					className="px-4 py-2 sm:px-5 sm:py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
				/>
			</div>

			<div className="flex justify-end items-center gap-4 sm:gap-6 w-full">
				<button className="bg-accent-500 px-6 py-3 sm:px-8 sm:py-4 text-primary-800 font-semibold hover:bg-accent-600 hover:scale-95 transition-all w-full sm:w-auto">
					Update profile
				</button>
			</div>
		</form>
	)
}

export default UpdateProfileForm
