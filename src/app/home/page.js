"use client"
import SigninButton from "@/app/component/SigninButton";
import axios from "axios";
import { useEffect, useState } from 'react';
import { signOut, signIn, useSession } from 'next-auth/react';

export default function Home() {
  const [threads, setThreads] = useState([]);
  const [maxResults, setMaxResults] = useState(100);
  const { data: session, status } = useSession();

  const handleNumberChange = (event) => {
    setMaxResults(parseInt(event.target.value)); // Update state with selected number
  };

  useEffect(() => {
    const fetchThreads = async () => {
      if (!session || !session.user) {
        return; // Exit early if no session or user data
      }



      try {
        const response = await axios.get(`http://localhost:3000/api/mail/list/${session.user.email}/${maxResults}`);
        const fetchedThreads = response.data.map( async (thread) => {
            // Assuming the API now includes the sender in the response:
              
          const sender = await axios.get(`http://localhost:3000/api/mail/thread/${session.user.email}/${thread.id}`);
            
        console.log(sender.data);
            return { ...thread, sender: sender.data || 'Unknown Sender' }; // Handle potential missing sender data
          });

  const resolvedThreads = await Promise.all(fetchedThreads);

        setThreads(resolvedThreads);
      } catch (error) {
        console.error(error);
      }
    };

    fetchThreads();
  }, [maxResults]); // Dependency array to re-run on session changes

  if (status === "loading") {
    return <div>Loading threads...</div>;
  }

  if (status === "unauthenticated") {
    return <p>Please sign in to view threads.</p>;
  }

  // Code to render threads if session is authenticated
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
