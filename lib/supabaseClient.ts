import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://iocesqdnlwwpqdyssfmk.supabase.co' 
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || 'sb_publishable_5pho74gfGcdpmYH9nfsNKA_wBHUCe5z'

if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase URL or Key is missing. Please check your environment variables.')
}

export const supabase = createClient(supabaseUrl, supabaseKey);

