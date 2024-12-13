import { login, logout, nuevoUsuario } from "@/lib/actions";
import { LogIn, LogOut, UserPlus} from "lucide-react";

export function Login({ callbackUrl }) {
  return (
    <><h1 className="text-5xl text-center pt-10 bg-gray-200 min-h-[10vh]"> <a href="/">INICIO</a></h1>
    <h1 className="text-3xl text-center pt-10 bg-gray-200 min-h-[10vh]">Iniciar sesion en tu cuenta</h1>
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-200">
      <form action={login} className="flex flex-col gap-4 p-8 bg-white shadow-lg rounded-lg">
        <input type="hidden" name="callbackUrl" defaultValue={callbackUrl} />
        <input  
          name="userName"
          placeholder="Username"
          className="text-black p-2 rounded-md ring-1 ring-slate-300 hover:ring-blue-300 focus:outline-none"
        />
        <input
          type="password"
          name="pass"
          placeholder="Contraseña"
          className="text-black p-2 rounded-md ring-1 ring-slate-300 hover:ring-blue-300 focus:outline-none"
        />
        <button
          type="submit"
          className="text-black px-4 py-2 bg-blue-100 hover:bg-blue-200 ring-1 ring-slate-300 hover:ring-blue-300 rounded-lg text-center"
        >
          <LogIn className="inline p-1" /> Login
        </button>
      
      </form>
    </div>
    </>
  );
}

export function Logout() {
  return (
    <form action={logout} className="flex flex-col gap-4">
      <button
        type="submit"
        className=" text-black px-4 py-2 bg-blue-100 hover:bg-blue-200 ring-1 ring-slate-300 hover:ring-blue-300 rounded-lg text-center"
      >
        <LogOut className="text-black inline p-1" /> Logout
      </button>
    </form>
  );
}


