import {LOGIN, LOGOUT} from '../actions';

const initialState = {
  usuario: {}
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
    default:
      return state;
  }
};

export default rootReducer;