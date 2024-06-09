"use client"
import SigninButton from "@/app/component/SigninButton";
import axios from "axios";
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function Home() {
  const [threads, setThreads] = useState([]);
  const [maxResults, setMaxResults] = useState(100);
  const { data: session, status } = useSession();

  const handleNumberChange = (event) => {
    setMaxResults(parseInt(event.target.value)); 
  };

  useEffect(() => {
    const fetchThreads = async () => {
      if (!session || !session.user) {
        return; 
      }


process.env.APP_DOMAIN
      try {
        const response = await axios.get(`${process.env.APP_DOMAIN}/api/mail/list/${session.user.email}/${maxResults}`);
        const fetchedThreads = response.data.map( async (thread) => {
              
          const sender = await axios.get(`${process.env.APP_DOMAIN}/api/mail/thread/${session.user.email}/${thread.id}`);
            
        console.log(sender.data);
            return { ...thread, sender: sender.data || 'Unknown Sender' }; 
          });

  const resolvedThreads = await Promise.all(fetchedThreads);

        setThreads(resolvedThreads);
      } catch (error) {
        console.error(error);
      }
    };

    fetchThreads();
  }, [maxResults]); 

  if (status === "loading") {
    return <div>Loading emails...</div>;
  }

  if (status === "unauthenticated") {
    return <p>Please sign in to view emails.</p>;
  }


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SigninButton />

      <div className="w-fit mr-auto mb-auto">
      <label htmlFor="number-filter" className=" " >Filter by Number:</label>
      <select id="number-filter" value={maxResults} onChange={handleNumberChange} className="text-black">
        {Array.from({ length: 100 }, (_, i) => i + 1).map((number) => (
          <option key={number} value={number} className="text-black">
            {number}
          </option>
        ))}
      </select>
    </div>
      <ul>
        {threads && threads.map((thread) => (
          <li key={thread.id} className="my-4 border-4 p-4">
            {thread.sender} <br />
            {thread.snippet}
          </li>
        ))}
      </ul>
    </main>
  );
}
