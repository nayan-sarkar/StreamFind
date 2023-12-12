import useAuthContext from './../hooks/useAuthContext';
import {Outlet,Navigate} from 'react-router-dom';

export default function isAuthenticated(){

    const {state} = useAuthContext();

    if(state.user){
        return <Outlet/>
    }
        else  return <Navigate to = '/'/>
    
}