import Header from "@/components/header";
import { Webhook } from "lucide-react";
import Link from "next/link";

function api() {
    return ( 
    <>
    <Header />

    <h1 className="text-5xl text-center pt-10">API</h1>
    <p className="text-center pb-4"><Link className="text-blue-500  hover:text-blue-950" href={`/`}>Volver</Link></p>

    <div className="flex flex-row gap-11  justify-center bg-gray-100 p-4 rounded-md shadow-md">
      <Link href="/api/medicos">
        <div className="flex flex-row self-end items-center gap-2 ">
          <Webhook className="h-6 w-6 text-indigo-600  " />
          <p className="text-lg font-medium text-gray-700 ">API DE MEDICOS</p>
        </div>
      </Link>
      <Link href="/api/pacientes">
        <div className="flex flex-row self-end items-center gap-2">
          <Webhook className="h-6 w-6 text-indigo-600" />
          <p className="text-lg font-medium text-gray-700">API DE PACIENTES</p>
        </div>
      </Link>
      </div>
    
    
    </> 
    );
}

export default api;