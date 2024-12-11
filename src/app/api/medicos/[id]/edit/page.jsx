import Header from "@/components/header";
import { modificarMedicoApi, obtenerEntradaApi } from "@/lib/actions";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";

async function editApiAlumno({ params }) {


    const { id } = await params
    const medico = await obtenerEntradaApi("medicos", id);


    async function modificarMedico(formData) {
      "use server";
      await modificarMedicoApi(formData);
      revalidatePath(`/api/medicos/${id}/edit`);
      redirect(`/api/medicos/${id}`);
    }


    return ( <>
    
    <Header />

    <h1 className="text-5xl text-center pt-10">EDITAR MEDICO</h1>
    <p className="text-center pb-4"><Link className="text-blue-500  hover:text-blue-950" href={`/api/alumnos/`}>Volver</Link></p>

    <form action={modificarMedico} className="space-y-4 p-4 border rounded-md shadow-md">
      <input type="hidden" name="id" defaultValue={id} />
      <div>
        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
        <input type="text" name="nombre" placeholder="Nombre" defaultValue={medico.nombre} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="especialidad" className="block text-sm font-medium text-gray-700">Especialidad</label>
        <input type="text" name="especialidad" placeholder="Especialidad" defaultValue={medico.especialidad} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="perfil" className="block text-sm font-medium text-gray-700">Perfil</label>
        <select defaultValue={medico.perfil} name="perfil" id="perfil" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="ESPECIALISTA">ESPECIALISTA</option>
            <option value="RESIDENTE">RESIDENTE</option>
          </select>
      </div>
      <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Modificar</button>
    </form>

    
    </> );
}

export default editApiAlumno;