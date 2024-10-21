import axios from "axios";

export const REMOVE_ITEM = 'REMOVE_ITEM';
export const GET_POKEMON = 'GET_POKEMON';

export const removeItem = (id) => ({
  type: REMOVE_ITEM,
  payload: id,
});

export const getPokemon = (id) => async dispatch => {
    const pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return dispatch({type: GET_POKEMON, payload: pokemon.data})
}