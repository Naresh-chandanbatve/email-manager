"use client"
import SigninButton from "@/app/component/SigninButton";
import axios from "axios";
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from "next/navigation";
import load from "../../../public/load.gif";
import Image from "next/image";
import { useLoadingStore } from "../libs/store";
import { useThreadStore } from "../libs/store2";
import { MdClose } from "react-icons/md";

export default function Home() {
  const [threads, setThreads] = useState([]);
  const [maxResults, setMaxResults] = useState(10);
  const { data: session, status } = useSession();
  const {isLoading, setIsLoading} = useLoadingStore();
  const { isThreadOpened, setThreadOpened} = useThreadStore();
  const [selectedThreadId, setSelectedThreadId] = useState(null); // Track selected thread ID
  const [selectedThreadDetails, setSelectedThreadDetails] = useState(null); // Store fetched thread details


  const handleNumberChange = (event) => {
    setMaxResults(parseInt(event.target.value)); 
  };

  const handleClick = (key) => {
    console.log(key)
    setThreadOpened();
    setSelectedThreadId(key);
  }


  useEffect(() => {
    if (selectedThreadId) {
      const fetchThreadDetails = async () => {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/mail/details/${session.user.email}/${selectedThreadId}`); // Replace with your API endpoint
          // const data = await response.json();
          console.log(response.data);
          setSelectedThreadDetails(response.data);
        } catch (error) {
          console.error('Error fetching thread details:', error);
        }
      };

      fetchThreadDetails();
    }
  }, [selectedThreadId]);

  useEffect(() => {
    setIsLoading(true);
    const fetchThreads = async () => {
      
      if (!session || !session.user) {
        return; 
      }
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/mail/list/${session.user.email}/${maxResults}`);
           
        const fetchedThreads = response.data.messages.map( async (message) => {
              // console.log(thread)
        const sender = await axios.get(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/mail/thread/${session.user.email}/${message.id}`);
            
        console.log(sender.data);
            // return { ...thread, sender: sender.data || 'Unknown Sender' }; 
            return(sender.data)
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
  }, [status, maxResults]); 

  if (status === "loading") {
    return <div className="my-10 mx-auto flex flex-col items-center"><Image src={load} width={150}/></div>;
  }

  if (status === "unauthenticated") {
     redirect('/');
  }

  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
     
       <div className="mt-6 w-[65vw]">
       {/* <div className="flex flex-row justify-between"> */}
       {isThreadOpened &&
      <div className="fixed w-[45vw] min-h-screen bg-gray-800 top-0 right-0">
         <MdClose size={40} onClick={()=>setThreadOpened()} className="m-8 ml-auto"/>

          {selectedThreadDetails ? <h2>{selectedThreadDetails}</h2> : <div>loading...</div>}
          {/* <p>{selectedThreadDetails.content}</p> */}
      </div>
      }
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
          <li key={thread.id} onClick={()=>handleClick(thread.id)} className="my-4 border-4 p-4 w-[65vw]">
            {thread.payload.headers.find(header => header.name === "From")?.value} <br />
            {thread.snippet}
          </li>
        ))}
      </ul>:
       <div className="my-10 mx-auto flex flex-col items-center"><Image src={load} width={150}/></div> 
}
      </div>

    </main>
  );
}
