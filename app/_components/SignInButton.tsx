// this component  handles user sign-in functionality
// it provides buttons for signing in with Google and GitHub
// it uses Next.js and Tailwind CSS for styling

'use client'

import { useState } from 'react'
import Image from 'next/image'
import { signInAction } from '../_lib/actions'

function SignInButtons() {
	// State to manage loading state for each provider
	const [loadingProvider, setLoadingProvider] = useState<string | null>(null)

	// Function to handle sign-in for a specific provider
	// It sets the loading state for the provider being used
	// and triggers the sign-in action
	// The provider is passed as an argument to the function
	// This function is called when the user clicks on a sign-in button
	// It updates the loading state to indicate which provider is being used
	// and calls the signInAction function with the provider name
	// This allows the sign-in process to be initiated for the selected provider
	// The loading state is used to disable the button and show a spinner while signing in
	// The function is defined within the component to have access to the state
	// and can be used directly in the form submission handlers
	// The provider name is passed as a string to identify which provider button was clicked
	// This allows for a clean and reusable sign-in button component.
	const handleSignIn = (provider: string) => {
		setLoadingProvider(provider)
	}

	return (
		<div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm mx-auto px-4 sm:px-0">
			{/* Google Button */}
			<form
				action={signInAction}
				onSubmit={() => handleSignIn('google')}
				className="w-full">
				<input type="hidden" name="provider" value="google" />
				<button
					type="submit"
					disabled={loadingProvider === 'google'}
					className="flex items-center justify-center gap-3 sm:gap-4 text-sm sm:text-base border border-primary-300 px-4 sm:px-6 py-3 font-medium w-full rounded-lg disabled:opacity-75 disabled:cursor-wait min-h-[50px] sm:min-h-[56px] relative">
					{loadingProvider === 'google' && (
						<span className="absolute left-4 inline-block h-5 w-5 sm:h-6 sm:w-6 border-2 border-t-transparent border-primary-300 rounded-full animate-spin"></span>
					)}
					<div className="relative h-5 w-5 sm:h-6 sm:w-6">
						<Image
							src="https://authjs.dev/img/providers/google.svg"
							alt="Google logo"
							fill
							className="object-contain"
						/>
					</div>
					<span>Continue with Google</span>
				</button>
			</form>

			{/* GitHub Button */}
			<form
				action={signInAction}
				onSubmit={() => handleSignIn('github')}
				className="w-full">
				<input type="hidden" name="provider" value="github" />
				<button
					type="submit"
					disabled={loadingProvider === 'github'}
					className="flex items-center justify-center gap-3 sm:gap-4 text-sm sm:text-base border border-primary-300 px-4 sm:px-6 py-3 font-medium w-full rounded-lg disabled:opacity-75 disabled:cursor-wait min-h-[50px] sm:min-h-[56px] relative">
					{loadingProvider === 'github' && (
						<span className="absolute left-4 inline-block h-5 w-5 sm:h-6 sm:w-6 border-2 border-t-transparent border-primary-300 rounded-full animate-spin"></span>
					)}
					<div className="relative h-5 w-5 sm:h-6 sm:w-6">
						<Image
							src="https://authjs.dev/img/providers/github.svg"
							alt="GitHub logo"
							fill
							className="object-contain"
						/>
					</div>
					<span>Continue with GitHub</span>
				</button>
			</form>
		</div>
	)
}

export default SignInButtons
