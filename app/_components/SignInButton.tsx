import { signInAction } from "../_lib/actions"



function SignInButtons() {
	return (
		<form action={signInAction}>
			<div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm mx-auto">
				{/* Google Button */}
				<button
					type="submit"
					name="provider"
					value="google"
					className="flex items-center justify-center gap-4 text-base border border-primary-300 px-6 py-3 font-medium w-full rounded-lg">
					<img
						src="https://authjs.dev/img/providers/google.svg"
						alt="Google logo"
						width="24"
						height="24"
					/>
					<span>Continue with Google</span>
				</button>

				{/* GitHub Button */}
				<button
					type="submit"
					name="provider"
					value="github"
					className="flex items-center justify-center gap-4 text-base border border-primary-300 px-6 py-3 font-medium w-full rounded-lg">
					<img
						src="https://authjs.dev/img/providers/github.svg"
						alt="GitHub logo"
						width="24"
						height="24"
					/>
					<span>Continue with GitHub</span>
				</button>
			</div>
		</form>
	)
}

export default SignInButtons
