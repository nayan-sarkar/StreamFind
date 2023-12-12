import GoogleSignIn from './../assets/GoogleSignIn.svg';
import React from 'react';
import {useSignUp} from './../hooks/useSignUp';
import {useSignIn} from './../hooks/useSignIn';
import useAuthContext from './../hooks/useAuthContext';
import {auth} from './../firebase/config.js'
import {useCreateUpdateDelete} from './../hooks/useCreateUpdateDelete';

export default function LoginModal(){
    const {state,dispatch} = useAuthContext();
    const [email, setEmail] = React.useState('');
    const [password,setPassword] = React.useState('');
    const [name,setName] = React.useState("");
    const [showLogin, setShowLogin] = React.useState(true);
    const {error: signUpError, isPending: signUpIsPending, signup} = useSignUp();
    const {googleLogin, signin, error: signInError, isPending: signInisPending, errorState: signInErrorState} = useSignIn();
    // const {createList} = useCreateUpdateDelete();

    const boxStyle = {
        backgroundColor: "#3a7d56",
        borderRadius: "2px"
    }

    function handleSignUp(e){
        e.preventDefault();
        signup(email,password,name)
            .then(()=>{auth.currentUser &&  dispatch({type: "RENDER_LOGIN_MODAL"}) })
    }

    function handleLogin(e){
        e.preventDefault();
        signin(email,password)
            .then(()=>{auth.currentUser && dispatch({type: "RENDER_LOGIN_MODAL"})  })
    }

    function handleGoogleLogin(e){
        e.preventDefault();
        googleLogin()
            .then(()=>{auth.currentUser && dispatch({type: "RENDER_LOGIN_MODAL"})  })
    }
    
    return (
        <div className="login-backdrop flex">
            <div className="form-box">
                <a onClick={()=> dispatch({type: "RENDER_LOGIN_MODAL"})  }>X</a>
                <div className="select">
                    <div style={showLogin ? boxStyle : null}><a onClick={()=>setShowLogin(true)}>Sign In</a></div>
                    <div style={!showLogin ? boxStyle : null}><a onClick={()=>setShowLogin(false)}>Sign Up</a></div>
                </div>
                {showLogin ? <form onSubmit={(e)=>handleLogin(e)}>
                        <input
                            type="email"
                            value={email}
                            onChange={(e)=>setEmail(()=>e.target.value)}
                            required
                            aria-label="Email Address"
                            placeholder="Email Address"
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e)=>setPassword(()=>e.target.value)}
                            required
                            aria-label="Password"
                            placeholder="Password"
                        />
                    {signInError && <p>{signInError}</p>}    
                    <div className="buttons-box flex">
                        <button className="cs-button">Sign In</button>
                        <img 
                            src= {GoogleSignIn}
                            className = "sign-in-btn"
                            onClick={(e)=>handleGoogleLogin(e)}
                        />
                    </div>
                </form> : 
                
                <form onSubmit={(e)=>handleSignUp(e)}>
                    <input
                        type="text"
                        value={name}
                        onChange={(e)=>setName(()=>e.target.value)}
                        required
                        aria-label="Name"
                        placeholder="Name"
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={(e)=>setEmail(()=>e.target.value)}
                        required
                        aria-label="Email Address"
                        placeholder="Email Address"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e)=>setPassword(()=>e.target.value)}
                        required
                        aria-label="Password"
                        placeholder="Password"
                    />
                {signUpError && <p>{signUpError}</p>}   
                <div className="buttons-box flex">
                    <button className="cs-button">Sign Up</button>
                    <img 
                        src= {GoogleSignIn}
                        className = "sign-in-btn"
                        onClick={(e)=>handleGoogleLogin(e)}
                    />
                </div>
            </form>}
            </div>
        </div>
    )
}