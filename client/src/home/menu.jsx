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
    const [menu, setMenu] = useState(true);
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
                    <img className="pb-3" src="./images/logo.png" alt="IMusic" width="80%"  srcSet=""/>
               
                    <div className="man menu-list" style={{height:menu?'300px':'50px', overflow:'hidden'}}>
                        
                     <div className="flex-row flex-center opacity-8 click menu-list" onClick={()=>setMenu(!menu)} >
   {menu?<svg style={{width:38,height:38}} viewBox="0 0 24 24">
    <path fill="currentColor" d="M21,15.61L19.59,17L14.58,12L19.59,7L21,8.39L17.44,12L21,15.61M3,6H16V8H3V6M3,13V11H13V13H3M3,18V16H16V18H3Z" />
</svg>:<svg className="nav-icon" style={{width:38,height:38}} viewBox="0 0 24 24">
        <path fill="currentColor" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
    </svg>}

    <h3 className="pl-01 nav"> MENU</h3>
                        </div>
                        
                        <div onClick={() => {
                            signout ? setCreate(!create) : setSignIn(true);
                            
                        }} title={'Create Room'} className="flex-row flex-center pt-1 btn opacity-6 ">
<img style={{width:30,height:30}} src="./images/create.png" alt="Crete" />
                            
<h5 className="btn pl-01 nav">Create Room</h5>
</div>


<div onClick={() => signout? setManasession("Join"):setSignIn(true)} title={'Join Room'} className="flex-row flex-center pt-02 btn opacity-6 ">
<svg style={{width:30,height:30}} viewBox="0 0 24 24">
    <path fill="currentColor" d="M12,5A3.5,3.5 0 0,0 8.5,8.5A3.5,3.5 0 0,0 12,12A3.5,3.5 0 0,0 15.5,8.5A3.5,3.5 0 0,0 12,5M12,7A1.5,1.5 0 0,1 13.5,8.5A1.5,1.5 0 0,1 12,10A1.5,1.5 0 0,1 10.5,8.5A1.5,1.5 0 0,1 12,7M5.5,8A2.5,2.5 0 0,0 3,10.5C3,11.44 3.53,12.25 4.29,12.68C4.65,12.88 5.06,13 5.5,13C5.94,13 6.35,12.88 6.71,12.68C7.08,12.47 7.39,12.17 7.62,11.81C6.89,10.86 6.5,9.7 6.5,8.5C6.5,8.41 6.5,8.31 6.5,8.22C6.2,8.08 5.86,8 5.5,8M18.5,8C18.14,8 17.8,8.08 17.5,8.22C17.5,8.31 17.5,8.41 17.5,8.5C17.5,9.7 17.11,10.86 16.38,11.81C16.5,12 16.63,12.15 16.78,12.3C16.94,12.45 17.1,12.58 17.29,12.68C17.65,12.88 18.06,13 18.5,13C18.94,13 19.35,12.88 19.71,12.68C20.47,12.25 21,11.44 21,10.5A2.5,2.5 0 0,0 18.5,8M12,14C9.66,14 5,15.17 5,17.5V19H19V17.5C19,15.17 14.34,14 12,14M4.71,14.55C2.78,14.78 0,15.76 0,17.5V19H3V17.07C3,16.06 3.69,15.22 4.71,14.55M19.29,14.55C20.31,15.22 21,16.06 21,17.07V19H24V17.5C24,15.76 21.22,14.78 19.29,14.55M12,16C13.53,16 15.24,16.5 16.23,17H7.77C8.76,16.5 10.47,16 12,16Z" />
</svg>
    <h5 className=" btn pl-01 nav">Join Room</h5>
</div>

    <a href="https://documenter.getpostman.com/view/19413194/2s7YYvahcD" rel="noreferrer" target={'_blank'} title={'API Documentation'} className="flex-row flex-center pt-01 btn opacity-6 ">
<svg style={{width:30,height:30}} viewBox="0 0 24 24">
    <path fill="currentColor" d="M11 20V22H3C1.9 22 1 21.1 1 20V4C1 2.9 1.9 2 3 2H21C22.1 2 23 2.9 23 4V12.1L22.8 11.9C22.3 11.4 21.7 11.1 21 11.1V6H3V20H11M21.4 13.3L22.7 14.6C22.9 14.8 22.9 15.2 22.7 15.4L21.7 16.4L19.6 14.3L20.6 13.3C20.7 13.2 20.8 13.1 21 13.1C21.2 13.1 21.3 13.2 21.4 13.3M21.1 16.9L15.1 23H13V20.9L19.1 14.8L21.1 16.9Z" />
</svg>

    <h5 className=" btn pl-01 nav">API Doc</h5>
