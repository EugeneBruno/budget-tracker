'use client';
//React hook to store inputs from the form
import { useState } from 'react';
// our database connection
import { supabase } from '@/lib/supabase';

export default function Signup() {
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
        }
    }

    alert('Signup successful! Please check your email to confirm your account.');

    //This is the user interface to collect the users infor
    //Note: No styling has been added to this form
    return (
        <form onSubmit={handleSignup}>
            <input 
                type="text" 
                placeholder="Full Name" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
            />
            <input 
                type="email" 
                placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            {/*Submit button to trigger the handleSignup function when clicked */}
            <button type="submit">Sign Up</button>

        </form>
    )
}