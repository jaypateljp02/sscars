import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://mtftbiopuapzbsqgngso.supabase.co/';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10ZnRiaW9wdWFwemJzcWduZ3NvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY5OTM3MTUsImV4cCI6MjA4MjU2OTcxNX0.G3AB1YOL6NQML1P_YjrAQiRp6YSih-wHMrlwFcEbgoI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
