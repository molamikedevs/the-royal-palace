'use client'

import { TrashIcon } from '@heroicons/react/24/solid'
import { useTransition, useState } from 'react'
import SpinnerMini from '../common/SpinnerMini'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface DeleteReservationProps {
	reservationId: string
	className?: string
	onDelete?: (id: string) => void
}

function DeleteReservation({
	reservationId,
	className,
	onDelete,
}: DeleteReservationProps) {
	const [isPending, startTransition] = useTransition()
	const [showModal, setShowModal] = useState(false)

	const handleConfirmDelete = () => {
		startTransition(() =>
			// deleteReservationAction(reservationId)
			onDelete?.(reservationId)
		)
		setShowModal(false)
	}

	return (
		<>
			<button
				onClick={() => setShowModal(true)}
				className={`group flex items-center justify-center gap-2 text-center uppercase text-xs font-bold text-primary-300 hover:bg-accent-600 transition-colors hover:text-primary-900 px-3 py-2 border-t md:border-t-0 md:border-b border-primary-800 ${className}`}>
				{!isPending ? (
					<>
						<TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
						<span>Delete</span>
					</>
				) : (
					<span className="mx-auto">
						<SpinnerMini />
					</span>
				)}
			</button>

			{/* Modal */}
			{showModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
					<div className="bg-primary-900 border border-primary-700 text-primary-100 rounded-xl p-6 w-[90%] max-w-sm shadow-xl relative animate-fade-in">
						{/* Close Icon */}
						<button
							onClick={() => setShowModal(false)}
							className="absolute top-3 right-3 text-primary-400 hover:text-primary-200 transition">
							<XMarkIcon className="h-5 w-5" />
						</button>

						<h2 className="text-lg font-bold mb-4 text-primary-100">
							Delete Reservation?
						</h2>
						<p className="text-sm text-primary-300 mb-6">
							Are you sure you want to delete this reservation? This action
							cannot be undone.
						</p>

						<div className="flex justify-end gap-3">
							<button
								onClick={() => setShowModal(false)}
								className="px-4 py-2 text-sm font-semibold text-primary-300 hover:text-primary-100 transition">
								Cancel
							</button>
							<button
								onClick={handleConfirmDelete}
								className="bg-accent-600 hover:bg-accent-500 text-primary-900 text-sm font-bold px-4 py-2 rounded transition disabled:opacity-50"
								disabled={isPending}>
								{isPending ? <SpinnerMini /> : 'Delete'}
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default DeleteReservation
