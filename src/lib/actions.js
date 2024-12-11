'use server'
import { redirect } from "next/navigation";
import { deleteCookie, setCookie } from "@/lib/cookies";
import mysql from '@/lib/mysql'


//funciones para login y logout 


export async function login(formData) {
  const LOGIN_URL = '/'

  const email = formData.get('email')
  const pass = formData.get('pass')
  const callbackUrl = formData.get('callbackUrl') || LOGIN_URL

  if (!await validarUsuario(email, pass)) {
    return
  } else {
    await setCookie('session', { email, pass })
    redirect(callbackUrl);
  }


}



export async function logout() {
  deleteCookie('session')
  redirect('/?' + Math.random())
}



export async function nuevoUsuario(formData) {
  "use server";
  const [name, email, passwd] = formData.values();

  const response = await fetch("http://localhost:4000/usuarios", {
    method: "POST",
    body: JSON.stringify({
      email,
      passwd,
      createdAt: new Date().toISOString(),
    }),
  });
  const data = await response.json();

  await setCookie('session', { email, passwd })
  redirect("/");
}

async function validarUsuario(email, passwd) {

  const response = await fetch(`http://localhost:4000/usuarios?email=${email}&passwd=${passwd}`)
  const usuario = await response.json()

  console.log('usuario.length = ', usuario.length)

  if (usuario.length > 0) {
    return true
  }

  return false
}


//funciones para uso de api

export async function obtenerDatoApi(endpoint) {
  const response = await fetch(`http://localhost:4000/${endpoint}`)
  return await response.json()
}

export async function obtenerEntradaApi(endpoint, id) {
  const response = await fetch(`http://localhost:4000/${endpoint}/${id}`)
  return await response.json()
}

export async function eliminarDatoApi(endpoint, formData) {

  const id = formData.get('id')
  await fetch(`http://localhost:4000/${endpoint}/${id}`, { method: 'DELETE' })

}

//ALUMNOS

export async function crearAlumnoApi(formData) {
  const response = await fetch(`http://localhost:4000/alumnos`, {
    method: "POST",
    body: JSON.stringify({
      nombre: formData.get('name'),
      localidad: formData.get('localidad'),
      fechanacimiento: formData.get('fechanacimiento')
    }),
  });
}

export async function modificarAlumnoApi(formData) {

  const id = formData.get('id')
  console.log('id = ', id)

  const response = await fetch(`http://localhost:4000/alumnos/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      nombre: formData.get('name'),
      localidad: formData.get('localidad'),
      fechanacimiento: formData.get('fechanacimiento')
    }),
  });
}


//PROFESORES

export async function crearProfesorApi(formData) {
  const response = await fetch(`http://localhost:4000/profesores`, {
    method: "POST",
    body: JSON.stringify({
      nombre: formData.get('name'),
      especialidad: formData.get('especialidad'),
      estadocivil: formData.get('estadocivil')
    }),
  });
}

export async function modificarProfesorApi(formData) {

  const id = formData.get('id')
  console.log('id = ', id)

  const response = await fetch(`http://localhost:4000/profesores/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      nombre: formData.get('name'),
      especialidad: formData.get('especialidad'),
      estadocivil: formData.get('estadocivil')
    }),
  });
}


//Consulta de base de datos
export async function SQLQuery(query) {
  const [data] = await mysql.query(query);
  return data
}