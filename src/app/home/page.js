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
import {Button} from "@nextui-org/button";

export default function Home() {
  const [threads, setThreads] = useState([]);
  const [maxResults, setMaxResults] = useState(3);
  const { data: session, status } = useSession();
  const {isLoading, setIsLoading} = useLoadingStore();
  const { isThreadOpened, setThreadOpened} = useThreadStore();
  const [selectedThreadId, setSelectedThreadId] = useState(null); 
  const [selectedThreadDetails, setSelectedThreadDetails] = useState(null); 
  const [sender, setSender] = useState(null);


  const handleNumberChange = (event) => {

    // slice(0, parseInt(event.target.value))

    const thrds = JSON.parse(localStorage.getItem('threads')).slice(0, parseInt(event.target.value));
    setThreads(thrds);
    setMaxResults();
  };

  const handleClick = (key, sender) => {
    // console.log(key)
    setThreadOpened();
    setSender(sender);
    setSelectedThreadId(key);
  }

  const handleClassify = async () => {
    if(threads){
      try {

        const classified = threads.map( async (thread) => {
          console.log(thread)
          // const content = await axios.get(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/mail/details/${session.user.email}/${thread.id}`); 
          
          const catagory = await axios.get(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/mail/classify/'${encodeURIComponent(thread.snippet)}'`);
            return {...thread, catagory: catagory.data}        
        })
        
  const resolvedThreads = await Promise.all(classified);
        setThreads(resolvedThreads);
      }
      catch(error) {
        console.log(error);
      } 
    }  
  }


  useEffect(() => {
    if (selectedThreadId) {
      const fetchThreadDetails = async () => {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/mail/details/${session.user.email}/${selectedThreadId}`); // Replace with your API endpoint
          
          setSelectedThreadDetails(response.data);
        } catch (error) {
          console.error('Error fetching thread details:', error);
        }
      };

      fetchThreadDetails();
    }
  }, [selectedThreadId]);

  useEffect(() => {

    const fetchThreads = async () => {
      
      if (!session || !session.user) {
        return; 
      }
      try {
        setIsLoading(true);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/mail/list/${session.user.email}/${maxResults}`);
           
        const fetchedThreads = response.data.messages.map( async (message) => {
              // console.log(thread)
        const sender = await axios.get(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/mail/thread/${session.user.email}/${message.id}`);
            
            // return { ...thread, sender: sender.data || 'Unknown Sender' }; 
            return(sender.data)
          });

  const resolvedThreads = await Promise.all(fetchedThreads);
         
        setThreads(resolvedThreads);
        localStorage.setItem('threads', JSON.stringify(resolvedThreads));
      } catch (error) {
        console.error(error);
      }
      finally{
        setIsLoading(false);
      }
    };

    fetchThreads();
  }, [status]); 

  if (status === "loading") {
    return <div className="my-10 mx-auto flex flex-col items-center"><Image src={load} width={150}/></div>;
  }

  if (status === "unauthenticated") {
     redirect('/');
  }

  return (
    <main className="flex min-h-screen flex-col items-center  lg:p-24 p-0 pt-14">
     
       <div className="mt-6 w-[65vw]">
       {/* <div className="flex flex-row justify-between"> */}
       {isThreadOpened &&
      <div className="fixed z-50 lg:w-[45vw] min-h-screen bg-gray-800 top-0 right-0 w-screen">
         <MdClose size={40} onClick={()=>{setThreadOpened(); setSelectedThreadDetails(null);}} className="m-8 ml-auto"/>
          <p className="lg:p-14 p-6">{sender}</p>
          
          <div className="h-[70vh] overflow-x-hidden lg:p-14 p-6  w-[95%]">{selectedThreadDetails ? <h2>{selectedThreadDetails}</h2> : <div className="flex justify-center">loading...</div>}</div>
          {/* <p>{selectedThreadDetails.content}</p> */}
      </div>
      }
    <SigninButton />
    {/* </div> */}
    <div className=" mt-4 flex flex-row justify-between">
      <div>
      <label htmlFor="number-filter">Number of emails : </label>
      <select id="number-filter" value={maxResults} onChange={handleNumberChange} className="text-black">
        {Array.from({ length: 100 }, (_, i) => i + 1).map((number) => (
          <option key={number} value={number} className="text-black">
            {number}
          </option>
        ))}
      </select>
      </div>
      <Button onClick={handleClassify} className="bordr-2 rounded-md bg-green-500 py-2 hover:scale-105">Classify</Button>
    </div>
    {!isLoading ? 
      <ul>
        {threads && threads.map((thread) => (
          <li key={thread.id} onClick={()=>handleClick(thread.id, thread.payload.headers.find(header => header.name === "From")?.value)} className="my-4 border-4 p-4 w-[65vw] hover:scale-[1.02] cursor-pointer duration-200">
            <div className="flex flex-row justify-between">
              <p>{thread.payload.headers.find(header => header.name === "From")?.value}</p>
             {thread.catagory && <p className=" bg-green-800 px-3 py-2 rounded-lg"> 
            {thread.catagory}</p>}
            </div>
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
