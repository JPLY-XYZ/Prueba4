import Header from "@/components/header";
import SubmitButton from "@/components/submit-button";
import { modificarPacienteApi, obtenerEntradaApi } from "@/lib/actions";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";

async function editApiPaciente({ params }) {


    const { id } = await params
    const paciente = await obtenerEntradaApi("pacientes", id);

    async function modificarPaciente(formData) {
      "use server";
      await modificarPacienteApi(formData);
      revalidatePath(`/api/pacientes/${id}/edit`);
      redirect(`/api/pacientes/${id}`);
    }


    return ( <>
    
    <Header />

    <h1 className="text-5xl text-center pt-10">EDITAR PACIENTE API</h1>
    <p className="text-center pb-4"><Link className="text-blue-500  hover:text-blue-950" href={`/api/pacientes/`}>Volver</Link></p>

    <form action={modificarPaciente} className="space-y-4 p-4 border rounded-md shadow-md">
      <input type="hidden" name="id" defaultValue={id} />
      <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Nombre
          </label>
          <input 
            defaultValue={paciente.nombre}
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
            defaultValue={paciente.localidad}
            type="text"
            name="localidad"
            placeholder="Localidad"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="fechaNacimiento"
            className="block text-sm font-medium text-gray-700"
          >
            Estado civil
          </label>
          <input
            defaultValue={paciente.fechaNacimiento} 
            type="date"
            name="fechaNacimiento"
            id="fechaNacimiento"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      <SubmitButton type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Modificar</SubmitButton>
    </form>

    
    </> );
}

export default editApiPaciente;