

import React from 'react'
import SignInButtons from '../_components/SignInButton'


export const metadata = {
	title: 'Login - The Royal Palace',
}

const page = () => {
	return (
		<div className="flex flex-col mt-10 gap-10 items-center">
			<h2 className="text-xl sm:text-3xl font-semibold text-center">
				Sign in to access your guest area
			</h2>
			<SignInButtons />
		</div>
	)
}

export default page
