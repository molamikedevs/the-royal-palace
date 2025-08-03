// Comment each snippet in this file according to its purpose
import { Metadata } from "next"
import Image from 'next/image'
import Footer from '@/app/_components/Footer'
import { getSuites } from '../_lib/supabase/api'

// this snippet defines the metadata for the About page
export const metadata: Metadata = {
	title: 'About Us',
}

// This page is set to revalidate every hour to ensure fresh data
// This means that the page will be regenerated every day when accessed
export const revalidate = 86400 // Revalidate the page every day

const AboutPage = async () => {
	const numberOfSuites = await getSuites()
	return (
		<>
			<div className="grid grid-cols-1 lg:grid-cols-5 gap-x-12 lg:gap-x-24 gap-y-16 lg:gap-y-32 text-base md:text-lg items-center px-4 sm:px-6 md:px-8 py-8">
				<div className="lg:col-span-3 order-1">
					<h1 className="text-3xl sm:text-4xl mb-6 sm:mb-10 text-accent-400 font-medium">
						Welcome to The Royal Palace
					</h1>
					<div className="space-y-6">
						<p>
							Where majesty meets serenity, and elegance finds its home in the
							heart of Azerbaijan. Nestled like a hidden jewel within the city,
							The Royal Palace is more than a destination it is your regal
							retreat, where timeless grandeur and refined comfort await. This
							is a place where every detail is crafted to honor royalty, and
							every guest is welcomed as nobility.
						</p>

						<p>
							Our{' '}
							<strong className="text-accent-400 ">
								{numberOfSuites.length}
							</strong>{' '}
							luxurious suites are not merely accommodations—they are chambers
							of grace and tranquility, each one designed to cradle you in royal
							refinement. Whether you&apos;re visiting alone, with a loved one,
							or in a group, the palace offers a sanctuary where style and
							sophistication meet.
						</p>

						<p>
							At The Royal Palace, you don’t just stay—you reign. Here, every
							moment is steeped in elegance, from the personalized service to
							the serene surroundings. Come experience a retreat where modern
							luxury meets royal tradition, right in the vibrant heart of the
							city.
						</p>
					</div>
				</div>

				<div className="relative aspect-square lg:col-span-2 order-4 lg:order-3">
					<Image
						src="/bg.jpg"
						alt="Front view of The Royal Palace"
						placeholder="blur"
						blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD..."
						fill
						className="object-cover rounded-lg"
					/>
				</div>

				<div className="relative aspect-square lg:col-span-2 order-4 lg:order-3">
					<Image
						src="/fam.png"
						fill
						placeholder="blur"
						blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD..."
						className="object-cover rounded-lg"
						alt="Family that manages The Royal Palace"
					/>
				</div>

				<div className="lg:col-span-3 order-3 lg:order-4">
					<h1 className="text-3xl sm:text-4xl mb-6 sm:mb-10 text-accent-400 font-medium">
						Managed by our family since 1962
					</h1>
					<div className="space-y-6">
						<p>
							Since 1962, The Royal Palace has been a cherished family-run
							retreat. Started by our grandparents, this haven has been nurtured
							with love and care, passing down through our family as a testament
							to our dedication to creating a warm, welcoming environment.
						</p>
						<p>
							Over the years, we&apos;ve maintained the essence of The Royal
							Palace, blending the timeless beauty of the mountains with the
							personal touch only a family business can offer. Here, you&apos;re
							not just a guest; you&apos;re part of our extended family. So join
							us at The Royal Palace soon, where tradition meets tranquility,
							and every visit is like coming home.
						</p>
						<a
							href="/suites"
							className="inline-block mt-4 bg-accent-500 px-6 py-4 sm:px-8 sm:py-5 text-primary-800 text-base sm:text-lg font-semibold hover:bg-accent-600 hover:scale-95 transition-all">
							Explore our luxury suites
						</a>
					</div>
				</div>
			</div>
			<Footer />
		</>
	)
}

export default AboutPage
