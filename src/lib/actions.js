'use server'
import { redirect } from "next/navigation";
import { deleteCookie, setCookie } from "@/lib/cookies";
import mysql from '@/lib/mysql'


//funciones para login y logout 


export async function login(formData) {
  const LOGIN_URL = '/'

  const userName = formData.get('userName')
  const pass = formData.get('pass')
  const callbackUrl = formData.get('callbackUrl') || LOGIN_URL

  if (!await validarUsuario(userName, pass)) {
    return
  } else {
    console.log("hola estas entrando")
    await setCookie('session', { userName, pass })
    redirect(callbackUrl);
  }


}

export async function logout() {
  deleteCookie('session')
  redirect('/?' + Math.random())
}


async function validarUsuario(userName, passwd) {
  const response = await fetch(`http://localhost:4000/usuarios?user-name=${userName || null}&passwd=${passwd || null}`)
  const usuario = await response.json()
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