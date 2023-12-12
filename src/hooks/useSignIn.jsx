import React from 'react';
import {signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import useAuthContext from './useAuthContext';
import {auth} from './../firebase/config.js'

export function useSignIn(){
    const {dispatch} = useAuthContext();
    const [error,setError] = React.useState(null);
    const [errorState,setErrorState] = React.useState(false);
    const [isPending, setIsPending] = React.useState(false);

    async function googleLogin(){
        setError(null);
        setIsPending(true);

        const provider = new GoogleAuthProvider();

        try{
            const result = await signInWithPopup(auth, provider);
            dispatch({type: 'LOGIN', payload: result.user});
            console.log("User Signed in");

            setIsPending(false);
            setError(null);


        }catch(error){
            console.log(error.message);
            setError(error.message);
            setIsPending(false);
    }
}

    async function signin(email,password){
        setError(null);
        setIsPending(true);
        setErrorState(false);

        try{
            const response = await  signInWithEmailAndPassword(auth,email,password);

            dispatch({type: 'LOGIN', payload: response.user})

            setIsPending(false);
            setError(null);
            setErrorState(false);
        }

        catch (error){
            setError(error.message);
            setIsPending(false);
            setErrorState(true);
        }
    }

    return {googleLogin, signin, error, isPending, errorState}
}
