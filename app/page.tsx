import Link from 'next/link'
import Image from 'next/image'
import bg from '@/public/bg.jpg'

export default function Page() {
	return (
		<main>
			<Image
				src={bg}
				fill
				placeholder="blur"
				quality={80}
				className="object-cover object-top"
				alt="Mountains and forests with two cabins"
				style={{
					filter: 'blur(.7px) brightness(0.3)',
				}}
			/>

			<div className="relative z-10 px-4 pt-[20vh] md:pt-0 md:block">
				<div className="text-center">
					<h1 className="text-3xl md:text-6xl lg:text-8xl text-primary-50 mb-[5rem] md:mb-12 tracking-tight font-normal">
						Welcome to paradise.
					</h1>
					<Link
						href="/suites"
						className="bg-primary-550 px-8 py-5 md:px-10 md:py-6 text-primary-50 text-lg md:text-xl font-semibold hover:bg-primary-600 hover:scale-95 transition-all inline-block">
						Explore luxury suites
					</Link>
				</div>
			</div>
		</main>
	)
}
