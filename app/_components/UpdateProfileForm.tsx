// the-royal-palace/app/_components/UpdateProfileForm.tsx
// This component is used to update the user's profile information
import Image from 'next/image'
import { ChildrenProps } from '../_types'
import { updateProfileAction } from '../_lib/actions'
import SubmitButton from './SubmitButton'

const UpdateProfileForm = ({
	children,
	guest,
}: ChildrenProps & { guest: any }) => {
	const { fullName, email, nationalID, countryFlag } = guest || {}

	return (
		<form
			action={updateProfileAction}
			className="bg-primary-900 py-6 sm:py-8 px-4 sm:px-6 md:px-8 text-base sm:text-lg flex gap-4 sm:gap-6 flex-col">
			<div className="space-y-2 w-full">
				<label>Full name</label>
				<input
					type="text"
					name="fullName"
					id="fullName"
					defaultValue={fullName || ''}
					disabled
					className="px-4 py-2 sm:px-5 sm:py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
				/>
			</div>

			<div className="space-y-2 w-full">
				<label>Email Address</label>
				<input
					type="email"
					name="email"
					id="email"
					defaultValue={email || ''}
					disabled
					className="px-4 py-2 sm:px-5 sm:py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
				/>
			</div>

			<div className="space-y-2">
				<div className="flex items-center justify-between">
					<label htmlFor="nationality" className="mr-2">
						Where are you from?
					</label>
					<div className="relative w-6 h-6 shrink-0">
						<Image
							src={countryFlag || '/salone-flag.svg'}
							fill
							alt="Country flag"
							className="rounded-sm object-cover"
						/>
					</div>
				</div>
				{children}
			</div>

			<div className="space-y-2 w-full">
				<label>National ID</label>
				<input
					type="text"
					name="nationalID"
					id="nationalID"
					defaultValue={nationalID || ''}
					className="px-4 py-2 sm:px-5 sm:py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
				/>
			</div>

			<div className="flex justify-end items-center gap-4 sm:gap-6 w-full">
				<SubmitButton
					pendingLabel="Updating..."
					className="px-6 py-3 sm:px-8 sm:py-4">
					Update Profile
				</SubmitButton>
			</div>
		</form>
	)
}

export default UpdateProfileForm
