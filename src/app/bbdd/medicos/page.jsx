import Header from "@/components/header";
import { SQLQuery } from "@/lib/actions";
import { Eye, ShieldX, Pencil } from "lucide-react";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";

async function eliminarMedico(formData) {
  "use server";
  await SQLQuery("delete from alunos where id=" + formData.get("id"));
  revalidatePath("/api/medicos");
}

async function modificarMedico(formData) {
  "use server";
  redirect(`/bbdd/medicos/${formData.get("id")}/edit`);
}

async function verMedico(formData) {
  "use server";
  redirect(`/bbdd/medicos/${formData.get("id")}`);
}

async function crearMedico(formData) {
  "use server";
  const query = "insert into medicos (nombre, especialidad, perfil) values ('" + formData.get("name") + "', '" + formData.get("especialidad") + "', '" + formData.get("perfil") + "')";
  await SQLQuery(query);
  revalidatePath("/bbdd/medicos");
}

async function medicosBBDD() {

  const query = "select * from alunos";
  const datosMedicos = await  SQLQuery(query);

  return (
    <>
      <Header />

      <h1 className="text-5xl text-center pt-10">BBDD DE MEDICOS</h1>
      <p className="text-center pb-4">
        <Link className="text-blue-500  hover:text-blue-950" href={`/api/`}>
          Volver
        </Link>
      </p>

<br /><br />

      <form
        action={crearMedico}
        className="space-y-4 p-4 border rounded-md shadow-md"
      >
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Nombre
          </label>
          <input
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
            type="text"
            name="especialidad"
            placeholder="especialidad"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="perfil"
            className="block text-sm font-medium text-gray-700"
          >
            Perfil
          </label>
          <select name="perfil" id="perfil" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="ESPECIALISTA">ESPECIALISTA</option>
            <option value="RESIDENTE">RESIDENTE</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Nuevo Medico
        </button>
        <button
          type="reset"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Reiniciar
        </button>
      </form>

      <br /><br />

      {datosMedicos.map((medico) => (
        <div
          className="flex flex-row gap-4  pt-10 justify-center"
          key={medico.id}
        >
          <p>{medico.nombre}</p>
          <form>
            <input type="hidden" name="id" value={medico.id} />
            <button formAction={eliminarMedico} title="ELIMINAR">
              <ShieldX />
            </button>
          </form>
          <form>
            <input type="hidden" name="id" value={medico.id} />
            <button formAction={modificarMedico} title="EDITAR">
              <Pencil />
            </button>
          </form>
          <form>
            <input type="hidden" name="id" value={medico.id} />
            <button formAction={verMedico} title="VER">
              <Eye />
            </button>
          </form>
        </div>
      ))}
    </>
  );
}

export default medicosBBDD;
