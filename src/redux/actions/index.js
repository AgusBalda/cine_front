
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

export const postPelicula = (fecha, titul, duracion, portada, Genero, idClas,Idioma, DIrector,) => async dispatch => {
  axios.post("https://cine-back-3.onrender.com/api/Peliculas/Registrar", {
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