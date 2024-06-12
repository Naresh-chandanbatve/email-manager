"use client"
import SigninBox from "./component/SigninBox";
import gmail from  "./../../public/gmail.png";
import Image from "next/image";
import load from  "./../../public/load.gif";
import { useLoadingStore } from "./libs/store";

export default function Home() {

   
  const {isLoading, setIsLoading} = useLoadingStore();

  return (
    <main className="flex flex-col min-h-screen  min-w-screen items-center justify-center lg:p-24 p-12">
       {isLoading &&
       <div className="flex min-h-screen min-w-full items-center justify-center absolute backdrop-blur-md">
       <Image src={load} alt="loading" width={200} height={200} className=""/>
       </div>
       }
       <div className=" bg-[#0e0e1a] lg:p-20 p-8 rounded-3xl">
        <p className="mb-6 text-slate-300 text-xl">
          Let&apos;s classify the <br/> Avalanche of your Emails
        </p>
       <Image src={gmail} alt="gmail logo"  className="lg:mb-14 mb-10 lg:ml-0 ml-[8vw] lg:w-72 w-40 "/>
       <SigninBox className="mb-12"/>
       </div>
    </main>
  );

}
