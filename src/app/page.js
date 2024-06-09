import SigninButton from "@/app/component/SigninButton";
import SigninBox from "./component/SigninBox";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
       <SigninButton/>
       <SigninBox/>
    </main>
  );
}
