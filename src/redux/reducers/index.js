import {GET_POKEMON, LOGIN} from '../actions';

const initialState = {
  items: [],
  contador: 1,
  usuario: {usu: null, con: null}
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        usuario: {usu: action.payload.usu, con: action.payload.con},
      };
    case GET_POKEMON:
        return{
            ...state,
            items: [...state.items, action.payload],
            contador: state.contador + 1
        };
    default:
      return state;
  }
};

export default rootReducer;