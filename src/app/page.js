'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // redirect to the signup page when the user visits the home page
    router.push('/signup')
  }, [])
  
  return null;
}