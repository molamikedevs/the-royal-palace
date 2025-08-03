
import { UsersIcon } from "@heroicons/react/24/solid";
import Image from 'next/image'
import { Suites } from "../_types";


function SuitesCard({ suite }: { suite: Suites }) {
	const { id, name, maxCapacity, regularPrice, discount, image } = suite

	return (
		<div className="flex flex-col lg:flex-row border border-primary-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
			{/* Image Section */}
			<div className="relative w-full lg:w-2/5 aspect-[4/3]">
				<Image
					src={`${suite.image}`}
					alt={`Suites ${name}`}
					fill
					className="object-cover hover:scale-95 transition-all cursor-pointer duration-300"
					sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
					priority={false}
				/>
			</div>

			{/* Content Section */}
			<div className="flex-1 flex flex-col bg-primary-950">
				<div className="p-4 sm:p-6 flex-1">
					<h3 className="text-accent-500 font-semibold text-xl md:text-2xl mb-3">
						{name}
					</h3>

					<div className="flex items-center gap-2 mb-4">
						<UsersIcon className="h-5 w-5 text-primary-600" />
						<span className="text-primary-200">
							For up to <span className="font-bold">{maxCapacity}</span> guests
						</span>
					</div>

					<div className="mt-auto">
						<div className="flex justify-between items-end">
							<div>
								{discount > 0 && (
									<span className="text-sm text-primary-400 line-through">
										${regularPrice}
									</span>
								)}
							</div>
							<div className="text-right">
								<span className="text-2xl font-light text-accent-400">
									${discount > 0 ? regularPrice - discount : regularPrice}
								</span>
								<span className="text-primary-300 text-sm ml-1">/ night</span>
							</div>
						</div>
					</div>
				</div>

				<div className="border-t border-primary-800 bg-primary-900">
					<a
						href={`/suites/${id}`}
						className="block w-full py-3 px-4 text-center sm:text-right hover:bg-accent-600 hover:text-primary-900 transition-colors font-medium">
						View Details & Book →
					</a>
				</div>
			</div>
		</div>
	)
}

export default SuitesCard;