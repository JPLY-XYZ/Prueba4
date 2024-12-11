import Header from "@/components/header";
import SubmitButton from "@/components/submit-button";
import { SQLQuery } from "@/lib/actions";
import { Eye, ShieldX, Pencil } from "lucide-react";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";

async function eliminarPaciente(formData) {
  "use server";
  await SQLQuery("delete from pacientes where id=" + formData.get("id"));
  revalidatePath("/api/pacientes");
}

async function modificarPaciente(formData) {
  "use server";
  redirect(`/bbdd/pacientes/${formData.get("id")}/edit`);
}

async function verPaciente(formData) {
  "use server";
  redirect(`/bbdd/pacientes/${formData.get("id")}`);
}

async function crearPaciente(formData) {
  "use server";
  const query = "insert into pacientes (nombre, localidad, fechaNacimiento) values ('" + formData.get("name") + "', '" + formData.get("localidad") + "', '" + formData.get("fechaNacimiento") + "')";
  await SQLQuery(query);
  revalidatePath("/bbdd/pacientes");
}

async function pacientesApi() {

  const query = "select * from pacientes";
  const datosPacientes = await  SQLQuery(query);

  return (
    <>
      <Header />

      <h1 className="text-5xl text-center pt-10">BBDD DE PACIENTE</h1>
      <p className="text-center pb-4">
        <Link className="text-blue-500  hover:text-blue-950" href={`/api/`}>
          Volver
        </Link>
      </p>

<br /><br />

      <form
        action={crearPaciente}
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
            htmlFor="localidad"
            className="block text-sm font-medium text-gray-700"
          >
            Localidad
          </label>
          <input
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
            Fecha de Nacimiento
          </label>
          <input
            type="date"
            name="fechaNacimiento"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <SubmitButton
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Nuevo Paciente
        </SubmitButton>
        <button
          type="reset"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Reiniciar
        </button>
      </form>

      <br /><br />

      {datosPacientes.map((paciente) => (
        <div
          className="flex flex-row gap-4  pt-10 justify-center"
          key={paciente.id}
        >
          <p>{paciente.nombre}</p>
          <form>
            <input type="hidden" name="id" value={paciente.id} />
            <button formAction={eliminarPaciente} title="ELIMINAR">
              <ShieldX />
            </button>
          </form>
          <form>
            <input type="hidden" name="id" value={paciente.id} />
            <button formAction={modificarPaciente} title="EDITAR">
              <Pencil />
            </button>
          </form>
          <form>
            <input type="hidden" name="id" value={paciente.id} />
            <button formAction={verPaciente} title="VER">
              <Eye />
            </button>
          </form>
        </div>
      ))}
    </>
  );
}

export default pacientesApi;
