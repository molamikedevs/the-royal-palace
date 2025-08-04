import type { Session } from 'next-auth' 
import type { NextAuthConfig } from 'next-auth'
import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import GitHub from 'next-auth/providers/github'
import { createGuest, getGuest } from '../supabase/api'

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
	secret: process.env.NEXTAUTH_SECRET || '', // Ensure you set this in your environment variables

	// Authentication pages configuration
	// This allows you to customize the sign-in page and other auth-related pages
	pages: {
		signIn: '/login',
	},

	callbacks: {
		async signIn({ user }) {
			try {
				if (!user.email) return false

				const guest = await getGuest(user.email)
				if (!guest) {
					console.log('Creating new guest:', user.email)
					await createGuest({
						email: user.email,
						fullName: user.name || '',
					})
				}

				return true
			} catch (error) {
				console.error('Sign-in error:', error)
				return false
			}
		},
		async session({ session, user }) {
			// Attach user ID to the session object
			const guest = await getGuest(session.user.email)
			if (guest) {
				session.user.id = guest.id
			}
			return session
		},
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
