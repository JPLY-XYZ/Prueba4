import Header from "@/components/header";
import { obtenerEntradaApi } from "@/lib/actions";
import Link from "next/link";

async function ProfesorMasInfo({ params }) {

    const { id } = await params

    const profesor = await obtenerEntradaApi("profesores", id)



    return ( <>
    
        <Header />

        <h1 className="text-5xl text-center pt-10 ">API DE PROFESORES</h1>
        <p className="text-center pb-4"><Link className="text-blue-500  hover:text-blue-950" href={`/api/profesores/`}>Volver</Link></p>
        
        <div className="flex flex-row gap-4  pt-10 justify-center bg-gray-100 p-4 rounded-md shadow-md">
        <p className="font-2xl text-gray-700">id: {id}</p>
        <p className="font-2xl text-gray-700">Nombre: {profesor.nombre} </p>
        <p className="font-2xl text-gray-700">Especialidad: {profesor.especialidad} </p>
        <p className="font-2xl text-gray-700">Estado civil: {profesor.estadocivil} </p>
        </div>
    
    </> );
}

export default ProfesorMasInfo;