import Auth from "../auth/authenticated";
import Menu from "./menu";
import { useState,useEffect } from "react";
import Cookies from 'universal-cookie';
function Home() {
    const [signIn, setSignIn] = useState(false);
    const cookies = new Cookies();
const token = cookies.get('access_token');
    useEffect(() => {
        if (token && token.length > 10) {
            setSignIn(true)
        }
    }, [token]);
    
    return (<>
        <Menu />
       {signIn? <Auth />:<></>}
    </>)
}
export default Home;