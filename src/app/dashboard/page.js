'use client'

import useUser from '@/hooks/useUser'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Dashboard() {
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    //only redirect AFTER we know the result
    if (user === false) {
      router.push('/login')
    }
  }, [user])

  //show loading while checking
  if (user === undefined) {
    return <p>Loading...</p>
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold">
          This is your dashboard
        </h1>
      </div>
    </div>
  )
}