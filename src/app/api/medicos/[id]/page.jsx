import Header from "@/components/header";
import { obtenerEntradaApi } from "@/lib/actions";
import Link from "next/link";

async function medicosMasInfo({ params }) {

    const { id } = await params

    const medico = await obtenerEntradaApi("medicos", id)



    return ( <>
    
        <Header />

        <h1 className="text-5xl text-center pt-10 ">API DE MEDICOS CONSULTA PERSONALIZADA</h1>
        <p className="text-center pb-4"><Link className="text-blue-500  hover:text-blue-950" href={`/api/medicos/`}>Volver</Link></p>
        
        <div className="flex flex-row gap-4  pt-10 justify-center bg-gray-100 p-4 rounded-md shadow-md">
        <p className="font-2xl text-gray-700">id: {id}</p>
        <p className="font-2xl text-gray-700">Nombre: {medico.nombre} </p>
        <p className="font-2xl text-gray-700">Especialidad: {medico.especialidad} </p>
        <p className="font-2xl text-gray-700">Perfil: {medico.perfil} </p>
        </div>
    
    </> );
}

export default medicosMasInfo;