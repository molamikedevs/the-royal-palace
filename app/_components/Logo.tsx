import Image from 'next/image'
import Link from 'next/link'

const Logo = () => {
	return (
		<Link href="/" className="flex items-center gap-2 md:gap-4 z-10">
			<Image
				src="/logo.svg"
				height="40"
				quality={100}
				width="40"
				className="h-8 w-8 md:h-[60px] md:w-[60px]"
				alt="The Wild Oasis logo"
			/>
			<span className="text-sm md:text-2xl font-semibold text-primary-100">
				The Royal Palace
			</span>
		</Link>
	)
}

export default Logo
