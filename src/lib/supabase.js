// here we import the function to createClient from our supabase package 
import { createClient } from '@supabase/supabase-js';

//we now call the variables/credentials we stored in our env file 
// ps: without those credentials, our app cannot connect to the database 
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

//we now export the created connection we made with the createClient
export const supabase = createClient(supabaseUrl, supabaseAnonKey);