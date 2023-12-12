import React from 'react';
import { onAuthStateChanged } from "firebase/auth";
import {auth} from './../firebase/config';

export const AppContext = React.createContext();

const initialState = {
    user: null,
    authIsReady: false,
    showModal: false,
}

function reducer(state,action){
    switch(action.type){
        case "LOGIN":
            return {...state, user: action.payload}
        case "LOGOUT":
            return {...state, user: null, watchListItems: null}
        case "AUTH_IS_READY":
            return {...state, authIsReady: true, user: action.payload}
        case "RENDER_LOGIN_MODAL":
            return {...state, showModal: !state.showModal}
        default:
            return state
    }
}

export function AuthContextProvider({children}){

    const [state,dispatch] = React.useReducer(reducer, initialState);

    React.useEffect(()=>{
            onAuthStateChanged(auth, (user) => {
            dispatch({type: "AUTH_IS_READY", payload: user});
            // console.log(auth.currentUser);
        });
    },[]);

    return (
        <AppContext.Provider value={{state,dispatch}}>
            {children}
        </AppContext.Provider>
    )
}