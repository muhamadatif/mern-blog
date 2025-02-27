import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL; // Replace with your Supabase URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PROJECT_API_KEYS; // Replace with your Supabase Anon Key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
