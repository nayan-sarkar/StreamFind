import React from 'react';
import {auth} from './../firebase/config.js'
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import useAuthContext from './useAuthContext';

export function useSignUp(){
    const {dispatch} = useAuthContext();
    const [error,setError] = React.useState(null);
    const [isPending, setIsPending] = React.useState(false);
    async function signup(email,password,displayName){

        setError(null);
        setIsPending(true);

    try
        {
            // sign up user
            const response  = await createUserWithEmailAndPassword(auth,email,password);

            if(!response) throw Error("Could not complete sign up");

            // update display name
            updateProfile(auth.currentUser, { displayName })
                .catch(e=>{
                        console.log("display name not updated")
                        console.log(e)})

            // update context state with user data
            dispatch({type: "LOGIN", payload: auth.currentUser});

            setIsPending(false);
            setError(null);


    }catch(err){
        setError(err.message);
        setIsPending(false);
    }

}

return {error, isPending, signup}
}