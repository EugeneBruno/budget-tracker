'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation'

export default function Login(){
    // initialize the router
    const router = useRouter();
    // store form inputs
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    // function to handle form submission
    async function handleLogin(e){
        e.preventDefault(); // prevent page refresh

        //verify the users credentials with Supabase Authentication System
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        if (error) {
            alert(error.message);
        } else {
            alert('Login successful!');

            //redirect after login
            router.push('/dashboard')
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleLogin} 
             className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
                <h1 className="text-2xl font-bold mb-4 text-center">
                    Login to Your Account
                </h1>
                {/* Input for email */}
                <input 
                className="w-full mb-3 p-2 border rounded"
                placeholder='Email'
                value = {email}
                onChange= {(e) => setEmail(e.target.value)}
                />

                <input
                className="w-full mb-3 p-2 border rounded"
                placeholder='Password'
                value = {password}
                onChange= {(e) => setPassword(e.target.value)}
                />

                {/* Submit button */}
                <button type='submit' className="w-full bg-black text-white p-2 rounded">
                    Login
                </button>
            </form>
        </div>
    )
}