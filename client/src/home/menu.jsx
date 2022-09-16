import Discover from "../home/discover";
import { useState,useEffect } from "react";
import Join from "../components/join";
import {Routes as Switch,Route} from "react-router-dom";
import CreateSession from "../components/createSession";
import Auth from "../auth/auth";
import Cookies from 'universal-cookie';
import getData from "../api/backendcalls";


function Menu() {
    const [Manasession, setManasession] = useState("");
    const [create, setCreate] = useState(false);
    const [signIn, setSignIn] = useState(false);
    const [signout, setSignOut] = useState(false);
    const cookies = new Cookies();
const token = cookies.get('access_token');
    useEffect(() => {
        if (token && token.length > 10) {
            setSignOut(true)
        }
    },[signout,token]);
    
    function logOut() {
        getData.logOut('users/logout');
                cookies.set("name",null,{sameSite:true});
                cookies.set("access_token", null,{sameSite:true});
                cookies.set("refresh_token",null,{sameSite:true});
                cookies.set("email", null,{sameSite:true});
                cookies.set("setDate", null,{sameSite:true});
                cookies.set("uid", null,{sameSite:true});
                cookies.set("photo", null,{sameSite:true});
                cookies.set("product", null,{sameSite:true});
                window.location.reload();
}

    let managSession = Manasession === "Join"?<Join onClick = {hideManasession} />:<></>;
    
    function hideCreate() {
        setCreate(false);
        setSignIn(false);
    }
    
    function hideManasession() {
        setManasession("");
    }

    return (
      <>
      <div className="left bg-secondary fixed"> 

                <div className="logo">
                    <img className="pb-3" src="./images/logo.png" alt="IMusic" width="60%"  srcSet=""/>
               
               <div className="man ">
                     <div className="flex-row flex-center opacity-8">
    <svg className="nav-icon" style={{width:24,height:24}} viewBox="0 0 24 24">
        <path fill="currentColor" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
    </svg>

    <h5 className=" pl-1 nav"> MENU</h5>
</div>
<div onClick={() => signout ? setCreate(!create) : setSignIn(true)} title={'Create Room'} className="flex-row flex-center pt-1 btn opacity-6 ">
<svg className="nav-icon" style={{width:24,height:24}} viewBox="0 0 24 24">
    <path fill="currentColor"
        d="M16,16.92C15.67,16.97 15.34,17 15,17C14.66,17 14.33,16.97 14,16.92V13.41L11.5,15.89C11,15.5 10.5,15 10.11,14.5L12.59,12H9.08C9.03,11.67 9,11.34 9,11C9,10.66 9.03,10.33 9.08,10H12.59L10.11,7.5C10.3,7.25 10.5,7 10.76,6.76V6.76C11,6.5 11.25,6.3 11.5,6.11L14,8.59V5.08C14.33,5.03 14.66,5 15,5C15.34,5 15.67,5.03 16,5.08V8.59L18.5,6.11C19,6.5 19.5,7 19.89,7.5L17.41,10H20.92C20.97,10.33 21,10.66 21,11C21,11.34 20.97,11.67 20.92,12H17.41L19.89,14.5C19.7,14.75 19.5,15 19.24,15.24V15.24C19,15.5 18.75,15.7 18.5,15.89L16,13.41V16.92H16V16.92M5,19A2,2 0 0,1 7,17A2,2 0 0,1 9,19A2,2 0 0,1 7,21A2,2 0 0,1 5,19H5Z" />
</svg>
<p className="btn pl-01 nav">Create Room</p>
</div>


<div onClick={() => signout? setManasession("Join"):setSignIn(true)} title={'Join Room'} className="flex-row flex-center pt-1 btn opacity-6 ">
<svg className="nav-icon" style={{width:24,height:24}} viewBox="0 0 24 24">
    <path fill="currentColor"
        d="M9,5A7,7 0 0,0 2,12A7,7 0 0,0 9,19C10.04,19 11.06,18.76 12,18.32C12.94,18.76 13.96,19 15,19A7,7 0 0,0 22,12A7,7 0 0,0 15,5C13.96,5 12.94,5.24 12,5.68C11.06,5.24 10.04,5 9,5M9,7C9.34,7 9.67,7.03 10,7.1C8.72,8.41 8,10.17 8,12C8,13.83 8.72,15.59 10,16.89C9.67,16.96 9.34,17 9,17A5,5 0 0,1 4,12A5,5 0 0,1 9,7M15,7A5,5 0 0,1 20,12A5,5 0 0,1 15,17C14.66,17 14.33,16.97 14,16.9C15.28,15.59 16,13.83 16,12C16,10.17 15.28,8.41 14,7.11C14.33,7.04 14.66,7 15,7Z" />
</svg>

    <p className=" btn pl-01 nav">Join Room</p>
</div>

    <a href="https://documenter.getpostman.com/view/19413194/2s7YYvahcD" rel="noreferrer" target={'_blank'} title={'API Documentation'} className="flex-row flex-center pt-1 btn opacity-6 ">
<svg style={{width:24,height:24}} viewBox="0 0 24 24">
    <path fill="currentColor" d="M11 20V22H3C1.9 22 1 21.1 1 20V4C1 2.9 1.9 2 3 2H21C22.1 2 23 2.9 23 4V12.1L22.8 11.9C22.3 11.4 21.7 11.1 21 11.1V6H3V20H11M21.4 13.3L22.7 14.6C22.9 14.8 22.9 15.2 22.7 15.4L21.7 16.4L19.6 14.3L20.6 13.3C20.7 13.2 20.8 13.1 21 13.1C21.2 13.1 21.3 13.2 21.4 13.3M21.1 16.9L15.1 23H13V20.9L19.1 14.8L21.1 16.9Z" />
</svg>

    <p className=" btn pl-01 nav">API Doc</p>
</a>
                </div>
                </div>
                <div className="auth pb-4">
                    {signout ? <div onClick={() => logOut()} to="/sign-up"> 
                     <div className="flex-row flex-center btn opacity-8 btn pt-5 ">
    <svg className="nav-icon" style={{width:24,height:24}} viewBox="0 0 24 24">
        <path fill="currentColor"
            d="M16,17V14H9V10H16V7L21,12L16,17M14,2A2,2 0 0,1 16,4V6H14V4H5V20H14V18H16V20A2,2 0 0,1 14,22H5A2,2 0 0,1 3,20V4A2,2 0 0,1 5,2H14Z" />
    </svg>

<h3 className=" btn pl-01 nav">Sign out</h3>
</div>
                </div>:<div onClick={() => setSignIn(true)} title={'Sign up'}  className="flex-row flex-center btn opacity-8 btn pt-4 ">
   <svg className="nav-icon" style={{width:24,height:24}} viewBox="0 0 24 24">
    <path fill="currentColor" d="M10,17V14H3V10H10V7L15,12L10,17M10,2H19A2,2 0 0,1 21,4V20A2,2 0 0,1 19,22H10A2,2 0 0,1 8,20V18H10V20H19V4H10V6H8V4A2,2 0 0,1 10,2Z" />
</svg>

<h4 className=" btn pl-01 nav">Sign up</h4>
                    </div>}
                </div>
            </div> 

            <div className="mobileMenu">

                <div className="b-menu btn" onClick={() => signout ? setCreate(!create) : setSignIn(true)}>
                    <svg className="nav-icon" style={{width:44,height:44}} viewBox="0 0 24 24">
    <path fill="currentColor"
        d="M16,16.92C15.67,16.97 15.34,17 15,17C14.66,17 14.33,16.97 14,16.92V13.41L11.5,15.89C11,15.5 10.5,15 10.11,14.5L12.59,12H9.08C9.03,11.67 9,11.34 9,11C9,10.66 9.03,10.33 9.08,10H12.59L10.11,7.5C10.3,7.25 10.5,7 10.76,6.76V6.76C11,6.5 11.25,6.3 11.5,6.11L14,8.59V5.08C14.33,5.03 14.66,5 15,5C15.34,5 15.67,5.03 16,5.08V8.59L18.5,6.11C19,6.5 19.5,7 19.89,7.5L17.41,10H20.92C20.97,10.33 21,10.66 21,11C21,11.34 20.97,11.67 20.92,12H17.41L19.89,14.5C19.7,14.75 19.5,15 19.24,15.24V15.24C19,15.5 18.75,15.7 18.5,15.89L16,13.41V16.92H16V16.92M5,19A2,2 0 0,1 7,17A2,2 0 0,1 9,19A2,2 0 0,1 7,21A2,2 0 0,1 5,19H5Z" />
                    </svg>
                    <h5 className="btn-text btn">Create</h5>
                </div>

                 <div className="b-menu btn" onClick={() => signout? setManasession("Join"):setSignIn(true)}>
                   <svg className="nav-icon" style={{width:44,height:44}} viewBox="0 0 24 24">
    <path fill="currentColor"
        d="M9,5A7,7 0 0,0 2,12A7,7 0 0,0 9,19C10.04,19 11.06,18.76 12,18.32C12.94,18.76 13.96,19 15,19A7,7 0 0,0 22,12A7,7 0 0,0 15,5C13.96,5 12.94,5.24 12,5.68C11.06,5.24 10.04,5 9,5M9,7C9.34,7 9.67,7.03 10,7.1C8.72,8.41 8,10.17 8,12C8,13.83 8.72,15.59 10,16.89C9.67,16.96 9.34,17 9,17A5,5 0 0,1 4,12A5,5 0 0,1 9,7M15,7A5,5 0 0,1 20,12A5,5 0 0,1 15,17C14.66,17 14.33,16.97 14,16.9C15.28,15.59 16,13.83 16,12C16,10.17 15.28,8.41 14,7.11C14.33,7.04 14.66,7 15,7Z" />
</svg>
                    <h5 className="btn-text btn">Join</h5>
                </div>

                
                 {signout?<div className="b-menu btn" onClick={() => logOut()}>
                    <svg className="nav-icon" style={{width:40,height:40}} viewBox="0 0 24 24">
    <path fill="currentColor" d="M10,17V14H3V10H10V7L15,12L10,17M10,2H19A2,2 0 0,1 21,4V20A2,2 0 0,1 19,22H10A2,2 0 0,1 8,20V18H10V20H19V4H10V6H8V4A2,2 0 0,1 10,2Z" />
</svg>
                    <h5 className="btn-text btn">Sign out</h5>
                </div>:<div className="b-menu btn" onClick={() => setSignIn(true)}>
                    <svg className="nav-icon" style={{width:40,height:40}} viewBox="0 0 24 24">
    <path fill="currentColor" d="M10,17V14H3V10H10V7L15,12L10,17M10,2H19A2,2 0 0,1 21,4V20A2,2 0 0,1 19,22H10A2,2 0 0,1 8,20V18H10V20H19V4H10V6H8V4A2,2 0 0,1 10,2Z" />
</svg>
                    <h5 className="btn-text">Sign up</h5>
                </div>}
                
            </div>

{managSession}
            {create ? <CreateSession show={ hideCreate } />:<></>}
            {signIn ? <Auth show={ hideCreate } />:<></>}
    
        <Switch>
        <Route path="/discover" element={<Discover />}/>
        <Route path="/" element={<Discover />}/>
        </Switch>
 
     </>
         
  );
}

export default Menu;