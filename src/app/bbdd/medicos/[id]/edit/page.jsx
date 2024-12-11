import Header from "@/components/header";
import SubmitButton from "@/components/submit-button";
import { SQLQuery } from "@/lib/actions";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";

async function editBBDDMedico({ params }) {


    const { id } = await params
    const query = "select * from medicos where id=" + id;
    const [medico] = await  SQLQuery(query);


    async function modificarMedico(formData) {
      "use server";
      await SQLQuery("update medicos set nombre='" + formData.get("name") + "', especialidad='" + formData.get("especialidad") + "', perfil='" + formData.get("perfil") + "' where id=" + formData.get("id"));
      revalidatePath(`/bbdd/medicos/${id}/edit`);
      redirect(`/bbdd/medicos/${id}`);
    }


    return ( <>
    
    <Header />

    <h1 className="text-5xl text-center pt-10">EDITAR MEDICO</h1>
    <p className="text-center pb-4"><Link className="text-blue-500  hover:text-blue-950" href={`/bbdd/medicos/`}>Volver</Link></p>

    <form action={modificarMedico} className="space-y-4 p-4 border rounded-md shadow-md">
      <input type="hidden" name="id" defaultValue={id} />
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
        <input type="text" name="name" placeholder="Nombre" defaultValue={medico.nombre} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="especialidad" className="block text-sm font-medium text-gray-700">Especialidad</label>
        <input type="text" name="especialidad" placeholder="Especialidad" defaultValue={medico.especialidad} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="perfil" className="block text-sm font-medium text-gray-700">Perfil</label>
        <select name="perfil" id="perfil" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="ESPECIALISTA">ESPECIALISTA</option>
            <option value="RESIDENTE">RESIDENTE</option>
          </select>
      </div>
      <SubmitButton type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Modificar</SubmitButton>
    </form>

    
    </> );
}

export default editBBDDMedico;