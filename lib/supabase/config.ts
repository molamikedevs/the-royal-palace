import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if the Supabase URL and key are defined in the environment variables
if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Supabase credentials are missing. Please check your environment variables."
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);
