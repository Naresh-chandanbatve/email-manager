"use client"
import SigninButton from "@/app/component/SigninButton";
import axios from "axios";
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from "next/navigation";
import { useLoadingStore } from "../libs/store";

export default function Home() {
  const [threads, setThreads] = useState([]);
  const [maxResults, setMaxResults] = useState(100);
  const { data: session, status } = useSession();
  // const [isLoading, setIsLoading] = useState();
  const [isLoading, setIsLoading] = useLoadingStore();

  const handleNumberChange = (event) => {
    setMaxResults(parseInt(event.target.value)); 
  };

  useEffect(() => {
    const fetchThreads = async () => {
      setIsLoading(true);
      if (!session || !session.user) {
        return; 
      }
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/mail/list/${session.user.email}/${maxResults}`);
        const fetchedThreads = response.data.map( async (thread) => {
              
          const sender = await axios.get(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/mail/thread/${session.user.email}/${thread.id}`);
            
        console.log(sender.data);
            return { ...thread, sender: sender.data || 'Unknown Sender' }; 
          });

  const resolvedThreads = await Promise.all(fetchedThreads);

        setThreads(resolvedThreads);
      } catch (error) {
        console.error(error);
      }
      finally{
        setIsLoading(false);
      }
    };

    fetchThreads();
  }, [session, maxResults]); 

  if (status === "loading") {
    return <div>Loading emails...</div>;
  }

  if (status === "unauthenticated") {
     redirect('/');
  }

  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
     
       <div className="mt-6 w-[65vw]">
       {/* <div className="flex flex-row justify-between"> */}
      
    <SigninButton />
    {/* </div> */}
    <div className="w-fit mr-auto  mt-4">
      <label htmlFor="number-filter">Number of emails : </label>
      <select id="number-filter" value={maxResults} onChange={handleNumberChange} className="text-black">
        {Array.from({ length: 100 }, (_, i) => i + 1).map((number) => (
          <option key={number} value={number} className="text-black">
            {number}
          </option>
        ))}
      </select>
    </div>
    {!isLoading ? 
      <ul>
        {threads && threads.map((thread) => (
          <li key={thread.id} className="my-4 border-4 p-4 w-[65vw]">
            {thread.sender} <br />
            {thread.snippet}
          </li>
        ))}
      </ul>:
       <div className="my-10 mx-auto">collecting all your emails...</div> 
}
      </div>

    </main>
  );
}
