import { LoginForm } from "./login-form";
import Image from "next/image";
import { Toaster } from "react-hot-toast";

export default function Login(){
    return(
        <main className="bg-slate-100 grid grid-cols-2 place-items-center py-10">
            <Toaster position="bottom-right" />
            <Image src="/favicon.ico" alt="Ensyu logo image" width={300} height={300} priority />
            <LoginForm/>
        </main>
    )
}