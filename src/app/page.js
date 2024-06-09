import SigninButton from "@/app/component/SigninButton";
import SigninBox from "./component/SigninBox";
import gmail from  "./../../public/gmail.png";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center p-24">
       
       <div className=" bg-[#0e0e1a] p-20 rounded-3xl">
        <p className="mb-6 text-slate-300 text-xl">
          Let's classify the <br/> Avalanche of your Emails
        </p>
       <Image src={gmail} width={300} className="mb-14"/>
       <SigninBox className="mb-12"/>
       </div>
    </main>
  );
}
