import Header from "@/components/header";
import { SQLQuery } from "@/lib/actions";
import Link from "next/link";

async function medicoBBDDMasInfo({ params }) {

    const { id } = await params

    const query = "select * from medicos where id=" + id;
    const [medico] = await  SQLQuery(query);



    return ( <>
    
        <Header />

        <h1 className="text-5xl text-center pt-10 ">BBDD DE MEDICO CONSULTA PERSONALIZADA</h1>
        <p className="text-center pb-4"><Link className="text-blue-500  hover:text-blue-950" href={`/api/medicos/`}>Volver</Link></p>
        
        <div className="flex flex-row gap-4  pt-10 justify-center bg-gray-100 p-4 rounded-md shadow-md">
        <p className="font-2xl text-gray-700">id: {id}</p>
        <p className="font-2xl text-gray-700">Nombre: {medico.nombre} </p>
        <p className="font-2xl text-gray-700">Especialidad: {medico.especialidad} </p>
        <p className="font-2xl text-gray-700">Perfil: {medico.perfil} </p>
        </div>
    
    </> );
}

export default medicoBBDDMasInfo;