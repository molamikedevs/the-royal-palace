import React from 'react'
import Link from 'next/link'
import {
	PhoneIcon,
	EnvelopeIcon,
	MapPinIcon,
} from '@heroicons/react/24/outline'

const Footer = () => {
	return (
		<footer className="bg-primary-950 border-t border-primary-900 text-primary-200">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
				{/* Brand Info */}
				<div className="space-y-4">
					<h3 className="text-xl font-semibold text-accent-400">
						The Royal Palace
					</h3>
					<p className="text-primary-300">
						Luxury suites nestled in the heart of the Italian Dolomites,
						offering unforgettable experiences.
					</p>
					<div className="flex items-center gap-2 pt-2">
						<MapPinIcon className="h-5 w-5 text-accent-500" />
						<span>Baku, Azerbaijan</span>
					</div>
				</div>

				{/* Quick Links */}
				<div className="space-y-4">
					<h3 className="text-xl font-semibold text-accent-400">Explore</h3>
					<ul className="space-y-2">
						<li>
							<Link
								href="/suites"
								className="hover:text-accent-400 transition-colors">
								Our Suites
							</Link>
						</li>
						<li>
							<Link
								href="/about"
								className="hover:text-accent-400 transition-colors">
								About Us
							</Link>
						</li>
						<li>
							<Link
								href="/terms"
								className="hover:text-accent-400 transition-colors">
								Terms & Conditions
							</Link>
						</li>
					</ul>
				</div>

				{/* Contact Info */}
				<div className="space-y-4">
					<h3 className="text-xl font-semibold text-accent-400">Contact Us</h3>
					<div className="space-y-3">
						<div className="flex items-center gap-2">
							<PhoneIcon className="h-5 w-5 text-accent-500" />
							<span>+994 123 456 7890</span>
						</div>
						<div className="flex items-center gap-2">
							<EnvelopeIcon className="h-5 w-5 text-accent-500" />
							<span>bookings@theroyalspalace.com</span>
						</div>
					</div>
				</div>
			</div>

			{/* Copyright */}
			<div className="border-t border-primary-800 py-6 text-center text-sm text-primary-400">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
					© {new Date().getFullYear()} The Royal Palace. All rights reserved.
				</div>
			</div>
		</footer>
	)
}

export default Footer
