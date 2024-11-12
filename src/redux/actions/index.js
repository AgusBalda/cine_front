
import axios from "axios";

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

export const login = (nombre, contraseña) => async dispatch =>{
  const usuario = await axios.get(`https://cine-back-3.onrender.com/api/Usuarios/login?nombre=${nombre}&contrasena=${contraseña}`)
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
