"use client" 
import React, {useState} from "react";
import {signIn} from 'next-auth/react';
import { useLoadingStore } from "./../libs/store";

const SigninBox = () => {
   
  const [inputValue, setInputValue] = useState("");
  const {isLoading, setIsLoading} = useLoadingStore();

const handleSubmit = async (e) => {
    setIsLoading(true)
    e.preventDefault();
    const input = inputValue.trim(); 
    if(input.length>0){
        localStorage.setItem("openapitoken", input);
    }
    await signIn('google', { callbackUrl: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/home`, scope: 'openid profile email' }); // Or handle login logic differently

  };

  return <form onSubmit={handleSubmit} className="flex flex-col w-[20vw]">
    <input type="text" name="openapi" placeholder="Enter your OpenAPI key here" value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="my-3 px-4 text-black rounded-md w-[58vw] lg:w-full" required></input>
    <button type="submit" className="text-white bg-blue-700 rounded-lg py-2 w-[58vw] lg:w-full"> sign in </button>
    </form>
}

export default SigninBox;