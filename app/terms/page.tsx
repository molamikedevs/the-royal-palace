import React from 'react'
import Link from 'next/link'
import Footer from '@/app/_components/Footer'

const Terms = () => {
	return (
        <>
		<div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-12 text-primary-200">
			<header className="mb-12 text-center">
				<h1 className="text-3xl sm:text-4xl font-medium text-accent-400 mb-4">
					Terms & Conditions
				</h1>
				<p className="text-lg text-primary-300">
					Last Updated:{' '}
					{new Date().toLocaleDateString('en-US', {
						year: 'numeric',
						month: 'long',
						day: 'numeric',
					})}
				</p>
			</header>

			<div className="prose prose-invert max-w-none space-y-8">
				<section className="space-y-4">
					<h2 className="text-2xl font-semibold text-accent-400 border-b border-primary-800 pb-2">
						1. Reservations & Payments
					</h2>
					<p>
						All reservations at The Royal Palace are subject to availability and
						require a valid credit card guarantee. A deposit of 30% of the total
						stay amount is required to confirm your booking.
					</p>
					<p>
						Full payment is due 14 days prior to arrival. For bookings made
						within 14 days of arrival, full payment is required at the time of
						booking.
					</p>
				</section>

				<section className="space-y-4">
					<h2 className="text-2xl font-semibold text-accent-400 border-b border-primary-800 pb-2">
						2. Cancellation Policy
					</h2>
					<p>
						Cancellations made more than 30 days prior to arrival will receive a
						full refund of the deposit. Cancellations between 30-14 days prior
						to arrival will forfeit the deposit.
					</p>
					<p>
						Cancellations within 14 days of arrival are subject to full charge
						of the reserved stay. Early departures are non-refundable.
					</p>
				</section>

				<section className="space-y-4">
					<h2 className="text-2xl font-semibold text-accent-400 border-b border-primary-800 pb-2">
						3. Property Rules
					</h2>
					<ul className="list-disc pl-6 space-y-2">
						<li>Check-in time is 3:00 PM and check-out is 11:00 AM</li>
						<li>Smoking is prohibited in all indoor areas</li>
						<li>
							Pets are allowed only in designated rooms with prior arrangement
						</li>
						<li>Quiet hours are observed between 10:00 PM and 8:00 AM</li>
						<li>Damage to property will result in additional charges</li>
					</ul>
				</section>

				<section className="space-y-4">
					<h2 className="text-2xl font-semibold text-accent-400 border-b border-primary-800 pb-2">
						4. Liability
					</h2>
					<p>
						The Royal Palace is not responsible for loss, damage, or theft of
						personal belongings. Guests are advised to use in-room safes for
						valuables.
					</p>
					<p>
						We reserve the right to refuse service or terminate stays for
						violations of property rules or inappropriate behavior.
					</p>
				</section>

				<div className="pt-8 border-t border-primary-800">
					<p className="text-primary-300">
						For any questions regarding these terms, please contact our
						reservations team at{' '}
						<Link
							href="mailto:reservations@theroyalpalace.com"
							className="text-accent-400 hover:underline">
							reservations@theroyalpalace.com
						</Link>{' '}
						or call +1 (555) 123-4567.
					</p>
				</div>
			</div>
		</div>
        <Footer />
        </>
	)
}

export default Terms
