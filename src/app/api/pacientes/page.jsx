import Header from "@/components/header";
import { obtenerDatoApi, eliminarDatoApi, crearProfesorApi } from "@/lib/actions";
import { Eye, ShieldX, Pencil } from "lucide-react";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";

async function eliminarProfesor(formData) {
  "use server";
  await eliminarDatoApi("profesores", formData);
  revalidatePath("/api/profesores");
}

async function modificarProfesor(formData) {
  "use server";
  redirect(`/api/profesores/${formData.get("id")}/edit`);
}

async function verProfesor(formData) {
  "use server";
  redirect(`/api/profesores/${formData.get("id")}`);
}

async function crearProfesor(formData) {
  "use server";
  await crearProfesorApi(formData);
  revalidatePath("/api/profesores");
}

async function profesoresApi() {
  const datosProfesores = await obtenerDatoApi("profesores");

  console.log("datosProfesores = ", datosProfesores);

  return (
    <>
      <Header />

      <h1 className="text-5xl text-center pt-10">API DE profesores</h1>
      <p className="text-center pb-4">
        <Link className="text-blue-500  hover:text-blue-950" href={`/api/`}>
          Volver
        </Link>
      </p>

<br /><br />

      <form
        action={crearProfesor}
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
            name="estadocivil"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="soltero">Soltero</option>
            <option value="casado">Casado</option>
            <option value="divorciado">Divorciado</option>
            <option value="viudo">Viudo</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Nuevo profesor
        </button>
        <button
          type="reset"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Reiniciar
        </button>
      </form>

      <br /><br />

      {datosProfesores.map((profesor) => (
        <div
          className="flex flex-row gap-4  pt-10 justify-center"
          key={profesor.id}
        >
          <p>{profesor.nombre}</p>
          <form>
            <input type="hidden" name="id" value={profesor.id} />
            <button formAction={eliminarProfesor} title="ELIMINAR">
              <ShieldX />
            </button>
          </form>
          <form>
            <input type="hidden" name="id" value={profesor.id} />
            <button formAction={modificarProfesor} title="EDITAR">
              <Pencil />
            </button>
          </form>
          <form>
            <input type="hidden" name="id" value={profesor.id} />
            <button formAction={verProfesor} title="VER">
              <Eye />
            </button>
          </form>
        </div>
      ))}
    </>
  );
}

export default profesoresApi;
