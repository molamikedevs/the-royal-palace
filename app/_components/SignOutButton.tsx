
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';


function SignOutButton() {
	return (
		<form>
			<button className="w-full py-3 px-5 flex items-center gap-4 font-semibold text-primary-200 hover:bg-primary-900 hover:text-primary-100 transition-colors">
				<ArrowRightOnRectangleIcon className="h-4 w-4 lg:h-5 lg:w-5" />
				<span>Sign out</span>
			</button>
		</form>
	)
}

export default SignOutButton;