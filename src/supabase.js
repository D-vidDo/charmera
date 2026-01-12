// src/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rdevflpaceycxpbypfek.supabase.co'
const supabaseKey = 'sb_publishable_xOAYyVTcY3BGRtogoEVBqQ_fMKc-5WU'
export const supabase = createClient(supabaseUrl, supabaseKey)
