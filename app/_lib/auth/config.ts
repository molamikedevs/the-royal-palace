import type { Session } from 'next-auth' 
import type { NextAuthConfig } from 'next-auth'
import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import GitHub from 'next-auth/providers/github'

const authConfig: NextAuthConfig = {
	providers: [
		Google({
			clientId: process.env.GOOGLE_CLIENT_ID || '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
		}),
		GitHub({
			clientId: process.env.GITHUB_CLIENT_ID || '',
			clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
		}),
	],
	secret: process.env.NEXTAUTH_SECRET || '',
	pages: {
		signIn: '/login',
	},
}

// Export the auth function for use in other parts of the application
// and the NextAuth handlers for API routes
export const {
	auth,
	signIn,
	signOut,
	handlers: { GET, POST },
} = NextAuth(authConfig)

export type AuthSession = Session
