"use client"
import SigninBox from "./component/SigninBox";
import gmail from  "./../../public/gmail.png";
import Image from "next/image";
import load from  "./../../public/load.gif";
import { useLoadingStore } from "./libs/store";

export default function Home() {

   
  const {isLoading, setIsLoading} = useLoadingStore();

  return (
    <main className="flex flex-col min-h-screen  min-w-screen items-center justify-center p-24">
       {isLoading &&
       <div className="flex min-h-screen min-w-full items-center justify-center absolute backdrop-blur-md">
       <Image src={load} alt="loading" width={200} height={200} className=""/>
       </div>
       }
       <div className=" bg-[#0e0e1a] p-20 rounded-3xl">
        <p className="mb-6 text-slate-300 text-xl">
          Let&apos;s classify the <br/> Avalanche of your Emails
        </p>
       <Image src={gmail} alt="gmail logo" width={300} className="mb-14"/>
       <SigninBox className="mb-12"/>
       </div>
    </main>
  );

}
