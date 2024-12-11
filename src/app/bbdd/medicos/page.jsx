import Header from "@/components/header";
import { SQLQuery } from "@/lib/actions";
import { Eye, ShieldX, Pencil } from "lucide-react";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";

async function eliminarProfesor(formData) {
  "use server";
  await SQLQuery("delete from alunos where id=" + formData.get("id"));
  revalidatePath("/api/profesores");
}

async function modificarProfesor(formData) {
  "use server";
  redirect(`/bbdd/profesores/${formData.get("id")}/edit`);
}

async function verProfesor(formData) {
  "use server";
  redirect(`/bbdd/profesores/${formData.get("id")}`);
}

async function crearProfesor(formData) {
  "use server";
  const query = "insert into alunos (nombre, localidad, fechanacimiento) values ('" + formData.get("name") + "', '" + formData.get("localidad") + "', '" + formData.get("fechanacimiento") + "')";
  await SQLQuery(query);
  revalidatePath("/bbdd/profesores");
}

async function profesoresBBDD() {

  const query = "select * from alunos";
  const datosAlumnos = await  SQLQuery(query);

  return (
    <>
      <Header />

      <h1 className="text-5xl text-center pt-10">BBDD DE ALUMNOS</h1>
      <p className="text-center pb-4">
        <Link className="text-blue-500  hover:text-blue-950" href={`/api/`}>
          Volver
        </Link>
      </p>

<br /><br />

      <form
        action={crearAlumno}
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
            htmlFor="fechanacimiento"
            className="block text-sm font-medium text-gray-700"
          >
            Fecha de Nacimiento
          </label>
          <input
            type="date"
            name="fechanacimiento"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Nuevo Alumno
        </button>
        <button
          type="reset"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Reiniciar
        </button>
      </form>

      <br /><br />

      {datosAlumnos.map((alumno) => (
        <div
          className="flex flex-row gap-4  pt-10 justify-center"
          key={alumno.id}
        >
          <p>{alumno.nombre}</p>
          <form>
            <input type="hidden" name="id" value={alumno.id} />
            <button formAction={eliminarAlumno} title="ELIMINAR">
              <ShieldX />
            </button>
          </form>
          <form>
            <input type="hidden" name="id" value={alumno.id} />
            <button formAction={modificarAlumno} title="EDITAR">
              <Pencil />
            </button>
          </form>
          <form>
            <input type="hidden" name="id" value={alumno.id} />
            <button formAction={verAlumno} title="VER">
              <Eye />
            </button>
          </form>
        </div>
      ))}
    </>
  );
}

export default profesoresBBDD;
