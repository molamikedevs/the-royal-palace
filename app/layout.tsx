import type { Metadata } from "next";
import { Outfit } from 'next/font/google'
import '@/app/_styles/globals.css'
import Header from '@/app/_components/Header'
import { ReservationProvider } from '@/context/ReservationContext'

const outfit = Outfit({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: {
		template: '%s | The Royal Palace',
		default: 'Welcome | The Royal Palace',
	},
	description:
		'Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en" className={outfit.className}>
			<body className="antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col relative">
				<Header />
				<main className="flex-1">
					<ReservationProvider>{children}</ReservationProvider>
				</main>
			</body>
		</html>
	)
}


