import {CLEARDETALLE, GETCLASIFICACION, GETDIRECTORES, GETFUNCIONES, GETFUNCIONID, GETGENEROS, GETIDIOMAS, GETPELICULADETALLE, GETPELICULAS, GETPROMOCIONES, GETSALAS, GETTIPOSFUNCIONES, LOGIN, LOGOUT} from '../actions';

const initialState = {
  usuario: {},
  peliculas: [],
  pelicula: "",
  funciones: [],
  generos: [],
  clasificaciones: [],
  directores: [],
  idiomas: [],
  funcion: "",
  promociones: [],
  tiposFuncion: [],
  salas: [],

};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        usuario: {usuario: action.payload},
      };
    case LOGOUT:
      return {
      ...state,
      usuario:  {}
    };
    case GETPELICULAS:
      return{
        ...state,
        peliculas: action.payload
      }
    case GETPELICULADETALLE:
      return{
        ...state,
        pelicula: action.payload
      }
    case CLEARDETALLE:
      return{
        ...state,
        pelicula: "",
        funcion: ""
      }
    case GETGENEROS:
      return{
        ...state,
        generos: action.payload
      }
    case GETDIRECTORES:
      return{
        ...state,
        directores: action.payload
      }
    case GETCLASIFICACION:
      return{
        ...state,
        clasificaciones: action.payload
      }
    case GETIDIOMAS:
      return{
        ...state,
        idiomas: action.payload
      }
    case GETFUNCIONES:
      return{
        ...state,
        funciones: action.payload
      }
    case GETFUNCIONID:
      return{
        ...state,
        funcion: action.payload
      }
    case GETPROMOCIONES:
      return{
        ...state,
        promociones: action.payload
      }
    case GETSALAS:
      return{
        ...state,
        salas: action.payload
      }
    case GETTIPOSFUNCIONES:
      return{
        ...state,
        tiposFuncion: action.payload
      }
    default:
      return state;
  }
};

export default rootReducer;