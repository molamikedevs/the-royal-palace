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
				hostname: 'zwmfdfzvhzgffvnxrnwb.supabase.co',
				pathname: '/storage/v1/object/public/**',
			},
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com',
				pathname: '/**',
			},
		],
	},
}

export default nextConfig
