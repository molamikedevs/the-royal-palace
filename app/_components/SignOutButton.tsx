'use client'

import { useState } from 'react'
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid'
import { signOutAction } from '@/app/_lib/actions'

function SignOutButton() {
	const [isLoading, setIsLoading] = useState(false)
	const [showConfirm, setShowConfirm] = useState(false)

	const handleSignOut = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)
		try {
			await signOutAction()
		} finally {
			setIsLoading(false)
		}
	}

	if (showConfirm) {
		return (
			<div className="flex gap-2">
				<button
					onClick={() => setShowConfirm(false)}
					className="py-2 px-4 text-sm bg-primary-800 rounded hover:bg-primary-700 transition-colors">
					Cancel
				</button>
				<form onSubmit={handleSignOut}>
					<button
						type="submit"
						disabled={isLoading}
						className="py-2 px-4 text-sm bg-red-400 rounded hover:bg-red-500 disabled:opacity-75 disabled:cursor-wait transition-colors flex items-center gap-2">
						{isLoading ? (
							<span className="inline-block h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
						) : null}
						<span>Sign Out</span>
					</button>
				</form>
			</div>
		)
	}

	return (
		<button
			onClick={() => setShowConfirm(true)}
			className="w-full py-3 px-5 flex items-center gap-4 font-semibold text-primary-200 hover:bg-primary-900 hover:text-primary-100 transition-colors">
			<ArrowRightOnRectangleIcon className="h-4 w-4 lg:h-5 lg:w-5" />
			<span>Sign out</span>
		</button>
	)
}

export default SignOutButton
