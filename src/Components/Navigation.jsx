import { FiSearch } from "react-icons/fi";
import React from 'react';
import LoginModal from './LoginModal';
import {useNavigate, Link} from 'react-router-dom';
import useAuthContext from './../hooks/useAuthContext';
import {useLogout} from './../hooks/useLogout';

export default function Navigation (){
    const {logout, error, isPending} = useLogout();
    const {state,dispatch} = useAuthContext()
    const [showLogout, setShowLogout] = React.useState(false);
    const [query, setQuery] = React.useState('');
    // console.log("This is user from state",state.user);

    const navigate = useNavigate();

    return <>
                <div className = "search flex dot" onClick={()=>setShowLogout(false)}>
                    <input
                        type="text"
                        placeholder="Search Movies"
                        value = {query}
                        onChange = {(e)=>{e.preventDefault();setQuery(e.target.value)}}
                        onKeyDown={(e) => {
                            e.target.value && e.keyCode === 13 ? navigate(`search?q=${query}`) : null;
                        }}
                    />
                    <FiSearch/>
                </div>
                <nav className="dot flex">
                    <div className = "profile flex dot">
                        {state.showModal && <LoginModal/>}
                        {state.user ? 
                        <>
                        <Link style={{cursor: "pointer", textDecoration: "none"}} to="watchlist"><p className="lnk">My Watch List {state.watchListItems && `[ ${state.watchListItems} ]`}</p></Link>
                        <div className="flex" style={{flexDirection: "column", border: "none"}} onClick={()=>setShowLogout(prev=>!prev)}>
                            {!showLogout && <div className="user-info flex">
                                <p className="lnk">{state.user.displayName}</p>
                                {state.user.photoURL && <img 
                                    src = {state.user.photoURL}
                                    alt = "profile-photo"
                                    className = "profile-photo"
                                />}
                            </div>}
                            {state.user && showLogout && <a onClick={()=>logout()} className="lnk">Logout</a>}
                        </div>
                        
                        </>
                        : 
                        <a className="lnk" onClick={()=>dispatch({type: "RENDER_LOGIN_MODAL"})}>Sign in / Sign Up</a> }
                    </div>
            </nav>
    </>
}