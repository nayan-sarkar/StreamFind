import Navigation from './Navigation';
import React from 'react';
import {NavLink} from 'react-router-dom';

function Header(){
    const [isBlack, setIsBlack] = React.useState(false);

    React.useEffect(()=>{
        // console.log("mounted")
        function turnDark(){
                // console.log("scroll-running")
                if(window.scrollY>0){
                    setIsBlack(true);
                }
                if(window.scrollY==0){
                    setIsBlack(false);
                }
                // console.log(window.scrollY)
        }

        window.addEventListener("scroll",turnDark);
        return (()=>{
                    // console.log("unmounted");
                    window.removeEventListener("scroll",turnDark)})
    }
    )

    return (
        <>
        <header className="dot" style={{backgroundColor: isBlack  ? "#000" : "transparent"}}>
            <div className="container flex dot ">
                <div className = "logo dot">
                    <NavLink to="/"><h1>STREAMFIND</h1></NavLink>
                </div>
                <Navigation/>
            </div>
        </header>
        </>
    );
}

export default Header;