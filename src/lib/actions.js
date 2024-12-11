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

//MEDICOS

export async function crearMedicoApi(formData) {
  const response = await fetch(`http://localhost:4000/medicos`, {
    method: "POST",
    body: JSON.stringify({
      nombre: formData.get('nombre'),
      especialidad: formData.get('especialidad'),
      perfil: formData.get('perfil')
    }),
  });
}

export async function modificarMedicoApi(formData) {

  const id = formData.get('id')
  const response = await fetch(`http://localhost:4000/medicos/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      nombre: formData.get('nombre'),
      especialidad: formData.get('especialidad'),
      perfil: formData.get('perfil')
    }),
  });
}


//PACIENTES

export async function crearPacienteApi(formData) {
  const response = await fetch(`http://localhost:4000/pacientes`, {
    method: "POST",
    body: JSON.stringify({
      nombre: formData.get('name'),
      localidad: formData.get('localidad'),
      fechaNacimiento: formData.get('fechaNacimiento')
    }),
  });
}

export async function modificarPacienteApi(formData) {

  const id = formData.get('id')
  console.log('id = ', id)

  const response = await fetch(`http://localhost:4000/pacientes/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      nombre: formData.get('name'),
      localidad: formData.get('localidad'),
      fechaNacimiento: formData.get('fechaNacimiento')
    }),
  });
}


//Consulta de base de datos
export async function SQLQuery(query) {
  const [data] = await mysql.query(query);
  return data
}