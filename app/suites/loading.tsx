// File: the-royal-palace/app/suites/loading.tsx
// This file is used to display a loading state for the suites page.
import Spinner from "@/app/_components/Loader"


const Loading = () => {
	return (
		<div className="flex items-center justify-center">
			<p>Loading suites...</p>
			<Spinner />
		</div>
	)
}

export default Loading
