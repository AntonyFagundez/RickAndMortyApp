import { loginWithGoogle, logoutWithGoogle } from '../firebase'

//const
const LOGIN = 'LOGIN';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_ERROR = 'LOGIN_ERROR';

const LOGOUT = 'LOGOUT';

let initialData = {
    loggedIn: false,
    fetching: false
}

//reducers
export default function reducer(state = initialData, action){
    switch(action.type){
        case LOGIN: 
            return {
                ...state,
                fetching: true
            }
        case LOGIN_SUCCESS: 
            return {
                ...state,
                fetching: false,
                loggedIn : true,
                ...action.payload
            }
        case LOGIN_ERROR: 
            return {
                ...state,
                message: action.payload,
                fetching: false
            }
        case LOGOUT: 
            return { ...initialData }
        default : 
            return state;
    }
}

//aux
function saveStorage(storage){
    localStorage.storage = JSON.stringify(storage);
}

function clearStorage(){
    localStorage.removeItem('storage')
}

//actions
export let doGoogleLoginAction = () => (dispatch, getState) =>{
    dispatch({type: LOGIN})
    return loginWithGoogle()
        .then(user =>{
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {
                    uid: user.uid,
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                }
            })
            saveStorage(getState())
        })
        .catch(err =>{
            dispatch({
                type: LOGIN_ERROR,
                payload : err.message
            })
        })
};

export let doGoogleLogoutAction = () => (dispatch, getState) =>{
    return logoutWithGoogle().then(res =>{
        clearStorage()
        dispatch({type: LOGOUT})
    })
};

export let restoreSessionAction = () => (dispatch, getState) =>{
    let storage = localStorage.getItem('storage');

    storage = JSON.parse(storage);

    if(storage?.user){
        dispatch({
            type: LOGIN_SUCCESS,
            payload: storage.user
        })
    }
};

