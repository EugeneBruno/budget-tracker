import { useEffect, useState }  from "react";
import { supabase } from "@/lib/supabase";

export default function useUser() {
    //store the current user
    const [ user, setUser ] = useState(null);

    useEffect(() => {
        //get the current user from Supabase Authentication System
        async function getUser() {
            const { data } = await supabase.auth.getUser()

            //set the logged in user
            setUser(data.user);
        }
        getUser()
    }, [])

    return user;
}