</a>
                </div>
                </div>
                <div className="auth pb-4">
                    {signout ? <div onClick={() => logOut()} to="/sign-up"> 
                     <div className="flex-row flex-center btn opacity-8 btn pt-5 ">
    <svg className="nav-icon" style={{width:38,height:38}} viewBox="0 0 24 24">
        <path fill="currentColor"
            d="M16,17V14H9V10H16V7L21,12L16,17M14,2A2,2 0 0,1 16,4V6H14V4H5V20H14V18H16V20A2,2 0 0,1 14,22H5A2,2 0 0,1 3,20V4A2,2 0 0,1 5,2H14Z" />
    </svg>

<h3 className="btn pl-01 nav">Sign out</h3>
</div>
                </div>:<div onClick={() => setSignIn(true)} title={'Sign up'}  className="flex-row flex-center btn opacity-8 btn pt-4 ">
   <svg className="nav-icon" style={{width:38,height:38}} viewBox="0 0 24 24">
    <path fill="currentColor" d="M10,17V14H3V10H10V7L15,12L10,17M10,2H19A2,2 0 0,1 21,4V20A2,2 0 0,1 19,22H10A2,2 0 0,1 8,20V18H10V20H19V4H10V6H8V4A2,2 0 0,1 10,2Z" />
</svg>

<h3 className=" btn pl-01 nav">Sign up</h3>
                    </div>}
                </div>
            </div> 

            <div className="mobileMenu">

                <div className="b-menu btn" onClick={() => signout ? setCreate(!create) : setSignIn(true)}>
                   <img style={{width:30,height:30}} src="./images/create.png" alt="Crete" />
                    <h5 className="btn-text btn">Create</h5>
                </div>

                 <div className="b-menu btn" onClick={() => signout? setManasession("Join"):setSignIn(true)}>
           <svg style={{width:30,height:30}} viewBox="0 0 24 24">
    <path fill="currentColor" d="M12,5A3.5,3.5 0 0,0 8.5,8.5A3.5,3.5 0 0,0 12,12A3.5,3.5 0 0,0 15.5,8.5A3.5,3.5 0 0,0 12,5M12,7A1.5,1.5 0 0,1 13.5,8.5A1.5,1.5 0 0,1 12,10A1.5,1.5 0 0,1 10.5,8.5A1.5,1.5 0 0,1 12,7M5.5,8A2.5,2.5 0 0,0 3,10.5C3,11.44 3.53,12.25 4.29,12.68C4.65,12.88 5.06,13 5.5,13C5.94,13 6.35,12.88 6.71,12.68C7.08,12.47 7.39,12.17 7.62,11.81C6.89,10.86 6.5,9.7 6.5,8.5C6.5,8.41 6.5,8.31 6.5,8.22C6.2,8.08 5.86,8 5.5,8M18.5,8C18.14,8 17.8,8.08 17.5,8.22C17.5,8.31 17.5,8.41 17.5,8.5C17.5,9.7 17.11,10.86 16.38,11.81C16.5,12 16.63,12.15 16.78,12.3C16.94,12.45 17.1,12.58 17.29,12.68C17.65,12.88 18.06,13 18.5,13C18.94,13 19.35,12.88 19.71,12.68C20.47,12.25 21,11.44 21,10.5A2.5,2.5 0 0,0 18.5,8M12,14C9.66,14 5,15.17 5,17.5V19H19V17.5C19,15.17 14.34,14 12,14M4.71,14.55C2.78,14.78 0,15.76 0,17.5V19H3V17.07C3,16.06 3.69,15.22 4.71,14.55M19.29,14.55C20.31,15.22 21,16.06 21,17.07V19H24V17.5C24,15.76 21.22,14.78 19.29,14.55M12,16C13.53,16 15.24,16.5 16.23,17H7.77C8.76,16.5 10.47,16 12,16Z" />
</svg>
                    <h5 className="btn-text btn">Join</h5>
                </div>

                
                 {signout?<div className="b-menu btn" onClick={() => logOut()}>
                    <svg className="nav-icon" style={{width:40,height:40}} viewBox="0 0 24 24">
    <path fill="currentColor" d="M10,17V14H3V10H10V7L15,12L10,17M10,2H19A2,2 0 0,1 21,4V20A2,2 0 0,1 19,22H10A2,2 0 0,1 8,20V18H10V20H19V4H10V6H8V4A2,2 0 0,1 10,2Z" />
</svg>
                    <h5 className="btn-text btn">Sign out</h5>
                </div>:<div className="b-menu btn" onClick={() => setSignIn(true)}>
                    <svg className="nav-icon" style={{width:30,height:30}} viewBox="0 0 24 24">
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