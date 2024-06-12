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
      setIsLoading(true);
     signOut(); 
     setIsLoading(false);
    redirect('/');
  };
  

   if (status === 'loading') return <div>Loading...</div>;

   if(session && session.user){
    return(
        <div className="flex flex-row justify-between">
        <div className=" flex flex-row justify-between gap-2" >
         <Image src={session.user.image} alt="gmail_photo" width={50} height={50} className="rounded-full"/> 
        <div className="h-fit"> <p>{session.user.name}</p><p>{session.user.email}</p>
        </div>
        </div>
        <Button variant="bordered" onClick={handleSignOut} className="flex flex-row justify-between items-center border-2 rounded-xl lg:py-2 py-1 right-0 m-7 lg:m-0 absolute top-0 lg:relative "><IoMdLogOut size={20}/><p className="hidden lg:block"> sign out</p></Button>
        </div>
    )
  }
  return <button onClick={async()=>{await signIn('google', { callbackUrl: `${process.env.APP_DOMAIN}/home`, scope: 'openid profile email'  });}} className="text-green-600 ml-auto"> sign in </button>
}

export default SigninButton;