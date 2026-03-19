'use client'

import { useUser } from '@/hooks/useUser';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Dashboard() {
    const user = useUser();
    const router = useRouter();     

    useEffect(() => {
        // if the user is not logged in, redirect to the login page
        if (user === null) {
            router.push('/login');
        }   
    }, [user])

    return <h1>Welcome to your Dashboard, {user?.email}!</h1>
}