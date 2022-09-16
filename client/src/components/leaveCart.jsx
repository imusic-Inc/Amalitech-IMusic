import React, {useCallback,memo} from 'react';
import { useNavigate} from "react-router-dom";
import getData from '../api/backendcalls';
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function LeaveCart({exit,id}) {
    const navigate = useNavigate();
    const notify = (message) => {
        toast.info(message, {
            autoClose: 2000,
        });
    };
    
    const handleOnClick = useCallback(() => {
        exit();
        getData.leaveSession(`session/${id}/leave`).then(value => {
            setTimeout(() => {
               navigate('../home', { replace: true });
            }, 500);
            notify(value.status);
        })
     }, [exit,id]);


    return (
        <>
<ToastContainer
position="top-left"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
            <div onClick={handleOnClick} className='btn btn-back b-r-1 flex-row flex-center p-01'>
         <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
    <path fill="currentColor" d="M21,11H6.83L10.41,7.41L9,6L3,12L9,18L10.41,16.58L6.83,13H21V11Z" />
</svg>
        <div className='pl-01 leave-chat'>
            Leave room
        </div>
    </div>
        </>
        );
}
export default memo(LeaveCart);