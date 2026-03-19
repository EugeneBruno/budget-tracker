'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Login(){
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
        }
    }

    return (
        <form onSubmit={handleLogin}>
            {/* Input for email */}
            <input 
            placeholder='Email'
            value = {email}
            onChange= {(e) => setEmail(e.target.value)}
            />

            <input
            placeholder='Password'
            value = {password}
            onChange= {(e) => setPassword(e.target.value)}
            />

            {/* Submit button */}
            <button type='submit'>Login</button>
        </form>
    )
}