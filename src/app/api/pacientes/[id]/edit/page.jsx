import Header from "@/components/header";
import { modificarProfesorApi, obtenerEntradaApi } from "@/lib/actions";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";

async function editApiProfesor({ params }) {


    const { id } = await params
    const profesor = await obtenerEntradaApi("profesores", id);

    async function modificarProfesor(formData) {
      "use server";
      await modificarProfesorApi(formData);
      revalidatePath(`/api/profesores/${id}/edit`);
      redirect(`/api/profesores/${id}`);
    }


    return ( <>
    
    <Header />

    <h1 className="text-5xl text-center pt-10">EDITAR PROFESOR API</h1>
    <p className="text-center pb-4"><Link className="text-blue-500  hover:text-blue-950" href={`/api/profesores/`}>Volver</Link></p>

    <form action={modificarProfesor} className="space-y-4 p-4 border rounded-md shadow-md">
      <input type="hidden" name="id" defaultValue={id} />
      <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Nombre
          </label>
          <input 
            defaultValue={profesor.nombre}
            type="text"
            name="name"
            placeholder="Nombre"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="especialidad"
            className="block text-sm font-medium text-gray-700"
          >
            Especialidad
          </label>
          <input
            defaultValue={profesor.especialidad}
            type="text"
            name="especialidad"
            placeholder="Especialidad"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="estadocivil"
            className="block text-sm font-medium text-gray-700"
          >
            Estado civil
          </label>
          <select
            defaultValue={profesor.estado}
            name="estadocivil"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="soltero">Soltero</option>
            <option value="casado">Casado</option>
            <option value="divorciado">Divorciado</option>
            <option value="viudo">Viudo</option>
          </select>
        </div>
      <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Modificar</button>
    </form>

    
    </> );
}

export default editApiProfesor;