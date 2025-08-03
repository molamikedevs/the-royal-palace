// File: app/_components/LoginMessage.tsx
// This file defines the LoginMessage component which prompts users to log in to reserve a cabin

const LoginMessage = () => {
	return (
		<div className="grid bg-primary-800 ">
			<p className="text-center text-xl py-12 self-center">
				Please{' '}
				<a href="/login" className="underline text-accent-500">
					login
				</a>{' '}
				to reserve this
				<br /> cabin right now
			</p>
		</div>
	)
}

export default LoginMessage
