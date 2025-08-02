/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		forceSwcTransforms: true,
	},
	compiler: {
		styledComponents: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'zwmfdfzvhzgffvnxrnwb.supabase.co', // <== replace with the one you found
				pathname: '/storage/v1/object/public/**',
			},
		],
		domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com'],
	},
}

export default nextConfig
