'use client'

import { useFormStatus } from "react-dom"
import { ChildrenProps } from "@/types"


interface SubmitButtonProps extends ChildrenProps {
	pendingLabel: string 
	className?: string 
}


const SubmitButton = ({children, pendingLabel, className}: SubmitButtonProps) => {
	const { pending } = useFormStatus()
	return (
		<button
			className={`bg-accent-500 text-primary-800 font-semibold hover:bg-accent-600 hover:scale-95 transition-all w-full sm:w-auto ${className}`}
			disabled={pending}>
			{pending ? pendingLabel :children}
		</button>
	)
}

export default SubmitButton
