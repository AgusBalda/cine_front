
import { type } from "@testing-library/user-event/dist/type";
import axios from "axios";

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const GETPELICULAS = 'GETPELICULAS'
export const GETPELICULADETALLE = 'GETPELICULADETALLE'
export const CLEARDETALLE = 'CLEARDETALLE'
export const GETGENEROS = 'GETGENEROS'
export const GETDIRECTORES = 'GETDIRECTORES'
export const GETCLASIFICACION = 'GETCLASIFICACION'
export const GETIDIOMAS = 'GETIDIOMAS'
export const POSTPELICULA = 'POSTPELICULA'
export const GETFUNCIONES = 'GETFUNCIONES'
export const GETFUNCIONID = 'GETFUNCIONID'
export const GETPROMOCIONES = 'GETPROMOCIONES'
export const GETSALAS = 'GETSALAS'
export const GETTIPOSFUNCIONES = 'GETTIPOSFUNCIONES'

export const login = (email, contraseña) => async dispatch =>{
  const usuario = await axios.get(`https://cine-back-3.onrender.com/api/Usuarios/login?correo=${email}&contrasena=${contraseña}`)
  if(usuario.data === ""){
    throw new Error("Usuario o la Contraseña es incorrecta");
  }else {
    return dispatch ({type: LOGIN, payload: usuario.data})
  }
}

export const logout = () => {
  return{
    type: LOGOUT
  }
}

export const postFuncion = (hora, pre, sub, d, idpelicula, sala, idpromocion, idtipo, estado1) => async dispatch => {
  if(idpromocion === 0){
    idpromocion = null
  }
  axios.post("https://cine-back-3.onrender.com/api/Funciones/Registrar", {
    horaInicio: hora,
    precio: pre,
    subtitulo: sub,
    dia: d,
    codPelicula: idpelicula,
    idSala: sala,
    codPromocion: idpromocion,
    idTipoFuncion: idtipo,
    estado: estado1
  })
}

export const postUsuario = (email, nom, ape, con) => async dispatch => {
  axios.post("https://cine-back-3.onrender.com/api/Usuarios/Registrar", {
    nombre: nom,
    apellido: ape,
    email: email,
    contrasena: con,
  })
}


export const putFuncion = (hora, pre, sub, d, idpelicula, sala, idpromocion, idtipo, id, estado1) => async dispatch => {
  if(idpromocion === 0){
    idpromocion = null
  }
  axios.put("https://cine-back-3.onrender.com/api/Funciones/Modificar", {
    codFuncion: id,
    horaInicio: hora,
    precio: pre,
    subtitulo: sub,
    dia: d,
    codPelicula: idpelicula,
    idSala: sala,
    codPromocion: idpromocion,
    idTipoFuncion: idtipo,
    estado: estado1
  })
}

export const deleteFuncion = (id) => async dispatch => {
  await axios.delete(`https://cine-back-3.onrender.com/api/Funciones/Borrar ${id}`)
}

export const getFuncionId = (id) => async dispatch => {
  const funcion = await axios.get(`https://cine-back-3.onrender.com/api/Funciones/${id}`)
  return dispatch({type: GETFUNCIONID, payload: funcion.data})
}

export const getPromociones = () => async dispatch => {
  const promociones = await axios.get("https://cine-back-3.onrender.com/api/Promocion")
  return dispatch({type: GETPROMOCIONES, payload: promociones.data})
}

export const getSalas = () => async dispatch => {
  const salas = await axios.get("https://cine-back-3.onrender.com/api/Sala")
  return dispatch({type: GETSALAS, payload: salas.data})
}

export const getTipoFuncion = () => async dispatch => {
  const Tipos = await axios.get("https://cine-back-3.onrender.com/api/TpFunciones")
  return dispatch({type: GETTIPOSFUNCIONES, payload: Tipos.data})
}

export const getFunciones = () => async dispatch => {
  const funciones = await axios.get("https://cine-back-3.onrender.com/api/Funciones")
  return dispatch({type: GETFUNCIONES, payload: funciones.data})
}

export const getPeliculas = () => async dispatch => {
  const peliculas = await axios.get("https://cine-back-3.onrender.com/api/Peliculas")
  return dispatch({type: GETPELICULAS, payload: peliculas.data})
}

export const getPelicualDetalle = (id) => async dispatch => {
  const pelicula = await axios.get(`https://cine-back-3.onrender.com/api/Peliculas/${id}`)
  return dispatch({type: GETPELICULADETALLE, payload: pelicula.data})
}

export const getGeneros = () => async dispatch =>{
  const generos = await axios.get("https://cine-back-3.onrender.com/api/Genero")
  return dispatch({type: GETGENEROS, payload: generos.data})
}

export const getDirectores = () => async dispatch =>{
  const directores = await axios.get("https://cine-back-3.onrender.com/api/Director")
  return dispatch({type: GETDIRECTORES, payload: directores.data})
}

export const getClasificacion = () => async dispatch =>{
  const clasificaciones = await axios.get("https://cine-back-3.onrender.com/api/ClasificacionEdad")
  return dispatch({type: GETCLASIFICACION, payload: clasificaciones.data})
}

export const getIdiomas = () => async dispatch =>{
  const idiomas = await axios.get("https://cine-back-3.onrender.com/api/Idioma")
  return dispatch({type: GETIDIOMAS, payload: idiomas.data})
}

export const deletePelicula = (id) => async dispatch => {
  try{
    await axios.delete("https://cine-back-3.onrender.com/api/Peliculas/Borrar" + id)
  }
  catch{
    throw new Error("Error");
  }
}

export const putPelicula = (fecha, titul, duracion, portada, Genero, idClas,Idioma, DIrector, id) => async dispatch => {
  await axios.put("https://cine-back-3.onrender.com/api/Peliculas/Modificar", {
    codPelicula: id,
    Titulo: titul,
    FechaEstreno: fecha,
    DuracionMin: duracion,
    Portada: portada,
    IdGenero: Genero,
    IdClasificacion: idClas,
    IdIdioma: Idioma,
    IdDirector: DIrector
  })
}

export const postPelicula = (fecha, titul, duracion, portada, Genero, idClas,Idioma, DIrector,) => async dispatch => {
  await axios.post("https://cine-back-3.onrender.com/api/Peliculas/Registrar", {
    Titulo: titul,
    FechaEstreno: fecha,
    DuracionMin: duracion,
    Portada: portada,
    IdGenero: Genero,
    IdClasificacion: idClas,
    IdIdioma: Idioma,
    IdDirector: DIrector
  })
}

export const clearDetalle = () =>{
  return{
    type: CLEARDETALLE
  }
}