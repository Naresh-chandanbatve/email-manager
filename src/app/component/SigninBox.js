"use client" 
import React, {useState} from "react";
import {signOut,signIn, useSession} from 'next-auth/react';

const SigninBox = () => {
   const { data: session} = useSession();
   
  const [inputValue, setInputValue] = useState("");
   
//    if(session && session.user){
//     return(
//         <div className="flex gap-4 ml-auto">
//         <p className=" text-sky-500" >
//         {session.user.name}
//         </p>
//         <button onClick={()=>{signOut()}} className="text-red-600"> sign out</button>
//         </div>
//     )
//   }

const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    const input = inputValue.trim(); // Trim input value
    if(input.length>0){
        localStorage.setItem("openapitoken", input);
    }
    // Additional logic for sign in using input, e.g., custom username/email
    await signIn('google', { callbackUrl: 'https://email-manager-pi.vercel.app/home'}); // Or handle login logic differently

    // setInputValue(""); // Reset input value (optional)
    // setSubmitted(true); // Mark form submitted (optional)
  };

  return <form onSubmit={handleSubmit}>
    <input type="text" name="openapi" value={inputValue} onChange={(e) => setInputValue(e.target.value)} ></input>
    <button type="submit" className="text-green-600 ml-auto"> sign in </button>
    </form>
}

export default SigninBox;