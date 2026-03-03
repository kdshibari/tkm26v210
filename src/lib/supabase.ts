import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qcpptxhklwyhtsviusxl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjcHB0eGhrbHd5aHRzdml1c3hsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5ODU1OTMsImV4cCI6MjA4NzU2MTU5M30.wQuBeeL4SvyXxXzzEkKu0TO1aWYva9xio2WV_6T_Izg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
