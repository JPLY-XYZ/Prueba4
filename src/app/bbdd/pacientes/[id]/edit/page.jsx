import Header from "@/components/header";
import { SQLQuery } from "@/lib/actions";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";

async function editBBDDPaciente({ params }) {


    const { id } = await params
    const query = "select * from pacientes where id=" + id;
    const [alumno] = await  SQLQuery(query);


    async function modificarPaciente(formData) {
      "use server";
      await SQLQuery("update pacientes set nombre='" + formData.get("name") + "', localidad='" + formData.get("localidad") + "', fechaNacimiento='" + formData.get("fechaNacimiento") + "' where id=" + formData.get("id"));
      revalidatePath(`/bbdd/pa/${id}/edit`);
      redirect(`/bbdd/alumnos/${id}`);
    }


    return ( <>
    
    <Header />

    <h1 className="text-5xl text-center pt-10">EDITAR ALUMNO</h1>
    <p className="text-center pb-4"><Link className="text-blue-500  hover:text-blue-950" href={`/bbdd/alumnos/`}>Volver</Link></p>

    <form action={modificarPaciente} className="space-y-4 p-4 border rounded-md shadow-md">
      <input type="hidden" name="id" defaultValue={id} />
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
        <input type="text" name="name" placeholder="Nombre" defaultValue={alumno.nombre} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="localidad" className="block text-sm font-medium text-gray-700">Localidad</label>
        <input type="text" name="localidad" placeholder="Localidad" defaultValue={alumno.localidad} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="fechanacimiento" className="block text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
        <input type="date" name="fechanacimiento" defaultValue={alumno.fechanacimiento.toISOString()} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>
      <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Modificar</button>
    </form>

    
    </> );
}

export default editBBDDPaciente;