"use client" 
import React from "react";
import {signOut,signIn, useSession} from 'next-auth/react';
import Image from "next/image";
import { redirect } from "next/navigation";
import {Button} from "@nextui-org/button";
import { IoMdLogOut } from "react-icons/io";
import { useLoadingStore } from "../libs/store";

const SigninButton = () => {
   const { data: session, status} = useSession();

   const {isLoading, setIsLoading} = useLoadingStore();
   
   const handleSignOut = () => {
    console.log("sign out");
      setIsLoading(true);
     signOut(); 
    redirect('/');
  };
  

   if (status === 'loading') return <div>Loading...</div>;

   if(session && session.user){
    return(
        <div className="flex flex-row justify-between">
        <div className=" flex flex-row justify-between gap-2" >
         <Image src={session.user.image} alt="gmail_photo" width={50} height={50} className="rounded-full"/> 
        <div className=" gap-0"> <p>{session.user.name}</p><p>{session.user.email}</p>
        </div>
        </div>
        <Button variant="bordered" onClick={handleSignOut} className="flex flex-row justify-between items-center border-2 rounded-xl py-0"><IoMdLogOut size={20} /> sign out</Button>
        </div>
    )
  }
  return <button onClick={async()=>{await signIn('google', { callbackUrl: `${process.env.APP_DOMAIN}/home`, scope: 'openid profile email'  });}} className="text-green-600 ml-auto"> sign in </button>
}

export default SigninButton;