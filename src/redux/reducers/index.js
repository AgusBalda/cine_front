import {GET_POKEMON, REMOVE_ITEM} from '../actions';

const initialState = {
  items: [],
  contador: 1,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
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