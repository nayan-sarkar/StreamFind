import React from 'react';
import {AppContext} from './../context/AuthContext';

export default function useAuthContext(){
    const context = React.useContext(AppContext);

    if(!context){
        throw Error("Error in context or not defined")
    }

    return context;
}