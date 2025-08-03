import React from 'react'
import Spinner from '@/app/_components/Loader'

const Loading = () => {
	return (
		<div className="grid items-center justify-center">
			<p>Loading account...</p>
			<Spinner />
		</div>
	)
}

export default Loading
