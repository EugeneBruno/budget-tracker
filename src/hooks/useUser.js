import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function useUser() {
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    async function getUser() {
      const { data } = await supabase.auth.getUser()

      if (data.user) {
        setUser(data.user)
      } else {
        setUser(false) 
      }
    }

    getUser()
  }, [])

  return user
}