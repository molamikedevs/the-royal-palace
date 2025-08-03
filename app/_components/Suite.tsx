/// File: app/_components/Suite.tsx
/// This file defines the Suite component which displays the details of a specific suite
import Image from 'next/image'
import {
	EyeSlashIcon,
	MapPinIcon,
	UsersIcon,
} from '@heroicons/react/24/outline'
import { Suites } from '../_types'
import TextExpander from './TextExpander'



const Suite = async ({ suite }: { suite: Suites }) => {
	const { name, maxCapacity, image, description } = suite
	return (
		<div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-12 border border-primary-800 rounded-lg p-6 sm:p-8 lg:p-10 mb-12 lg:mb-24">
			{/* Image Section */}
			<div className="relative w-full aspect-square lg:aspect-auto lg:h-full">
				<Image
					src={image || '/images/default-image.jpg'}
					fill
					alt={`Suite ${name}`}
					className="object-cover rounded-lg hover:scale-105 transition-transform duration-300"
					sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
				/>
			</div>

			{/* Details Section */}
			<div className="flex flex-col">
				<h3 className="text-accent-100 font-black text-4xl sm:text-5xl lg:text-6xl mb-6 lg:mb-8 bg-primary-950 p-4 lg:p-6 w-fit -translate-x-4 lg:-translate-x-6">
					Suite {name}
				</h3>

				<p className="text-base sm:text-lg text-primary-300 mb-8 lg:mb-10">
					<TextExpander>{description}</TextExpander>
				</p>

				<ul className="flex flex-col gap-3 sm:gap-4 mb-8 lg:mb-10">
					<li className="flex gap-3 items-start">
						<UsersIcon className="h-5 w-5 text-primary-600 mt-1 flex-shrink-0" />
						<span className="text-base sm:text-lg">
							For up to <span className="font-bold">{maxCapacity}</span> guests
						</span>
					</li>
					<li className="flex gap-3 items-start">
						<MapPinIcon className="h-5 w-5 text-primary-600 mt-1 flex-shrink-0" />
						<span className="text-base sm:text-lg">
							Located in the heart of the{' '}
							<span className="font-bold">Dolomites</span> (Italy)
						</span>
					</li>
					<li className="flex gap-3 items-start">
						<EyeSlashIcon className="h-5 w-5 text-primary-600 mt-1 flex-shrink-0" />
						<span className="text-base sm:text-lg">
							Privacy <span className="font-bold">100%</span> guaranteed
						</span>
					</li>
				</ul>
			</div>
		</div>
	)
}

export default Suite
