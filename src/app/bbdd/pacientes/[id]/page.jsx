import Header from "@/components/header";
import { SQLQuery } from "@/lib/actions";
import Link from "next/link";

async function PacienteBBDDMasInfo({ params }) {

    const { id } = await params

    const query = "select * from pacientes where id=" + id;
    const [paciente] = await  SQLQuery(query);


    console.log(alumno);

    return ( <>
    
        <Header />

        <h1 className="text-5xl text-center pt-10 ">BBDD DE PACIENTE CONSULTA PERSONALIZADA</h1>
        <p className="text-center pb-4"><Link className="text-blue-500  hover:text-blue-950" href={`/api/pacientes/`}>Volver</Link></p>
        
        <div className="flex flex-row gap-4  pt-10 justify-center bg-gray-100 p-4 rounded-md shadow-md">
        <p className="font-2xl text-gray-700">id: {id}</p>
        <p className="font-2xl text-gray-700">Nombre: {paciente.nombre} </p>
        <p className="font-2xl text-gray-700">Localidad: {paciente.localidad} </p>
        <p className="font-2xl text-gray-700">Fecha de nacimiento: {paciente.fechaNacimiento.toLocaleDateString()} </p>
        </div>
    
    </> );
}

export default PacienteBBDDMasInfo;