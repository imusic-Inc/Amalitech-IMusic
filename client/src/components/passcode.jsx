import React, {memo,useState} from 'react';
import { useNavigate } from "react-router-dom";
import generateRandomString from '../api/keygen';
import getData from '../api/backendcalls';
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function PassCode(props) {
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const notify = (message) => {
        toast.info(message, {
            autoClose: 2000,
        });
    };

    const handleOnClick = () => {
        if (password && password.length > 4) {
             notify("Joining room, Please wait...");
            getData.joinPrivateSession(`session/${props.pass}/session`, { lock: password }).then(value => {
                console.log(value);
                if (value.status !== "fail") {
                    notify(value.status);
                    navigate(props.link + '&v=' + generateRandomString(5), { replace: false });
                    props.show();
                    if (props.invite) {
                        props.declineFun(props.invite);
                    };
                }
                if (value.message) {
                    notify(value.message);
                } else {
                    notify(value.status);
                }
                
            });
        } else {
             notify('Wrong pass code');
        }
    
     };




    return (
        <>
         <ToastContainer
position="top-left"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
        <div className="password b-r-1 bg-default box-shadow">
     <div className="p-1 text-rigth" >
            <svg onClick={props.show} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" data-supported-dps="16x16" fill="currentColor"
                className="mercado-match close btn" width="16" height="16" focusable="false">
                <path d="M14 3.41L9.41 8 14 12.59 12.59 14 8 9.41 3.41 14 2 12.59 6.59 8 2 3.41 3.41 2 8 6.59 12.59 2z">
                </path>
            </svg>
        </div>

        <div className="flex-column flex-center password-conent">
           <div className="pr-1 pl-1 ">
                <label htmlFor="password" className="opacity-6">iMusic Room Password Code</label><br />
                <input type="text" minLength={7} className="playSearch p-1 w-100 mt-1" value={password} onChange={event => {
                    setPassword(event.target.value);
                }} placeholder="Room pass code" name="password" />
            </div>
            <div onClick ={handleOnClick}>
            <div className="btn flex-row bg-danger pl-2 p-1 flex-center mt-1 flex-center-justify text-center">
                    Join Session
                </div>
            </div>
        </div>
    </div>
        </>
       )
}

export default memo(PassCode);