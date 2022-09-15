import { memo } from "react";
import store from "../redux/store"
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import getData from "../api/backendcalls";
import Cookies from 'universal-cookie';
function PlayList(props) {


const cookies = new Cookies();
  const tokened = cookies.get('access_token');

    const notify = (message) => {
        toast.info(message, {
            autoClose: 2000,
        });
    };
    const payload = {
        type: "current-play-single",
        payload: [{ ...props.values }]
    }
    
    function clicked() {
        if (props.type==='private'?props.isAdmin?true:false:true) {
            store.dispatch(payload);
             if (props.id.indexOf('@spotify') < 0 && props.values) {
                    getData.PlayList_nowPlaying(props.id, { now_playing: {...props.values,pre_view:tokened}});
                }
        } else {
            notify("You don't have permission to control the playlist");
        }
}
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
        
            <div onClick={clicked} className="flex-row flex-center b-r-1  btn card pt-01" >
        <div className="flex-1">
             <img className="b-r-01 bg-secondary ml-1"
            src={props.values.image} width="60px"
            height="50px" alt=""/>
       </div>
        <div className="pl-1 flex-5">
            <h5 className="opacity-8">{props.values.name}</h5>
            <small className="opacity-6 font-size-08">{ props.values.auth}</small>
        </div>
        </div>
        </>
        
        )
}
export default memo(PlayList);