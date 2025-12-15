import type { Session } from 'next-auth' 
import type { NextAuthConfig } from 'next-auth'
import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import GitHub from 'next-auth/providers/github'
import { createGuest, getGuest } from '../supabase/api'

declare module 'next-auth' {
	interface User {
		guestId?: string | null
	}
	interface Session {
		user: {
			guestId?: string | null
			name?: string | null
			email?: string | null
			image?: string | null
		}
	}
}

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

	// Callbacks to handle session and user data
	callbacks: {
		async signIn({ user }) {
			// Check if the user has a guest profile
			try {
				if (!user.email) return false

				const guest = await getGuest(user.email) // Fetch the guest profile by email
				if (!guest) {
					await createGuest({
						email: user.email,
						fullName: user.name || '',
					}) // Create a new guest profile if it doesn't exist
				}

				return true // Allow sign-in if the guest profile exists or is created
			} catch (error) {
				return false
			}
		},
		async session({ session }) {
			// Attach user ID to the session object
			const guest = await getGuest(session.user.email) // Fetch the guest profile by email
			session.user.guestId = guest?.id || null // Add guestId to the session user object
			return session // Return the modified session object
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
