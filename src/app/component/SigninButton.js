"use client" 
import React from "react";
import {signOut,signIn, useSession} from 'next-auth/react';


const SigninButton = () => {
   const { data: session, status} = useSession();
  

   if (status === 'loading') return <div>Loading...</div>;

   if(session && session.user){
    return(
        <div className="flex gap-4 ml-auto">
        <p className=" text-sky-500" >
        {session.user.name}
        </p>
        <button onClick={()=>{signOut()}} className="text-red-600"> sign out</button>
        </div>
    )
  }
  return <button onClick={async()=>{await signIn('google', { callbackUrl: 'http://localhost:3000/home', scope: 'openid profile email'  });}} className="text-green-600 ml-auto"> sign in </button>
}

export default SigninButton;