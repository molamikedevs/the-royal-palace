// This file is responsible for configuring the Supabase client
// It imports the necessary modules and creates a Supabase client instance
// It also checks if the Supabase URL and key are defined in the environment variables
import { createClient } from '@supabase/supabase-js'

// Create a Supabase client using the URL and key from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Check if the Supabase URL and key are defined in the environment variables
// These are required to connect to the Supabase database
if (!supabaseUrl || !supabaseKey) {
	throw new Error(
		'Supabase credentials are missing. Please check your environment variables.'
	)
}

// Create a single supabase client for interacting with your database
// This is the client that will be used to interact with the Supabase database
export const supabase = createClient(supabaseUrl, supabaseKey)
