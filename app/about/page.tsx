// Comment each snippet in this file according to its purpose
import { Metadata } from "next"
import Image from "next/image"
import image1 from "@/public/bg.jpg"
import image2 from "@/public/fam.png"
import Footer from "@/app/_components/Footer"


// this snippet defines the metadata for the About page
export const metadata: Metadata = {
	title: 'About Us'
}


const AboutPage = () => {
	const numberOfSuites = 23
	return (
		<>
	<div className="grid grid-cols-1 lg:grid-cols-5 gap-x-12 lg:gap-x-24 gap-y-16 lg:gap-y-32 text-base md:text-lg items-center px-4 sm:px-6 md:px-8 py-8">
			<div className="lg:col-span-3 order-1">
				<h1 className="text-3xl sm:text-4xl mb-6 sm:mb-10 text-accent-400 font-medium">
					Welcome to The Royal Palace
				</h1>
				<div className="space-y-6">
					<p>
						Where nature&apos;s beauty and comfortable living blend seamlessly.
						Hidden away in the heart of the Italian Dolomites, this is your
						paradise away from home. But it&apos;s not just about the luxury
						cabins. It&apos;s about the experience of reconnecting with nature
						and enjoying simple pleasures with family.
					</p>
					<p>
						Our {numberOfSuites} luxury cabins provide a cozy base, but
						the real freedom and peace you&apos;ll find in the surrounding
						mountains. Wander through lush forests, breathe in the fresh air,
						and watch the stars twinkle above from the warmth of a campfire or
						your hot tub.
					</p>
					<p>
						This is where memorable moments are made, surrounded by
						nature&apos;s splendor. It&apos;s a place to slow down, relax, and
						feel the joy of being together in a beautiful setting.
					</p>
				</div>
			</div>

			<div className="lg:col-span-2 order-2">
				<Image
					src={image1}
					alt="Family sitting around a fire pit in front of cabin"
					placeholder="blur"
					quality={80}
					className="w-full h-auto rounded-lg"
				/>
			</div>

			<div className="relative aspect-square lg:col-span-2 order-4 lg:order-3">
				<Image
					src={image2}
					fill
					className="object-cover rounded-lg"
					alt="Family that manages The Royal Palace"
					placeholder="blur"
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
						us at The Royal Palace soon, where tradition meets tranquility, and
						every visit is like coming home.
					</p>
					<a
						href="/suites"
						className="inline-block mt-4 bg-accent-500 px-6 py-4 sm:px-8 sm:py-5 text-primary-800 text-base sm:text-lg font-semibold hover:bg-accent-600 transition-all">
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
