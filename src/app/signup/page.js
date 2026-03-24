'use client';
//React hook to store inputs from the form
import { useState } from 'react';
// our database connection
import { supabase } from '@/lib/supabase';
//to redirect the user after signup
import { useRouter } from 'next/navigation'

export default function Signup() {
    // initialize the router
    const router = useRouter();
    //Store user input to pass it to our database
    const [ fullName, setFullName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    //This function will run when the user submits the form/clicks the submit button
    async function handleSignup(e) {
        e.preventDefault(); //This stops the page from refreshing when the form is submitted

        // Create  a user in Supabase Authentication Sysytem
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        })

        // if the signup fails, this will show the error
        if (error) {
            alert(error.message);
        }

        //When the signup is successful, we want to store the user's details in our database
        const user =  data.user;
        if (user){
            await supabase.from('users').insert([{
                id: user.id,
                full_name: fullName,
                email: email,
            }])

            alert('Signup successful! Please check your email to confirm your account.');
            // redirect after login
            router.push('/dashboard')
        }
    }

    

    //This is the user interface to collect the users infor
    //Note: No styling has been added to this form
    return (
  <div className="bg-red-500 min-h-screen flex items-center justify-center">
    
    <form 
      onSubmit={handleSignup}
      className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm"
    >
      <h1 className="text-2xl font-bold mb-4 text-center">
        Sign Up
      </h1>

      <input
        className="w-full mb-3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
        placeholder="Full Name"
        value={fullName}
        onChange={(e)=>setFullName(e.target.value)}
      />

      <input
        className="w-full mb-3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
        placeholder="Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />

      <input
        className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />

      <button className="w-full bg-black text-white p-2 rounded hover:opacity-90">
        Sign Up
      </button>

      {/* LOGIN LINK */}
      <p className="text-sm text-center mt-4">
        Already have an account?{' '}
        <a href="/login" className="text-black font-semibold underline">
          Login
        </a>
      </p>

    </form>

  </div>
)
}