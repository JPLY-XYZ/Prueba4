import { getCookie } from "@/lib/cookies";
import { Logout } from "./forms";
import { Database, Webhook, Home } from "lucide-react";
import Link from "next/link";
async function Header() {
    const session = await getCookie("session");

    return (
        <><header className="w-full h-20 px-10 flex justify-items-end items-center bg-blue-200">

            {session && (
                <div className="flex flex-row gap-4 justify-center">
                    <Link href="/api" className=" p-5 bg-green-600 rounded-md text-center items-center flex flex-row"> <Database />API</Link>
                    <Link href="/bbdd" className=" p-5 bg-blue-600 rounded-md text-center items-center  flex flex-row"> <Webhook /> BBDD</Link>
                </div>
            )}
            {!session && (
                <div className="flex flex-row gap-4 ml-auto">
                    <a href="newAcount" className="p-2 bg-amber-600 rounded-md "> Nueva cuenta </a>
                    <a href="login" className="p-2 bg-amber-600 rounded-md"> Iniciar sesion </a>
                </div>
            )}

            {session && <div className="flex flex-row gap-4 ml-auto"><Logout /> </div>}

        </header>
        <div className=" translate-y-[-250%] w-10 m-[0_auto] h-5  flex content-center items-center "><Link href="/" className="text-center m-[0_auto]"> <Home className=" w-30 hover:text-white" /></Link></div>

        </>
    );
}

export default Header;  
