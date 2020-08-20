import axios from 'axios';

//const
const GET_CHARACTERS = 'GET_CHARACTERS';
const GET_CHARACTERS_SUCCESS = 'GET_CHARACTERS_SUCCESS';
const GET_CHARACTERS_ERROR = 'GET_CHARACTERS_ERROR';

const REMOVE_CHARACTER = 'REMOVE_CHARACTER';
const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';

//initialData
let initialData = {
    fetching: false,
    array:[],
    current: {},
    favorites : []
};
let URL = "https://rickandmortyapi.com/api/character/";


//reducer
export default function reducer(state=initialData, action){
    switch(action.type){
        case GET_CHARACTERS :
            return { ...state, fetching : true }
        case GET_CHARACTERS_SUCCESS :
            return {
                ...state,
                array: action.payload,
                fetching: false
            }
        case GET_CHARACTERS_ERROR :
            return {
                ...state,
                fetching: false,
                error : action.payload
            }
        case REMOVE_CHARACTER :
            return { ...state,
                array : action.payload
            }
        case ADD_TO_FAVORITES:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

//actions (thunks)
export let getCharactersAction = () => (dispatch, getState) => {
    dispatch({type : GET_CHARACTERS})
    return axios.get(URL)
        .then(res =>{
            dispatch({
                type: GET_CHARACTERS_SUCCESS,
                payload : res.data.results
            })
        })
        .catch(err =>{
            dispatch({
                type: GET_CHARACTERS_ERROR,
                payload: err.response.message
            })
        })
};

export let removeCharacterAction = () => (dispatch, getState) => {

    let { array } = getState().characters;

    array.shift();

    dispatch({
        type: REMOVE_CHARACTER,
        payload : [...array]
    })
}

export let addToFavoritesAction = () => (dispatch, getState) => {

    let { array, favorites } = getState().characters;

    let char = array.shift();

    favorites.push(char);

    dispatch({
        type: ADD_TO_FAVORITES,
        payload : {array:[...array], favorites: [...favorites]}
    })
}
